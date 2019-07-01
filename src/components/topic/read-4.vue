<template>
  <div class="read4">
    <!-- <div class="video-box">
      <el-button size="mini" @click="lookAnswer">查看脚本</el-button>
    </div> -->

    <ul class="lang3-main">
      <li v-for= "(items, index) in list" :key="index">
        <p>{{items.steam}}</p>
        <p>
          <span v-show="showAnswer">
            {{items.correct}}
          </span>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'read4',
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
  @import "~@/styles/topic/lang3.scss";
</style>

