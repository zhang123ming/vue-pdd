<template>
  <div id="girl">
    <!-- 导航 -->
    <div class="nav">
      <ul>
        <li v-for="item in girlNav" :key="item.id">
          <img v-lazy="item.girl_navImg" alt />
          <span v-text="item.girl_nav"></span>
        </li>
        <li>
          <img src="./../../../../static/img/nav.svg" alt />
          <span>查看全部</span>
        </li>
      </ul>
    </div>
    <!-- 分割线 -->
    <div class="fenge"></div>
    <div class="title_img">
      <img
        src="//t00img.yangkeduo.com/goods/images/2019-06-27/ac4fdf33cbd8b397829e635a62be9a79.jpeg?imageMogr2/sharpen/1%7CimageView2/2/w/1300/q/70/format/webp"
        alt
      />
    </div>
    <!-- 分割线 -->
    <div class="fenge"></div>
    <!-- 商品 -->
    <div class="girlgoods">
      <ul>
        <li class="girlBox" v-for="item in girlGoodsInfo" :key="item.id">
          <img
            class="girBoxImg"
            :src="item.girl_goods_img"
            alt
          />
          <p v-text="item.girl_goods_title"></p>
          <p class="tui">
            <span>{{item.girl_goods_fan}}</span>
            <span>{{item.girl_goods_tui}}</span>
          </p>
          <div class="girl_content">
            <span class="mon">¥</span>
            <span class="price">{{item.girl_goods_price}}</span>
            <span class="ok">已拼{{item.girl_goods_ok}}件</span>
            <div class="img">
              <img
                :src="item.girl_goods_tou1"
                alt
              />
              <img
             :src="item.girl_goods_tou2"
                alt
              />
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Toast, Indicator } from "mint-ui";
export default {
  data() {
    return {
      girlNav: [], //导航
      girlGoodsInfo: [] //商品
    };
  },
  created() {
    Indicator.open("加载中...");
    this.getGirlNavInfo();
    this.getGirlGoodsInfo();
  },
  methods: {
    //
    // girl导航
    getGirlNavInfo() {
      this.axios.get("http://localhost:3000/api/girlinfo").then(res => {
        if (res.status === 200) {
          this.girlNav = res.data.message;
          // console.log(this.girlNav);
          Indicator.close();
        } else {
          Toast("girl信息加载失败");
        }
      });
    },
    getGirlGoodsInfo() {
      this.axios.get("http://localhost:3000/api/girlgoodsinfo").then(res => {
        if (res.status === 200) {
          this.girlGoodsInfo = res.data.message;
          console.log(this.girlGoodsInfo);
          Indicator.close();
        } else {
          Toast("girl商品信息获取失败");
        }
      });
    }
  }
};
</script>
<style  scoped>
#girl {
  width: 100%;
  height: 100;
  background: #fff;
  margin-top: 0px;
  margin-bottom: 60px;
}
/* 分割线 */
.fenge {
  width: 100%;
  height: 8px;
  background: #f5f5f5;
}
/* 图片 */
#girl .title_img {
  width: 100%;
  height: 82px;
  padding: 0 2px;
  box-sizing: border-box;
}
#girl .title_img img {
  width: 100%;
  height: 100%;
}
/* 导航 */
.nav {
  width: 100%;
  height: 180px;
}
.nav ul {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
}
.nav ul li {
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.nav ul li img {
  width: 54px;
}
.nav ul li:last-child img {
  width: 40px;
  margin-bottom: 11px;
}

.nav ul li span {
  font-size: 14px;
  color: #666666;
}
/* girl商品 */
.girlgoods {
  width: 100%;
  height: 100%;
}
.girlgoods ul {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  background: #f5f5f5;
}

.girlgoods ul .girlBox {
  width: 49%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  background: #fff;
  margin-bottom: 5px;
}
.girlgoods ul .girlBox:nth-of-type(even) {
  margin-left: 1%;
}
.girlgoods ul .girlBox .girBoxImg {
  width: 100%;
  height: 186px;
}
.girlgoods ul .girlBox > p {
  display: -webkit-box;
  line-height: 25px;
  -webkit-box-orient:vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  font-size: 14px;
  color: #151516;
}
.girlgoods ul .girlBox .tui {
  color: #ff5706;
  font-size: 13px;
  display: flex;
  align-items: center;
}
.girlgoods ul .girlBox .tui span:first-child {
  margin: 0;
}
.girlgoods ul .girlBox .tui span {
  margin-left: 20px;
}
.girlgoods ul .girlBox .girl_content{
  display: flex;
  flex-wrap:wrap;
margin-left: -10px;

}
.girlgoods ul .girlBox .girl_content .mon{
  font-size: 13px;
  color: #e02e24;

}
.girlgoods ul .girlBox .girl_content .price{
  font-size: 15px;
  color: #e02e24

}
.girlgoods ul .girlBox .girl_content .ok{
  font-size: 13px;
  margin-left: 5px;
  color: #9c9c9c;
}
.girlgoods ul .girlBox .girl_content .img{
  margin-left: 15px;
margin-top: -3px;
}
.girlgoods ul .girlBox .girl_content .img img{
  width: 18px;
  border-radius: 50%;
}
.girlgoods ul .girlBox .girl_content .img img:last-child{
  margin-left: -10px;
}
</style>