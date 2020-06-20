require('isomorphic-fetch')
const Koa = require('koa')
const KoaRouter = require('koa-router')
const koaBody = require('koa-body')
const next = require('next')
const { default: createShopifyAuth } = require('@shopify/koa-shopify-auth')
const dotenv = require('dotenv')
const { verifyRequest } = require('@shopify/koa-shopify-auth')
const session = require('koa-session')

dotenv.config()
const { default: graphQLProxy } = require('@shopify/koa-shopify-graphql-proxy')
const { ApiVersion } = require('@shopify/koa-shopify-graphql-proxy')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const { SHOPIFY_API_SECRET_KEY, SHOPIFY_API_KEY } = process.env

const server = new Koa()
const router = new KoaRouter()

const products = [
  {
    image1: 'test',
  },
]

router.post('/api/products', koaBody(), async (ctx) => {
  try {
    const body = ctx.request.body
    products.push(body)
    ctx.body = 'Item added'
  } catch (error) {
    console.log(error)
  }
})

// Router middleware
server.use(router.allowedMethods())
server.use(router.routes())

router.get('/api/products', async (ctx) => {
  try {
    ctx.body = {
      status: 'success',
      data: products,
    }
  } catch (error) {
    console.log(error)
  }
})

app.prepare().then(() => {
  server.use(session({ sameSite: 'none', secure: true }, server))
  server.keys = [SHOPIFY_API_SECRET_KEY]

  server.use(
    createShopifyAuth({
      apiKey: SHOPIFY_API_KEY,
      secret: SHOPIFY_API_SECRET_KEY,
      scopes: [
        'read_products',
        'write_products',
        'read_script_tags',
        'write_script_tags',
      ],
      afterAuth(ctx) {
        const { shop, accessToken } = ctx.session
        ctx.cookies.set('shopOrigin', shop, {
          httpOnly: false,
          secure: true,
          sameSite: 'none',
        })
        ctx.redirect('/')
      },
    })
  )

  server.use(graphQLProxy({ version: ApiVersion.July20 }))
  server.use(verifyRequest())

  server.use(async (ctx) => {
    await handle(ctx.req, ctx.res)
    ctx.respond = false
    ctx.res.statusCode = 200
  })

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`)
  })
})
