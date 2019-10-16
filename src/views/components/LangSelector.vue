<template>
    <el-dropdown>
      <span class="el-dropdown-link">
          <slot></slot>
      </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item class="lang-item" v-on:command="lang='en-us'">English</el-dropdown-item>
            <el-dropdown-item class="lang-item" v-on:command="lang='cn-zh'">中文</el-dropdown-item>
            <el-dropdown-item class="lang-item" v-on:command="lang='jp-ja'">日本語</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
    import i18n from '@/i18n'

    export default {
        name: 'LangSelector',
        data() {
            return {
                lang: i18n.locale
            }
        },
        watch: {
            lang: function () {
                i18n.locale = this.lang
            }
        }
    }
</script>

<style lang="scss" scoped>
    .lang-item {
        &:hover {
            color: $positive !important;
        }
    }
</style>
