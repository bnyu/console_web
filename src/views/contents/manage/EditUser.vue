<template>
    <ContentLayout :title="'app.menu.userEdit'">
        <SetUserRole :id="id"></SetUserRole>
    </ContentLayout>
</template>


<script>
    import ContentLayout from "@/views/layouts/ContentLayout"
    import SetUserRole from "./components/SetUserRole"

    export default {
        name: "EditUser",
        components: {SetUserRole, ContentLayout},
        data() {
            return {
                id: parseInt(this.$route.params.id, 10),
            }
        }
    }
</script>

<style scoped>

</style>
