<template>
  <q-menu
    auto-close
    :offset="[0, 8]" transition-show="jump-down" transition-hide="jump-up">
    <q-list style="min-width: 100px">
      <q-item clickable class="lang-item" @click="lang = 'en-us'">
        <q-item-section class="lang-name">English</q-item-section>
      </q-item>
      <q-item clickable class="lang-item" @click="lang = 'cn-zh'">
        <q-item-section class="lang-name">中文</q-item-section>
      </q-item>
      <q-item clickable class="lang-item" @click="lang = 'jp-ja'">
        <q-item-section class="lang-name">日本語</q-item-section>
      </q-item>
    </q-list>
  </q-menu>
</template>

<script>
import { i18n } from 'src/boot/i18n'

export default {
  name: 'LangSelector',
  data () {
    return {
      lang: this.$q.lang.getLocale()
    }
  },
  watch: {
    lang: function () {
      i18n.locale = this.lang
    }
  },
  mounted () {
    i18n.locale = this.lang
  }
}
</script>

<style lang="scss" scoped>
  .lang-item {
    &:hover {
      .lang-name {
        color: $positive;
      }
    }
  }
</style>
