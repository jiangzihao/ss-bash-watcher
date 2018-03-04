'use strict'

const Route = require('koa-router')
const SS = require('../lib/ss-bash')

const router = new Route()

router.get('/users', async (ctx, next) => {
  const result = []
  const { ports } = SS
  for (const key in ports) {
    result.push(Object.assign({ port: key }, ports[key]))
  }

  ctx.body = result

  return next()
})

module.exports = router