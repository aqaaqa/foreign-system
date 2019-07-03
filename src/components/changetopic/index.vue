<template>
  <div class="change-box">
    <div class="search-box">
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
      </div>
    </div>
    
    <!-- 题目展示 -->
    <ul class="all-main" v-for="(obj,indexList) in list" :key="indexList">
      <div class="all-main-top-title">
        <div>
          {{obj.part}}
        </div>
        <div>
          <span>此题总分: {{20}}</span>
          <div class="move-scope">
            <el-button size="mini" type="primary" icon="el-icon-caret-top" style="background:rgba(239,247,255,1); color:#BFDEFF;" @click="moveUp(indexList, obj)"></el-button>
            <el-button size="mini" type="primary" icon="el-icon-caret-bottom" style="background:rgba(222,238,255,1); color:#007AFF;" @click="moveDown(indexList, list.length, obj)"></el-button>
          </div>
          
        </div>
      </div>
      <li class="all-main-list" v-for="(item,index) in obj.data" :key="index">
        <div class="all-main-bottom">
          <div>
            <span>ID: {{15456754356}}</span>
            <span>题型: {{'长对话'}}</span>
            <span>使用次数: {{23}}</span>
            <span>本校使用次数: {{25}}</span>
            <span>
              <el-button size="mini" type="text" style="font-size: 12px;" @click="lookAnswer(index,indexList)">查看答案</el-button>
            </span>
          </div>
          <div>
            <el-tag size="small">此题总分: {{20}}</el-tag>
            <div class="scores-input">
              <label>小题分数: </label>
              <el-input size="mini" style="text-align:right; " placeholder="10" v-model="input2">
                <template slot="append">分/题</template>
              </el-input>
            </div>
            <div>
              <el-button plain size="mini">
                <svg-icon :icon-class="'change'" />
                替换
              </el-button>
              <el-button size="mini" plain>
                <svg-icon :icon-class="'remove'" />
                移除
              </el-button>
            </div>
            <div class="move-scope">
              <el-button size="mini" type="primary" icon="el-icon-caret-top" style="background:rgba(239,247,255,1); color:#BFDEFF;" @click="moveitemUp(index,indexList,item)"></el-button>
              <el-button size="mini" type="primary" icon="el-icon-caret-bottom" style="background:rgba(222,238,255,1); color:#007AFF;" @click ="moveitemDown(index,indexList, obj.data.length,item)"></el-button>
            </div>
            
          </div>
        </div>
        <div class="all-main-center">
          <div class="all-main-title">{{item.name}}</div>
          <div class = "lisetn2-title" v-show="item.directions.en">
            <p>{{item.directions.en}}</p>
            <p>{{item.directions.zh}}</p>
          </div>
          <div class="video-box" v-if="item.part == '听力'">
            <div class="audio-box" >
              <VueAudio :theUrl="audios.url" :theControlList="audios.controlList"/>
            </div>
            <el-button type="info" size="small" plain>查看脚本</el-button>
          </div>
          <TopicMain :allitem="item"></TopicMain>
        </div>
      </li>
    </ul>
  </div>
  
</template>
<script>
import  TopicMain from '../topic/index'
import  VueAudio  from '../audio'
import { topicList } from '@/api/topic'

