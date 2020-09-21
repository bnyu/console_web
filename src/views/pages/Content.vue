<template>
  <AppLayout v-bind:menu-path="menuPath">
    <router-view />
  </AppLayout>
</template>

<script>
import AppLayout from "@/views/layouts/AppLayout";

export default {
  name: "Content",
  components: { AppLayout },
  computed: {
    menuPath() {
      let p = "/";
      const list = this.$route.path.split("/", 2);
      if (list && list.length > 1) {
        p += list[1];
      }
      return p;
    },
  },
};
</script>

<style scoped></style>
