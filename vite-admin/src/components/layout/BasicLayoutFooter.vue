<script type="text/javascript" setup></script>

<template>
  <div class="page-footer">
    <div class="footer-links">
      <ul class="footer-links-container container-group1">
        <li class="footer-links-item fli-group1"><a href="https://www.mercedes-benz.com.cn/privacy-policy.html"
            class="link"><span>隐私条款</span></a></li>
        <li class="footer-links-item fli-group1"><a href="https://www.mercedes-benz.com.cn/User-Agreement.html"
            class="link"><span>用户协议</span></a></li>
        <li class="footer-links-item fli-group1"><a href="https://www.mercedes-benz.com.cn/complaint-hotline.html"
            class="link"><span>投诉电话</span></a></li>
        <li class="footer-links-item fli-group1"><a href="https://www.mercedes-benz.com.cn/site-map.html"
            class="link"><span>网站地图</span></a></li>
        <li class="footer-links-item fli-group1"><a href="https://www.mercedes-benz.com.cn/legal-notices.html"
            class="link"><span>法律声明</span></a></li>
        <li class="footer-links-item fli-group1"><a
            href="https://www.mercedes-benz.com.cn/environmental-protection-information.html"
            class="link"><span>环保信息查询</span></a></li>
        <li class="footer-links-item fli-group1"><a href="https://www.mercedes-benz.com.cn/supplier-information.html"
            class="link"><span>供应商信息</span></a></li>
        <li class="footer-links-item fli-group1"><a href="https://www.denza.com/" class="link"><span>腾势官网</span></a>
        </li>
      </ul>
      <ul class="footer-links-container container-group2">
        <li class="footer-links-item"><a href="https://www.mercedes-benz.com.cn/business-license.html"
            class="link"><span>©梅赛德斯-奔驰版权所有</span></a></li>
        <li class="footer-links-item"><a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank"
            class="link"><span>京ICP备09046804号-2</span></a></li>
        <li class="footer-links-item"><a
            href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010502035702" target="_blank"
            class="link"><span>京公网安备 11010502035702号 </span></a></li>
      </ul>
    </div>

    <div class="footer-social">
      <ul class="footer-social-container">
        <li class="footer-social-item">
          <img src="/images/footer-logo/bc-logo.png" class="fsi-image">
          <span class="fsi-label">官方在线展厅</span>
        </li>
        <li class="footer-social-item">
          <img src="/images/footer-logo/bc-logo.png" class="fsi-image">
          <span class="fsi-label">官方应用</span>
        </li>
        <li class="footer-social-item">
          <img src="/images/footer-logo/weixin.png" class="fsi-image">
          <span class="fsi-label">官方微信</span>
        </li>
        <li class="footer-social-item">
          <img src="/images/footer-logo/tianmao.png" class="fsi-image">
          <span class="fsi-label">天猫官方旗舰店</span>
        </li>
        <li class="footer-social-item">
          <img src="/images/footer-logo/weibo.png" class="fsi-image">
          <span class="fsi-label">微博</span>
        </li>
        <li class="footer-social-item">
          <img src="/images/footer-logo/douyin.png" class="fsi-image">
          <span class="fsi-label">抖音</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style type="text/css" lang="less" scoped>
.page-footer {
  // position: absolute;
  // bottom: 0;
  height: 40px;
  width: 100%;
  line-height: 40px;
  font-size: 12px;
  color: #999;
  text-align: center;
}

.page-footer {
  width: 100%;
  min-width: 1366px;
  font-size: 12px;
  background: #000;
  min-height: 106px;
  padding: 10px 7%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-links {
  flex: 1;
}

.footer-social {
  width: 400px;
}

.footer-links-container {
  display: flex;
}

.container-group1 {
  padding-bottom: 12px;
}

.footer-links-item {
  position: relative;
  padding-right: 2em;
  color: #bfbfbf;
  font: normal 400 12px/2 Arial, sans-serif;
}

.fli-group1:after {
  position: absolute;
  top: 0.6em;
  height: calc(100% - 1.2em);
  right: 1em;
  content: "";
  width: 0;
  border-left: 1px solid #666;
}

.footer-social-container {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  margin-right: -5vw;
}

.footer-social-item {
  display: flex;
  flex: 0 0 33.3333%;
  padding: 8px 0;
  position: relative;
  color: #bfbfbf;
}

.fsi-image {
  height: 20px;
  width: 20px;
  margin-right: 10px;
}

.fsi-label {
  height: 20px;
  line-height: 20px;
}
</style>