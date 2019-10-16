import MLayout from '@/views/layouts/MLayout.vue'
import AppLayout from '@/views/layouts/AppLayout.vue'
import Dashboard from '@/views/contents/Dashboard.vue'

const routePm = []

const routeDev = [
    {
        path: 'config/version',
        component: () => import('@/views/contents/config/VersionConfig.vue')
    },
    {
        path: 'config/function',
        component: () => import('@/views/contents/config/FunctionConfig.vue')
    },
    {
        path: 'config/address',
        component: () => import('@/views/contents/config/AddressConfig.vue')
    },
    {
        path: 'server/list',
        component: () => import('@/views/contents/server/ServerList.vue')
    }
]

const routeOps = [
    {
        path: 'bulletin/post',
        component: () => import('@/views/contents/bulletin/BulletinPost.vue')
    },
    {
        path: 'bulletin/list',
        component: () => import('@/views/contents/bulletin/BulletinList.vue')
    },
    {
        path: 'email',
        component: () => import('@/views/contents/email/SystemEmail.vue')
    }
]

const routes = [
    {
        path: '/',
        component: () => import('@/views/pages/Landing.vue')
    },
    {
        path: '/',
        component: MLayout,
        children: [
            {
                path: 'all',
                redirect: 'all/dashboard',
                component: AppLayout,
                props: {kind: 'all'},
                children: [
                    {
                        path: 'dashboard',
                        component: Dashboard
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
                props: {kind: 'pm'},
                children: [
                    {
                        path: 'dashboard',
                        component: Dashboard
                    },
                    ...routePm
                ]
            },
            {
                path: 'dev',
                redirect: 'dev/dashboard',
                component: AppLayout,
                props: {kind: 'dev'},
                children: [
                    {
                        path: 'dashboard',
                        component: Dashboard
                    },
                    ...routeDev
                ]
            },
            {
                path: 'ops',
                redirect: 'ops/dashboard',
                component: AppLayout,
                props: {kind: 'ops'},
                children: [
                    {
                        path: 'dashboard',
                        component: Dashboard
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
    component: () => import('@/views/pages/Error404.vue')
})

export default routes
