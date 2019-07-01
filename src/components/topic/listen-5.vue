<template>
  <div class="listen5">
    <div class="video-box">
      <el-button size="mini" @click="lookAnswer">查看脚本</el-button>
    </div>
    <div class="listen5-main" style="margin-top:20px;">
      <div>
        <p>左侧栏</p>
        <el-table
          :data = listArr
          :show-header = false
          :highlight-current-row = false
          size= 'small'
          border
          style="">
          <el-table-column>
          <template slot-scope="scope">
            <template>{{scope.$index+1 +'. ' +scope.row.left}}</template>
          </template>
          </el-table-column>
          <el-table-column
            style="text-align:center"
            align="center"
            width="50">
          <template v-if="showAnswer" slot-scope="scope" >
            <template>{{scope.row.answer}}</template>
          </template>
          </el-table-column>
        </el-table>
      </div>

      
      <div>
        <p>右侧栏</p>
        <el-table
          size="small"
          :data = listArr
          :show-header = false
          border
          style="">
          <el-table-column>
          <template slot-scope="scope">
            <template>{{change[scope.$index]+ '. ' +scope.row.right}}</template>
          </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

  </div>
</template>

<script>
import {letterArr} from '@/utils/auth'
export default {
  name: 'listen5',
  props:{
    itemList: {
      type: Object,
    }
  },
  data() {
    return {
      item: {
        directions:{
          en: '',
          zh: ''
        }
      },
      list: [],
      listArr: [],
      showAnswer: false,
      change: letterArr()
    }
  },
  watch: {
    itemList(val) {
      this.item = val
      this.list = val.detail[0].steam
      let list = JSON.parse(JSON.stringify(this.list))
      let answerList = JSON.parse(JSON.stringify(val.detail[0].correct))
      let aList = []
      for(let i =0 ; i < answerList.length; i++) {
        let str = answerList[i]
        let index = str.lastIndexOf("R");
        let result = str.substr(index + 1,str.length);
        aList.push(this.change[result-1])
      }
      let arr = []
      if(list) {
        for( let i = 0; i < list.length/2 ;i++){
          arr[i] = {
            left: list[i],
            answer: aList[i],
            right: list[list.length/2+i]
          }
        }
        this.listArr = arr
      }
    },
    
  },
  computed: {
   
  },
  created() {
    
  },
  mounted() {
    
    
  },
  methods: {
    lookAnswer() {
      this.showAnswer = !this.showAnswer
    }
  }
}
</script>

<style lang="scss" scoped>
.listen5 {
  background: #fff;
  padding: 10px;
}
.video-box {
  margin-top: 10px;
}

.gap-box {
  margin: 10px auto;
  p {
    font-size: 14px;
    font-weight:400;
    color:rgba(0,0,0,0.85);
    line-height:36px;
  }
}

.listen5-main {
  > div {
    p {
      font-weight: 500;
      font-size: 14px;
      margin-bottom: 10px;
    }
    display: inline-block; 
    vertical-align: top;
    &:nth-child(1) {
      width: 55%;
      min-width: 400px;
    }
    &:nth-child(2) {
      width: 40%;
      float: right;
    }
  }
}


</style>

