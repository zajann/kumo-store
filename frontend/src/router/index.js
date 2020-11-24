import Vue from 'vue'
import Router from 'vue-router'
import KumoStore from '@/components/KumoStore'
import KumoStoreMobile from '@/components/KumoStoreMobile'

Vue.use(Router)

export default new Router({

  // add to Beautiful-URI
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'KumoStore',
      component: KumoStore,
      beforeEnter: (to, from, next) => {
        var filter = "win16|win32|win64|mac|macintel";

        if (filter.indexOf(navigator.platform.toLowerCase()) < 0) {
          next('/mobile');
        } 
        else {
          next();
        }

      }
    },
    {
      path: '/mobile',
      name: 'KumoStoreMobile',
      component: KumoStoreMobile,
      beforeEnter: (to, from, next) => {
        var filter = "win16|win32|win64|mac|macintel";

        if (filter.indexOf(navigator.platform.toLowerCase()) < 0) {
          next();
        } 
        else {
          next('/');
        }

      }
    }
  ]
})
