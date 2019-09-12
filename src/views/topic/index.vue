<template>
<div>
  <el-table
    :data="list"
    v-loading="loading"
    border
    size="mini"
    style="width: 100%; margin:10px; ">
    <el-table-column
      prop="name"
      label="试卷名称"
      min-width="160">
    </el-table-column>
    <el-table-column
      prop="createTime"
      label="创建时间"
      width="140">
    </el-table-column>
    <el-table-column
      prop="username"
      label="创建者"
      min-width="200">
    </el-table-column>
    <el-table-column
      prop="count"
      label="题目数">
    </el-table-column>
    <el-table-column
      prop="score"
      label="总分">
    </el-table-column>
    <el-table-column
      min-width="300"
      label="操作">
      <div slot-scope="scope">
        <a :href="exportWord1(scope.row.paperId)">
          <!-- <el-button type="text" size="mini" @click="exportWord(scope.row.paperId)"> -->
          <el-button type="text" size="mini">
            <svg-icon :icon-class="'word'" />
            导出word
          </el-button>
        </a>
        <a :href="exportWord1(scope.row.paperId,'again')">
          <!-- <el-button type="text" size="mini" @click="exportWord(scope.row.paperId)"> -->
          <el-button type="text" size="mini" style="color: #E6A23C">
            <svg-icon :icon-class="'change'"  />
            重新导出word
          </el-button>
        </a>
        <el-button type="text" size="mini" @click="toEdit(scope.row.paperId)">
          <svg-icon :icon-class="'form'" />
          编辑
        </el-button>
        <el-button type="text" size="mini" style="color: #ff3B30" @click="delPaper(scope.row.paperId)">
          <svg-icon :icon-class="'del'" />
          删除
        </el-button>
        <el-button type="text" size="mini" style="color: #ff3B30" @click="paperError(scope.row.paperId)">
          <svg-icon :icon-class="'remove'" />
          错误上报
        </el-button>
      </div>
    </el-table-column>
  </el-table>

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


  <el-dialog title="错误信息" :visible.sync="dialogFormVisible">
    <el-form :model="form" size="mini">
      <el-form-item label="word版本" :label-width="formLabelWidth">
        <el-input v-model="form.msg.version" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="其他信息" :label-width="formLabelWidth">
        <el-input v-model="form.msg.other" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false" size="mini">取 消</el-button>
      <el-button type="primary" @click="erroePost" size="mini">确 定</el-button>
    </div>
  </el-dialog>
</div>
  
</template>

<script>
import { myPaper, paperDel, paperInfo, paperEdit,paperError } from '@/api/mytopic'
import { mapGetters } from 'vuex'

export default {
  data(){
    return{
      loading: false,
      page: 1,
      total: 0,
      list : [],
      info: {},
      form:{
        msg:{
          version: '',
          other: '',
        },
        paperId: ''
      },
      dialogFormVisible: false,
      formLabelWidth: '120px;'
    }
  },
  computed: {
    ...mapGetters([
      'role'
    ])
  },
  created() {
    this.myList()
    paperInfo().then(res=> {
      this.info = res.data
    })
  },  
  methods: {
    paperError(id) {
      this.form.paperId = id
      this.dialogFormVisible = true
    },
    erroePost() {
      paperError(this.form).then(res=> {
        this.$message.success('提交成功')
        
        this.dialogFormVisible = false
        this.form = {
          msg:{
            version: '',
            other: '',
          },
          paperId: ''
        }
      })
    },
    exportWord(id) {
      const { ip, port, addr} = this.info
      let url = window.location.href
      let ports = url.substring(0, url.indexOf('/#'))
      let a = document.createElement('a')
      a.href =`${ports}${addr}?paperId=${id}`
      a.click();
    },
    exportWord1(id,again) {
      let url = window.location.href
      let ports = url.substring(0, url.indexOf('/#'))
      const { addr } = this.info
      let adds = ''
      if(again) {
        adds = '/front/paper/reBuild'
      } else {
        adds = addr
      }
      return `${ports}${adds}?paperId=${id}`
    },
    delPaper(id) {
      paperDel({id:id}).then(res=> {
        this.$notify({
          title: '提示信息',
          message: '删除成功',
          type: 'success'
        })
        this.myList()
      })
    },
    toEdit(id) {
      paperEdit({paperId: id}).then(res=> {
        this.$store.dispatch('page/setPaper', id).then(()=> {
          this.$router.push(this.role[0].children[0].path)
        })
      }).catch(() => {
        this.loading1 = false
      })
      
    },
    choosePage(current) {
			this.page = current
			this.myList()
		},
    myList() {
      this.loading = true
			myPaper({pageNumber: this.page,pageSize: 10}).then( res=> {
        if(!res.data.papers.length && this.page > 1) {
          this.page = Number(this.page) -1
          this.myList()
        } else {
          this.total = res.data.totalRow
          this.list = [] = res.data.papers
          this.loading = false
        } 
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .pageinat {
    margin: 20px 0;
  }
</style>
