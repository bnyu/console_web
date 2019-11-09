import http from './axios.js'
import Err from '@/assets/error_code'
import v from '@/main'

http.defaults.baseURL = process.env.VUE_APP_API_URL
http.defaults.headers.common['Content-Type'] = 'application/json'

export default function (config) {
    return new Promise(function (resolve, reject) {
        http.request(config).then(resp => {
            if (resp.code === 0 && resp.msg === 'success') {
                resolve(resp.data)
            } else if (resp.code === Err.BaseErrorCode.LoginExpired) {
                v.$store.commit('user/logout')
                v.$router.push('/').then(() => {
                    v.$message({
                        message: this.$t('app.notice.loginExpired'),
                        type: 'warning',
                        duration: 1000,
                    })
                })
            } else {
                reject({code: resp.code, msg: resp.msg})
            }
        }).catch(err => {
            reject({error: err})
        })
    })
}
