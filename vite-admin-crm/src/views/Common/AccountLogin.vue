<script setup>
import { useRouter } from 'vue-router'
import { ref, reactive, onMounted } from 'vue';
import { ElMessage } from 'element-plus'
import loginService from '@/services/login'
import Cookies from 'js-cookie';
import BasicLayoutFooter from '@/components/layout/BasicLayoutFooter.vue';

const router = useRouter();


onMounted(() => {
  const TOKEN_KEY = 'web_token';
  const token = Cookies.get(TOKEN_KEY);
  // console.log('有cookie，要跳转，token：', token)
  if (token) {
    router.push({ name: 'Root' })
  }
})

var phoneIsActive = ref(true);
var accountIsActive = ref(false);
function phoneActive() {
  phoneIsActive.value = true
  accountIsActive.value = false
}
function accountActive() {
  accountIsActive.value = true
  phoneIsActive.value = false
}

//smsRules用于验证手机号和验证码的规则
const smsRules = {
  //定义了验证手机号的规则
  phone: [
    //第一个规则对象指定了是必填项，并指定当输入框失去焦点时触发验证（trigger: 'blur'）。当手机号为空时，显示的错误提示信息:'请输入手机号'
    { required: true, message: '请输入手机号', trigger: 'blur' },
    //指定手机号的正则表达式模式（pattern），同样在输入框失去焦点时触发验证。
    {
      pattern: /^1[3456789]\d{9}$/, //正则表达式
      message: '目前只支持中国大陆的手机号码',//当手机号格式不符合要求时，显示的错误提示信息。
      trigger: 'blur'
    }
  ],
  //定义了验证验证码的规则
  code: [
    //这个规则对象同样指定了必填项，并在输入框失去焦点时触发验证,当验证码为空时，显示的错误提示信息:'请输入验证码'
    { required: true, message: '请输入验证码', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      message: '密码不能少于8位，必须包含字母和数字，不能有特殊字符',
      trigger: 'blur'
    }
  ],
}

const formData = reactive({
  code: null,
  phone: null,
  password: null,
  checked: false
})

const canSendSms = ref(true);
const smsText = ref('发送验证码')
const smsDisabled = ref(false)

function handleSmsCode() {
  // 创建一个长度为 5 的 Uint32Array 数组
  var randomValues = Math.floor(Math.random() * 100000);
  // 打印生成的随机数
  if (canSendSms.value) {
    canSendSms.value = false;
    let seconds = 10;
    smsText.value = `${seconds} 秒后重新发送`;
    setTimeout(() => {
      // 发送验证码
      ElMessage({
        message: `获取验证码成功，验证码为：${randomValues}`,
        type: 'success',
      })
    }, 1000);
    //使用 setInterval 创建的定时器, 每隔一秒（1000毫秒）执行一次匿名函数
    const timer = setInterval(() => {
      seconds--;
      if (seconds <= 0) {
        //调用 clearInterval(timer) 将会停止名为 timer 的定时器
        clearInterval(timer);
        canSendSms.value = true;
        smsText.value = '获取验证码';
      } else {
        smsText.value = `${seconds} 秒后重新发送`;
      }
    }, 1000);

  }
}
function handlePhoneSubmit() {
  var phone = formData.phone;
  var code = formData.code;
  if (!phone || !code) {
    ElMessage({
      message: "params empty!",
      type: 'error',
    })
    return
  }
  loginService.phoneLogin({ phone }).then(function (data) {
    if (data.code === 200) {
      // console.log('登录响应data：', data)
      // console.log('登录data.token：', data.token)
      Cookies.set('web_token', data.token, { expires: 60 })
      ElMessage({
        message: '登录成功！',
        type: 'success',
      })
      setTimeout(() => {
        location.reload()
      }, 700)
    } else {
      ElMessage({
        message: "登陆失败，没有该用户",
        type: 'error',
      })
      console.log(data)
    }
    // console.log('接收到的响应：', msg)
  }).catch(function (error) {
    console.log(error);
  })
}

function handleAccountSubmit() {
  var phone = formData.phone;
  var password = formData.password;
  if (!phone || !password) {
    ElMessage({
      message: "params empty!",
      type: 'error',
    })
    return
  }
  loginService.accountLogin({ phone, password }).then(function (data) {
    if (data.code === 200) {
      // console.log('登录响应data：', data)
      // console.log('登录data.token：', data.token)
      Cookies.set('web_token', data.token, { expires: 60 })
      ElMessage({
        message: '登录成功！',
        type: 'success',
      })
      setTimeout(() => {
        location.reload()
      }, 700)
    } else {
      ElMessage({
        message: "登陆失败，没有该用户",
        type: 'error',
      })
      console.log(data)
    }
    // console.log('接收到的响应：', msg)
  }).catch(function (error) {
    console.log(error);
  })
}

