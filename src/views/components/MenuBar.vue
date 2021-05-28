<template>
  <div v-if="menu && !menu.hidden" class="app-menu">
    <el-divider v-if="level === 0 && index !== 0"></el-divider>
    <el-submenu v-if="menu.children" :index="menu.name">
      <template slot="title">
        <span class="menu-title submenu-title" :style="styleHeight">
          <span>
            <i class="menu-icon material-icons" :style="stylePadding">{{
              menu.icon
            }}</i>
            <span class="menu-name">{{ $t(menu.name) }}</span>
          </span>
          <span class="menu-open"
            ><i class="material-icons">keyboard_arrow_down</i></span
          >
        </span>
      </template>
      <MenuBar
        v-for="(item, index) in menu.children"
        :key="item.name"
        v-bind:menu="item"
        v-bind:level="level + 1"
        v-bind:index="index"
      />
    </el-submenu>
    <el-menu-item v-else :index="menu.name">
      <template slot="title">
        <span class="menu-title" :style="styleHeight">
          <i class="menu-icon material-icons" :style="stylePadding">{{
            menu.icon
          }}</i>
          <span class="menu-name">{{ $t(menu.name) }}</span>
        </span>
      </template>
    </el-menu-item>
  </div>
</template>

<script>
export default {
  name: "MenuBar",
  props: {
    index: Number,
    menu: Object,
    level: Number,
  },
  data() {
    return {
      styleHeight: {
        height: (this.level > 2 ? 24 : 60 - 16 * this.level) + "px",
      },
      stylePadding: {
        paddingLeft: (this.level > 4 ? 130 : 10 + 26 * this.level) + "px",
      },
    };
  },
};
</script>

<style lang="scss">
.app-menu {
  .el-submenu__title,
  .el-menu-item {
    padding: 0 !important;
    height: 100% !important;
    line-height: 100% !important;
  }

  .el-submenu,
  .el-menu-item {
    padding: 0 !important;
  }

  .el-submenu__icon-arrow {
    display: none !important;
  }

  .el-divider--horizontal {
    width: 220px;
    margin: 0 10px;
  }
}
</style>

<style scoped lang="scss">
.app-menu {
  .material-icons {
    color: $primary;
  }

  .menu-icon,
  .menu-name {
    padding-left: 6px;
    font-weight: normal;
  }

  .is-active {
    > div > .menu-title,
    > .menu-title {
      .menu-icon,
      .menu-name {
        color: $positive;
      }

      .menu-name {
        font-weight: bold;
      }
    }
  }

  .is-opened {
    > div > .menu-title,
    > .menu-title {
      .menu-icon,
      .menu-name {
        color: $primary;
      }

      .menu-name {
        font-weight: normal;
      }

      .menu-open {
        transform: rotateX(180deg);
      }
    }
  }

  .menu-title {
    display: flex;
    justify-content: flex-start;
    align-content: center;
    align-items: center;
    border-radius: 12px;
    width: 240px;
    padding-left: 2px;
    height: 100%;
  }

  .submenu-title {
    justify-content: space-between;

    .menu-open {
      color: $primary;
      padding-right: 10px;
      transition: transform 0.3s;
    }
  }
}
</style>
