<template>
    <div v-if="menu" class="app-menu">
        <el-submenu v-if="menu.children" :index="path + '/' + menu.path">
            <template slot="title">
                <span class="menu-title submenu-title" :style="styleHeight">
                        <span>
                            <i class="menu-icon material-icons" :style="stylePadding">{{menu.icon}}</i>
                            <span class="menu-name">{{$t(menu.name)}}</span>
                        </span>
                        <i class="menu-open material-icons">keyboard_arrow_down</i>
                </span>
            </template>
            <MenuItem v-for="item in menu.children" :key="item.path"
                      v-bind:path="path + '/' + menu.path" v-bind:menu="item" v-bind:level="level + 1"
            />
        </el-submenu>
        <el-menu-item v-else :index="path + '/' + menu.path">
            <template slot="title">
                <span class="menu-title" :style="styleHeight">
                        <i class="menu-icon material-icons" :style="stylePadding">{{menu.icon}}</i>
                        <span class="menu-name">{{$t(menu.name)}}</span>
                </span>
            </template>
        </el-menu-item>
    </div>
</template>

<script>
    export default {
        name: "MenuItem",
        props: {
            path: String,
            menu: Object,
            level: Number
        },
        data() {
            return {
                styleHeight: {
                    height: (this.level > 2 ? 24 : 60 - 16 * this.level) + 'px',
                },
                stylePadding: {
                    paddingLeft: (this.level > 4 ? 130 : 10 + 26 * this.level) + 'px',
                }
            }
        }
    }
</script>

<style lang="scss">
    .app-menu {
        .el-submenu__title, .el-menu-item {
            padding: 0 !important;
            background-color: white !important;
            height: 100% !important;
            line-height: 100% !important;

            &:hover, &:focus {
                background-color: white !important;
            }
        }

        .el-submenu, .el-menu-item {
            padding: 0 !important;
        }

        .el-submenu__icon-arrow {
            display: none !important;
        }
    }
</style>

<style scoped lang="scss">
    .app-menu {
        $hover-color: #eeeeee;
        $active-color: #f7f7f7;

        .material-icons {
            color: $primary;
        }

        .menu-icon, .menu-name {
            padding-left: 6px;
            font-weight: normal;
        }

        .is-active {
            > div > .menu-title, > .menu-title {
                background-color: $active-color;

                .menu-icon, .menu-name {
                    color: $positive;
                }

                .menu-name {
                    font-weight: bold;
                }
            }
        }

        .is-opened {
            > div > .menu-title, > .menu-title {
                background-color: white;

                .menu-icon, .menu-name {
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
            height: 100%;

            &:hover, &:focus {
                background-color: $hover-color !important;
            }
        }

        .submenu-title {
            justify-content: space-between;

            .menu-open {
                color: $primary;
                padding-right: 6px;
                transition: transform .3s;
            }
        }
    }
</style>
