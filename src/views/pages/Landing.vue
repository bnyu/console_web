<template>
    <div>
        <div v-if="!logged">
            <Login></Login>
        </div>
        <div v-else>

        </div>
    </div>
</template>

<script>
    import Login from "@/views/user/Login"
    export default {
        name: "Landing",
        components: {Login},
        data() {
            return {
                logged: this.$store.getters['user/logged']
            }
        },
        methods: {

        }
    }
</script>

<style scoped>

</style>
