<template>
  <ContentLayout :title="'app.menu.userAdd'">
    <AddNewUser></AddNewUser>
  </ContentLayout>
</template>

<script>
import ContentLayout from "@/views/layouts/ContentLayout";
import AddNewUser from "./components/AddNewUser";
export default {
  name: "AddUser",
  components: { AddNewUser, ContentLayout },
};
</script>

<style scoped></style>
