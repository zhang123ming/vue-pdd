<template>
  <div class="reset">
    <mt-header fixed title="设置">
      <router-link to="/me" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div class="feng"></div>
    <!-- 1 -->
    <div class="resBox">
      <ul>
        <li>
          <div class="box-title">
            <img src="./../../../static/img/reset/one.svg" alt />
            &nbsp;&nbsp;
            <span>免密支付设置</span>
          </div>
          <i>&gt;</i>
        </li>
        <li>
          <div class="box-title">
            <img src="./../../../static/img/reset/two.svg" alt />
            &nbsp;&nbsp;
            <span>免拼设置</span>
          </div>
          <i>&gt;</i>
        </li>
        <li>
          <div class="box-title">
            <img src="./../../../static/img/reset/three.svg" alt />
            &nbsp;&nbsp;
            <span>消息接收设置</span>
          </div>
          <i>&gt;</i>
        </li>
      </ul>
      <!-- 2 -->
      <div class="feng"></div>
      <ul>
        <li>
          <div class="box-title">
            <img src="./../../../static/img/reset/four.svg" alt />
            &nbsp;&nbsp;
            <span>常见问题</span>
          </div>
          <i>&gt;</i>
        </li>
        <li>
          <div class="box-title">
            <img src="./../../../static/img/reset/fankui.svg" alt />
            &nbsp;&nbsp;
            <span>意见反馈</span>
          </div>
          <i>&gt;</i>
        </li>
      </ul>

      <!-- 2 -->
      <div class="feng"></div>
      <ul>
        <li>
          <div class="box-title">
            <img src="./../../../static/img/reset/five.svg" alt />
            &nbsp;&nbsp;
            <span>商家免费入驻</span>
          </div>
          <i>&gt;</i>
        </li>
        <li>
          <div class="box-title">
            <img src="./../../../static/img/reset/six.svg" alt />
            &nbsp;&nbsp;
            <span>清除缓存</span>
          </div>
          <i>&gt;</i>
        </li>
        <li>
          <div class="box-title">
            <img src="./../../../static/img/reset/seven.svg" alt />
            &nbsp;&nbsp;
            <span>关于拼多多</span>
          </div>
          <label>有新版本</label>
          <i>&gt;</i>
        </li>
      </ul>
      <!-- 4 -->
      <div class="feng"></div>
      <mt-button type="primary" @click="handleEnd" size="large">退出登录</mt-button>
      <div class="wang">网络诊断</div>
    </div>
  </div>
</template>

<script>
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {};
  },

  methods: {
    //   退出登录
    handleEnd() {
      localStorage.removeItem("userinfo");
      this.$router.replace("/home/hot");
    }
  }
};
</script>
<style  scoped>
.reset {
  width: 100%;
  height: 100%;
  z-index: 9999;
  position: absolute;
  overflow: hidden;
  background: #f5f5f5;
}
.feng {
  width: 100%;
  height: 8px;
  background: #f5f5f5;
}
.mint-header {
  background: #fff;
  color: #333;
}
.reset .resBox {
  width: 100%;
  height: 100%;
  margin-top: 41px;
}

.reset .resBox ul {
  width: 100%;
  height: auto;
  background: #fff;
}
.reset .resBox ul li {
  width: 95%;
  height: 50px;
  background: #fff;
  border-bottom: 1px solid #f5f5f5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 2.5%;
}
.reset .resBox ul li .box-title img {
  width: 20px;
  vertical-align: middle;
}
.reset .resBox ul li i {
  font-size: 28px;
  color: #9c9c9c;
  font-weight: 300;
}
.reset .resBox ul li label {
  background: #e80b0b;
  padding: 3px 10px;
  border-radius: 10px;
  color: #fff;
  margin-left: 130px;
  font-size: 14px;
  margin-top: 2px;
}
.reset .mint-button--large {
  width: 90%;
  margin: 0 auto;
}
.wang {
  font-size: 14px;
  color: #5757fa;
  position: absolute;
  margin-top: 100px;
  width: 100%;
  text-align: center;
  margin: 100px auto;
}
</style>