import http from './axios.js'
import Err from '@/assets/error_code'
import v from '@/main'

http.defaults.baseURL = process.env.VUE_APP_API_URL
http.defaults.headers.common['Content-Type'] = 'application/json'

export default function (config) {
    return new Promise(function (resolve, reject) {
        http.request(config).then(resp => {
            if (resp.code === 0 && resp.msg === 'success') {
                if (resolve) {
                    resolve(resp.data)
                }
            } else if (resp.code === Err.BaseErrorCode.LoginExpired) {
                v.$store.commit('user/logout')
                v.$router.push('/login').then(() => {
                    v.$message({
                        message: v.$t('app.notice.loginExpired'),
                        type: 'warning',
                        duration: 1000,
                    })
                })
            } else {
                if (reject) {
                    reject({code: resp.code, msg: resp.msg})
                } else {
                    v.$message({
                        message: v.$t('app.notice.someError'),
                        type: 'error',
                        duration: 1000,
                    })
                }
            }
        }).catch(err => {
            if (reject) {
                reject({error: err})
            } else {
                v.$message({
                    message: v.$t('app.notice.someError'),
                    type: 'error',
                    duration: 1000,
                })
            }
        })
    })
}
