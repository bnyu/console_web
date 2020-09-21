<template>
  <Error404 v-if="uid !== 0 && path !== '/temp'" />
  <AppLayout v-else>
    <Restore v-bind:path="path" />
  </AppLayout>
</template>

<script>
import Error404 from "@/views/components/Error404";
import Restore from "@/views/components/Restore";
import AppLayout from "@/views/layouts/AppLayout";

export default {
  name: "Fallback",
  components: { AppLayout, Restore, Error404 },
  computed: {
    path() {
      return this.$route.fullPath;
    },
    uid() {
      return this.$store.getters["user/uid"];
    },
  },
};
</script>
