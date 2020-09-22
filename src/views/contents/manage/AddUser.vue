<template>
  <content-layout :title="'app.menu.userAdd'">
    <AddNewUser></AddNewUser>
  </content-layout>
</template>

<script>
import AddNewUser from "./components/AddNewUser";
export default {
  name: "AddUser",
  components: { AddNewUser },
};
</script>

<style scoped></style>
