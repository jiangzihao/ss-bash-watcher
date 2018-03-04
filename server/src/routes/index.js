'use strict'

const fs = require('fs')
const path = require('path')
const Route = require('koa-router')

const router = new Route()

fs.readdirSync(__dirname).filter(_ => /.js/.test(_) && _ !== 'index.js').map(file => router.use(require(`./${file}`).routes()))

module.exports = router
