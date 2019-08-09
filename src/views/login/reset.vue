<template>
  <div class="login-container">
    <el-form size="mini" ref="loginForm" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">忘记密码</h3>
      </div>

      <el-steps :active="active" simple style="margin-bottom: 20px">
        <el-step title="1. 确认账号" ></el-step>
        <el-step title="2. 重置密码" ></el-step>
      </el-steps>
      <div v-if="active == 1" class="sign-input" >
        <div class="area-code">
          <el-input placeholder="11位手机号" 
            size="small"
            ref="phone"
            name="phone"
            type="tel"
            tabindex="1"
            auto-complete="off" 
            v-model="signForm.mobile" 
            maxlength="11"
            >
          </el-input>
        </div>
        <div class="code">
          <el-form-item prop="code" class="code-number">
            <el-input
              ref="code"
              v-model="signForm.picCode"
              placeholder="输入图片验证码"
              name="code"
              type="text"
              tabindex="1"
              auto-complete="off"
            />
          </el-form-item>
          <img style=" margin-right: 10px; margin-bottom: 15px;" :src="'data:image/jpg;base64,'+img">
          <el-form-item class="code-btn" >
            <el-button  type="primary" @click.native.prevent="imageCode">换一个</el-button>
          </el-form-item>
          
        </div>
        <div class="code">
          <el-form-item prop="code" class="code-number">
            <el-input
              ref="code"
              v-model="signForm.captcha"
              placeholder="输入验证码"
              name="code"
              type="text"
              tabindex="1"
              auto-complete="off"
            />
          </el-form-item>
          <el-form-item class="code-btn" :class="codeSend ? 'sends' : ''">
            <el-button  type="primary" @click.native.prevent="getCode" v-text="codeText"></el-button>
          </el-form-item>
        </div>
        <el-button size="small" :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleNext">下一步</el-button>
      </div>

      <!-- 步骤2 -->
      <div v-else-if="active == 2" class="sign-input" >
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
        <el-button size="small" :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handlepass">确定</el-button>
      </div>

      <div class="login-bottom">
        <p>
          <span>帮助</span>
          <span>隐私</span>
          <span>条款</span>
        </p>
        <p>copyright © 2019 汇智明德(北京)教育科技有限公司 出品</p>
      </div>
    </el-form>

  </div>
</template>

<script>
import { validUsername, validPhone, validEmail, validPass } from '@/utils/validate'
import { getObjArr, saveObjArr } from '@/utils/role'
import { imageCode, smsUdpass, confirmPhone, updatePassword } from '@/api/user'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        // callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        // callback(new Error('密码长度不能小于6位'))
      } else {
        callback()
      }
    }
    return {
      active: 1,
      codeText: '获取验证码',
      codeSend: false,
      //注册
      signForm: {
        mobile: '',
        captcha: '',
        picCode: ''
      },
      pass: {
        userId:'',
        password: '',
        confirm: ''
      },
      loading: false,
      img: '',
    }
  },
  watch: {
    
  },
  created() {
    this.imageCode()
  },
  methods: {
    imageCode() {
      imageCode().then(res => {
        this.img = res.data
      })
    },
    getCode() {
      if(this.codeSend) {
        return
      } else if(!this.signForm.picCode) {
        this.$notify({
          title: '提示信息',
          message: '请输入图片验证码',
          type: 'error'
        })
      } else if(validPhone(this.signForm.mobile) && this.signForm.picCode) {
        smsUdpass({mobile: this.signForm.mobile,picCode: this.signForm.picCode}).then( res=> {
          this.$notify({
            title: '提示信息',
            message: '验证码发送成功，请注意查收',
            type: 'success'
          })
          this.codeSend = true
          let _this = this;
          var num = 60, 
          time = setInterval(function () {
            num--;
            _this.codeText = num+'秒后，重新发送';
            if (num <= 0) {
              clearInterval(time);
              _this.codeText = '重新发送';
              _this.codeSend = false;
            }
          }, 1000);
        })
      } else {
        this.$notify({
          title: '提示信息',
          message: '请输入正确的手机号',
          type: 'error'
        })
      }
    },

    //下一步
    handleNext() {
      var msg = null
      for(var i in this.signForm) {
        if(!this.signForm[i]) {
            msg = '资料不能为空'
        }
        if(i == 'password') {
          if(!validPass(this.signForm[i])) {
              msg = '请输入6-16位密码，可包含数字字母'
          } else if(this.signForm.password!= this.signForm.confirm) {
              msg = '密码不一致，请重新输入'
          }
        }
      }
      if(msg) {
        this.$message.error(msg)
        return false
      }

      confirmPhone(this.signForm).then( res=> {
        this.pass.userId = res.data.user.userId
        // this.pass.userId = '47'
        this.active = 2
      })
    },

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

      updatePassword(this.pass).then( res=> {
        this.$notify({
          title: '提示信息',
          message: '密码修改成功',
          type: 'success'
        })
        this.$router.replace('/login')        
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

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  position: relative;

  .login-form {
    position: relative;
    width: 500px;
    max-width: 100%;
    padding: 5% 35px 0;
    margin: 0 auto;
    overflow: hidden;
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
