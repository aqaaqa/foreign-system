<template>
  <div class="login-container">
    <p class="titles">修改密码</p>
    <el-form size="mini" ref="loginForm" class="login-form" auto-complete="on" label-position="left">
      <div class="sign-input" >
        <el-form-item prop="pass" >
          <el-input
            ref="pass"
            maxlength="16"
            v-model="pass.oldpass"
            placeholder="旧密码"
            name="pass"
            type="password"
            tabindex="1"
            auto-complete="off"
          />
        </el-form-item>
        <el-form-item prop="pass" >
          <el-input
            ref="pass"
            maxlength="16"
            v-model="pass.password"
            placeholder="新的密码6-16位密码，可包含数字字母"
            name="pass"
            type="password"
            tabindex="1"
            auto-complete="off"
          />
        </el-form-item>
        <el-form-item prop="confirmPass" >
          <el-input
            maxlength="16"
            ref="confirmPass"
            v-model="pass.confirm"
            placeholder="确认密码"
            name="confirmPass"
            type="password"
            tabindex="1"
            auto-complete="off"
          />
        </el-form-item>
        <el-button size="small" :loading="loading" type="primary" style="float:right;margin-bottom:30px;" @click.native.prevent="handlepass">确定</el-button>
      </div>
    </el-form>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { validUsername, validPhone, validEmail, validPass } from '@/utils/validate'
import { getObjArr, saveObjArr } from '@/utils/role'
import { updatePasswordUser } from '@/api/user'

export default {
  name: 'Login',
  data() {
    return {
      pass: {
        userId: '',
        oldpass: '',
        password: '',
        confirm: ''
      },
      loading: false,
    }
  },
  computed: {
    ...mapGetters([
      'token',
    ])
  },
  methods: {
    handlepass() {
      var msg = null
      for(var i in this.pass) {
        if(!this.pass[i] && i!='userId') {
            msg = '资料不能为空'
        }
        if(i == 'password') {
          if(!validPass(this.pass[i])) {
              msg = '请输入6-16位密码，可包含数字字母'
          } else if(this.pass.password!= this.pass.confirm) {
              msg = '密码不一致，请重新输入'
          }
        }
      }
      if(msg) {
          this.$message.error(msg)
          return false
      }
      this.pass.userId = this.token
      updatePasswordUser(this.pass).then( res=> {
        this.$notify({
          title: '提示信息',
          message: '密码修改成功',
          type: 'success'
        })
        this.$router.replace('/index')        
      })
    }
  }
}
</script>

<style lang="scss">
/* reset element-ui css */
.sign-input {
  .school.el-select {
    width: 100%;
    margin-bottom: 14px;
  }
  .el-input {
    height: 32px;
    .el-input__inner {
      height: 32px;
      line-height: 32px;
    }
  }
  .area-code {
    margin-bottom: 14px;
    .el-input-group__prepend {
      background: #fff;
      width: 80px;
    }
  }
  
}

.code {
  display: flex;
  justify-content: space-around;
  align-items: center;
  .code-number {
    flex-basis: 80%;
    margin-right: 10px;
    .el-input--mini .el-input__inner{
      height: 32px;
      line-height: 32px;
    }
  }
  .code-btn {
    margin-top: -2px;
    .el-button--mini {
      padding: 8px 15px;
      width: 120px;
    }
    
  }
  .sends {
    .el-button--mini {
      background: #ccc;
      border-color: #ccc;
    }
  }
}
</style>

<style lang="scss" scoped>
$bg:#fff;
$dark_gray:#889aa4;
$light_gray:#eee;
$fc: rgb(24, 144, 255);

.titles {
  font-size: 16px;
  padding: 10px 20px;
  
}
.login-container {
  min-height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;

  .login-form {
    width: 500px;
    padding: 10px 20px 0;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 0px 5px 0px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 16px;
      color: rgb(73, 73, 73);
      margin: 0px auto 30px auto;
      text-align: center;
      font-weight: normal;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 3px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}

/*login tab切换*/
.login-table {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  margin-bottom: 20px;
  font-size: 16px;
  p {
    flex: 1;
    text-align: center;
    color:#000;
  }
  span {
    display: inline-block;
    padding: 0 20px;
    height: 46px;
    line-height: 46px;
    cursor: pointer;
  }
  span.hover {
    color: $fc;
    border-bottom: 3px solid $fc;
  }
}

/*逛逛*/
.user-action {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 20px;
  height:24px;
  p {
    flex: 1;
    font-size: 14px;
    color: $fc;
    cursor: pointer;
  }
  p:nth-child(2) {
    text-align: right;
  }
}


/*底部*/
.login-bottom {
  position: fixed;
  bottom: 20px;
  left:0;
  right: 0;
  margin: 0 auto;
  width: 328px;
  font-size: 12px;
  color: rgb(117, 117, 117);
  p:nth-child(1) {
    display: flex;
    align-items: center;
    justify-content: space-around;
    line-height: 30px;
  }
  p:nth-child(2) {
    text-align: center;
    line-height: 30px;
  }

}
</style>
