import Vue from 'vue'
import Router from 'vue-router'
import statistic from '@/components/statistic'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'statistic',
      component: statistic
    }
  ]
})
