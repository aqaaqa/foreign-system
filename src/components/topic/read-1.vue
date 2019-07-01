<template>
  <div class="read1">
    <!-- <div class="video-box">
      <el-button size="mini" @click="lookAnswer">查看脚本</el-button>
    </div> -->
    <div class="read1-main">
      <div class="read1-article">{{item.article}}</div>
      <ul class="read1-topic">
        <li v-for="(items, index) in list" :key="index">
          <p>{{items.steam}}</p>
          <p class="read1-changes" :class="items.line ? 'line' : ''">
            <span v-for="(change, indexs) in items.options" :key="indexs">
              {{change}}
            </span>
          </p>
          <p>正确答案 {{items.correct[0]}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {letterArr} from '@/utils/auth'

export default {
  name: 'read1',
  props:{
    itemList: {
      type: Object,
    }
  },
  data() {
    return {
      item: this.itemList,
      list: this.itemList.detail,
      showAnswer: false,
      change: letterArr()
    }
  },
  watch: {
    itemList(val) {
      this.item = val
      this.list = val.detail
    },
    
  },
  computed: {
   
  },
  created() {
    let newArrs = this.list.map(e=> {
      for(let a of e.options){
        let arr = a.split(' ')
        if(arr.length > 5) {
          return e.line = true
        }
      }
      return e
    })
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
.read1-main {
  width: 600px;
  font-size: 14px;
  font-weight:400;
  color:rgba(0,0,0,0.85);
  line-height:26px;
}

.read1-topic {
  li {
    padding: 4px 0;
  }
  .read1-changes {
    margin-left: 20px;
    span {
      margin-right: 10px;
    }
  }
  .line {
    span {
      display: block;
    }
  }
}


</style>

