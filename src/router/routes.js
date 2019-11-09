import AppLayout from "@/views/layouts/AppLayout"
import Fallback from '@/views/pages/Fallback'
import Landing from "@/views/pages/Landing"
import Login from "@/views/pages/Login"

const base = {
    path: '/',
    component: Landing
}

const login = {
    path: '/login',
    component: Login
}

const content = {
    path: '/',
    component: AppLayout,
    children: [
        {
            path: 'temp',
            component: Fallback,
        }
    ] // avoid override
}

const last = {
    path: '*',
    component: Fallback
}

export {base, login, content, last}
