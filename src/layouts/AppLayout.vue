<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <q-header elevated class="M__header text-grey-8" height-hint="64">
      <q-toolbar class="M__toolbar">
        <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu" icon="menu" class="M__header-item q-mr-sm"></q-btn>

        <q-toolbar-title v-if="$q.screen.gt.xs" shrink class="row items-center no-wrap text-white">
          {{$t('app.title')}}
        </q-toolbar-title>
        <div v-if="$q.screen.gt.sm" class="M__toolbar-link q-ml-xs q-gutter-md text-body2 text-weight-bold row items-center no-wrap">
          <a v-for="item in menuList" v-show="$t('app.menu.'+item).length>0" :key="item" @click="()=>onClickMenu(item)" href="javascript:void(0)">
            {{$t('app.menu.'+item)}}
          </a>
        </div>
        <q-space></q-space>

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn round dense flat class="M__header-item" icon="translate">
            <LangSelector/>
          </q-btn>
          <q-btn round dense flat class="M__header-item" icon="person">
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered content-class="bg-white" :width="280">
      <q-scroll-area class="fit"
                     :thumb-style="{ right: '4px', borderRadius: '4px', width: '6px', backgroundColor:'grey', opacity: 0.5 }">
        <AppMenu v-bind:menu="menu"/>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import AppMenu from '../components/AppMenu'
import LangSelector from '../components/LangSelector'

export default {
  name: 'AppLayout',
  components: { AppMenu, LangSelector },
  props: {
    kind: String
  },
  data () {
    return {
      leftDrawerOpen: true,
      menuList: this.$store.getters['user/menuList'],
      menus: this.$store.getters['user/menus']
    }
  },
  computed: {
    menu: function () {
      return this.menus[this.kind]
    }
  },
  methods: {
    onClickMenu (menuName) {
      this.$router.push('/' + menuName + '/dashboard')
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss">
  .M {
    &__header {
      background-color: $primary;
    }

    &__toolbar {
      height: 60px;
    }

    &__header-item {
      color: white;
    }
    &__toolbar-link {
      padding-left: 20px;
      a {
        color: white;
        text-decoration: none;
        padding-left: 20px;

        &:hover {
          opacity: 0.7;
        }
      }
    }
  }
</style>
