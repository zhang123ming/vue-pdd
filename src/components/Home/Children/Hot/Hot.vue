<template>
  <div id="hot">
    <!-- 轮播图 -->
    <mt-swipe :auto="3000">
      <mt-swipe-item class v-for="item in homeCasual" :key="item.id">
        <img :src="item.imgurl" alt />
      </mt-swipe-item>
    </mt-swipe>
    <!-- 导航 -->
    <div class="box">
      <ul @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchend">
        <li class="nav_box" v-for="item in homeNav" :key="item.nav_name">
          <img v-lazy="item.nav_img" alt />
          <span class="nav_title" v-text="item.nav_name"></span>
        </li>
      </ul>
      <div class="scroll">
        <div class="scrollColre" :style="innerBarStyle"></div>
      </div>
    </div>
    <!-- 分割线 -->
    <div class="fenge"></div>
    <!-- 品牌特卖 -->
    <div class="temai">
      <div class="tbox">
        <div class="left">
          <span>品牌特卖</span>
          <span>森马1.2折扣抢</span>
        </div>
        <ul>
          <li v-for="val in temaiicon" :key="val">
            <img :src="val" alt />
          </li>
        </ul>
      </div>
    </div>
    <div class="fenge"></div>
    <!-- 商品信息 -->
    <div class="goods">
      <!-- 头部图片 -->
      <div class="goods_box_img">
        <img
          src="//t00img.yangkeduo.com/goods/images/2019-06-28/e53bf59d64dffaf8cc03472f77e446fa.gif?imageMogr2/sharpen/1%7CimageView2/2/w/1300/q/70/format/webp"
          alt
        />
      </div>
      <!-- 分割线 -->
      <div class="fenge"></div>

      <!-- 商品区域 -->
      <div class="goods_box">
        <ul>
          <li v-for="item in homeGoodsInfo" :key="item.home_list_img">
            <img class="goods_img" v-lazy="item.home_list_img" alt />
            <div class="goods_info">
              <h3 class="goods_title" v-text="item.home_list_title"></h3>
              <p class="goods_tui">
                <span v-text="item.home_list_tui"></span>
                <span v-text="item.home_list_fan"></span>
              </p>
              <div class="goods_bottom">
                <span style="color:red;font-size:12px;">¥</span>
                <span class="goods_price">{{item.home_list_price}}</span>
                <span class="goods_ok">已拼{{item.home_list_ok}}件</span>
                <img :src="item.home_list_tou1" alt />
                <img :src="item.home_list_tou2" alt />
              </div>
            </div>
          </li>
        </ul>

        <mt-button type="primary" size="large" @click="getPageUserinfo">加载更多</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast, Indicator } from "mint-ui";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      homeCasual: [], //轮播图
      homeNav: [], //导航
      homeGoodsInfo: [], //商品信息
      screenW:
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth, //屏幕的宽度
      scrollContent: 810, //内容的宽度
      bgBarW: 100, //滚动背景默认长度
      barXWidth: 0, //滚动条长度
      startX: 0, //触摸监听起点
      endFlag: 0, //结束点
      barMoveWidth: 0, //移动的距离
      pageIndex: 0, //
      temaiicon: [
        "//t00img.yangkeduo.com/goods/images/2019-01-20/5aab393c994221461a80d0c750be35d6.jpeg?imageMogr2/strip%7CimageView2/2/w/108/q/80",
        "//t00img.yangkeduo.com/goods/images/2019-02-17/368892e1a68f4f562fd22a608d63369a.jpeg?imageMogr2/strip%7CimageView2/2/w/108/q/80",
        "//t00img.yangkeduo.com/goods/images/2019-01-23/9015552af16e69cc9fe4c052785e1f90.jpeg?imageMogr2/strip%7CimageView2/2/w/108/q/80",
        "//t00img.yangkeduo.com/goods/images/2019-05-14/9b25ca72da1104ca2184fa41a150a2d2.jpeg?imageMogr2/strip%7CimageView2/2/w/108/q/80"
      ]
    };
  },
  components: {},
  mounted() {
    // nav滚动条
    this.getBottomBarWidth();
  },
  computed: {
    innerBarStyle() {
      return {
        width: `${this.barXWidth}px`,
        left: `${this.barMoveWidth}px`
      };
    }
  },
  methods: {
    /**
     * 滚动条
     *
     *
     */

    // 1、获取滚动条的宽度
    getBottomBarWidth() {
      this.barXWidth = this.bgBarW * (this.screenW / this.scrollContent);
    },
    // 2、监听事件(无用)
    bindEvent() {
      this.$el.addEventListener("touchstart", this.handleTouchStart, false);
      this.$el.addEventListener("touchmove", this.handleTouchMove, false);
      this.$el.addEventListener("touchend", this.handleTouchend, false);
    },
    // 开始触摸
    handleTouchStart(event) {
      let touch = event.touches[0];
      //  求出起始点
      this.startX = Number(touch.pageX);
    },
    // 开始移动
    handleTouchMove(event) {
      //  获取第一个触点
      let touch = event.touches[0];
      // 求出移动的距离
      let moveWidth = Number(touch.pageX) - this.startX;
      // console.log(moveWidth)
      // 求出滚动条走的距离
      this.barMoveWidth = -(
        moveWidth * (this.bgBarW / this.scrollContent) -
        this.endFlag
      );

      if (this.barMoveWidth <= 0) {
        this.barMoveWidth = 0;
      } else if (this.barMoveWidth > this.bgBarW - this.barXWidth) {
        this.barMoveWidth = this.bgBarW - this.barXWidth;
      }
    },
    // 结束触摸
    handleTouchend(event) {
      this.endFlag = this.barMoveWidth;
    },
    /***
     * 结束
     *
     *
     *  */

    // 轮播图
    getHomeCasualInfo() {
      this.axios.get("http://localhost:3000/api/homecasual").then(res => {
        if (res.status === 200) {
          this.homeCasual = res.data.message;
          // console.log(this.homeCasual);
          Indicator.close();
        } else {
          Toast("信息加载失败");
        }
      });
    },
    // 导航
    getHomeNavInfo() {
      this.axios.get("http://localhost:3000/api/homenav").then(res => {
        if (res.status === 200) {
          this.homeNav = res.data.message;
          // console.log(this.homeNav);
          Indicator.close();
        } else {
          Toast("导航信息加载失败！");
        }
      });
    },
    // 加载更多
    getPageUserinfo() {
      this.pageIndex++;
      this.getHomeGoodsInfo();
    },
    // 商品
    getHomeGoodsInfo() {
      this.axios
        .post("http://localhost:3000/api/homelist", { page: this.pageIndex })
        .then(res => {
          if (res.status === 200) {
            this.homeGoodsInfo = this.homeGoodsInfo.concat(res.data.message);
            // console.log(this.homeGoodsInfo);
            Indicator.close();
          }
        });
    },
    // 商品滚动
    _initBScroll() {}
  },
  created() {
    Indicator.open("加载中...");
    // 页面初始化加数据
    this.getHomeCasualInfo();
    this.getHomeNavInfo();
    this.getHomeGoodsInfo();
  },
  watch: {
    searchinfo() {
      this.$nextTick(() => {
        this._initBScroll();
      });
    }
  }
};
</script>
<style  scoped>
#hot {
  width: 100%;
  height: 100;
  background: #fff;
  overflow: hidden;
}
/* 轮播图 */
#hot .mint-swipe {
  width: 100%;
  height: 200px;
}

