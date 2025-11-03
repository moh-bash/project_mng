/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router'


import DefaultLayout from '@/layouts/DefaultLayout.vue'
import GuestLayout from '@/layouts/GuestLayout.vue'

import Login from '@/pages/Login.vue'
import Register from '@/pages/Register.vue'
import projects from '@/pages/projects.vue'
import ProjecDetails from '@/pages/ProjecDetails.vue'
import Dash from '@/pages/dash.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes:[
    {
      path:'',
      redirect:'/login'
    },
    {
      path:'/pages',
      name:'DefaultLayout',
      component:DefaultLayout,
      meta:{layout: 'UserProfile'},
      children:[
        {
          path:'projects',
          name:'projects',
          component:projects
        },
        {
          path:'projects/:id',
          name: 'project',
          component:ProjecDetails,
          props: true,
        },
        {
          path:'dash',
          name:'dash',
          component: Dash,
        }
      ]
    },
    {
      path:'/auth',
      name:'GuestLayout',
      component:GuestLayout,
      children:[
        {
          path:'/login',
          name:'login',
          component:Login
        },
        {
          path:'/register',
          name:'register',
          component:Register
        }
      ]
    }
  ]

})



export default router
