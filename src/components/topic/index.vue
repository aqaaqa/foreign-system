<template>
  <div>
    <template v-if="list.part == '听力'">
      <listen1 v-if='list.type == "选择题"' :item='list' />
      <listen2 v-else-if="list.type == '填空题>填空'" :itemList="list"  />
      <listen3 v-else-if='list.type == "填空题>填表格"'  :itemList='list' />
      <listen4 v-else-if='list.type == "判断题"'  :item='list'/>
      <listen5 v-else-if="list.type == '匹配题'" :itemList="list" />
    </template>
    <template v-else-if="list.part == '语言知识运用'">
      <language1 v-if="list.type == '选择题'" :itemList="list" />
      <language2 v-else-if="list.type == '匹配题'" :itemList="list" />
      <!-- <language2 v-else-if='list.type == "匹配"' :item="list"  /> -->
      <language3 v-else-if="list.type == '改写题'" :itemList="list" />
      <language4 v-else-if='list.type == "填空题>单句填空"' :item="list" />
      <language5 v-else-if='list.type == "填空题>短文填空"' :item="list" />
      <language6 v-else-if="list.type == '填空题>提示填空' || list.type == '排序题'" :itemList="list" />
      <language10 v-else-if="list.type == '填空题>短文提示填空' " :itemList="list" />
      <language7 v-else-if="list.type == '纵横字谜'" :itemList="list" />
      <language8 v-else-if='list.type == "完形填空"' :item="list" />
    </template>
    
    <template v-else-if="list.part == '阅读'">
      <read1 v-if="list.type == '选择题'" :itemList="list" />
      <read2 v-else-if="list.type == '任务型阅读'" :itemList="list" />
      <read3 v-else-if="list.type == '判断题'" :item="list" />
      <read4 v-else-if="list.type == '简答题'" :itemList="list" />
    </template>

    <template v-else-if="list.part == '写作'">
      <read4 v-if="list.type == '翻译'" :itemList="list" />
      <write2 v-else-if="'书面表达,读写结合>读后续写,读写结合>概要写作'.indexOf(list.type) > -1" :itemList="list" />
    </template>

    <template v-else-if="list.part == '口语'">
      <read4 v-if="list.type == '口语简答题'" :itemList="list" />
      <speak3 v-else-if="list.type == '朗读题'" :itemList="list" />
      <speak2 v-else-if="list.type == '讨论题'" :itemList="list" />
      <speak4 v-else-if="'对话题，辩论题'.indexOf(list.type) > -1" :itemList="list" />
      <speak6 v-else-if='list.type == "复述题"'  :item='list'/>
    </template>
  </div>
</template>

<script>
import { listen1, listen3, listen4, listen2, listen5, language1, language2, language3, language4, language5, 
language6, language7, language8, language10, read1, read2, read3, read4, write2,speak2, speak3, speak4, speak6} from './topictype'

export default {
  name: 'topic',
  props:{
    allitem: {
      type: Object,
    },
  },
  data() {
    return {
      list: this.allitem,
    }
  },
  watch: {
    allitem:{
      handler(val) {
        this.list = val
      },
      deep: true
    }
  },
  components: {
    listen2,
    listen1,
    listen3,
    listen4,
    listen5,
    language1,
    language2,
    language3,
    language4,
    language5,
    language8,
    language6,
    language7,
    language10,
    read1,
    read2,
    read3,
    read4,
    write2,
    speak2,
    speak3,
    speak4,
    speak6
  },
  created() {
    
  },
  mounted() {
  },
  methods: {

    
  }
}
</script>

