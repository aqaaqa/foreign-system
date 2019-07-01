<template>
  <div class="listen2">
    <div class = "lisetn2-title">
      <p>{{item.directions.en}}</p>
      <p>{{item.directions.zh}}</p>
    </div>
    <div class="video-box">
      <el-button size="mini" @click="lookAnswer">查看脚本</el-button>
    </div>
    <div>
      <div class="gap-box" v-for = "(list,index) in list" :key="index" >
        <p v-for="(gap,gapIndex) in list.steam" :key="gapIndex" v-html="gapIndex+1 + '. '+gap"></p>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'listen2',
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
      showAnswer: false,
    }
  },
  watch: {
    itemList(val) {
      this.item = val
      this.list = val.detail
    }
  },
  computed: {
   
  },
  created() {
    
  },
  mounted() {
    
    
  },
  methods: {
    lookAnswer() {
      if(this.showAnswer) {
        this.list = this.item.detail
      } else {
        let list = JSON.parse(JSON.stringify(this.item.detail))
        let listFilter = list.map(e=> {
          let replauceList = e.steam.map((j,index) => {
            let c = j.replace(/_+/g,`<i class='listen2-answer'>${e.correct[index]}</i>`)
            j = c
            return j
          })
          e.steam = replauceList
          return e
        })
        this.list = listFilter
      }
      this.showAnswer = !this.showAnswer
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/topic/listen2.scss";
</style>
<style lang="scss">
.listen2-answer {
  min-width: 56px;
  padding: 0 2px;
  box-sizing: border-box;
  display:inline-block;
  text-align: center;
  border-bottom: 1px solid #000;
  font-style: normal;
  line-height: 14px;
}
</style>
