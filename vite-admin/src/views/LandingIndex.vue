<script setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, reactive, onMounted } from 'vue';
import { ElMessage } from 'element-plus'
import clueService from '@/services/clue'
import Cookies from 'js-cookie';
import BasicLayoutFooter from '@/components/layout/BasicLayoutFooter.vue';

const router = useRouter();
const route = useRoute();

const smsRules = {
    name: [
        { required: true, message: '请输入用户名', trigger: 'blur' }
    ],
    phone: [
        { required: true, message: '请输入手机号', trigger: 'blur' },
        {
            pattern: /^1[3456789]\d{9}$/,
            message: '目前只支持中国大陆的手机号码',
            trigger: 'blur'
        }
    ],
}

const formData = reactive({
    name: null,
    phone: null,
})

onMounted(() => {
    const queryParams = route.query;

    // 检查是否存在 utm 参数
    if (!('utm' in queryParams)) {
        // 如果不存在 utm 参数，则添加 utm='google'
        const newQueryParams = { ...queryParams, utm: 'google' };

        // 使用 router.replace 更新 URL，保留原来的历史记录
        router.replace({ query: newQueryParams });
    }

})

function handleSubmit() {
    var phone = formData.phone;
    var name = formData.name;
    var utm = route.query.utm;
    if (!phone || !name || !utm) {
        ElMessage({
            message: "params empty!",
            type: 'error',
        })
        return
    }
    console.log('utm', utm)
    clueService.addClue({ name, phone, utm }).then(function (data) {
        if (data.code === 200) {
            ElMessage({
                message: '提交成功！',
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
    }).catch(function (error) {
        console.log(error);
    })
}

</script>
<template>
    <div class="landing-page">
        <div class="page-header">
            <a class="header-logo-container" href="https://www.mercedes-benz.com.cn/homepage.html">
                <img class="header-logo" src="/images/header.png">
            </a>
        </div>
        <div class="page-mainer">
            <div class="page-body-title">
                <div class="pbt-header">预约试驾</div>
                <div class="pbt-ft">欢迎在线预约试驾。</div>
            </div>
            <div class="page-mainer-form">
                <el-form :model="formData" :rules="smsRules" status-icon label-position="top" class="landing-form">
                    <el-form-item prop="name" label="姓名" class="landing-form-item">
                        <el-input type="text" placeholder="请输入您的名字" v-model="formData.name"
                            autocomplete="on"></el-input>
                    </el-form-item>
                    <el-form-item prop="phone" label="手机号" class="landing-form-item">
                        <el-input type="number" placeholder="请输入您的手机号" v-model="formData.phone"
                            autocomplete="on"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <a-button style="width: 100%" type="primary" @click="handleSubmit"
                            class="form-btn">提交</a-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <BasicLayoutFooter />
    </div>
</template>

<style lang="less" scoped>
.landing-page {
    // color: #00ADEF;
    height: 100vh;
    width: 100%;
    min-width: fit-content;
    display: flex;
    flex-direction: column;
    background: url("images/index-bg.jpg") no-repeat top / cover;
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
    flex: 1;
    display: flex;
    justify-content: space-between;
    // align-items: center;
    // flex-direction: column;
    // width: fit-content;
    // height: fit-content;
    // margin: auto;
    // padding: 30px 50px;
    // background-color: aliceblue;
    // background: #fff;
    // opacity: 0.8;
    padding: 0 12.5%;
    justify-content: space-between;
}

.pbt-header {
    position: relative;
    padding: 70px 0 30px 0px;
    min-width: 226px;
    background-image: -webkit-linear-gradient(top, #fff, #ccc);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-family: "MB_HYZS", "DaimlerCA-Regular", "SimSun", "STSong", serif;
    font-size: 45px;
    line-height: 1em;
    font-weight: 600;
    letter-spacing: 4px;
}

.pbt-header::after {
    content: "";
    position: absolute;
    width: 72.85px;
    height: 2px;
    bottom: 0px;
    left: 0;
    right: unset;
    top: unset;
    background-color: #fff;
}

.pbt-ft {
    margin-top: 32px;
    font-family: "PingFang SC", "Hiragino Sans GB", "Noto Sans CJK SC", "Source Han Sans SC", "Microsoft YaHei", "SimHei", Helvetica, Arial;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: rgba(255, 255, 255, 0.66);
}

.landing-form {
    min-width: 380px;
}

.form-btn {
    background-color: #000;
    color: #fff;
    border: 1.4px solid #fff;
    transition: color 0.3s, opacity 0.3s, border 0.3s;

    &:hover {
        background-color: #000;
        color: #ffd04b;
        border-color: #ffd04b;
        cursor: pointer;
    }
}

</style>
<style lang="less">
.landing-form-item .el-form-item__label{
    color: #bfbfbf !important;
}

.landing-form .el-input__wrapper{
    transition: all 0.3s;
}

.landing-form .el-input__wrapper:hover {
    border: 1.4px solid #ffd04b  !important;
}

.landing-form .el-input__wrapper.is-focus {
    border: 2px solid #ffd04b  !important;
    box-shadow: 0 0 0 2px rgba(215, 203, 133, 0.1);
}
.landing-form .el-select__wrapper.is-focused.el-tooltip__trigger.el-tooltip__trigger{
    border: 2px solid #ffd04b  !important;
    box-shadow: 0 0 0 2px rgba(215, 203, 133, 0.1);
}
</style>