#hot .mint-swipe img {
  width: 100%;
  height: 100%;
}
/* 特卖区域 */
.temai {
  width: 100%;
  height: 80px;
}
.temai .tbox {
  width: 100%;
  height: 100%;
  display: flex;
  /* overflow: hidden; */
}
.temai .tbox .left {
  flex: 2;
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  padding-top: 15px;
  box-sizing: border-box;
}
.temai .tbox .left span:first-child {
  font-size: 16px;
  font-weight: bold;
}
.temai .tbox .left span:last-child {
  background: darkmagenta;
  font-size: 13px;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 5px;
  margin-top: 10px;
  margin-right: 8px;
}
.temai .tbox ul {
  flex: 5;
  margin-top: 10px;
}
.temai .tbox ul li {
  display: flex;
  float: left;
  align-items: center;
  justify-content: center;
  padding: 3px 1px;
}
.temai .tbox ul li img {
  width: 60px;
  border: 1px solid #d1d4da;
}
/* 导航 */
#hot .box {
  width: 100%;
  height: 190px;
  overflow-y: hidden;
}
#hot .box::-webkit-scrollbar {
  display: none;
}
.box ul {
  width: 810px;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
}
.box ul li {
  width: 90px;
  height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.box img {
  width: 40%;
  margin-bottom: 5px;
}
.box .nav_title {
  font-size: 14px;
  color: #666666;
}
#hot .box .scroll {
  width: 100px;
  height: 5px;
  border: 1px solid #ddd;
  background: #ddd;
  position: absolute;
  border-radius: 30px;
  left: 50%;
  margin-left: -50px;
  margin-top: -12px;
}
#hot .box .scroll .scrollColre {
  height: 100%;
  position: absolute;
  background: crimson;
  border-radius: 30px;
}
/* 分割线 */
#hot .fenge {
  width: 100%;
  height: 8px;
  background: #f5f5f5;
}
/* 商品区头部图片 */
#hot .goods {
  width: 100%;
  height: 100%;
  background: #fff;
}
#hot .goods .goods_box_img {
  width: 100%;
  height: 100px;
  /* padding: 2px; */
}
#hot .goods .goods_box_img img {
  width: 100%;
  height: 100%;
}
/* 商品区域 */
#hot .goods_box {
  width: 100%;
  height: 100%;
  margin-bottom: 60px;
  overflow: hidden;
}
#hot .goods_box ul {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
#hot .goods_box ul li {
  width: 100%;
  display: flex;
}
#hot .goods_box ul li .goods_img {
  width: 180px;
  height: 180px;
  padding: 5px;
  border-radius: 3px;
  flex: 1;
}
#hot .goods_box ul li .goods_img[lazy="loading"] {
  width: 180px;
  height: 180px;
  margin: auto;
  background: url("./../../../../../static/img/loading.gif") no-repeat center;
}
#hot .goods_box ul li .goods_info {
  flex: 1;
  position: relative;
  border-bottom: 1px solid #ddd;
}
#hot .goods_box ul li .goods_info .goods_title {
  font-size: 14px;
  color: #151516;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  padding-right: 20px;
  padding-top: 10px;
  line-height: 15px;
}
#hot .goods_box ul li .goods_info .goods_tui {
  color: red;
  font-size: 13px;
  /* margin-top: 80px; */
  margin-top: 80px;
  position: relative;
}
#hot .goods_box ul li .goods_info .goods_bottom {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}
#hot .goods_box ul li .goods_info .goods_price {
  color: crimson;
  flex: 1;
}
#hot .goods_box ul li .goods_info .goods_ok {
  font-size: 13px;
  flex: 2;
  color: #9c9c99;
}
#hot .goods_box ul li .goods_info img {
  width: 20px;
  border-radius: 50%;
}

#hot .goods_box ul li .goods_info img:last-child {
  margin-left: -5px;
  margin-right: 20px;
}
</style>