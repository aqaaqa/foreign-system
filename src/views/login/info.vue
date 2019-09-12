<template>
  <div class="login-container">
    <p class="titles">个人信息</p>
    <ul>
      <li></li>
    </ul>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { userInfoEdit, userInfo} from '@/api/user'

export default {
  name: 'info',
  data() {
    return {
      
    }
  },
  computed: {
    ...mapGetters([
      'token',
    ])
  },
  created() {
   
  },
  mounted() {
    userInfo({userId: this.token}).then(res => {
      // console.log(res)
    })
  },
  methods: {
    
  }
}
</script>

<style lang="scss" scoped>

</style>
