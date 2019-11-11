<template>
    <div v-if="menus">
        <el-menu class="app-menu-bar"
                 :default-active="path"
                 @select="handelRoute"
                 background-color="#eeeeee"
        >
            <MenuItem v-for="item in menus" :key="item.path"
                      v-bind:menu="item" v-bind:level="0"/>
        </el-menu>
    </div>
</template>

<script>
    import MenuItem from "@/views/components/MenuItem"

    export default {
        name: "AppMenu",
        components: {MenuItem},
        props: {
            menus: Array[Object]
        },
        computed: {
            path() {
                return this.$route.path
            }
        },
        methods: {
            handelRoute(index) {
                if (this.path !== index) {
                    this.$router.push(index).then()
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .app-menu-bar {
        border-right: hidden;
        background-color: #cccccc;

        @include no-select;
    }
</style>
