import Menus from '@/assets/menu'

const state = {
    token: '',
    logged: false,
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
        let pathPermits = {}
        const f = (path, menu) => {
            let fPath = path + '/' + menu.path
            if (menu.children) {
                const children = menu.children.map(m => f(fPath, m)).filter(m => m)
                if (children.length > 0) {
                    return {...menu, children, rPath: children[0].rPath}
                }
            } else if (!menu.permit || ps[menu.permit]) {
                pathPermits[fPath] = true
                return {...menu, rPath: fPath}
            }
            return null
        }

        let myMenus = {}
        let navList = []
        for (let k of Object.keys(Menus)) {
            const data = Menus[k]
            let ms = data.list
            if (ms && ms.length > 0) {
                ms = ms.map(m => f('', m)).filter(m => m)
                if (ms.length > 0) {
                    myMenus[k] = {list: ms, rPath: ms[0].rPath}
                    if (!data.hiddenNav) {
                        navList.push(k)
                    }
                }
            }
        }

        state.permits = {permits: ps, pathPermits: pathPermits}
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
