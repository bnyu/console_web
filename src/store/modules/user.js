import {addRoutes, route404} from "@/router/routes"
import Menus from '@/assets/menu'

const state = {
    token: '',
    logged: false,
    permits: {},
    navList: [],
    menus: {},
    routes: []
}

const getters = {
    routes: state => {
        return state.routes
    },
    menuList: state => {
        return state.navList
    },
    menus: state => {
        return state.menus
    },
    permits: state => {
        return state.permits
    },
    logged: state => {
        return state.logged
    }
}

const mutations = {
    setToken: (state, token) => {
        state.token = token
        state.logged = true
    },
    setPermits: (state, permits) => {
        let ps = {}
        for (let i = 0; i < permits.length; i++) {
            ps[permits[i].toLowerCase()] = true
        }

        // set menus
        const f = (path, menu) => {
            let fPath = path + '/' + menu.path
            if (menu.children) {
                const children = menu.children.map(m => f(fPath, m)).filter(m => m)
                if (children.length > 0) {
                    return {...menu, fPath, redirect: children[0].fPath, children}
                }
            } else if (!menu.permit || ps[menu.permit]) {
                return {...menu, fPath}
            }
            return null
        }

        let routers = Menus.map(m => f('', m)).filter(m => m)

        let myMenus = {}
        let navList = []
        for (let i = 0; i < routers.length; i++) {
            let ms = routers[i]
            let kind = ms.path
            myMenus[kind] = ms.children
            if (ms.name) {
                navList.push({kind, name: ms.name})
            }
        }

        state.permits = ps
        state.menus = myMenus
        state.navList = navList
        routers.push(route404)
        state.routes = [{...addRoutes, children: routers}]
    }
}

const actions = {}

export default {
    namespaced: true,
    getters,
    mutations,
    actions,
    state
}
