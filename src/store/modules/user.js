import http from '@/api/axios'
import Cookies from 'js-cookie'
import menus from '@/assets/menu'
import getMenusAndRoutes from '@/router/menus'

const state = {
    uid: 0,
    username: '',
    token: '',
    permitList: [],
    menuList: []
}

const getters = {
    uid: state => {
        return state.uid
    },
    username: state => {
        if (state.uid !== 0) {
            return state.username
        } else {
            return Cookies.get('u-name')
        }
    },
    menuList: state => {
        return state.menuList
    },
    token: state => {
        if (state.uid !== 0) {
            return state.token
        } else {
            return Cookies.get('x-token')
        }
    }
}

const mutations = {
    logout: (state) => {
        state.uid = 0
        state.username = ''
        state.token = ''
        state.permitList = []
        state.menuList = []
        state.menuList = getMenusAndRoutes([], [])
        http.defaults.headers.common['X-Token'] = ''
        Cookies.remove('u-name')
        Cookies.remove('x-token')
    },
    login: (state, {uid, username, token, permitList}) => {
        state.uid = uid
        state.username = username
        state.token = token
        state.permitList = permitList
        state.menuList = getMenusAndRoutes(menus, permitList)
        http.defaults.headers.common['X-Token'] = token
        Cookies.set('u-name', username, {expires: 1})
        Cookies.set('x-token', token, {expires: 1})
    },
}

const actions = {}

export default {
    namespaced: true,
    getters,
    mutations,
    actions,
    state
}
