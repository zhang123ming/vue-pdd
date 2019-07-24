r<template>
  <div id="shopping">
    <mt-header title="购物车">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div class="goodscard">
      <ul>
        <li class="goodsli" v-for="(item,index) in goodscards" :key="item.id">
          <mt-switch class="btnsw" v-model="value"></mt-switch>
          <img v-lazy="item.goods_img" alt />
          <div class="goods_info">
            <h3>{{item.goods_title}}</h3>
            <div class="goods_box">
              <span class="price">￥{{item.goods_price/100}}</span>
              <button>-</button>
              <button>{{item.goods_count}}</button>
              <button>+</button>
              <span>删除</span>
            </div>
          </div>
        </li>
        <li class="ishow" v-if="isshow">空空如也~~~</li>
        <li class="last">
          <p>总计(不含运费)</p>
          <div class="lastbox">
            <span>
              商品共计
              <i>{{count}}</i> 件
            </span>
            <span>
              总件
              <i>￥{{moneny/100}}</i>
            </span>
            <mt-button class="btn" type="danger">去结算</mt-button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Indicator } from "mint-ui";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      userID: this.$store.state.userinfo.user_id,
      value: false,
      goodscards: [],
      isshow: true,
      count: 0,
      moneny: 0
    };
  },
  mounted() {},
  components: {
    // Login
  },
  created() {
    this.getuserIDgoods();
  },
  methods: {
    // 获取商品
    getuserIDgoods() {
      if (this.$store.state.userinfo === "{}") {
        Toast({
          message: "请先登录  . . .",
          position: "top",
          duration: 800
        });
      } else {
        Indicator.open("Loading...");
        this.axios
          .post("http://localhost:3000/api/usergoodscards", {
            userid: this.userID
          })
          .then(res => {
            if (res.data.success_code === 200 && res.data.message != "") {
              this.goodscards = res.data.message;
              console.log(this.goodscards);
              for (var i = 0; i < this.goodscards.length; i++) {
                this.moneny += this.goodscards[i].goods_price;
                this.count += this.goodscards[i].goods_count;
              }
              this.isshow = false;
              // console.log(this.goodscards);
            } else if (res.data.success_code == 200) {
              console.log("没有数据");
              this.isshow = true;
            }
            Indicator.close();
          });
      }
    }
  }
};
</script>
<style  scoped>
#shopping {
  width: 100%;
  height: 100%;
  background: #fff;
}
.goodscard {
  margin-bottom: 60px;
}
.goodscard ul {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  padding: 0 5px;
  box-sizing: border-box;
}
.goodscard ul .goodsli {
  background: #fff;
  margin-bottom: 10px;
  box-shadow: 0px 2px 0px #c5bfbf;
  display: flex;
  justify-content: center;
  align-items: center;
}
.goodscard ul .goodsli .btnsw {
  padding-left: 10px;
}
.goodscard ul .goodsli img {
  width: 100px;
  padding-left: 10px;
  padding: 5px 0;
}
.goodscard ul .goodsli .goods_info {
  padding-left: 10px;
}
.goodscard ul .goodsli .goods_info h3 {
  font-size: 14px;
  line-height: 23px;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
.goodscard ul .goodsli .goods_info .goods_box {
  margin-top: 10px;
}
.goodscard ul .goodsli .goods_info .goods_box .price {
  color: crimson;
}
.goodscard ul .goodsli .goods_info .goods_box button {
}
.goodscard ul .goodsli .goods_info .goods_box span {
  color: #26a2ff;
  margin-left: 10px;
}
.goodscard ul .last {
  background: #fff;
  padding-top: 10px;
  padding-bottom: 20px;
  padding-left: 20px;
  margin-bottom: 10px;
  box-shadow: 0px 2px 0px #c5bfbf;
}
.goodscard ul .last p {
  color: #8f8f94;
}
.goodscard ul .last .lastbox {
  color: #8f8f94;
}

.goodscard ul .last .lastbox span {
}
.goodscard ul .last .lastbox span i {
  color: crimson;
  font-weight: bolder;
}
.goodscard ul .last .btn {
  margin-left: 30px;
}
.ishow {
  width: 100%;
  height: 100px;
  line-height: 100px;
  background: #fff;
  margin-bottom: 10px;
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  color: crimson;
  box-shadow: 0px 2px 0px #c5bfbf;
}
</style>