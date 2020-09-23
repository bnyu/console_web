<template>
  <div class="app">
    <el-container>
      <el-header class="app-header">
        <div class="app-header-side">
          <el-button type="text" @click="menuOpen = !menuOpen">
            <i v-if="menuOpen" class="material-icons">menu_open</i>
            <i v-else class="material-icons">menu</i>
          </el-button>
          <span class="app-title">
            <span @click="onClickTitle" class="app-title-text">
              {{ $t("app.title") }}
            </span>
          </span>
          <span class="app-nav" v-show="!navHidden">
            <span
              v-for="item in menuList"
              :key="item.path"
              class="app-nav-item"
            >
              <span
                v-if="!item.hidden"
                :class="{ active: item.path === menuPath1 }"
              >
                <span @click="() => onClickNav(item.path)" class="app-nav-link">
                  {{ $t(item.name) }}
                </span>
              </span>
            </span>
          </span>
        </div>
        <div class="app-header-side header-right">
          <span>
            <LangSelector
              ><i class="material-icons translate-icon"
                >translate</i
              ></LangSelector
            >
          </span>
          <span>
            <UserOption
              ><span class="username">{{ username }}</span>
              <span class="material-icons username"
                >expand_more</span
              ></UserOption
            >
          </span>
        </div>
      </el-header>

      <el-main class="app-main">
        <transition name="slide">
          <div class="app-aside" v-show="menuOpen">
            <AppMenu class="app-menu-list" v-bind:menus="menus" />
          </div>
        </transition>
        <div :class="'app-content' + contentClass">
          <div class="content">
            <transition name="fade" mode="out-in">
              <slot></slot>
            </transition>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import AppMenu from "@/views/components/AppMenu";
import LangSelector from "@/views/components/LangSelector";
import UserOption from "@/views/components/UserOption";

export default {
  name: "AppLayout",
  components: { UserOption, LangSelector, AppMenu },
  props: {
    menuPath: String,
  },
  data() {
    const d = {
      username: this.$store.getters["user/username"],
      allMenus: {},
      menuList: [],
      navHidden: true,
      menuOpen: false,
      menuPath0: "",
      menuPath1: "",
      menus: [],
    };
    if (this.menuPath) {
      d.allMenus = this.$store.getters["user/menus"];
      d.menuList = this.$store.getters["user/menuList"];
      for (let i = 0; i < d.menuList.length; i++) {
        if (!d.menuList[i].hidden) {
          d.menuPath0 = d.menuList[i].path;
          break;
        }
      }
    }
    return d;
  },
  computed: {
    contentClass() {
      if (this.menuOpen) {
        return " right-slide";
      } else {
        return "";
      }
    },
  },
  methods: {
    onClickTitle() {
      if (this.$route.path !== "/") {
        this.$router.push("/").then();
      }
    },
    onClickNav(menuPath1) {
      if (this.menuPath1 !== menuPath1) {
        this.changeMenu(menuPath1);
      }
    },
    changeMenu(menuPath1) {
      const menu = this.allMenus[menuPath1];
      if (menu && menu.children) {
        this.menuPath1 = menuPath1;
        this.menus = menu.children;
        this.navHidden = !!menu.hidden;
        this.menuOpen = true;
        return true;
      }
      return false;
    },
    setMenu() {
      if (
        this.menuPath &&
        this.menuPath !== this.menuPath1 &&
        !this.changeMenu(this.menuPath)
      ) {
        if (this.navHidden && this.menuPath0 !== "") {
          this.changeMenu(this.menuPath0);
        }
      }
    },
  },
  created() {
    this.setMenu();
  },
  watch: {
    menuPath: function () {
      this.setMenu();
    },
  },
};
</script>

<style scoped lang="scss">
$aside-width: 240px;
$header-height: 45px;

.app {
  &-header {
    @include no-select;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-content: center;
    align-items: center;
    background-color: $primary;
    height: $header-height !important;
    box-shadow: 0 3px 4px #9c9ca5;
    z-index: 100;

    .app-nav {
      &-item {
        margin-right: 25px;
      }

      &-link {
        color: rgba(255, 255, 255, 0.88);
        cursor: pointer;

        &:hover {
          color: white;
        }
      }

      .active {
        .app-nav-link {
          color: $positive;
        }
      }
    }

    .app-header-side > * {
      display: inline-block;
      vertical-align: middle;
    }

    .header-right > * {
      padding-left: 8px;
    }

    .app-title {
      min-width: 170px;
      max-width: 230px;
      margin-left: 24px;
      margin-right: 24px;

      &-text {
        color: white;
        font-weight: bolder;
        cursor: pointer;
      }
    }

    .material-icons {
      color: white;

      &:hover {
        color: white;
      }
    }

    .username {
      color: white;
      font-size: 18px;
    }

    .translate-icon {
      color: white;
      font-size: 18px;
      margin-top: 5px;
      margin-right: 8px;
    }
  }

  &-main {
    padding: 0;
    display: flex;
    flex-direction: row;
  }

  @mixin scrollbar {
    position: fixed;
    top: $header-height;
    bottom: 0;
    height: calc(100% - #{$header-height});
    overflow-x: hidden;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 12px;
    }

    &::-webkit-scrollbar-track {
      border-radius: 4px;
      background-color: #eaeaea;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 4px;
      background: #a0a0a0;
    }
    scrollbar-color: #a0a0a0 #eaeaea;
  }

  &-aside {
    @include scrollbar;

    &::-webkit-scrollbar {
      width: 6px;
    }

    z-index: 99;
    width: $aside-width;
    background-color: #eeeeee;
    box-shadow: 1px 2px 3px #aaaab4;

    .app-menu-list {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      padding-bottom: 24px;
    }
  }

  &-content {
    @include scrollbar;
    z-index: 98;
    background-color: white;
    width: 100%;
    transition: all 0.3s ease;

    .content {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
    }
  }
}

.fade-enter-active {
  transition: all 0.2s ease;
}

.fade-leave-active {
  transition: all 0.1s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter,
.slide-leave-to {
  margin-left: -$aside-width;
}

.right-slide {
  padding-left: $aside-width;
  width: calc(100% - #{$aside-width});
}
</style>
