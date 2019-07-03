<template>
  <div class="listen4">
    <div class="listen4-detail" v-if='itemAll.detail && itemAll.detail.length != 0'>
      <div v-for='(dItem, index) in itemAll.detail' :key="index">
        <div v-for='(sItem, sIdx) in dItem.steam' :key="sIdx" class="listen4-steam">
          <span class="listen4-num">{{sIdx+1}}. </span>
          <div class="listen4-sentence">
            <span>{{sItem+sItem}}</span>
            <span class="listen4-line">{{isShow ? dItem.ftCorrect[sIdx] : ''}}</span>
          </div>
        </div>
      </div>
    </div>
    <!--查看脚本-->
    <el-dialog
      title="脚本"
      :visible.sync="isScript"
      width="30%"
    >
      <span>这是一段判断题型音频脚本信息</span>
    </el-dialog>
  </div>
</template>

<script>
export default {
   name: 'Listening4',
  data() {
   return {
    isScript:false,
    isShow: this.item.isShow
   }
  },
  props:{
    item: Object
  },
  watch: {
    item: {
      handler(val) {
        this.isShow = val.isShow
      },
      deep: true
    }
  },
  computed: {
    itemAll () {
      this.item.detail.forEach(ele => {
        var ftCorrect = [];
        ele.correct.forEach(c => {
          if(c===0){
            ftCorrect.push("F")
          }else{
            ftCorrect.push("T")
          }
        })
        ele.ftCorrect = ftCorrect;
      });

      return this.item;
    }
  },
  methods: {
    handleViewScript () {
      this.isScript = true;
    }
    
  },
}
</script>

<style lang="scss" scoped>

.listen4{
  width:1000px;
  margin-top: 20px;
  font-size: 14px;
  .listen4-steam{
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    margin-bottom:16px;
    .listen4-num{
      width:24px;
      line-height: 22px;
    }
    .listen4-sentence{
      flex: 1;
      font-size:14px;
      font-weight:400;
      color:rgba(0,0,0,0.85);
      line-height:22px;
      .listen4-line{
        width:60px;
        text-align: center;
        display: inline-block;
        line-height:20px;
        border-bottom:1px #000 solid;
        font-weight:bold
      }
    }
  }
}
</style>