<template>
  <div id="me">
    <Login v-if="this.$store.state.userinfo==='{}'"></Login>
    <!-- 头部 -->
    <div v-else class="header">
      <img :src="this.$store.state.userinfo.user_img" @click="detail" alt />
      <div class="box_content">
        <h3>{{this.$store.state.userinfo.user_name}}</h3>
        <span>{{this.$store.state.userinfo.user_phone|FilterPhone}}</span>
      </div>
      <div class="box_right">
        <img :src="userinfo.user_img" alt />
        <span>拼单返现</span>
      </div>
    </div>
    <!-- 省钱 -->
    <div class="money">
      <p>省钱月卡</p>&nbsp;|
      <p>帮你省999元</p>
      <i>领20元无门槛</i>
      <span>&gt;</span>
    </div>
    <div class="order">
      <div class="order-title">
        <h3>我的订单</h3>
        <span>
          查看全部
          <i>&gt;</i>
        </span>
      </div>
      <ul>
        <li>
          <img src="./../../../static/img/dingdan/daifukuan.svg" alt />
          <span>待付款</span>
        </li>
        <li>
          <img src="./../../../static/img/dingdan/daifenxiang.svg" alt />
          <span>待分享</span>
        </li>
        <li>
          <img src="./../../../static/img/dingdan/daifahuo.svg" alt />
          <span>待发货</span>
        </li>
        <li>
          <img src="./../../../static/img/dingdan/daishouhuo.svg" alt />
          <span>待收货</span>
        </li>
        <li>
          <img src="./../../../static/img/dingdan/daipingjia.svg" alt />
          <span>待评价</span>
        </li>
      </ul>
      <!-- 优惠劵 -->
      <ul>
        <li>
          <img src="./../../../static/img/me/youhuijuan.svg" alt />
          <span>优惠劵</span>
        </li>
        <li>
          <img src="./../../../static/img/me/shangpinshoucang.svg" alt />
          <span>商品收藏</span>
        </li>
        <li>
          <img src="./../../../static/img/me/shoucang.svg" alt />
          <span>店铺收藏</span>
        </li>
        <li>
          <img src="./../../../static/img/me/lishiliulan.svg" alt />
          <span>历史浏览</span>
        </li>
        <li>
          <img src="./../../../static/img/me/tuikuan.svg" alt />
          <span>退款售后</span>
        </li>
      </ul>
      <!-- 底部 -->

      <ul>
        <li>
          <img src="./../../../static/img/foot/guoyuan.svg" alt />
          <span>多多果园</span>
        </li>
        <li>
          <img src="./../../../static/img/foot/kanjiamianfeina.svg" alt />
          <span>砍价免费拿</span>
        </li>
        <li>
          <img src="./../../../static/img/foot/yifenchoujiangicon.svg" alt />
          <span>1分抽大奖</span>
        </li>
        <li>
          <img src="./../../../static/img/foot/lingxianjin.svg" alt />
          <span>天天领现金</span>
        </li>
        <li>
          <img src="./../../../static/img/foot/mofabang.svg" alt />
          <span>多多爱消除</span>
        </li>
        <li>
          <img src="./../../../static/img/foot/dizhi.svg" alt />
          <span>收货地址</span>
        </li>
        <li>
          <img src="./../../../static/img/foot/wodepingjia.svg" alt />
          <span>我的评价</span>
        </li>
        <li @click="handelRouterLogin">
          <img src="./../../../static/img/foot/kefu.svg" alt />
          <span>官方客服</span>
        </li>
        <li @click="handleRoute">
          <img src="./../../../static/img/foot/shezhi.svg" alt />
          <span>设置</span>
        </li>
        <router-link tag="li" to="/text">
          <img src="./../../../static/img/foot/shezhi.svg" alt />
          <span>测试</span>
        </router-link>
      </ul>
    </div>
    <!-- 图片 -->
    <div class="box_img">
      <img
        src="//t00img.yangkeduo.com/goods/images/2019-07-03/07169d626c3b6dd3e294e63d5ee065c0.jpeg?imageMogr2/sharpen/1%7CimageView2/2/w/524/q/70/format/webp"
        alt
      />
    </div>
    <!-- 商品区域 -->
    <div class="goods">
      <div class="title">
        <img src="./../../../static/img/me/jingpin.svg" alt />
        <span>精品推荐</span>
      </div>
      <Boy></Boy>
    </div>
  </div>
