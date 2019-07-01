<template>
  <div class="lang3">
    <div class="video-box">
      <el-button size="mini" @click="lookAnswer">查看脚本</el-button>
    </div>
    <ul class="lang3-main">
      <li v-for="(item,index) in list" :key="index">
        <p>{{item}}</p>
        <p>
          <span v-show="showAnswer">
            {{answer[index]}}
          </span>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import {letterArr} from '@/utils/auth'
export default {
  name: 'lang6',
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
      answer: [],
      listArr: [],
      showAnswer: false,
      change: letterArr()
    }
  },
  watch: {
    itemList(val) {
      this.item = val
      this.list = val.detail[0].steam
      this.answer = val.detail[0].correct
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
.lang3-main {
  margin-top: 10px;
  li {
    margin-bottom: 20px;
  }
  p{
    font-size:14px;
    font-weight:400;
    color:rgba(0,0,0,0.85);
    &:nth-child(1){
      height:20px;
      line-height:20px;
    }
    &:nth-child(2) {
      width:600px;
      height:32px;
      line-height: 32px;
      border-bottom: 1px solid #ccc;
      margin-left: 20px;
      margin-top: 4px;
    }
  }
  
}
</style>
<style lang="scss">
</style>