</script>
<template>
  <div class="login-page">
    <div class="page-header">
      <a class="header-logo-container" href="https://www.mercedes-benz.com.cn/homepage.html">
        <img class="header-logo" src="/images/header.png">
      </a>
    </div>
    <div class="page-mainer">
      <div class="page-mainer-company">
        <div class="pmc-title"></div>
      </div>
      <div class="page-mainer-form">
        <div class="change-form-list">
          <div :class="{ 'active': phoneIsActive }" class="change-form-item" @click="phoneActive">手机号登录</div>
          <div :class="{ 'active': accountIsActive }" class="change-form-item" @click="accountActive">账户密码登录</div>
        </div>
        <div class="login-form login-form-phone" v-show="phoneIsActive">
          <!-- Element UI 的表单组件 将表单组件与 formData 数据对象进行双向数据绑定，指定表单的验证规则为 smsRules 对象， -->
          <el-form :model="formData" :rules="smsRules">
            <!-- prop 属性：指定表单项的字段名，用于验证规则的匹配。 -->
            <el-form-item prop="phone">
              <!-- Element UI 的输入框组件，autocomplete="off"关闭自动填充功能 -->
              <el-input type="number" placeholder="请输手机号" v-model="formData.phone" autocomplete="on"></el-input>
            </el-form-item>
            <el-form-item prop="code">
              <!-- <el-col>：Element UI 的栅格布局组件，用于实现表单项的布局；:span="14"：指定栅格列的宽度比例，这里表示该栅格宽度为14个列 -->
              <el-col :span="14">
                <el-input type="text" placeholder="请输入验证码" v-model="formData.code" autocomplete="off"></el-input>
              </el-col>
              <el-col :span="1"> </el-col>
              <el-col :span="5">
                <a-button :disabled="!canSendSms" :smsDisabled="smsDisabled" @click="handleSmsCode"
                  class="login-form-smsText">{{ smsText
                  }}</a-button>
              </el-col>
            </el-form-item>
            <div style="display: flex; justify-content: space-between;">
              <el-form-item prop="checked">
                <el-checkbox v-model="formData.checked" class="login-form-auto" fill="#00ADEF">自动登录</el-checkbox>
              </el-form-item>
              <a class="login-form-forget">忘记密码 ?</a>
            </div>
            <el-form-item>
              <!-- type="primary"：设置按钮的样式为主要样式 -->
              <a-button style="width: 100%" type="primary" @click="handlePhoneSubmit"
                class="login-form-loginBtn">登录</a-button>
            </el-form-item>
          </el-form>
        </div>

        <div class="login-form login-form-account" v-show="accountIsActive">
          <el-form :model="formData" :rules="smsRules">
            <el-form-item prop="phone">
              <el-input type="number" placeholder="请输手机号" v-model="formData.phone" autocomplete="on"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-col :span="24">
                <el-input type="text" placeholder="请输入密码" v-model="formData.password" autocomplete="on"></el-input>
              </el-col>
            </el-form-item>
            <div style="display: flex; justify-content: space-between;">
              <el-form-item prop="checked">
                <el-checkbox v-model="formData.checked" class="login-form-auto" fill="#00ADEF">自动登录</el-checkbox>
              </el-form-item>
              <a class="login-form-forget">忘记密码 ?</a>
            </div>
            <el-form-item>
              <a-button style="width: 100%" type="primary" @click="handleAccountSubmit"
                class="login-form-loginBtn">登录</a-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <BasicLayoutFooter />
  </div>
</template>

<style lang="less" scoped>
.login-page {
  // color: #00ADEF;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: url("images/login-bg.jpg") no-repeat top / cover;
  // padding-top: 130px;
  box-sizing: border-box;
}

.page-header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  min-width: 1366px;
  padding: 10px 7% 10px 7%;
  background: #000;
}

.header-logo-container {
  margin-top: 6px;
  font-size: 0;
}

.header-logo {
  width: 260px;
  height: 64px;
}

.page-mainer {
  // flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: fit-content;
  height: fit-content;
  margin: auto;
  padding: 30px 50px;
  // background-color: aliceblue;
  background: #fff;
  // opacity: 0.8;
}

.page-mainer-company {
  width: 100%;
  text-align: center;

  .pmc-title {
    height: 32px;
    width: 180px;
    background: url("images/login-title.png") no-repeat;
    background-size: 100% 100%;
    margin: 0 auto;
    margin-top: 10px;
    margin-bottom: 30px;
    // font-family: PingFangSC, Avenir, Helvetica, "Microsoft YaHei", 微软雅黑, Arial, sans-serif;
  }
}

.change-form-list {
  display: flex;
  justify-content: center;
  height: 46px;
  margin-bottom: 16px;
  border-bottom: 1px solid #d8d4d4
}

.change-form-item {
  line-height: 46px;
  cursor: pointer;
  transition: color 0.3s, opacity 0.3s;

  &:not(.active):hover {
    color: #00ADEF;
    // opacity: 0.6;
    // font-weight: 600;
  }

  &:last-child {
    margin-left: 32px;
  }

  &.active {
    color: #00ADEF;
    text-shadow: 0 0 0.25px currentcolor;
    border-bottom: 2px solid #00ADEF;
  }
}

.form-container {
  text-align: center;
  max-width: 388px;
  margin: 40px auto;
  flex: 1;
}

.login-form {
  min-width: 328px;
}

.login-form-smsText,
.login-form-loginBtn {
  transition: color 0.3s, opacity 0.3s, border 0.3s;
}

.login-form-loginBtn {
  background-color: #00ADEF;

  &:hover {
    background-color: #53c6f4;
    // background: #333;
    // opacity: 0.6;
  }
}

.login-form-smsText {
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.02);

  &:hover {
    color: #00ADEF;
    border: 1px solid #00ADEF;
    // opacity: 0.6;
  }
}

.login-form-forget {
  height: 32px;
  font-size: 14px;
  margin-bottom: 18px;
  line-height: 32px;
  color: #00ADEF;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #6bcef5;
  }
}

// .ant-btn{
//   cursor: pointer;
// }

</style>
<style lang="less">
.login-form-auto .el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  border-color: #00ADEF !important;
  background-color: #00ADEF !important;
}

.login-form-auto .el-checkbox__input.is-focus .el-checkbox__inner {
  border-color: #00ADEF !important;
}

.login-form-auto .el-checkbox__input .el-checkbox__inner:hover {
  border-color: #00ADEF !important;
}


.login-form-auto .el-checkbox__input.is-checked+.el-checkbox__label {
  color: #00ADEF !important;
}
</style>
