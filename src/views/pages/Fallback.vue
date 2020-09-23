<template>
  <Error404 />
</template>

<script>
import Error404 from "@/views/components/Error404";

export default {
  name: "Fallback",
  components: { Error404 },
  computed: {
    path() {
      return this.$route.path;
    },
  },
};
</script>
