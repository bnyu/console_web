<template>
    <div>
        <el-dropdown @command="changeLang">
      <span class="el-dropdown-link">
          <slot></slot>
      </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item class="lang-item" command="en-us">English</el-dropdown-item>
                <el-dropdown-item class="lang-item" command="cn-zh">中文</el-dropdown-item>
                <el-dropdown-item class="lang-item" command="jp-ja">日本語</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
    import i18n from '@/i18n'

    export default {
        name: 'LangSelector',
        methods: {
            changeLang(lang) {
                i18n.locale = lang
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
