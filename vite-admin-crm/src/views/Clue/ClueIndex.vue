<script setup>
import { useStore } from '@/stores/index.js';

const store = useStore();
const cluesAll = store.clues;
console.log('线索列表：', cluesAll)

</script>
<template>
    <div class="page-body-content">
        <div class="content-table">
            <table class="table-container">
                <tr>
                    <th>
                        <div class="table-th">姓名</div>
                    </th>
                    <th>
                        <div class="table-th">电话</div>
                    </th>
                    <th>
                        <div class="table-th">来源</div>
                    </th>
                    <th>
                        <div class="table-th">创建时间</div>
                    </th>
                    <th>
                        <div class="table-th">跟踪销售</div>
                    </th>
                    <th>
                        <div class="table-th">状态</div>
                    </th>
                    <th>
                        <div class="table-th">备注</div>
                    </th>
                    <th>
                        <div class="table-th">操作</div>
                    </th>
                </tr>
                <template v-for="clue in cluesAll" :key="clue.id">
                    <tr class="table-clue">
                        <td>{{ clue.name }}</td>
                        <td>{{ clue.phone }}</td>
                        <td>{{ clue.utm }}</td>
                        <td>{{ clue.create_time }}</td>
                        <td>{{ clue.sale_name }}</td>
                        <td>{{ clue.status }}</td>
                        <td>{{ clue.remark }}</td>
                        <td><a class="clue-log" :data-id="clue.id" :href="`/clue/${clue.id}/log`">追踪</a>
                        </td>
                    </tr>
                </template>
            </table>
        </div>
    </div>

</template>
<style type="text/css" lang="less" scoped>
.page-body-content{
    margin: 30px 40px 30px 40px;
    min-width: 900px;
    background-color: #fff;
    flex: 1;
}
.content-addClue {
    display: flex;
    justify-content: flex-end;
    font-size: 14px;
    cursor: pointer;

    .addClue-btn {
        color: #fff;
        background: #000;
        box-shadow: 0 2px 0 rgba(5, 175, 255, 0.1);
        padding: 10px 15px;
        border-radius: 6px;
        width: fit-content;
        transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);

        &:hover {
            color: #ffd04b;
            // background: #40a9ff;
        }
    }
}

.clue-log {
    font-size: 14px;
    cursor: pointer;
    // transition: all 0.3s ease-in;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);

    &:hover {
        color: #ecb314d5;
        font-weight: 600;
    }
}

.content-table {
    padding: 16px 24px;
    border-radius: 10px;
}

.table-container {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
    border-radius: 15px 15px 0 0;
}



.table-container tr:first-child {
    background-color: #fafafa;
}

.table-container th {
    font-weight: 600;
    text-align: left;
    border-bottom: 1px solid #0000000F;
    padding: 12px 0;

    .table-th {
        border-right: 1px solid #0000000F;
        padding: 0 8px;
    }
}

.table-container th:last-child .table-th {
    border: none;
}

.table-container td {
    border-bottom: 1px solid #f0f0f0;
    padding: 12px 8px;
}

.table-container tr td {
    text-align: left;
}
</style>