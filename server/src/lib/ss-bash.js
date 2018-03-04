'use strict'

const fs = require('fs')
const path = require('path')
const config = require('../config')
const readline = require('readline')

const targetPath = config['ss-bash']

const bash = path.resolve(targetPath, 'ssadmin.sh')
const userFile = path.resolve(targetPath, 'ssusers')
const statisticFile = path.resolve(targetPath, 'traffic.log')
const { tempDirectory } = config

if (!fs.existsSync(tempDirectory)) {
  fs.mkdirSync(tempDirectory)
}

const ports = []

const updateFiles = () => {
  const rl_statistic = readline.createInterface({
    input: fs.createReadStream(statisticFile, { encoding: 'utf8' }),
    output: null
  })

  rl_statistic.on('line', line => {
    if (line.startsWith('#')) return
    const fields = line.split(/ |\t/).filter(i => i.length && !i.startsWith('#'))

    if (fields.length >= 2) {
      const doc = { port: fields[0], used: fields[1] }
      let index = ports.findIndex(item => item.port === fields[0])
      if (index >= 0) {
        ports[index] = Object.assign(ports[index], doc)
      } else {
        ports.push(doc)
      }
    }
  })
  
  const rl_user = readline.createInterface({
    input: fs.createReadStream(userFile, { encoding: 'utf8' }),
    output: null
  })

  rl_user.on('line', line => {
    if (line.startsWith('#')) return
    const fields = line.split(/ |\t/).filter(i => i.length && !i.startsWith('#'))

    if (fields.length >= 3) {
      const doc = { port: fields[0], password: fields[1], limit: fields[2] }
      let index = ports.findIndex(item => item.port === fields[0])
      if (index >= 0) {
        ports[index] = Object.assign(ports[index], doc)
      } else {
        ports.push(doc)
      }
    }
  })
}

fs.watchFile(statisticFile, updateFiles)
fs.watchFile(userFile, updateFiles)

updateFiles()

module.exports = {
  ports,
  
  getPortStatus: (port) => {
    return ports[port]
  },

  addUser: async (port, password, limit = '') => {

  }
}