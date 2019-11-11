<template>
    <div class="cc">
        <Restore v-bind:path="'/'"/>
    </div>
</template>

<script>
    import Restore from "@/views/components/Restore"

    export default {
        name: "Landing",
        components: {Restore}
    }
</script>

<style scoped lang="scss">
    .cc {
        background-color: $second;
    }
</style>
