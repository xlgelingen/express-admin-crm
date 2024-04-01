<script setup>
import { ref, onMounted, toRaw } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from '@/stores/index.js';
import clueService from '@/services/clue';
import { ElMessage } from 'element-plus'

const store = useStore();
const router = useRouter();
const route = useRoute();
const clueId = ref(route.params.id);

const user = store.user;
const role = user.role
const cluesAll = store.clues;
const clue = toRaw(cluesAll[clueId.value - 1])
clue.status = clue.status.toString();


console.log('clueId:', clueId.value)
console.log('clue:', clue)
console.log('role:', role)

const editClue = ref({});
const originClue = {};
Object.assign(originClue, clue);
Object.assign(editClue.value, clue)

const logs = ref([])
const logObj = ref({
    log: ''
})

onMounted(async () => {
    try {
        var logsInfo = await clueService.getLogs({ clueId: clueId.value })
            .then(function (data) {
                return data.logsInfo;
            })
            .catch(function (error) {
                console.log(error);
                return;
            });;
        Object.assign(logs.value, logsInfo);
        console.log('线索追踪/ logsInfo', logsInfo);
        console.log('线索追踪/ logs', logs.value);
    } catch (error) {
        console.error('获取线索追踪信息失败：', error);
    }
});

const smsRules = {
    sale_name: [
        { required: true, message: '请输入销售员', trigger: 'blur' },
    ],
    status: [
        { required: true, message: '请选择状态', trigger: 'change' }
    ],
    remark: [
        { required: true, message: '请输入备注', trigger: 'blur' },
    ],
    log: [
        { required: true, message: '请输入追踪记录', trigger: 'blur' },
    ],
}

const smsLogRules = {
    log: [
        { required: true, message: '请输入追踪记录', trigger: 'blur' },
    ],
}

async function saveClue() {
    if (!clueId.value || !editClue.value.status || !editClue.value.remark || !editClue.value.sale_name) {
        ElMessage({
            message: 'params empty!',
            type: 'error',
        })
    }

    await clueService.editClue({ id: clueId.value, status: editClue.value.status, remark: editClue.value.remark, sale_name: editClue.value.sale_name }).then(function (data) {
        if (data.code === 200) {
            ElMessage({
                message: '修改成功！',
                type: 'success',
            })
            setTimeout(() => {
                router.push({ name: 'ClueIndex' }).then(() => {
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

async function addLog() {
    console.log("log: ", logObj.value.log)

    if (!logObj.value.log || !clueId.value) {
        ElMessage({
            message: 'params empty!',
            type: 'error',
        })
        return;
    }

    await clueService.addLog({ clueId: clueId.value, content: logObj.value.log }).then(function (data) {
        if (data.code === 200) {
            ElMessage({
                message: '添加成功！',
                type: 'success',
            })
            setTimeout(() => {
                location.reload()
            }, 700)
        } else {
            console.log(data);
        }
    }).catch(function (error) {
        console.log(error);
    });
}

function resetForm() {
    Object.assign(editClue.value, originClue);
};

</script>

<template>
    <div class="content-mainer">
        <div class="form-section">
            <el-form :model="editClue" :rules="smsRules" status-icon label-position="top">
                <el-form-item class="form-item">
                    <span class="form-text">客户名称：{{ editClue.name }}</span>
                </el-form-item>
                <el-form-item class="form-item">
                    <span class="form-text">联系电话：{{ editClue.phone }}</span>
                </el-form-item>
                <el-form-item class="form-item">
                    <span class="form-text">线索来源：{{ editClue.utm }}</span>
                </el-form-item>
                <el-form-item class="form-item">
                    <span class="form-text">创建时间：{{ editClue.create_time }}</span>
                </el-form-item>
                <el-form-item v-if="role == 'saler'" class="form-item">
                    <span class="form-text">当前分配的销售：{{ editClue.sale_name }}</span>
                </el-form-item>
                <el-form-item v-if="role == 'keeper'" prop="sale_name" label="当前分配的销售" class="form-item">
                    <el-input type="text" placeholder="请输入销售员" v-model="editClue.sale_name"
                        autocomplete="on"></el-input>
                </el-form-item>
                <el-form-item prop="status" label="状态">
                    <el-select v-model="editClue.status" placeholder="请选择状态" autocomplete="on">
                        <el-option label="没有意向" value='1' />
                        <el-option label="意向一般" value='2' />
                        <el-option label="意向强烈" value='3' />
                        <el-option label="完成销售" value='4' />
                        <el-option label="取消销售" value='5' />
                    </el-select>
                </el-form-item>
                <el-form-item prop="remark" label="备注">
                    <el-input v-model="editClue.remark" type="textarea" placeholder="请输入备注" autocomplete="on" />
                </el-form-item>
                <el-form-item>
                    <a-button class="form-btn form-btn-submit" style="margin-right: 8px;" type="primary"
                        @click="saveClue">保存</a-button>
                    <a-button class="form-btn form-btn-reset" @click="resetForm">重 置</a-button>
                </el-form-item>
            </el-form>
        </div>

        <div class="log-section">
            <ul class="log-list" @click="console.log('logs', logs)">
                <template v-for="logItem in logs" :key="logItem.id">
                    <li class="log-item">
                        <p class="log-data">{{ logItem.create_time }}</p>
                        <p class="log-content">{{ logItem.content }}</p>
                    </li>
                </template>
            </ul>
            <el-form :model="logObj" :rules="smsLogRules" status-icon label-position="top">
                <el-form-item prop="log" label="添加记录：">
                    <el-input v-model="logObj.log" type="textarea" placeholder="请添加记录" autocomplete="on" />
                </el-form-item>
                <el-form-item>
                    <a-button class="form-btn form-btn-submit" style="margin-right: 8px;" type="primary"
                        @click="addLog">添加</a-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<style type="text/css" lang="less" scoped>
.content-mainer {
    display: flex;
    // flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    margin-bottom: 40px;
    padding: 16px 24px;
    // padding-top: 10px;
}

.form-section,
.log-section {
    height: 100%;
    flex: 1;
    padding: 0 20px;
    border-radius: 5px;
    background-color: #e4e4e4;
}

.log-section {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    margin-left: 20px;
}

.log-item {
    margin: 20px 0 30px;
}

.log-item .log-date {
    font-size: 16px;
}

.log-item .log-content {
    margin-top: 10px;
    font-size: 14px;
    color: #666;
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

.el-select__wrapper.is-focused.el-tooltip__trigger.el-tooltip__trigger {
    border-color: #000 !important;
    box-shadow: 0 0 0 2px rgba(4, 13, 19, 0.1);
}

.el-textarea__inner:focus {
    border-color: #000 !important;
    box-shadow: 0 0 0 2px rgba(4, 13, 19, 0.1);
}

.el-select-dropdown__item.is-selected {
    color: #000;
    font-weight: 700;
}
</style>