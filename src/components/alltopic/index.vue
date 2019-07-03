<template>
  <div class="alltopic-box">
    <div class="search-box">
      <!-- input搜索 -->
      <div class="search-input">
        <el-input v-model="search.input" size="mini" placeholder="试题ID/关键字/出题人"></el-input>
        <el-button size="mini" type="primary" @click="searchBtn()">搜索</el-button>
      </div>

      <!-- 选项 -->
      <div class="search-check">
        <!-- 题型 -->
        <div class="check-center">
          <label class="check-title">所属题型:</label>
          <div class="check-right">
            <el-radio v-model="search.radio" label="1">全部</el-radio>
            <el-radio v-model="search.radio" label="2">完形填空</el-radio>
            <el-radio v-model="search.radio" label="3">阅读理解</el-radio>
            <el-radio v-model="search.radio" label="4">单词拼写</el-radio>
            <el-radio v-model="search.radio" label="5">短文改错</el-radio>
            <el-radio v-model="search.radio" label="6">快速阅读</el-radio>
            <el-radio v-model="search.radio" label="7">阅读理解</el-radio>
            <el-radio v-model="search.radio" label="8">单词拼写</el-radio>
            <el-radio v-model="search.radio" label="9">短文改错</el-radio>
          </div>
        </div>
        <!-- 主要选择 -->
        <div class="check-main">
          <div class="check-center">
            <label class="check-title">所属题型:</label>
            <div class="check-right">
              <el-radio v-model="search.radio" label="1">全部</el-radio>
              <el-radio v-model="search.radio" label="2">完形填空</el-radio>
              <el-radio v-model="search.radio" label="3">阅读理解</el-radio>
              <el-radio v-model="search.radio" label="4">单词拼写</el-radio>
              <el-radio v-model="search.radio" label="5">短文改错</el-radio>
              <el-radio v-model="search.radio" label="6">快速阅读</el-radio>
              <el-radio v-model="search.radio" label="7">阅读理解</el-radio>
              <el-radio v-model="search.radio" label="9">短文改错</el-radio>
            </div>
          </div>
          <div class="check-center">
            <label class="check-title">所属题型:</label>
            <div class="check-right">
              <el-radio v-model="search.radio" label="1">全部</el-radio>
              <el-radio v-model="search.radio" label="2">完形填空</el-radio>
              <el-radio v-model="search.radio" label="3">阅读理解</el-radio>
              <el-radio v-model="search.radio" label="4">单词拼写</el-radio>
              <el-radio v-model="search.radio" label="5">短文改错</el-radio>
              <el-radio v-model="search.radio" label="6">快速阅读</el-radio>
              <el-radio v-model="search.radio" label="7">阅读理解</el-radio>
              <el-radio v-model="search.radio" label="8">单词拼写</el-radio>
            </div>
          </div>
          <div class="check-center">
            <label class="check-title">所属题型:</label>
            <div class="check-right">
              <el-radio v-model="search.radio" label="1">全部</el-radio>
              <el-radio v-model="search.radio" label="2">完形填空</el-radio>
              <el-radio v-model="search.radio" label="3">阅读理解</el-radio>
              <el-radio v-model="search.radio" label="4">单词拼写</el-radio>
              <el-radio v-model="search.radio" label="5">短文改错</el-radio>
              <el-radio v-model="search.radio" label="6">快速阅读</el-radio>
              <el-radio v-model="search.radio" label="7">阅读理解</el-radio>
              <el-radio v-model="search.radio" label="8">单词拼写</el-radio>
            </div>
          </div>
        </div>

        <!-- 下拉选项 -->

        <div class="select-check">
          <label class="check-title">其他选项：</label>
          <div class="select-right">
            <div>
              <label class="select-title">出题人:</label>
              <el-select size="mini" v-model="search.difficulty" placeholder="不限">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </div>
            <div>
              <label class="select-title">难度:</label>
              <el-select size="mini" v-model="search.difficulty" placeholder="不限">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </div>
          </div>
          
        </div>
      </div>
    </div>
    
    <!-- 题目展示 -->
    <ul class="all-main">
      <li class="all-main-list" v-for="(item,index) in list" :key="index">
        <el-button style="float:right" size="mini" type="primary" icon="el-icon-circle-plus-outline">添加</el-button>
        <TopicMain :allitem="item"></TopicMain>
        <div class="all-main-bottom">
          <span>ID: {{item.part}}</span>
          <span>题型: {{}}</span>
          <span>使用次数: {{}}</span>
          <span>本校使用次数: {{}}</span>
          <span>
            <el-button type="text">查看答案</el-button>
          </span>
          <span style="float:right">展开</span>
        </div>
      </li>
    </ul>

  </div>
  
</template>
<script>
import TopicMain from '../topic/index'
import { topicList } from '@/api/topic'

export default {
  name: 'alltopic',
  data() {
    return {
      search: {
        input: '',
        radio: '1',
        name: '',
        difficulty: ''
      },
      list: []
    }
  },
  components: {
    TopicMain
  },
  methods: {
    searchBtn() {
      console.log(this.search.input)
    }
  },
  created() {
    let _this = this
    topicList().then( res=> {
      _this.list = res.res.questions
    })
  },
  mounted() {
    
  }
}
</script>
<style lang="scss" scoped>
.alltopic-box {
  // background: #fff;
  margin-top: 15px;
  height: 100%;
}

.check-title {
  font-size: 14px;
  font-weight: normal;
  margin-right: 20px;
  width: 60px;
  vertical-align: top;
}

.check-right {
  width: calc(100% - 85px);
  display: inline-block;
  vertical-align: top;
}
.check-main {
  border-top: 1px dashed #ccc;
  border-bottom: 1px dashed #ccc;
  padding: 20px 20px 0 0;
}
.select-check {
  margin-top: 20px;
  .select-right {
    display: inline-block;
    width: calc(100% - 100px);
    > div {
      display: inline-block;
      
    }
    >div:nth-child(1) {
      margin-right: 30px;
    }
  }
  .select-title {
    color: #606266;
    font-weight: normal;
    font-size: 14px;
    margin-right: 15px;
  }
}

.all-main {
  &-list {
    background:rgba(255,255,255,1);
    border-radius:2px;
    margin-top: 20px;
    padding: 15px 15px 0;
  }
  &-btn1 {
    float: right
  }
  &-bottom {
    height: 48px;
    line-height: 48px;
    border-top: 1px dashed #D9D9D9;
    font-size:14px;
    font-weight:400;
    color:rgba(0,0,0,1);
    span {
      margin-right: 40px;
    }
  }
}
</style>
<style lang="scss">
  .search-input{
  width: 70%;
  margin: 20px auto;
  text-align: center;
  .el-input {
    width: 80%;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    input {
      border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
    }
  }
  .el-button {
    margin-left: -5px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}

.search-check {
  background: #fff;
  padding: 20px;
  .el-radio {
    // margin-right: 0px;
    margin-bottom: 18px;
    margin-right: 15px;
  }
  .el-radio__inner {
    display: none;
  }
}
</style>


