<template>
    <div class="err404">
        <div>{{$t('app.err404')}}</div>
        <div>
            <router-link to="/">{{$t('app.act.back')}}</router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Error404"
    }
</script>

<style scoped lang="scss">
    .err404 {
        padding-top: 20px;
        text-align: center;
    }
</style>
