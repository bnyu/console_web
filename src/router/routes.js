import Landing from "@/views/pages/Landing"
import MLayout from '@/views/layouts/MLayout.vue'
import Error404 from  '@/views/pages/Error404.vue'
import Menus from './menus.js'

const routes = [
    {
        path: '/',
        component: Landing
    },
    {
        path: '/',
        component: MLayout,
        children: Menus
    },
    {
        path: '/404',
        component: Error404
    },
    {
        path: '*',
        component: Error404
    }
]

export default routes
