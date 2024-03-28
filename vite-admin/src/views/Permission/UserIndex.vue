<script setup>
import { useStore } from '@/stores/index.js';
import { reactive, computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const store = useStore();
const usersAll = store.users;

const pageInfo = reactive({
    index: parseInt(route.query.page_index) || 1,
    size: parseInt(route.query.page_size) || 20
});

// 计算分页起始索引
const startIndex = computed(() => (pageInfo.index - 1) * pageInfo.size);

// 使用 slice 方法获取分页后的用户数组
const users = computed(() => usersAll.slice(startIndex.value, startIndex.value + pageInfo.size));

// 设置当前分页按钮的激活状态
const isActive1 = computed(() => pageInfo.index === 1);
const isActive2 = computed(() => pageInfo.index === 2);
const isActive3 = computed(() => pageInfo.index === 3);

</script>
<template>
    <div class="content-table">
        <div class="content-addUser">
            <router-link class="addUser-btn" :to="{ name: 'UserCreate' }">新增用户</router-link>
        </div>
        <table class="table-container">
            <tr>
                <th>
                    <div class="table-th">
                        姓名
                    </div>
                </th>
                <th>
                    <div class="table-th">
                        电话
                    </div>
                </th>
                <th>
                    <div class="table-th">
                        密码
                    </div>
                </th>
                <th>
                    <div class="table-th">
                        创建时间
                    </div>
                </th>
                <th>
                    <div class="table-th">
                        操作
                    </div>
                </th>
            </tr>
            <template v-for="user in users" :key="user.id">
                <tr class="table-user">
                    <td>{{ user.name }}</td>
                    <td>{{ user.phone }}</td>
                    <td>{{ user.password }}</td>
                    <td>{{ user.create_time }}</td>
                    <td><a class="user-edit" :data-id="user.id" :href="`/permission/manager/${user.id}/edit`">编辑</a>
                    </td>
                </tr>
            </template>
        </table>
        <div class="table-pagination" id="table-pagination">
            <div class="pagination-index" id="pagination-index" :data-index="pageInfo.index" hidden></div>
            <a class="pagination-item" :class="{ 'active': isActive1 }" data-index="1"
                href="?page_index=1&page_size=20">1</a>
            <a class="pagination-item" :class="{ 'active': isActive2 }" data-index="2"
                href="?page_index=2&page_size=20">2</a>
            <a class="pagination-item" :class="{ 'active': isActive3 }" data-index="3"
                href="?page_index=3&page_size=20">3</a>
        </div>
    </div>
</template>
<style type="text/css" lang="less" scoped>
.content-addUser {
    display: flex;
    justify-content: flex-end;
    font-size: 14px;
    cursor: pointer;

    .addUser-btn {
        color: #fff;
        background: #1890ff;
        box-shadow: 0 2px 0 rgba(5, 175, 255, 0.1);
        padding: 10px 15px;
        border-radius: 6px;
        width: fit-content;
        transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);

        &:hover {
            color: #fff;
            background: #40a9ff;
        }
    }
}

.user-edit {
    color: #1890ff;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);

    &:hover {
        color: #409eff;
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

.table-pagination {
    display: flex;
    justify-content: center;
    margin-top: 16px;
}

.pagination-item {
    display: block;
    color: #666;
    font-size: 14px;
    display: inline-block;
    padding: 0 12px;
    height: 32px;
    line-height: 32px;
    margin-right: 6px;
    cursor: pointer;
    border-radius: 99px;
    transition: background-color .2s;
}

.pagination-item:hover {
    background: #eaeaea;
}

.pagination-item.active {
    color: #fff;
    background: center center #666;
    background-size: 104% 104%;
}
</style>