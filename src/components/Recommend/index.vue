<template>
  <div id="recommend">
    <Loading v-if="isShow"></Loading>
    <div v-else class="header">推荐</div>
    <div class="recommendBar" :class="{current:flag}" ref="Topbar">
      <ul>
        <li>
          <span>综合</span>&nbsp;f
          <div></div>
        </li>
        <li>
          <span>销量</span>
        </li>
        <li>
          <span>视频</span>&nbsp;
          <img src="./../../../static/img/vido.svg" alt />
        </li>
        <li>
          <img src="./../../../static/img/sou.svg" alt /> &nbsp;&nbsp;
          <i>|</i>
        </li>
        <li>
          <span>筛选</span>&nbsp;
          <img src="./../../../static/img/shai.svg" alt />
        </li>
      </ul>
    </div>
    <div class="goods">
      <div class="box" v-for="item in recommendInfo" :key="item.goods_id">
        <img v-lazy="item.hd_thumb_url" alt />
        <p class="title">{{item.goods_name}}</p>
        <p class="center">
          <span class="fan">极速退款</span>
          <span class="tui">满30返3</span>
        </p>
        <div class="bottom">
          <span class="min">¥</span>
          <span class="price">{{item.normal_price/100}}</span>
          <span class="ok">{{item.sales_tip}}</span>
          <button
            @click="addGoodsShopping(item.goods_id,item.hd_thumb_url,item.goods_name,item.normal_price)"
          >购物车</button>
        </div>
      </div>
      <div class="feng"></div>
      <mt-button type="primary" @click="addNum" size="large">加载更多</mt-button>
    </div>
  </div>
</template>

<script>
// 提示框
import { Toast } from "mint-ui";
import { Indicator } from "mint-ui";
import Loading from "./../Loadding/Loadding";

export default {
  data() {
    return {
      recommendInfo: [], //商品信息
      flag: false,
      num: 0,
      userID: 0,
      isShow: true
    };
  },
  created() {
    this.getRecommend();
  },
  components: {
    Loading
  },
  methods: {
    // 点击加载更多
    addNum() {
      Indicator.open("加载中...");
      this.num += 1;
      this.axios
        .post("http://localhost:3000/api/pdd_recommend", { num: this.num })
        .then(res => {
          if (res.status === 200) {
            Toast({
              message: "加载完成  . . .",
              position: "top",
              duration: 800
            });
            this.recommendInfo = this.recommendInfo.concat(res.data.message);
            Indicator.close();
          }
        });
    },
    // 加入购物车
    addGoodsShopping(id, img, name, price) {
      // console.log(this.$store.state.userinfo);
      if (this.$store.state.userinfo === "{}") {
        Toast({
          message: "请先登录  . . .",
          position: "top",
          duration: 800
        });
      } else {
        this.axios
          .post("http://localhost:3000/api/pddshoppingCards", {
            goods_id: id,
            goods_img: img,
            goods_name: name,
            goods_price: price,
            userid: this.$store.state.userinfo.user_id
          })
          .then(res => {
            if (res.status === 200) {
              Toast({
                message: res.data.message,
                position: "bottom",
                duration: 500
              });
            } else {
              Toast({
                message: res.data.message,
                position: "bottom",
                duration: 500
              });
            }
          });
      }
    },
    // http://localhost:3000/api/pdd_recommend
    // 获取信息
    getRecommend() {
      this.axios
        .post("http://localhost:3000/api/pdd_recommend", { num: this.num })
        .then(res => {
          if (res.status === 200) {
            this.recommendInfo = res.data.message;
            this.isShow = false;
            // console.log(this.recommendInfo);
          }
        });
    },
    //页面 滚动
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop >= 100) {
        this.flag = true;
      } else {
        this.flag = false;
      }
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  // 组件销毁
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>
<style  scoped>
#recommend {
  width: 100%;
  height: 100%;
  background: #f4f4f4;
  position: relative;
}
.recommendBar {
  width: 100%;
  height: 50px;
  background: #f9f9f9;
  margin-top: 50px;
  z-index: 999;
  padding-bottom: 3px;
  position: relative;
}
.recommendBar.current {
  position: fixed;
  background: #fff;
}
.recommendBar ul {
  display: flex;
  justify-content: space-between;
  line-height: 50px;
}
.recommendBar ul li {
  padding: 0 15px;
  text-align: center;
  display: flex;
  align-items: center;
}
.recommendBar ul li:first-child {
  color: crimson;
}
.recommendBar ul li:first-child span {
  border-bottom: 2px solid red;
}
.recommendBar ul li:first-child div {
  width: 0;
  height: 0;
  border: 5px solid;
  border-color: crimson transparent transparent transparent;
  margin-top: 5px;
}
.recommendBar ul li:nth-child(4) i {
  color: #ddd;
}
.recommendBar ul li img {
  width: 15px;
}
.header {
  width: 100%;
  height: 50px;
  font-size: 20px;
  line-height: 50px;
  text-align: center;
  position: fixed;
  z-index: 2;
  top: 0px;
  background: #fff;
  border-bottom: 1px solid #ddd;
}
#recommend .goods {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  background: #f4f4f4;
}
#recommend .goods .box {
  margin-top: 0;
  width: 49%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  flex-wrap: wrap;
  background: #fff;
  box-shadow: 3px 3px 3px #d3c5c533;
  padding-bottom: 3px;
  margin-bottom: 5px;
}
.goods .box:nth-of-type(even) {
  margin-left: 1%;
}
.goods .box > img {
  width: 100%;
}

.goods .box > img[lazy="loading"] {
  width: 180px;
  height: 180px;
  margin: auto;
  background: url("./../../../static/img/loading.gif") no-repeat center;
}
.goods .box .title {
  display: inline-block;
  white-space: nowrap;
  width: 100%;
  overflow: hidden;
  font-size: 15px;
  color: #151516;
  line-height: 30px;
  margin-top: 5px;
}
.goods .box .center {
  line-height: 30px;
}
.goods .box .center span {
  color: #ff5706;
  font-size: 12px;
  margin-left: 5px;
}
.goods .box .bottom {
  display: flex;
  margin-bottom: 5px;
}
.goods .box .bottom .min {
  font-size: 12px;
  color: #e02e24;
}
.goods .box .bottom .price {
  font-size: 15px;
  color: #e02e24;
}
.goods .box .bottom .ok {
  font-size: 12px;
  color: #9c9c9c;
  margin-left: 3px;
}
.goods .box .bottom button {
  font-size: 12px;
  background: transparent;
  border: none;
  border: 1px solid #ddd;
  border-radius: 10px;
  margin-left: 5px;
  margin-top: -5px;
}
button:focus {
  outline: 0;
}
.feng {
  width: 100%;
  height: 8px;
  background: #ddd;
}
.mint-button--large {
  margin-top: 5px;
  margin-bottom: 70px;
  width: 95%;
  margin-left: 2.5%;
}
</style>