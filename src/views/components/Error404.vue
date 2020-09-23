<template>
  <div v-if="path !== temp" class="cc">
    <div class="cc-t">{{ $t("app.err404") }}</div>
    <div>
      <router-link to="/">{{ $t("app.act.back") }}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Error404",
  data() {
    return {
      temp: "/temp",
    };
  },
  computed: {
    path() {
      return this.$route.path;
    },
  },
};
</script>

<style scoped lang="scss">
.cc {
  position: fixed;
  flex-direction: column;
  background-color: transparent;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  &-t {
    padding-bottom: 10px;
  }
}
</style>
