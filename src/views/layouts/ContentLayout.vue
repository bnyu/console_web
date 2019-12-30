<template>
    <div class="content-detail">
        <div class="d-title" v-if="title">
            <span class="title-text">{{$t(title)}}</span>
            <span class="title-slot"><slot name="title"></slot></span>
        </div>
        <div class="d-default">
            <slot name="default"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ContentLayout",
        props: {
            title: String
        }
    }
</script>

<style scoped lang="scss">
    .content-detail {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 22px 24px 2px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;

        .d-title {
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            padding-bottom: 25px;

            .title-text {
                font-size: larger;
            }

            .title-slot {
                padding: 0;
                margin-left: 90px;
            }
        }

        .d-default {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
        }
    }
</style>
