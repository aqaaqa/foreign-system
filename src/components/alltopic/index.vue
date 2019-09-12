<template>
  <div class="alltopic-box" v-loading.fullscreen.lock="loading">
    <div class="search-box">
      <!-- input搜索 -->
      <!-- <div class="search-input">
        <el-input v-model="search.input" size="mini" placeholder="试题ID/关键字/出题人"></el-input>
        <el-button size="mini" type="primary" @click="searchBtn()">搜索</el-button>
      </div> -->

      <!-- 选项 -->
      <div class="search-check">
        <!-- 题型 -->
        <div class="check-center" v-for="(item,index) in types" :key="index">
          <label class="check-title">{{item.label}}</label>
          <div class="check-right">
            <el-radio v-model="radio" :label="'全部|'+item.label" @change="handleChange">全部</el-radio>
            <el-radio v-for="(name,index) in item.options" :key="index" v-model="radio" :label="name+'|'+item.label" @change="handleChange">{{name}}</el-radio>
          </div>
        </div>
        <!-- 主要选择 -->
        <!-- <div class="check-main">
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
        </div> -->

        <!-- 下拉选项 -->

        <!-- <div class="select-check">
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
          
        </div> -->
      </div>
    </div>
    
    <!-- 题目展示 -->
    <template v-if="list.length">
      <ul class="all-main">
        <li class="all-main-list" v-for="(item,index) in list" :key="index">
          <div class="add-btn">
            <el-button size="mini" type="primary" icon="el-icon-circle-plus-outline" @click="addTopic(item.id)">{{changeTopic ? '替换' : '添加'}}</el-button>
          </div>
          <div class="items-height" :class="item.opentopic ? 'show-allheight' : ''">
             <div class="all-main-title">{{item.name}}</div>
              <div class = "lisetn2-title" v-if="item.directions && item.directions.en">
                <p>{{item.directions.en}}</p>
                <p>{{item.directions.zh}}</p>
              </div>
              <!-- <div class="video-box" v-if="(item.part == '听力' || item.type=='复述题') && item.mp3Stem">
                题干音频：
                <div class="audio-box" >
                  <VueAudio :theUrl="item.mp3Path+item.mp3Stem" :theControlList="audios.controlList"/>
                </div>
              </div> -->
              <div class="video-box" v-if="(item.part == '听力' || item.type=='复述题') && item.article">
                <div class="audio-box" v-if="item.mp3">
                  <VueAudio :theUrl="item.mp3Path+item.mp3" :theControlList="audios.controlList"/>
                </div>
                <el-button type="info" size="small" plain @click="showArt(item.article)">查看脚本</el-button>
              </div>
              <!-- <p v-if="item.title" class="topic-title" v-html="item.title"></p> -->
              <TopicMain :allitem="item"></TopicMain>
          </div>
          <div class="all-main-bottom">
            <span>ID: {{item.id}}</span>
            <span>题型: {{item.type.indexOf('>') > -1 ? item.type.substr(0,item.type.indexOf('>')) :item.type}}</span>
            <span>类型: {{item.part}}</span>
            <span>使用次数: {{item.count}}</span>
            <span>本校使用次数: {{item.tantCount}}</span>
            <div style="display: inline-block; height: 20px;" v-if="item.detail[0].correct && item.detail[0].correct[0]">
              <el-popover trigger="click" placement="top">
                <div style="max-width: 500px;" v-for="(a, index) in item.detail" :key="index">
                <p style='line-height: 24px;' v-for="(items, indexs) in a.correct" :key="indexs+'.'" v-html="items"></p>
                </div>
                <span slot="reference">
                  <el-button type="text">查看答案</el-button>
                </span>
              </el-popover>
            </div>
            
            <span class="show-topic-btn">
              <el-button v-if="item.opentopic" type="text" size="mini" @click="openTopic(index)">收起<i class="el-icon-arrow-up el-icon--right"></i></el-button>
              <el-button v-else type="text" size="mini" @click="openTopic(index)">展开<i class="el-icon-arrow-down el-icon--right"></i></el-button>
            </span>
          </div>
        </li>
      </ul>
      <div class="pageinat">
        <el-pagination background
        size="mini"
          :current-page="page"
          layout="prev, pager, next"
          @current-change="choosePage"
          :total="total"
          :page-size="10">
        </el-pagination>
      </div>
    </template>
    <div v-else class="null-topic">
      暂无试题
    </div>

    <el-dialog
      :visible.sync="dialogVisible"
      width="600"
      title="音频脚本"
      >
      <p class="answer-br" v-html="article"></p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="dialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
  
</template>
<script>
import { mapGetters } from 'vuex'
import  VueAudio  from '../audio'
import TopicMain from '../topic/index'
import { questList, cacheAdd, questTypes, cacheRep } from '@/api/topic'

