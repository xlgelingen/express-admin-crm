<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getEditRole } from '@/utils/role.js'
import { useStore } from '@/stores/index.js';
import { ElMessage } from 'element-plus'
import roleService from '@/services/role';


const store = useStore();
const router = useRouter();

const route = useRoute();
const roleId = ref(route.params.id);

var allPermissions = store.allPermissions;

var editRole = reactive({});
const originRole = reactive({});

onMounted(async () => {
    try {
        var roleInfo = await getEditRole({ id: roleId.value });
        Object.assign(originRole, roleInfo);
        Object.assign(editRole, roleInfo)
        console.log('角色编辑/ editRole', editRole);
    } catch (error) {
        console.error('获取编辑角色信息失败：', error);
    }
});

const smsRules = {
    name: [
        { required: true, message: '请输入用户名', trigger: 'blur' }
    ],

    slug: [
        { required: true, message: '请输入展示名称', trigger: 'blur' },
    ],

    describe: [
        { required: true, message: '请输入描述', trigger: 'blur' },
    ],

    permissions: [
        { required: true, message: '请选择权限', trigger: 'change' }
    ],
}

async function saveRole() {
    if (!roleId.value || !editRole.name || !editRole.slug || !editRole.describe || !editRole.permissions) {
        ElMessage({
            message: 'params empty!',
            type: 'error',
        })
        return
    }
    console.log('allPermissions:', allPermissions)
    console.log("name: ", editRole.name, "slug: ", editRole.slug, "desc:", editRole.describe, "permissions:", editRole.permissions)
    await roleService.editRole({ id: roleId.value, name: editRole.name, slug: editRole.slug, describe: editRole.describe, permissions: JSON.stringify(editRole.permissions) }).then(function (data) {
        if (data.code === 200) {
            ElMessage({
                message: '修改成功！',
                type: 'success',
            })
            //这样，就能实现跳转路由之后刷新页面了
            setTimeout(() => {
                router.push({ name: 'RoleIndex' }).then(() => {
                    window.location.reload();
                });
            }, 700)
        } else {
            console.log(data);
        }
    }).catch(function (error) {
        console.log(error);
    });
}

function resetForm() {
    Object.assign(editRole, originRole);
};
</script>
<template>
    <div class="content-form-wrapper">
        <div class="content-form">
            <el-form :model="editRole" :rules="smsRules" status-icon label-position="top">
                <el-form-item prop="name" label="用户名">
                    <el-input v-model="editRole.name" type="text" placeholder="请输入用户名" autocomplete="on"></el-input>
                </el-form-item>
                <el-form-item prop="slug" label="展示名称">
                    <el-input v-model="editRole.slug" type="text" placeholder="请输入展示名称" autocomplete="on"></el-input>
                </el-form-item>
                <el-form-item prop="describe" label="描述">
                    <el-input v-model="editRole.describe" type="textarea" placeholder="请输入描述" autocomplete="on" />
                </el-form-item>
                <el-form-item prop="permissions" label="权限">
                    <el-checkbox-group v-model="editRole.permissions" class="checkbox-grid">
                        <el-checkbox v-for="permission in allPermissions" :value="permission.id" name="type"
                            :key="permission.id" class="checkbox-permission">
                            {{ permission.name }}
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item>
                    <a-button class="form-btn form-btn-submit" style="margin-right: 8px;" type="primary" @click="saveRole">保存</a-button>
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