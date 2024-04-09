<script setup>
import { PoweroffOutlined, DownOutlined } from '@ant-design/icons-vue'
import { useStore } from '@/stores/index.js';
import Cookies from 'js-cookie';
const store = useStore();
var userName = store.user.name;

function logout() {
  const TOKEN_KEY = 'web_token';
  Cookies.remove(TOKEN_KEY);
  location.reload()
}

</script>

<template>
  <div class="header-section">
    <!-- <div class="header-hd"></div>
    <div class="header-bd"></div> -->
    <a class="header-logo-container" href="https://www.mercedes-benz.com.cn/homepage.html">
      <img class="header-logo" src="/images/header.png">
    </a>
    <div class="header-ft">
      <!-- <div class="bar-info-container">
        <HeartOutlined />
      </div> -->

      <!-- 创建一个下拉菜单。 -->
      <el-dropdown style="height: 100%">
        <div class="bar-info-container">
          <!-- 使用 <i> 元素展示用户的头像，这里通过 CSS 类名 userInfo-avatar 来设置头像的样式。 -->
          <i class="userInfo-avatar"></i>
          <!-- 用户名 -->
          <span class="userInfo-name">{{ userName }}</span>
          <!-- 下拉icon -->
          <DownOutlined class="downOutlined-icon" :style="{ fontSize: '10px', marginLeft: '4px' }" />
        </div>

        <!-- 插槽 -->
        <template #dropdown>
          <el-dropdown-menu @click=logout class="drop-down">
            <el-dropdown-item>
              <!-- 设置图标icon -->
              <PoweroffOutlined :style="{ marginRight: '4px' }" />
              退出
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style lang="less" scoped>
.header-section {
  // position: relative;
  // padding: 0 16px;
  // height: 54px;
  // display: flex;
  // z-index: 10;
  // background-color: rgba(255, 255, 255, 0.6);
  // border-bottom: 1px solid rgba(5, 5, 5, 0.06);
  display: flex;
  justify-content: space-between;
  width: 100%;
  min-width: 1366px;
  padding: 10px 30px;
  // padding: 10px 7% 10px 7%;
  background: #000;

  .header-bd {
    flex: 1;
  }
}

.header-logo-container {
  display: flex;
  align-items: center;

  .header-logo {
    width: 260px;
    height: 64px;
  }
}

.header-ft {
  display: flex;
}

.bar-info-container {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 10px;
  transition: all 0.2s ease;
  cursor: pointer;
  outline: none;

  &:hover .downOutlined-icon {
    // background-color: #99999988;
    transform: rotate(180deg);
  }

  .userInfo-name {
    font-size: 14px;
    vertical-align: middle;
    color: #ccc;
  }

  .downOutlined-icon {
    color: #ccc;
    transition: all 0.3s
  }

  .userInfo-avatar {
    display: inline-block;
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    background-color: #ccc;
    border-radius: 50%;
    margin: 0 10px;
  }
}
</style>

<style lang="less">
// .el-popper .drop-down {
//   background-color: #000; // 背景颜色
//   border: 1px solid #000;

//   .el-dropdown-menu__item {
//     // 下拉菜单文字颜色
//     color: #ccc !important;
//   }

//   .popper__arrow::after {
//     border-bottom-color: #99999988 !important;
//     border-top-color: #99999988 !important;
//   }

  .el-dropdown-menu__item:not(.is-disabled):hover,
  .el-popper .drop-down .el-dropdown-menu__item:hover{
    color: #606266!important;
    background-color: #ecf5ff;
  }
// }

// .el-popper.is-light .el-popper__arrow::before {
//   background-color: #000 !important;
//   // border-color: #000;
// }

</style>