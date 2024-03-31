<script setup>
import { ref, reactive } from 'vue';
import { useStore } from '@/stores/index.js';
import { ElMessage} from 'element-plus'
import roleService from '@/services/role';

const store = useStore();

var allPermissions = store.allPermissions;

const smsRules = {
    name: [
        { required: true, message: '请输入用户名', trigger: 'blur' }
    ],

    slug: [
        { required: true, message: '请输入展示名称', trigger: 'blur' },
    ],

    desc: [
        { required: true, message: '请输入描述', trigger: 'blur' },
    ],

    permissions: [
        { required: true, message: '请选择权限', trigger: 'change' }
    ],
}

const formRef = ref();
const formData = reactive({
    name: null,
    slug: null,
    desc: null,
    permissions: []
})

async function addRole() {
    if (!formData.name || !formData.slug || !formData.desc || !formData.permissions) {
        ElMessage({
            message: "params empty!",
            type: 'error',
        })
    }
    console.log('allPermissions:', allPermissions)
    console.log("name: ", formData.name, "slug: ", formData.slug, "desc:", formData.desc, "permissions:", formData.permissions)
    try {
        const data = await roleService.addRole({
            name: formData.name,
            slug: formData.slug,
            describe: formData.desc,
            permissions: JSON.stringify(formData.permissions)
        });

        if (data.code === 200) {
            ElMessage({
                message: '新建成功！',
                type: 'success',
            })
            setTimeout(() => {
                location.reload()
            }, 700)
        } else {
            console.log(data);
        }
    } catch (error) {
        console.log(error);
    }
}

function resetForm() {
    formRef.value.resetFields();
};
</script>
<template>
    <div class="content-form-wrapper">
        <div class="content-form">
            <el-form ref="formRef" :model="formData" :rules="smsRules" status-icon label-position="top">
                <el-form-item prop="name" label="用户名">
                    <el-input v-model="formData.name" type="text" placeholder="请输入用户名" autocomplete="on"></el-input>
                </el-form-item>
                <el-form-item prop="slug" label="展示名称">
                    <el-input v-model="formData.slug" type="text" placeholder="请输入展示名称" autocomplete="on"></el-input>
                </el-form-item>
                <el-form-item prop="desc" label="描述">
                    <el-input v-model="formData.desc" type="textarea" placeholder="请输入描述" autocomplete="on" />
                </el-form-item>
                <el-form-item prop="permissions" label="权限">
                    <el-checkbox-group v-model="formData.permissions" class="checkbox-grid">
                        <el-checkbox v-for="permission in allPermissions" :value="permission.id" name="type"
                            :key="permission.id" class="checkbox-permission">
                            {{ permission.name }}
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item>
                    <a-button class="form-btn form-btn-submit" style="margin-right: 8px;" type="primary" @click="addRole" >提
                        交</a-button>
                    <a-button class="form-btn form-btn-reset" @click="resetForm" >重 置</a-button>
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

.checkbox-grid {
    display: grid;
    grid-template-columns: repeat(3, auto);
    gap: 10px;
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
.el-textarea__inner:focus  {
    border-color: #000 !important;
    box-shadow: 0 0 0 2px rgba(4, 13, 19, 0.1);
}


.checkbox-permission .el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  border-color: #7d7c7c!important;
  background-color: #7d7c7c!important;
}

.checkbox-permission .el-checkbox__input.is-focus .el-checkbox__inner {
  border-color: #7d7c7c!important;
}

.checkbox-permission .el-checkbox__input .el-checkbox__inner:hover {
  border-color: #7d7c7c !important;
}


.checkbox-permission .el-checkbox__input.is-checked+.el-checkbox__label {
  color: #000 !important;
}
</style>