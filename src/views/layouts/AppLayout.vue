<template>
    <div>
        <el-container>
            <el-header class="app-header" height="60px">
                <div class="app-header-side">
                    <el-button v-show="menus" type="text" @click="menuOpen=!menuOpen">
                        <i v-if="menuOpen" class="material-icons">menu_open</i>
                        <i v-else class="material-icons">menu</i>
                    </el-button>
                    <span class="app-title">
                        <span @click="onClickTitle" class="app-title-text">
                            {{$t('app.title')}}
                        </span>
                    </span>
                    <span class="app-nav">
                        <span v-for="(item, index) in menuList" :key="index">
                            <span v-if="!item.hidden" :class="{ active: index === menuIndex }">
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <span @click="()=>onClickMenu(index)" class="app-nav-link">
                                    {{$t(item.name)}}
                                </span>
                            </span>
                        </span>
                    </span>
                </div>
                <div class="app-header-side header-right">
                    <span>
                        <LangSelector><i class="material-icons">translate</i></LangSelector>
                    </span>
                    <span>
                        <UserOption><span class="username">{{username}}</span></UserOption>
                    </span>
                </div>
            </el-header>

            <el-main class="app-main">
                <transition name="slide">
                    <div class="app-aside" v-show="menuOpen">
                        <el-scrollbar style="height: 100%">
                            <AppMenu class="app-menu-list" v-bind:menus="menus"/>
                        </el-scrollbar>
                    </div>
                </transition>
                <div :class="'app-content' + contentClass">
                    <el-scrollbar style="height: 100%">
                        <div class="content">
                            <transition name="fade" mode="out-in">
                                <router-view/>
                            </transition>
                        </div>
                    </el-scrollbar>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import AppMenu from "@/views/components/AppMenu"
    import LangSelector from "@/views/components/LangSelector"
    import UserOption from "@/views/components/user/UserOption"

    export default {
        name: "AppLayout",
        components: {UserOption, LangSelector, AppMenu},
        data() {
            return {
                menuOpen: false,
                menuIndex: -1,
                menus: [],
                menuList: this.$store.getters['user/menuList'],
                username: this.$store.getters['user/username'],
            }
        },
        computed: {
            contentClass() {
                if (this.menuOpen) {
                    return ' right-slide'
                } else {
                    return ''
                }
            }
        },
        methods: {
            onClickTitle() {
                const dashboard = '/dashboard'
                if (this.$route.path !== dashboard) {
                    this.$router.push(dashboard).then()
                }
            },
            onClickMenu(index) {
                if (this.menuList.length > index) {
                    if (this.menuIndex !== index) {
                        const menu = this.menuList[index]
                        if (menu && menu.children) {
                            this.menuIndex = index
                            this.menus = menu.children
                            this.menuOpen = true
                        }
                    } else {
                        this.menuOpen = !this.menuOpen
                    }
                }
            },
        },
        created() {
            let index = 1
            let path = '/'
            const list = this.$route.path.split('/', 2)
            if (list && list.length > 1) {
                path += list[1]
            }
            for (let i = 0; i < this.menuList.length; i++) {
                if (this.menuList[i].path === path) {
                    if (this.menuList[i].children) {
                        index = i
                    }
                    break
                }
            }

            this.onClickMenu(index)
        }
    }
</script>

<style scoped lang="scss">
    .app {
        min-width: 400px;

        &-header {
            @include no-select;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-content: center;
            align-items: center;
            background-color: $primary;
            height: 60px !important;
            box-shadow: 0 2px 4px #aaaab4;

            .app-nav {
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
                max-width: 180px;
                padding-left: 20px;
                padding-right: 60px;

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
                font-size: 16px;
            }
        }

        &-main {
            padding: 4px 0 0;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
        }

        @mixin scrollbar {
            position: absolute;
            top: 64px;
            bottom: 0;
            height: calc(100% - 64px);
        }

        &-aside {
            @include scrollbar;
            z-index: 100;
            background-color: white;
            border-right: 1px solid rgba(0, 0, 0, 0.2);
            width: 240px;

            .app-menu-list {
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
            }
        }

        &-content {
            @include scrollbar;
            z-index: 99;
            background-color: $space;
            width: 100%;
            transition: all .3s ease;

            .content {
                display: flex;
                flex-direction: row;
                justify-content: center;
            }
        }
    }

    .fade-enter-active {
        transition: all .3s ease;
    }

    .fade-leave-active {
        transition: all .1s ease;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }

    .slide-enter-active {
        transition: all .3s ease;
    }

    .slide-leave-active {
        transition: all .3s ease;
    }

    .slide-enter, .slide-leave-to {
        margin-left: -240px;
    }

    .right-slide {
        padding-left: 240px;
        width: calc(100% - 240px);
        transition: all .3s ease;
    }
</style>

<style lang="scss">
    .el-scrollbar__wrap {
        overflow-x: hidden !important;
    }

    .el-tooltip__popper {
        background: $primary !important;

        .popper__arrow::after {
            color: $primary !important;
            border-bottom-color: $primary !important;
        }
    }
</style>