export default {
  name: 'alltopic',
  data() {
    return {
      // search: {
      //   input: '',
      //   radio: '1',
      //   name: '',
      //   difficulty: ''
      // },
      list: [],
      total: 0,
      page: 1,
      types: [],
      radio: '全部',
      loading: false,
      details: [],
      visible2: false,
      dialogVisible: false,
      audios: {
        controlList: "noDownload noSpeed onlyOnePlaying"
      },
      article: ''
    }
  },
  computed: {
    ...mapGetters([
      'pageId',
      'changeTopic'
    ])
  },
  components: {
    TopicMain,
    VueAudio
  },
  methods: {
    handleChange(val) {
      
      this.page = 1
      this.pageList()
    },
    showArt(art) {
      this.dialogVisible = true
      this.article = art
    },
    searchBtn() {
      console.log(this.search.input)
    },
    lookAnswer(data) {
      this.visible2 = false
      this.details = data
      this.visible2 = true
      // let keys = JSON.parse(JSON.stringify(this.list[index]))
      // keys.isShow = !keys.isShow
      // this.$set(this.list,[index],keys)
    },
    openTopic(index) {
      this.list[index].opentopic = !this.list[index].opentopic
      this.list = [...this.list] 
    },

		choosePage(current) {
			this.page = current
			this.pageList()
		},
		pageList(types) {
      this.loading = true
      let a = '',b='',c=''
      if(this.radio) {
        b = this.radio.split('|')
        b[0] == '全部' ? a = '' : a = b[0]
        c= b[1]
      }
      if(types) {
        this.page = 1 
      }
			questList({id: this.pageId,pageNumber: this.page,pageSize: 10, type: a,part: c}).then( res=> {
        this.total = res.data.totalRow
        this.list = [] = res.data.qests
        this.$store.dispatch('page/setCount', res.data.count)
        this.$store.dispatch('page/setType', res.data.type || 0 )
        this.list.forEach(e=> {
          e.opentopic = false;
        })
        this.loading = false
      }).catch(()=> {
        this.loading = false
      })
    },
    addTopic(id) {
      if(this.changeTopic) {
        cacheRep({did: this.changeTopic, rid: id}).then(res=> {
          this.$message({
            message: '替换成功',
            type: 'success'
          })
          this.$store.dispatch('page/setTopic', '')
          this.$emit('changeTab')
        })
      } else {
        cacheAdd({id:id}).then( res => {
          this.$store.dispatch('page/setCount', res.data.count)
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.pageList()
        })
      } 
      
    }
  },
  created() {
    
    questTypes().then( res=> {
      let list = res.data
      for(let e in list) {
        let a = []
        let k = list[e]
        for(let i in k) {
          if(k[i].indexOf('>')>-1) {
            a.push(k[i].substr(0,k[i].indexOf('>')))
          } else {
            a.push(k[i])
          }
        }
        this.types.push({
          label: e,
          options: new Set([...a, ...[]])
        })
        a=[]
      }
      this.radio = '全部|'+this.types[0].label
      this.pageList()
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
  font-weight: bold;
  margin-right: 20px;
  width: 100px;
  vertical-align: top;
  text-align: right;
  display: inline-block;
}
.check-center {
  line-height: 36px;
}

.check-right {
  width: calc(100% - 130px);
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

.pageinat {
  margin: 30px 0;

}
.items-height {
  max-height: 200px;
  overflow: hidden;
}

.show-allheight{
  height: 100%;
  max-height: 100%;
  overflow: auto;
}
.show-topic-btn {
  float: right;
} 

.all-main {
  .all-main-list {
    position: relative;
  }
  .add-btn {
    position: absolute;
    top: 10px;
    right: 15px;
  }
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
    height: 40px;
    line-height: 40px;
    border-top: 1px dashed #D9D9D9;
    font-size:14px;
    font-weight:400;
    color:rgba(0,0,0,1);
    margin-top: 20px;
    span {
      margin-right: 40px;
    }
  }
}
.null-topic {
  width: 100%;
  border: 1px solid #D9D9D9;
  padding: 30px 0;
  text-align: center;
  background: #fff;
  margin-top: 30px;
  font-size:14px;
  font-weight:500;
  color:rgba(0,0,0,0.85);
}
.all-main-title {
  font-size:14px;
  font-weight:500;
  color:rgba(0,0,0,0.85);
  padding: 16px 0 6px;
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
  font-size: 14px;
  .audio-box {
    display: inline-block;
  }
}
.topic-title {
  font-size: 14px;
  font-weight: 700;
  line-height: 24px;
  text-align: center;
  margin-top: 20px;
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


