<template>
  
</template>
<script>
export default {
  data() {
    return {

    }
  },
  created() {
    this.$store.dispatch('user/trans').then( data => {
      this.$store.dispatch('user/getRole', data).then(res=> {
        this.$router.addRoutes(res) //动态添加路由
        this.$router.push({ path: '/' })
        // next({ ...to, replace: true })
      }).catch(() => {
        this.$store.dispatch('user/postError')
      })
    })
  }
}
</script>