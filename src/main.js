import Vue from 'vue'

import i18n from './i18n'
import App from './App'
import store from './store'
import router from './router'
import ElementUI from 'element-ui'
import 'normalize.css/normalize.css' // a modern alternative to css resets
import './css/element-variables.scss' // element-ui css theme
import './css/iconfont.css' // material icon

Vue.use(ElementUI, i18n)

Vue.config.productionTip = false

const v = new Vue({
    el: '#app',
    router,
    store,
    i18n,
    render: h => h(App)
})

export default v
