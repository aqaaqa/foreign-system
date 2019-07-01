<template>
  <div>
    <listen2 :itemList="list[1]"></listen2>
    <listen5 :itemList="list[4]"></listen5>
    <language3 :itemList="list[7]"></language3>
    <language6 :itemList="list[10]"></language6>
  </div>
</template>

<script>
import { topicList } from '@/api/topic'
// import { listen2, listen5 } from './index.js'
import listen2 from './listen-2'
import listen5 from './listen-5'
import language3 from './language-3'
import language6 from './language-6'

export default {
  name: 'topic',
  data() {
    return {
      list: {},
    }
  },
  components: {
    listen2,
    listen5,
    language3,
    language6
  },
  created() {
    let _this = this
    topicList().then( res=> {
      _this.list = res.res.questions
      _this.list1 = res.res.questions[1]
      console.log(_this.list1)
    })
  },
  mounted() {
  },
  methods: {

    
  }
}
</script>

<style>

</style>

