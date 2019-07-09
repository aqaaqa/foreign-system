<template>
  <div class="main-box">
    <sticky :z-index="10">
      <div class="title-box">
        <el-radio-group size="mini" v-model="postion">
          <el-radio-button label="all">全部试题</el-radio-button>
          <el-badge v-if="count > 0" :value="count" class="item">
            <el-radio-button label="change">已选试题</el-radio-button>
          </el-badge>
          <el-radio-button v-else label="change">已选试题</el-radio-button>
        </el-radio-group>
        <div style="display:inline-block" v-show="postion == 'change'">
          <el-button style="margin-left: 12px;" v-popover:popover2 type="primary" size = "mini" plain>
            <svg-icon :icon-class="'word'" />
            导出为word文档
          </el-button>
          <el-button type="danger" size = "mini" plain @click="removeAll()">
            <svg-icon :icon-class="'remove'" />
            移除全部
          </el-button>

          <el-tag style="margin-left: 20px;"  type="warning">当前试卷总分：{{score}}</el-tag>
        </div>
      </div>
    </sticky>

    <!-- 保存试卷 -->
    <el-popover
      ref="popover2"
      placement="bottom-start"
      width="320"
      trigger="click"
      v-model="visible2">
      <div class="saveCache">
        <p>试卷名称</p>
        <el-input style="margin: 10px 0;" v-model.trim="topicName" size="mini" placeholder="请输入试卷名称"></el-input>
        <el-checkbox v-model="checked">同时保存在我的试卷中</el-checkbox>
        <div style="text-align: right; margin-top: 10px">
          <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
          <el-button type="primary" size="mini" @click="exportPaper">确定</el-button>
        </div>
      </div>
    </el-popover>
    <template>
      <alltopic v-if=" postion == 'all'" @changeTab="changeTabs"></alltopic>
      <changetopic v-else-if="postion == 'change'" @changeTab="changeTabs" :clear = "clear"></changetopic>
    </template>

  </div>
</template>

<script>
import Alltopic from '@/components/alltopic'
import changetopic from '@/components/changetopic'
import { mapGetters } from 'vuex'
import Sticky from '@/components/Sticky' // 粘性header组件
import { cacheDelall, paprerWord } from '@/api/topic'


export default {
  filters: {
    
  },
  data() {
    return {
      postion: 'all',
      clear: false,
      topicName: '',
      visible2: false,
      checked: true
    }
  },
  components: {
    Alltopic,
    changetopic,
    Sticky
  },
  computed: {
    ...mapGetters([
      'count',
      'score',
      'changeTab',
    ]) 
  },
  created() {
    // this.$store.dispatch('page/setTab', 'all')
  },
  methods: {
    changeTabs() {
      this.postion == 'all' ? this.postion = 'change' : this.postion = 'all'
      // console.log(this.postion)
    },
    //转成word
    exportPaper() {
      if(!this.topicName) {
        this.$message({
          message: '请输入文件名',
          type: 'error'
        })
        return false
      }
      paprerWord({name: this.topicName, isMine: this.checked ? 1 : 0}).then(res=>{
        this.$message({
          message: '保存成功',
          type: 'success'
        })
        this.visible2 = false
        console.log(res)
      })
    },
    removeAll() {
      cacheDelall().then( res=> {
        this.clear = true
        this.$store.dispatch('page/setCount', res.data.count)
        this.$store.dispatch('page/setScore', 0)
        this.$message({
          message: '删除成功',
          type: 'success'
        })
      })
    }
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
  .saveCache {
    > p:nth-child(1) {
      font-size:14px;
      font-weight:400;
      color:rgba(19,20,21,1);
    }
  }
</style>
<style lang="scss">
.title-box {
  background: rgb(240,242,245);
  padding: 10px 0;
  .el-radio-button:first-child .el-radio-button__inner {
    border-radius: 0;
  }
}
</style>



