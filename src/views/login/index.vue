<template>
  <div class="login-container">
    <el-form size="mini" ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">外研社新标准英语测评系统</h3>
      </div>

      <div class="login-table">
        <p>
          <span :class="loginCheck == 'login' ? 'hover' : ''" name="login" @click="tabLogin('login')">已有账户登录</span>
        </p>
        <p>
          <span :class="loginCheck == 'newlogin' ? 'hover' : ''" name="newlogin"  @click="tabLogin('newlogin')">新用户注册</span>
        </p>
      </div>

      <div v-if="loginCheck == 'login'" class="login-input">
        <el-form-item prop="username" >
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="账户"
            name="username"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>

        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="密码"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>

        <div class="user-action">
          <p>不登录,先逛逛</p>
          <p>忘记密码</p>
        </div>

        <el-button :loading="loading" size="small" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>
      
        
      </div>
      <div v-else-if="loginCheck == 'newlogin'" class="sign-input" >
        <el-form-item prop="emial" >
          <el-input
            ref="email"
            v-model="signForm.emial"
            placeholder="邮箱"
            name="email"
            type="email"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>
        <el-form-item prop="pass" >
          <el-input
            ref="pass"
            v-model="signForm.password"
            placeholder="6-16位密码，区分大小写"
            name="pass"
            type="password"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>
        <el-form-item prop="confirmPass" >
          <el-input
            ref="confirmPass"
            v-model="signForm.confirmPass"
            placeholder="确认密码"
            name="confirmPass"
            type="password"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>
        <el-select class="school" v-model="signForm.school" placeholder="选择学校" size="small">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <div class="area-code">
          <el-input placeholder="11位手机号" 
            size="small"
            ref="phone"
            name="phone"
            type="tel"
            tabindex="1"
            auto-complete="on" 
            v-model="signForm.phone" 
            maxlength="11"
            >
            <el-select v-model="select" slot="prepend" placeholder="请选择">
              <el-option label="+86" value="1"></el-option>
              <el-option label="+86" value="2"></el-option>
              <el-option label="+86" value="3"></el-option>
            </el-select>
          </el-input>
        </div>
        
        <div class="code">
          <el-form-item prop="code" class="code-number">
            <el-input
              ref="code"
              v-model="signForm.code"
              placeholder="输入验证码"
              name="code"
              type="text"
              tabindex="1"
              auto-complete="on"
            />
          </el-form-item>
          <el-form-item class="code-btn" :class="codeSend ? 'sends' : ''">
            <el-button  type="primary" @click.native.prevent="getCode" v-text="codeText"></el-button>
          </el-form-item>
          
        </div>
        

        <el-button size="small" :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleSign">注册</el-button>
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
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      select: '1',
      codeText: '获取验证码',
      codeSend: false,
      //登录
      loginForm: {
        username: 'admin',
        password: '111111'
      },
      //注册
      signForm: {
        email: '',
        password: '',
        confirmPass: '',
        school:'',
        phone: '',
        code: ''
      },
      //input 规则
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      loginCheck: 'login'
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    tabLogin(name) {
      this.loginCheck = name
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    getCode() {
      if(this.codeSend) {
        return
      } else if(validPhone(this.signForm.phone)) {
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
      } else {
        this.$notify({
          title: '提示信息',
          message: '请输入正确的手机号',
          type: 'error'
        })
      }
    },

    //登录
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
              this.$store.dispatch('user/getInfo').then(res=> {
                this.$store.dispatch('user/getRole').then(res=> {
                  this.$router.addRoutes(res) //动态添加路由
                  this.$router.push({ path: this.redirect || '/' })
                  this.loading = false
                  // next({ ...to, replace: true })
                })
              })
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    //注册
    handleSign() {
      var msg = null
      for(var i in this.signForm) {
          if(!this.signForm[i]) {
              msg = '资料不能为空'
          }

          if(i == 'email') {
              if(!validEmail(this.signForm[i])) {
                  msg = '邮箱格式错误'
              }
          }

          if(i == 'password') {
            if(!validPass(this.signForm[i])) {
                msg = '请输入6-16位密码，区分大小写'
            } else if(this.signForm.password!= this.signForm.confirmPass) {
                msg = '密码不一致，请重新输入'
            }
          }
      }

      if(msg) {
          this.$message.error(msg)
          return false
      }

      console.log(this.signForm)
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #000;
$fc: rgb(24, 144, 255);

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor !important;
  }
  .el-form-item.is-success .el-input__inner {
    border-color: $fc !important;
  }
}

/* reset element-ui css */
.login-input {
  .el-input {
    display: inline-block;
    height: 32px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 5px 5px 5px 15px;
      color: $light_gray;
      height: 32px;
      caret-color: $light_gray;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $light_gray inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid #ccc;
    // background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}

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
      width: 70px;
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
    width: 400px;
    max-width: 100%;
    padding: 10% 35px 0;
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
      font-size: 24px;
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
  width: 328px;
  font-size: 12px;
  color: rgb(117, 117, 117);
  p:nth-child(1) {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  p:nth-child(2) {
    text-align: center;
  }

}
</style>
