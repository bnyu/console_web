import http from './axios.js'

http.defaults.baseURL = process.env.VUE_APP_API_URL
http.defaults.headers.post['Content-Type'] = 'application/json'

export default ({
})
