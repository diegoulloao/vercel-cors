type HttpMethods = 'GET' | 'HEAD' | 'POST' | 'PUT' | 'PATCH' | 'UPDATE' | 'DELETE' | 'OPTIONS'

export interface CorsOptions {
	origin: string | RegExp | boolean | Array<string | RegExp>
	headers: string[]
	methods: HttpMethods[]
	expose: string[]
	maxAge: number | undefined
	credentials: boolean
}
