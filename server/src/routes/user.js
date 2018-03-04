'use strict'

const Route = require('koa-router')
const SS = require('../lib/ss-bash')

const router = new Route()

router.get('/users', async (ctx, next) => {
  ctx.body = SS.ports

  return next()
})

module.exports = router