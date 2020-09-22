<template>
  <content-layout :title="'app.menu.roleEdit'">
    <SetRolePermit :id="id"></SetRolePermit>
  </content-layout>
</template>

<script>
import SetRolePermit from "./components/SetRolePermit";
export default {
  name: "EditRole",
  components: { SetRolePermit },
  data() {
    return {
      id: parseInt(this.$route.params.id, 10),
    };
  },
};
</script>

<style scoped></style>
