import type { VercelRequest, VercelResponse, VercelApiHandler } from '@vercel/node'
import type { CorsOptions } from 'types'

export const defaults: CorsOptions = {
	origin: '*',
	headers: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
	methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'UPDATE', 'OPTIONS', 'DELETE'],
	expose: [],
	maxAge: undefined,
	credentials: false,
}

export default (options: Partial<CorsOptions>) => {
	options = { ...defaults, ...options }

	return (handler: VercelApiHandler): VercelApiHandler => {
		return function (req: VercelRequest, res: VercelResponse) {
			if (typeof options.origin === 'boolean' && options.origin === false) {
				return res.status(403).end('not allowed')
			}

			if (options.origin !== '*' && req.headers.origin === undefined) {
				return res.status(403).end('unknown origin')
			}

			if (typeof options.origin === 'string') {
				if (options.origin === '*' || options.origin === req.headers.origin) {
					res.setHeader('Access-Control-Allow-Origin', options.origin)
				}
			} else if (options.origin instanceof RegExp) {
				if (options.origin.test(req.headers.origin as string)) {
					res.setHeader('Access-Control-Allow-Origin', req.headers.origin as string)
				}
			} else {
				const allowedOrigin: boolean = (options.origin as Array<string | RegExp>).some((h: RegExp | string) =>
					typeof h === 'string' ? h === req.headers.origin : h.test(req.headers.origin as string)
				)

				if (allowedOrigin) {
					res.setHeader('Access-Control-Allow-Origin', req.headers.origin as string)
				}
			}

			res.setHeader('Access-Control-Allow-Headers', options.headers!.join(', '))
			res.setHeader('Access-Control-Allow-Credentials', options.credentials!.toString())
			res.setHeader('Access-Control-Allow-Methods', options.methods!.join(', '))

			if (options.expose!.length) {
				res.setHeader('Access-Control-Expose-Methods', options.methods!.join(', '))
			}

			if (!isNaN(options.maxAge!)) {
				res.setHeader('Access-Control-Max-Age', options.maxAge!)
			}

			if (options.origin === '*' || (Array.isArray(options.origin) && options.origin.length > 1)) {
				res.setHeader('Vary', 'Origin')
			}

			if (req.method === 'OPTIONS') {
				return res.status(200).json({ body: 'OK' })
			}

			return handler.apply(this, [req, res])
		}
	}
}
