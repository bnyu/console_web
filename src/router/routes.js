import MLayout from '@/views/layouts/MLayout.vue'

const addRoutes = {
    path: '/',
    component: MLayout
}

const routes = [
    {
        path: '/',
        component: () => import('@/views/pages/Landing.vue')
    }
]

const route404 = {
    path: '*',
    component: () => import('@/views/pages/Error404.vue')
}

export {routes, addRoutes, route404}
