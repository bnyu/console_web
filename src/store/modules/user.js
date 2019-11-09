import Menus from '@/router/menus.js'
import http from '@/api/axios'

const state = {
    username: '',
    uid: 0,
    secure: false,
    token: '',
    pathPermits: {},
    permits: {},
    navList: [],
    menus: {}
}

const getters = {
    menuList: state => {
        return state.navList
    },
    menus: state => {
        return state.menus
    },
    pathPermits: state => {
        return state.pathPermits
    },
    permits: state => {
        return state.permits
    },
    logged: state => {
        return state.uid !== 0
    },
    uid: state => {
        return state.uid
    },
    username: state => {
        return state.username
    },
    secure: state => {
        return state.secure
    }
}

const mutations = {
    logout: (state) => {
        state.uid = 0
        state.username = ''
        state.token = ''
        state.secure = false
        state.pathPermits = {}
        state.permits = {}
        state.navList = []
        state.menus = {}
        http.defaults.headers.common['X-Token'] = ''
    },
    login: (state, {uid, username, token, secure}) => {
        state.uid = uid
        state.username = username
        state.token = token
        state.secure = secure
        http.defaults.headers.common['X-Token'] = token
    },
    setSecure: (state, secure) => {
        state.secure = secure
    },
    setPermits: (state, permits) => {
        let ps = {}
        for (let i = 0; i < permits.length; i++) {
            ps[permits[i].toLowerCase()] = true
        }
        let pps = {}

        // set menus add path permits
        const f = (path, menu) => {
            let fPath = path + '/' + menu.path
            if (menu.children) {
                const children = menu.children.map(m => f(fPath, m)).filter(m => m)
                if (children.length > 0) {
                    pps[fPath] = true
                    return {name: menu.name, icon: menu.icon, path: fPath, path0: children[0].path0, children}
                }
            } else if (!menu.permit || ps[menu.permit]) {
                pps[fPath] = true
                return {name: menu.name, icon: menu.icon, path: fPath, path0: fPath}
            }
            return null
        }

        let allMenus = Menus.map(m => {
            let m1 = f('', m)
            if (m1) {
                if (m.onDashboard) {
                    m1.onDashboard = true
                }
                if (m.props && m.props.kind) {
                    m1.kind = m.props.kind
                }
                if (m1.children && m1.children.length > 0) {
                    m1.path0 = m1.children[0].path0
                }
            }
            return m1
        }).filter(m => m)

        let dashboardMenus = []
        let myMenus = {}
        let navList = []
        for (let i = 0; i < allMenus.length; i++) {
            let ms = allMenus[i]
            let kind = ms.kind
            if (kind) {
                myMenus[kind] = ms.children
                if (ms.name) {
                    navList.push({kind: kind, name: ms.name, path0: ms.path0})
                }
            }
            if (ms.onDashboard) {
                dashboardMenus.push(...ms.children)
            }
        }
        myMenus.dashboard = dashboardMenus

        state.permits = ps
        state.pathPermits = pps
        state.menus = myMenus
        state.navList = navList
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
