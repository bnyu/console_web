<template>
    <div v-if="uid!==0">
        <Error404/>
    </div>
    <div v-else>
        <GetInfo/>
    </div>
</template>

<script>
    import Error404 from "@/views/components/Error404"
    import GetInfo from "@/views/components/user/GetInfo"

    export default {
        name: "Fallback",
        components: {GetInfo, Error404},
        data() {
            return {
                enterPath: this.$route.fullPath,
                uid: this.$store.getters['user/uid']
            }
        }
    }
</script>

<style scoped>

</style>
