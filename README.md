# vercel-cors

A simple CORS module for use with [Vercel Serverless Functions](https://vercel.com/docs/concepts/functions/serverless-functions). Also compatible with [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction).

## Installation
```bash
yarn add vercel-cors | npm i vercel-cors
```

## Usage
Create your CORS configuration in a separated file:

`config/cors.js`
```javascript
import cors from "vercel-cors"

export default cors({
  origin: '*' | string | RegExp | Array<string | RegExp>,
  headers: string[],
  methods: Array<'GET' | 'HEAD' | 'POST' | 'PUT' | 'PATCH' | 'UPDATE' | 'DELETE' | 'OPTIONS'>,
  expose: string[],
  maxAge: number | undefined,
  credentials: boolean
})
```

Then export as default a Higher Order Function passing your handler as parameter:

`api/index.js`
```javascript
import withCors from "config/cors"

async function handler (req, res) {
  // do something
}

export default withCors(handler)
```

## Defaults options
```javascript
export const defaults = {
  origin: '*',
  headers: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'UPDATE', 'OPTIONS', 'DELETE'],
  expose: [],
  maxAge: undefined,
  credentials: false
}
```

## Example
```javascript
import cors from "vercel-cors"

export default cors({
  origin: /^https:\/\/vercelproject-[a-z0-9]+-organization.vercel.app$/,
  headers: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'UPDATE', 'DELETE'],
  credentials: true
})
```

## Multiple configurations
Just export differents `cors()` functions from differents files:

```
config/cors
├── dev.js
└── prod.js
```

---
**diegoulloao · 2022** 
