<template>
    <div v-if="menus">
        <el-menu class="app-menu-bar"
                 :default-active="enterPath"
                 router
        >
            <MenuItem v-for="item in menus" :key="item.path"
                      v-bind:path="path" v-bind:menu="item" v-bind:level="0"/>
        </el-menu>
    </div>
</template>

<script>
    import MenuItem from "@/views/components/MenuItem"

    export default {
        name: "AppMenu",
        components: {MenuItem},
        props: {
            path: String,
            menus: Array[Object]
        },
        computed: {
            enterPath() {
                return this.$route.path
            }
        }
    }
</script>

<style scoped lang="scss">
    .app-menu-bar {
        border-right: hidden;
        background-color: white;

        @include no-select;
    }
</style>
