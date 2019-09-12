<template>
  <div class="dashboard-container">
    <div>
      <img src="../../assets/activates/logo.png" alt="">
      <p>高中英语同步测试系统</p>
      <a target="_blank" :href="href">
        查看操作指南
      </a>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
      href : `http://test.unischool.cn/teach-resource/userguide/%E6%96%B0%E6%A0%87%E5%87%86%E9%AB%98%E4%B8%AD%E5%90%8C%E6%AD%A5%E6%B5%8B%E8%AF%95%E9%A2%98%E5%BA%93%E6%93%8D%E4%BD%9C%E6%8C%87%E5%8D%97.pdf?t=${new Date().getTime()}`
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    width: 100%;
    min-height: calc(100vh - 50px);
    background: url('../../assets/activates/index.png') no-repeat center 70%/70%;
    display: flex;
    justify-content: center;
    align-items: center;
    > div {
      text-align: center;
      img {
        width: 240px;
      }
      p {
        font-size:26px;
        font-weight:500;
        color:rgba(0,91,158,1);
        padding: 30px;
      }

      a {
        display: block;
        margin: 0 auto;
        width:126px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(217,217,217,1);
        font-size:14px;
        font-weight:500;
        color:rgba(133,138,146,1);
        line-height:36px;
      }
    }
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
