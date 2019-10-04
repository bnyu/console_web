import MLayout from 'src/layouts/MLayout.vue'
import AppLayout from 'src/layouts/AppLayout.vue'

const routePm = [
  {
    path: 'bulletin/post',
    component: () => import('src/pages/bulletin/BulletinPost.vue')
  },
  {
    path: 'bulletin/list',
    component: () => import('src/pages/bulletin/BulletinList.vue')
  },
  {
    path: 'email',
    component: () => import('src/pages/email/SystemEmail.vue')
  }
]

const routeDev = [
  {
    path: 'config/version',
    component: () => import('src/pages/config/VersionConfig.vue')
  },
  {
    path: 'config/function',
    component: () => import('src/pages/config/FunctionConfig.vue')
  },
  {
    path: 'config/address',
    component: () => import('src/pages/config/AddressConfig.vue')
  }
]

const routeOps = [
  {
    path: 'server/list',
    component: () => import('src/pages/server/ServerList.vue')
  }
]

const routes = [
  {
    path: '/',
    component: () => import('src/pages/Landing.vue')
  },
  {
    path: '/',
    component: MLayout,
    children: [
      {
        path: 'all',
        redirect: 'all/dashboard',
        component: AppLayout,
        props: { kind: 'all' },
        children: [
          {
            path: 'dashboard',
            component: () => import('src/pages/dashboard/Dashboard.vue')
          },
          ...routePm,
          ...routeDev,
          ...routeOps
        ]
      },
      {
        path: 'pm',
        redirect: 'pm/dashboard',
        component: AppLayout,
        props: { kind: 'pm' },
        children: [
          {
            path: 'dashboard',
            component: () => import('src/pages/dashboard/PMDashboard.vue')
          },
          ...routePm
        ]
      },
      {
        path: 'dev',
        redirect: 'dev/dashboard',
        component: AppLayout,
        props: { kind: 'dev' },
        children: [
          {
            path: 'dashboard',
            component: () => import('src/pages/dashboard/DevDashboard.vue')
          },
          ...routeDev
        ]
      },
      {
        path: 'ops',
        redirect: 'ops/dashboard',
        component: AppLayout,
        props: { kind: 'ops' },
        children: [
          {
            path: 'dashboard',
            component: () => import('src/pages/dashboard/OpsDashboard.vue')
          },
          ...routeOps
        ]
      }
    ]
  }
]

// Always leave this as last one
routes.push({
  path: '*',
  component: () => import('src/pages/Error404.vue')
})

export default routes
