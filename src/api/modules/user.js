import request from '../api'

export default  ({
    login(username, password) {
        return request({
            method: 'POST',
            url: '/login',
            data: {username, password}
        })
    },

    logout() {
        return request({
            method: 'POST',
            url: '/logout',
        })
    },

    changePassword(password, new_password) {
        return request({
            method: 'POST',
            url: '/change_password',
            data: {password, new_password}
        })
    }
})