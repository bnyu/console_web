<template>
  <ContentLayout :title="'app.menu.roleAdd'">
    <AddNewRole></AddNewRole>
  </ContentLayout>
</template>

<script>
import ContentLayout from "@/views/layouts/ContentLayout";
import AddNewRole from "./components/AddNewRole";
export default {
  name: "AddRole",
  components: { AddNewRole, ContentLayout },
};
</script>

<style scoped></style>
