<script setup>
import { ref, reactive } from 'vue';
import { ElMessage } from 'element-plus'
import userService from '@/services/user';

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

    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        {
            pattern: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
            message: '密码不能少于8位，必须包含字母和数字，不能有特殊字符',
            trigger: 'blur'
        }
    ],

    role: [
        //指定在表单项的值发生变化时触发验证（trigger: 'change'）
        { required: true, message: '请选择角色', trigger: 'change' }
    ],
}

const formRef = ref();
const formData = reactive({
    name: null,
    phone: null,
    password: null,
    role: null
})

async function addUser() {
    if (!formData.name || !formData.phone || !formData.password || !formData.role) {
        ElMessage({
            message: "params empty!",
            type: 'error',
        })
        return
    }
    console.log("name: ", formData.name, "phone: ", formData.phone, "password:", formData.password, "role:", formData.role)
    await userService.addUser({ name: formData.name, phone: formData.phone, password: formData.password, role: formData.role }).then(function (data) {
        if (data.code === 200) {
            ElMessage({
                message: '新建成功！',
                type: 'success',
            })
            setTimeout(() => {
                location.reload()
            }, 700)
        } else {
            ElMessage({
                message: '修改失败！',
                type: 'error',
            })
            console.log(data);
        }
    }).catch(function (error) {
        console.log(error);
    });
}

function resetForm() {
    formRef.value.resetFields();
};
</script>
<template>
    <div class="content-form-wrapper">
        <div class="content-form">
            <el-form ref="formRef" :model="formData" :rules="smsRules" status-icon label-position="top">
                <el-form-item label="用户名" prop="name">
                    <el-input type="text" placeholder="请输入用户名" v-model="formData.name" autocomplete="on"
                        class="form-input"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                    <el-input type="number" placeholder="请输入手机号" v-model="formData.phone" autocomplete="on"
                        class="form-input"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="text" placeholder="请输入密码" v-model="formData.password" autocomplete="on"
                        class="form-input"></el-input>
                </el-form-item>
                <el-form-item label="角色" prop="role">
                    <el-select v-model="formData.role" placeholder="请选择角色" autocomplete="on" class="form-select">
                        <el-option label="管理员" value="1" />
                        <el-option label="销售员" value="2" />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <a-button class="form-btn form-btn-submit" style="margin-right: 8px;" type="primary"
                        @click="addUser">提
                        交</a-button>
                    <a-button class="form-btn form-btn-reset" @click="resetForm">重 置</a-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<style type="text/css" lang="less" scoped>
.content-form-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    box-sizing: border-box;
}

.content-form {
    text-align: center;
    width: 400px;
    margin: 40px auto;
}

.form-btn {
    transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.form-btn-submit {
    background-color: #000;
    color: #fff;

    &:hover {
        background-color: #000;
        color: #ffd04b;
        cursor: pointer;
    }
}

.form-btn-reset {
    // background-color: #000;
    // color: #fff;

    &:hover {
        // border-color: #ffd04b;
        color: #000;
        border-color: #000;
        box-shadow: 0 0 0 2px rgba(4, 13, 19, 0.1);
        cursor: pointer;
    }
}
</style>

<style lang="less">
.el-input__wrapper.is-focus {
    border-color: #000 !important;
    box-shadow: 0 0 0 2px rgba(4, 13, 19, 0.1);
}
.el-select__wrapper.is-focused.el-tooltip__trigger.el-tooltip__trigger{
    border-color: #000 !important;
    box-shadow: 0 0 0 2px rgba(4, 13, 19, 0.1);
}
</style>