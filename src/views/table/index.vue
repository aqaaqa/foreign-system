<template>
  <div class="main-box">
    <div class="title-box">
      <el-radio-group size="mini" v-model="postion">
        <el-radio-button label="all">全部试题</el-radio-button>
        <el-badge :value="12" class="item">
          <el-radio-button label="change">已选试题</el-radio-button>
        </el-badge>
        
      </el-radio-group>
    </div>
    <template>
      <alltopic v-if=" postion == 'all'"></alltopic>
      <changetopic v-else-if="postion == 'change'"></changetopic>
    </template>

  </div>
</template>

<script>
import Alltopic from '@/components/alltopic'
import changetopic from '@/components/changetopic'

export default {
  filters: {
    
  },
  data() {
    return {
      postion: 'change'
    }
  },
  components: {
    Alltopic,
    changetopic
  },
  created() {
  },
  methods: {
    
  }
}
</script>
<style lang="scss" scoped>
  .main-box {
    min-width: 800px;
    min-height: 100%;
    margin: 0 auto;
    padding: 10px;
    
  }
</style>
<style lang="scss">
.title-box {
  .el-radio-button:first-child .el-radio-button__inner {
    border-radius: 0;
  }
}
</style>



