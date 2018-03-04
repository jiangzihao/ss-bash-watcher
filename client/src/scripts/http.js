'use strict'

import Vue from 'vue'
import axios from 'axios'

const resource = axios.create({
  baseURL: '/api',
  validateStatus: () => true
})

Vue.prototype.$http = resource
export default resource
