<template>
    <div>
        <el-container>
            <el-header class="app-header" height="60px">
                <div class="app-header-left">
                    <el-button type="text" @click="menuOpen=!menuOpen">
                        <i v-if="menuOpen" class="material-icons">menu_open</i>
                        <i v-else class="material-icons">menu</i>
                    </el-button>
                    <span class="app-title">{{$t('app.title')}}</span>
                    <span class="app-nav">
                        <el-button v-for="item in menuList" :key="item" v-show="$t('app.menu.'+item).length>0"
                                   @click="()=>onClickMenu(item)" class="app-nav-link" type="text">
                            {{$t('app.menu.'+item)}}
                        </el-button>
                    </span>
                </div>
                <div>
                    <span>
                        <LangSelector><i class="material-icons">translate</i></LangSelector>
                    </span>
                    &nbsp;
                    <span>
                        <UserOption><i class="material-icons">person</i></UserOption>
                    </span>
                </div>

            </el-header>
            <el-main class="app-main">
                <transition name="slide">
                    <div class="app-aside" v-show="menuOpen">
                        <el-scrollbar style="height: 100%">
                            <AppMenu class="app-menu-list" v-bind:menus="menu" v-bind:path="''"/>
                        </el-scrollbar>
                    </div>
                </transition>
                <div :class="'app-content' + contentClass">
                    <el-scrollbar style="height: 100%">
                        <div class="content">
                            <router-view/>
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
    import UserOption from "@/views/components/UserOption"

    export default {
        name: "AppLayout",
        components: {UserOption, LangSelector, AppMenu},
        props: {
            kind: String
        },
        data() {
            return {
                menuOpen: true,
                menuList: this.$store.getters['user/menuList'],
                menus: this.$store.getters['user/menus']
            }
        },
        computed: {
            menu() {
                return this.menus[this.kind]
            },
            contentClass() {
                if (this.menuOpen) {
                    return ' right-slide'
                } else {
                    return ''
                }
            }
        },
        methods: {
            onClickMenu(kind) {
                this.$router.push('/' + kind + '/dashboard')
                this.menuOpen = true
            }
        },
        mounted() {
        }
    }
</script>

<style scoped lang="scss">
    .app {
        &-header {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-content: center;
            align-items: center;
            background-color: $primary;
            color: $space;
            height: 60px !important;
            box-shadow: 0 2px 4px #aaaab4;

            .app-nav {
                display: inline-flex;
                flex-direction: row;
                justify-content: space-around;

                &-link {
                    color: $space;
                    font-weight: bold;
                    padding-left: 16px;

                    &:hover {
                        color: white;
                    }
                }
            }

            .app-header-left * {
                display: inline-block;
                vertical-align: middle;
            }

            .app-title {
                color: white;
                font-weight: bold;
                max-width: 180px;
                padding-left: 20px;
                padding-right: 60px;
            }

            .material-icons {
                color: white;
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
</style>
