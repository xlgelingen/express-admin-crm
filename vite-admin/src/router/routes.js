import BasicLayout from '@/components/layout/BasicLayout.vue';
import Home from '@/views/HomeIndex.vue';
import Landing from '@/views/LandingIndex.vue';
import NotFound from '@/views/Common/NotFound.vue';
import Forbidden from '@/views/Common/ForbiddenIndex.vue'
import AccountLogin from '@/views/Common/AccountLogin.vue'
import routesPermission from './routesPermission'
import routesClue from './routesClue'

export default [
  {
    path: '/',
    name: 'Root',
    component: BasicLayout,
    redirect: {
      name: 'Clue'
    },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: Home,
        redirect: {
          name: 'Landing'
        },
        meta: {
          nav: {
            icon: 'icon-home',
            title: '首页'
          },
          breadcrumb: {
            name: '首页'
          }
        },
      },
      ...routesClue,
      ...routesPermission
    ]
  },
  {
    path: '/landing',
    name: 'Landing',
    component: Landing,
  },
  {
    path: '/login',
    name: 'AccountLogin',
    component: AccountLogin,
  },
  {
    path: '/403',
    name: 'Forbidden',
    component: Forbidden
  },
  {
    path: "/404",
    name: "NotFound",
    component: NotFound
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/404'
  }
];