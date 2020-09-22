<template>
  <content-layout :title="'app.menu.userEdit'">
    <SetUserRole :id="id"></SetUserRole>
  </content-layout>
</template>

<script>
import SetUserRole from "./components/SetUserRole";

export default {
  name: "EditUser",
  components: { SetUserRole },
  data() {
    return {
      id: parseInt(this.$route.params.id, 10),
    };
  },
};
</script>

<style scoped></style>