</template>

<script>
import { Indicator } from "mint-ui";
import Login from "./../Login/index";
import Boy from "./../Home/Children/Boy";
export default {
  data() {
    return {
      userinfo: this.$store.state.userinfo //用户信息
    };
  },

  created() {
    this.getuserInfo();
  },
  methods: {
    // 路由跳转
    detail() {
      this.$router.replace("/medetail");
    },
    handelRouterLogin() {
      this.$router.replace("/login");
    },
    // 用户信息
    getuserInfo() {},
    // 点击设置路由跳转
    handleRoute() {
      // this.$router.replace("reset");
      this.$router.replace("tab");
    }
  },
  components: {
    Boy,
    Login
  }
};
</script>
<style  scoped>
#me {
  width: 100%;
  height: 100%;
  background: #fff;
  margin-bottom: 80px;
}
.header {
  width: 100%;
  height: 120px;
  background: #fff;
  overflow: hidden;
}
.header > img {
  width: 80px;
  height: 80px;
  border: 1px solid darkgray;
  border-radius: 50%;
  margin-top: 15px;
  margin-left: 10px;
}
.header .box_content {
  position: absolute;
  left: 110px;
  margin-top: -70px;
}
.header .box_content h3 {
  line-height: 30px;
}
.header .box_content span {
  color: #9c9c9c;
}
.header .box_right {
  position: absolute;
  right: 20px;
  border: 1px solid #58595b;
  padding: 5px 16px;
  margin-top: -50px;
  border-radius: 20px;
}
.header .box_right img {
  width: 18px;
  vertical-align: middle;
}
.header .box_right span {
  color: #333;
  font-size: 14px;
}
/* 省钱区 */
.money {
  display: flex;
  height: 60px;
  background: #eaafe4;
  line-height: 60px;
  width: 95%;
  margin: auto;
  border-radius: 10px 10px 0 0;
}
.money p:first-child {
  font-size: 18px;
  font-weight: 700;
  padding-left: 20px;
  color: crimson;
}
.money p:nth-child(2) {
  font-size: 14px;
  padding-left: 10px;
  color: crimson;
}
.money i {
  width: 130px;
  height: 35px;
  line-height: 35px;
  text-align: center;
  margin-top: 13px;
  margin-left: 10px;
  border-radius: 20px;
  background: crimson;
  color: #fff;
}
.money span:last-child {
  color: chocolate;
  font-size: 25px;
  margin-top: -1px;
}

/* 我的订单 */
.order {
  width: 100%;
  height: auto;
  background: #fff;
}
.order .order-title {
  padding: 10px 10px;
  display: flex;
  margin-top: 5px;
  margin-bottom: 15px;
  justify-content: space-between;
  padding-bottom: 0;
}

.order .order-title h3 {
  font-size: 18px;
  font-weight: bold;
}
.order .order-title span {
  color: #58595b;
}
.order ul {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  border-bottom: 8px solid #f5f5f5;
}
.order ul li {
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: #fff;
  margin-bottom: 20px;
}
.order ul li img {
  width: 30px;
  margin-bottom: 15px;
}
.order ul li span {
  color: #58595b;
  font-size: 14px;
}
.box_img {
  width: 100%;
  height: 80px;
  border-bottom: 8px solid #f5f5f5;
}
.box_img img {
  width: 100%;
  height: 100%;
}
.goods {
  width: 100%;
  height: 100%;
}
.goods .title {
  text-align: center;
  padding-top: 10px;
}
.goods .title img {
  width: 28px;
  vertical-align: middle;
}
.goods .title span {
  font-size: 18px;
  color: #e02024;
}
</style>