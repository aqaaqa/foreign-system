<template>
  <div class="sur-box">
    <h2>新标准同步测试系统用户使用情况调查</h2>
    <div class="topic-box">
      <div class="topic-main">
        <p class="title">1.您目前所教的学段。</p>
        <div>
          <el-radio class="check-one" v-model="form.one" label="1">高一</el-radio>
          <el-radio class="check-one" v-model="form.one" label="2">高二</el-radio>
          <el-radio class="check-one" v-model="form.one" label="3">高三</el-radio>
        </div>
      </div>
      <div class="topic-main">
        <p class="title">2.您每学期使用本测试系统组卷的次数？</p>
        <div>
          <el-radio class="check-one" v-model="form.two" label="1">1-3次</el-radio>
          <el-radio class="check-one" v-model="form.two" label="2">3-5次</el-radio>
          <el-radio class="check-one" v-model="form.two" label="3">5次以上</el-radio>
          <el-radio class="check-one" v-model="form.two" label="4">未组卷（请说明原因）</el-radio>
          <el-input size="mini" :readonly="form.two!=4" v-model="input" placeholder="请输入原因"></el-input>
        </div>
      </div>
      <div class="topic-main">
        <p class="title">3.您使用本测试系统组卷的目的是？ [多选题]</p>
        <div>
          <!-- <el-checkbox v-model="checked">备选项</el-checkbox> -->
          <el-checkbox class="check-one" v-model="form.three" label="1">日常练习</el-checkbox>
          <el-checkbox class="check-one" v-model="form.three" label="2">课后作业</el-checkbox>
          <el-checkbox class="check-one" v-model="form.three" label="3">随堂测验</el-checkbox>
          <el-checkbox class="check-one" v-model="form.three" label="4">大型考试，如期中期末考试和阶段性测试</el-checkbox>
          <el-checkbox class="check-one" v-model="form.three" label="5">其他</el-checkbox>
          <el-input size="mini" :readonly="form.three.indexOf('5')==-1" v-model="input1" placeholder="请输入"></el-input>
        </div>
      </div>
      <div class="topic-main">
        <p class="title">4.您希望本测试系统能为您提供哪些资源？ [多选题] </p>
        <div>
          <el-checkbox class="check-one" v-model="form.four" label="1">同步练习题</el-checkbox>
          <el-checkbox class="check-one" v-model="form.four" label="2">知识点试题</el-checkbox>
          <el-checkbox class="check-one" v-model="form.four" label="3">高考真题及模拟题</el-checkbox>
          <el-checkbox class="check-one" v-model="form.four" label="4">名校试卷及联考卷</el-checkbox>
          <el-checkbox class="check-one" v-model="form.four" label="5">试题汇编（高考新题型，易错题，热门题型，等）</el-checkbox>
        </div>
      </div>
      <div class="topic-main">
        <p class="title">5.您希望本系统能为您提供哪些功能？ [多选题]</p>
        <div>
          <el-checkbox class="check-one" v-model="form.five" label="1">智能组卷</el-checkbox>
          <el-checkbox class="check-one" v-model="form.five" label="2">在线组织测试</el-checkbox>
          <el-checkbox class="check-one" v-model="form.five" label="3">智能批改</el-checkbox>
          <el-checkbox class="check-one" v-model="form.five" label="4">其他</el-checkbox>
          <el-input size="mini" :readonly="form.five.indexOf('4')==-1" v-model="input2" placeholder="请输入"></el-input>
        </div>
      </div>
      <div class="topic-main">
        <p class="title">6.您对本测试系统有哪些意见和建议？</p>
        <div>
          <el-input size="mini" type="textarea" :rows="4" v-model="input3" placeholder="请输入"></el-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        one: '',
        two: '',
        three: [],
        four:[],
        five: []
      },
      input: '',
      input1: '',
      input2: '',
      input3: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.sur-box {
  width: 600px;
  margin: 0 auto 30px;
  h2{
    font-size: 26px;
    text-align: center;
    color: #409EFF;
    padding: 40px 0 40px;
    font-weight: normal;
  }
}
.title {
  padding: 30px 0 10px;
  span{
    color: #F56C6C;
  }
}
.check-one {
  display: block;
  padding: 10px 0;
}

</style>