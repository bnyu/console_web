<template>
  <div v-if="menus">
    <el-menu
      class="app-menu-bar"
      :default-active="name"
      @select="handelRoute"
      background-color="#eeeeee"
    >
      <MenuBar
        v-for="(item, index) in menus"
        :key="item.name"
        v-bind:menu="item"
        v-bind:level="0"
        v-bind:index="index"
      />
    </el-menu>
  </div>
</template>

<script>
import MenuBar from "@/views/components/MenuBar";

export default {
  name: "AppMenu",
  components: { MenuBar },
  props: {
    menus: Array[Object],
  },
  computed: {
    name() {
      return this.$route.name;
    },
  },
  methods: {
    handelRoute(name) {
      if (this.name !== name) {
        this.$router.push({ name: name }).then();
      }
    },
  },
};
</script>

<style scoped lang="scss">
.app-menu-bar {
  border-right: hidden;
  background-color: #cccccc;

  @include no-select;
}
</style>