export default {
  name: 'changetopic',
  data() {
    return {
      input2: '',
      search: {
        input: '',
        radio: '1',
        name: '',
        difficulty: ''
      },
      list: [],
      audios: {
        url:'/static/img/1.mp3',
        controlList: "noDownload noSpeed onlyOnePlaying"
      },
    }
  },
  components: {
    TopicMain,
    VueAudio
  },
  methods: {
    searchBtn() {
      console.log(this.search.input)
    },
    lookAnswer(index, indexList) {
      this.list[indexList].data[index].isShow = !this.list[indexList].data[index].isShow
    },
    moveUp(index, obj) {
      if(index <= 0 ) {
        return false
      } else {
        let a = this.list[index-1]
        this.$set(this.list, index, a)
        this.$set(this.list, index-1, obj)
      }
      
    },
    moveitemUp(index, indexList,obj) {
      if(index <= 0 ) {
        return false
      } else {
        let a = this.list[indexList].data[index-1]
        this.$set(this.list[indexList].data, index, a)
        this.$set(this.list[indexList].data, index-1, obj)
      }
      
    },
    moveitemDown(index,indexList, len ,obj) {
      if(index+1 >= len) {
        return false
      } else {
        let a = this.list[indexList].data[index+1]
        this.$set(this.list[indexList].data, index, a)
        this.$set(this.list[indexList].data, index+1, obj)
      }
    },
    moveDown(index, len ,obj) {
      if(index+1 >= len) {
        return false
      } else {
        let a = this.list[index+1]
        this.$set(this.list, index, a)
        this.$set(this.list, index+1, obj)
      }
    }
  },
  created() {
    let _this = this
    topicList().then( res=> {
      let list = res.res.questions
      let map = {},
      lists = [];
      for(let i =0; i<list.length; i++) {
        var item = list[i]
        item.isShow = false
        if(!map[item.part]) {
          lists.push({
            part : item.part,
            data: [item]
          })
          map[item.part] = item
        } else {
          for(let k = 0; k < lists.length; k++) {
            let list2 = lists[k]
            if(list2.part == item.part) {
              list2.data.push(item)
              break;
            }
          }
        }
      }
      _this.list = lists
    })
  },
  mounted() {
    
  }
}
</script>
<style lang="scss" scoped>
.change-box {
  margin-top: 15px;
  height: 100%;
  min-width: 1028px;
}

.check-title {
  font-size: 14px;
  font-weight: normal;
  margin-right: 20px;
  width: 60px;
  vertical-align: top;
}

.check-center {
  height: 30px;
  line-height: 30px;
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
  background: #fff;
  margin-top: 20px;
  padding-bottom: 1px;
  &-list {
    background:rgba(255,255,255,1);
    border-radius:2px;
    margin-bottom: 20px;
    // padding: 0px 15px 15px;
    border: 1px solid #D9D9D9;
    padding-bottom: 10px;
    margin: 0 15px 15px;
  }
  &-btn1 {
    float: right
  }
  &-center {
    padding: 0 10px;
  }
  &-title {
    font-size:14px;
    font-weight:500;
    color:rgba(0,0,0,0.85);
    padding: 16px 0 6px;
  }
  &-bottom {
    height: 48px;
    line-height: 48px;
    border-bottom: 1px dashed #D9D9D9;
    font-size:12px;
    font-weight:400;
    color:rgba(0,0,0,1);
    padding: 0 10px;
    > div:nth-child(1) {
      float: left;
      width: 45%;
      span {
        margin-right: 10px;
      }
    }
    > div:nth-child(2) {
      text-align: right;
      float: right;
      width: 54%;
      > div {
        display: inline-block;
        margin-left: 10px;
      }
    }
    
  }
  .all-main-top-title {
    height:40px;
    line-height: 40px;
    background:rgba(247,247,247,1);
    border-radius:2px 2px 0px 0px;
    padding: 0 10px;
    margin-bottom: 15px;
    > div:nth-child(1) {
      float: left;
      font-size:14px;
      font-weight:500;
      color:rgba(0,0,0,0.85);
    }
    > div:nth-child(2) {
      float: right;
      span {
        font-size:14px;
        font-weight:400;
        color:rgba(0,0,0,1);
      }
    }
    .move-scope {
      display: inline-block;
      margin-left: 10px;
    }
  }
}
.scores-input {
  label {
    font-size:12px;
    font-weight:400;
    color:rgba(19,20,21,1);
    vertical-align: middle;
  }
}

.lisetn2-title {
  width:700px;
  padding: 10px 16px;
  background:rgba(255,250,240,1);
  border-radius:2px;
  border:1px solid rgba(255,241,184,1);
  margin-top: 10px;
  p {
    font-size:14px;
    font-weight:500;
    color:rgba(0,0,0,0.85);
    line-height:24px;
  }
  p:nth-child(2) {
    margin-top: 4px;
  }
}

.video-box {
  margin-top: 10px;
  .audio-box {
    display: inline-block;
  }
}
</style>
<style lang="scss">
  .scores-input {
    .el-input-group {
      width: 100px;
      vertical-align: middle;
      input {
        text-align: right;
      }
    }
    .el-input-group__append {
      padding: 0 8px;
    }
  }
  .move-scope {
    .el-button--mini {
      padding: 6px 7px;
    }
    .el-button+.el-button {
      margin-left: 5px;
    }
  }
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
  padding: 10px 20px;
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


