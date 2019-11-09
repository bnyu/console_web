<template>
    <div>
        <span>
            {{$t('app.act.loading')}}...
        </span>
    </div>
</template>

<script>
    import api from '@/api/modules/user'

    export default {
        name: "GetInfo",
        data() {
            return {
                uid: this.$store.getters['user/uid'],
                username: this.$store.getters['user/username'],
                token: this.$store.getters['user/token']
            }
        },
        methods: {
            toLoginPage() {
                if (this.$route.path !== '/login') {
                    this.$router.push('/login').then()
                }
            },
            backPage() {
                const temp = '/temp'
                const enterPath = this.$route.fullPath
                this.$router.replace(temp).then(()=>{
                    this.$router.push(enterPath).then()
                })
            },
            getInfo() {
                this.loading = true
                api.getInfo(this.token).then(data => {
                    const permitList = data.permits
                    const uid = data.uid
                    this.$store.commit('user/login', {uid, permitList, username: this.username, token: this.token})
                    this.backPage()
                }).catch(() => {
                    this.toLoginPage()
                })
            }
        },
        created() {
            if (this.uid === 0 && this.username && this.username.length > 0 && this.token && this.token.length > 0) {
                this.getInfo()
            } else {
                this.toLoginPage()
            }
        }
    }
</script>
