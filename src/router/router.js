import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default function newRouter(routes) {
    return new VueRouter({
        scrollBehavior: () => ({x: 0, y: 0}),
        routes: routes,
        mode: 'history',
        strict: process.env.NODE_ENV !== 'production'
    })
}
