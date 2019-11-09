import Vue from 'vue'
import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    timeout: 6000,
})

Vue.prototype.$axios = axiosInstance

// axiosInstance.interceptors.request.use(
//   config => {
//     return config
//   },
//   error => {
//     return Promise.reject({error})
//   }
// )

axiosInstance.interceptors.response.use(
    response => {
        if (response.status === 200 && response.data) {
            return response.data
        } else {
            return Promise.reject({error: new Error(response.statusText || 'error request')})
        }
    },
    error => {
        return Promise.reject({error})
    }
)

export default axiosInstance
