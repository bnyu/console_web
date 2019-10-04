import Menus from 'src/assets/menu'

const state = {
  token: '',
  permits: {},
  menus: {}
}

const getters = {
  menuList: state => {
    return Object.keys(state.menus)
  },
  menus: state => {
    return state.menus
  },
  menu: state => (kind) => {
    return state.menus[kind]
  }
}

const mutations = {
  setToken: (state, token) => {
    state.token = token
  },
  setPermits: (state, permits) => {
    let ps = {}
    for (let i = 0; i < permits.length; i++) {
      ps[permits[i].toLowerCase()] = true
    }
    state.permits = ps

    // set menus
    const f = (menu) => {
      if (menu.children) {
        const children = menu.children.map(m => f(m)).filter(m => m)
        if (children.length > 0) {
          return { ...menu, children }
        }
      } else if (!menu.permit || state.permits[menu.permit]) {
        return { ...menu }
      }
      return null
    }

    let myMenus = {}
    for (let k of Object.keys(Menus)) {
      let ms = Menus[k]
      if (ms && ms.length > 0) {
        ms = ms.map(m => f(m)).filter(m => m)
        if (ms.length > 0) {
          myMenus[k] = ms
        }
      }
    }
    state.menus = myMenus
  }
}

const actions = {

}

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
  state
}
