import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user
  },
  strict: process.env.NODE_ENV !== 'production'
})
