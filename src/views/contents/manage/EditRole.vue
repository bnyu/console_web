<template>
  <ContentLayout :title="'app.menu.roleEdit'">
    <SetRolePermit :id="id"></SetRolePermit>
  </ContentLayout>
</template>

<script>
import ContentLayout from "@/views/layouts/ContentLayout";
import SetRolePermit from "./components/SetRolePermit";
export default {
  name: "EditRole",
  components: { SetRolePermit, ContentLayout },
  data() {
    return {
      id: parseInt(this.$route.params.id, 10),
    };
  },
};
</script>

<style scoped></style>
