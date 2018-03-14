'use strict'

const Koa = require('koa')
const path = require('path')
const config = require('./config')
const logger = require('./lib/logger')
const router = require('./routes').prefix('/api')
const rewrite = require('koa-rewrite')
const koaStatic = require('koa-static')
const bodyParser = require('koa-bodyparser')

const app = new Koa()
app.use(logger.loggerMiddleware)
app.use(bodyParser())
app.use(rewrite(`/${config.base}/(.*)`, '/$1'))
app.use(router.routes())
app.use(koaStatic(path.resolve(__dirname, './static')))

module.exports = app