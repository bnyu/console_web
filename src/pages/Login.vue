<template>
    <div>

    </div>
</template>

<script>
export default {
  name: 'Login',
  data: function () {
    return {
    }
  },
  methods: {
  },
  mounted () {
    this.$store.commit('user/setPermits', [])
    this.$router.push('/all')
  }
}
</script>

<style scoped>

</style>
