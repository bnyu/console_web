import Content from "@/views/pages/Content"
import Fallback from '@/views/pages/Fallback'
import Landing from "@/views/pages/Landing"
import Login from "@/views/pages/Login"
import Dashboard from "@/views/contents/Dashboard"

const base = {
    path: '/',
    component: Landing
}

const login = {
    path: '/login',
    component: Login
}

/* avoid override by content */
const temp = {
    path: '/temp',
    component: Fallback
}

const content = {
    path: '/',
    component: Content,
    redirect: 'dashboard',
    children: [
        {
            path: 'dashboard',
            component: Dashboard,
        }
    ]
}

const last = {
    path: '*',
    component: Fallback
}

export {base, login, temp, content, last}
