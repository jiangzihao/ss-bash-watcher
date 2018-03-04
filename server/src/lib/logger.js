'use strict'

module.exports = {
  loggerMiddleware: async (ctx, next) => {
    const start = new Date()
    await next()
    const end = new Date()
    console.log(`${ctx.method} ${ctx.req.url} - ${end - start}ms`)
  }
}