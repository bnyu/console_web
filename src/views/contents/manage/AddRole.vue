<template>
  <content-layout :title="'app.menu.roleAdd'">
    <AddNewRole></AddNewRole>
  </content-layout>
</template>

<script>
import AddNewRole from "./components/AddNewRole";

export default {
  name: "AddRole",
  components: { AddNewRole },
};
</script>

<style scoped></style>
