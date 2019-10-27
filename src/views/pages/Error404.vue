<template>
    <div class="err404">
        <div>404</div>
        <div>
            <router-link to="/">back</router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Error404",
        created() {
            if (this.$route.path !== '/404') {
                this.$router.replace('/404')
            }
        }
    }
</script>

<style scoped lang="scss">
    .err404 {
        padding-top: 20px;
        text-align: center;
    }
</style>
