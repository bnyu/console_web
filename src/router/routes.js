import MLayout from '@/views/layouts/MLayout.vue'
import AppLayout from '@/views/layouts/AppLayout.vue'
import Dashboard from '@/views/contents/Dashboard.vue'

const routeManage = [
    {
        path: 'role',
        component: () => import('@/views/contents/manage/RoleManage.vue')
    },
    {
        path: 'user',
        component: () => import('@/views/contents/manage/UserManage.vue')
    }
]

const routePm = [
    {
        path: 'ecology',
        component: () => import('@/views/contents/ecology/Ecology.vue')
    },
]

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
                path: 'dashboard',
                component: AppLayout,
                props: {kind: 'all'},
                children: [
                    {
                        path: '/',
                        component: Dashboard
                    }
                ]
            },
            {
                path: 'pm',
                redirect: 'dashboard',
                component: AppLayout,
                props: {kind: 'pm'},
                children: routePm
            },
            {
                path: 'dev',
                redirect: 'dashboard',
                component: AppLayout,
                props: {kind: 'dev'},
                children: routeDev
            },
            {
                path: 'ops',
                redirect: 'dashboard',
                component: AppLayout,
                props: {kind: 'ops'},
                children: routeOps
            },
            {
                path: 'manage',
                component: AppLayout,
                props: {kind: 'manage', hiddenNav: true},
                children: routeManage
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
