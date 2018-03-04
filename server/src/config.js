'use strict'

const path = require('path')

module.exports = {
  'ss-bash': '/path/to/ss-bash', // path to ss-bash,
  interval: 5 * 60,
  tempDirectory: path.resolve(__dirname, '../temp'),
  port: 3000,
  base: 'watcher'
}