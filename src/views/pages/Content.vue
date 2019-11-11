<template>
    <AppLayout>
        <router-view/>
    </AppLayout>
</template>

<script>
    import AppLayout from "@/views/layouts/AppLayout"
    export default {
        name: "Content",
        components: {AppLayout}
    }
</script>

<style scoped>

</style>
