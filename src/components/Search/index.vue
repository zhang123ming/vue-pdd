<template>
  <div id="search">

    <div class="searhe" @click="showDv">
      <div class="box">
        <img src="./../../../static/img/nav/search.svg" alt />
        <span>学生化妆品</span>
      </div>
    </div>
    <!-- 组件的引用 -->
    <transition>
      <Search v-if="isShow" :isShowSearchPanel="isShowSearchPanel"></Search>
    </transition>
    <!-- 商品区域 -->
    <div class="shop">
      <!-- 左边 -->
      <div class="menu-wrapper">
        <ul>
          <li
            class="menu-item"
            v-for="(item,index) in searchinfo"
            :key="item.name"
            :class="{current:index===currentIndex}"
            @click="clickLeftItem(index)"
            ref="menulist"
          >
            <span>{{item.name}}</span>
          </li>
        </ul>
      </div>
      <!-- 右边 -->
      <div class="shop-wrapper">
        <ul ref="shopsParent">
          <li class="shops-li" v-for="(shop,index1) in searchinfo" :key="index1">
            <div class="shops-title">
              <h4>{{shop.name}}</h4>
              <a href="#">查看更多 &gt;</a>
              <img v-if="shop.titleurl" v-lazy="shop.titleurl" alt />
              <ul class="shop_items">
                <li class="shops-li" v-for="shopgoods in shop.items" :key="shopgoods.title">
                  <img v-lazy="shopgoods.icon" />
                  <span>{{shopgoods.title}}</span>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import Search from "./search";

export default {
  data() {
    return {
      searchinfo: [],
      scrollY: 0, //右侧列表滑动的Y轴坐标（实时更新）
      rightLiTops: [], //所有分类的头部位置
      isShow: false,
    };
  },
  components: {
    Search,
    // Login
  },
  created() {
    this.getSearchInfo();
  },
  computed: {
    //滚动 动态添加current样式
    currentIndex() {
      //  取出索引
      return this.rightLiTops.findIndex((LiTops, index) => {
        this._leftSccroll(index);

        return (
          this.scrollY >= LiTops && this.scrollY < this.rightLiTops[index + 1]
        );
      });
    }
  },

  methods: {
    showDv() {
      this.isShow = true;
    },
    // 搜索面板的显示与隐藏
    isShowSearchPanel(flag) {
      this.isShow = flag;
    },
    // 本地获取商品信息
    getSearchInfo() {
      this.axios.get("./../../../static/data/search.json").then(res => {
        if (res.status === 200) {
          this.searchinfo = res.data.data;
          // console.log(this.searchinfo);
        }
      });
    },
    // 左侧联动
    _leftSccroll(index) {
      let menulists = this.$refs.menulist;
      let el = menulists[index];
      this.leftScroll.scrollToElement(el, 100, 0, -100);
    },
    // 点击左侧切换
    clickLeftItem(index) {
      this.scrollY = this.rightLiTops[index];
      // console.log(index);
      this.rightScroll.scrollTo(0, -this.scrollY, 300);
    },
    // 滚动
    _initBScroll() {
      // 左边
      this.leftScroll = new BScroll(".menu-wrapper", {
        scrollY: true,
        click: true
      });
      //右边
      this.rightScroll = new BScroll(".shop-wrapper", {
        scrollY: true,
        click: true,
        probeType: 3 //添加此事件  下面滚动监听方可生效
      });
      // 监听右侧滑动事件
      this.rightScroll.on("scrollEnd", pos => {
        this.scrollY = Math.abs(pos.y);
        // console.log(this.scrollY);
      });
    },
    // 求出所有的板块的头部位置
    _initRightLiTops() {
      // 1 临时数组
      const tempArr = [];
      // 2 定义变量记录高度
      let top = 0;
      tempArr.push(top);
      // 3 变量li标签 取出高度
      let allLis = this.$refs.shopsParent.children;
      Array.prototype.slice.call(allLis).forEach(li => {
        top += li.clientHeight;
        tempArr.push(top);
      });
      // 4、获取所有的高度
      this.rightLiTops = tempArr;
      // console.log(this.rightLiTops);
    }
  },
  watch: {
    searchinfo() {
      this.$nextTick(() => {
        this._initBScroll();
        // 求出所有的板块的头部位置
        this._initRightLiTops();
      });
    }
  }
};
</script>
<style  scoped>
#search {
  width: 100%;
  height: 100%;
}
/* 动画 */

.v-enter {
  opacity: 0;
  transform: translateX(0);
}
.v-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

/* 搜索导航 */
.searhe {
  width: 100%;
  height: 50px;
  background: #fff;
  position: absolute;
  left: 0;
  top: 0;
  border-bottom: 1px solid #333;
}
.searhe .box {
  width: 90%;
  height: 80%;
  border-radius: 10px;
  background: #ededed;
  text-align: center;
  line-height: 40px;
  margin: 0 auto;
  margin-top: 1%;
}
.searhe .box img {
  width: 20px;
  vertical-align: middle;
}
.searhe .box span {
  font-size: 13px;
  color: #9c9c9c;
}
.shop {
  display: flex;
  position: absolute;
  top: 50px;
  bottom: 50px;
  width: 100%;
  background: #fff;
}
/* 左边 */
.shop .menu-wrapper {
  background: #fafafa;
  width: 80px;
  height: 100%;
  flex: 0 0 80px;
  overflow: hidden;
}

.shop .menu-wrapper .menu-item {
  width: 100%;
  height: 60px;
  background: #fafafa;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: #666;
  position: relative;
  border-bottom: 1px solid #ddd;
}
.shop .menu-wrapper .menu-item.current {
  color: #e02024;
  background: #fff;
}
.shop .menu-wrapper .menu-item.current::before {
  content: "";
  background-color: #e02024;
  width: 4px;
  height: 25px;
  position: absolute;
  left: 0;
}

/* 右边 */
.shop .shop-wrapper {
  width: 100%;
  height: 100%;
  background: #fff;
  overflow: hidden;
  /* flex: 1; */
}
.shop .shop-wrapper .shops-li {
  display: flex;
}
.shop .shop-wrapper .shops-title {
  padding: 10px 10px;
  line-height: 40px;
  position: relative;
  color: #999;
}
.shop .shop-wrapper .shops-title h4 {
  display: inline-block;
}
.shop .shop-wrapper .shops-title a {
  text-decoration: none;
  color: #999;
  position: absolute;
  left: 200px;
}
.shop .shop-wrapper .shops-title img {
  width: 100%;
  height: 80px;
}
.shop .shop-wrapper .shops-li .shop_items {
  display: flex;
  flex-wrap: wrap;
}
.shop .shop-wrapper .shops-li .shop_items li {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 33.3%;
  height: 90px;
  margin-bottom: 10px;
}
.shop .shop-wrapper .shops-li .shop_items li img {
  width: 60%;
  height: 60%;
  margin-bottom: 3px;
}
.shop .shop-wrapper .shops-li .shop_items li img[lazy="loading"] {
  width: 30px;
  height: 30px;
  margin: auto;
  background: url("./../../../static/img/loading.gif") no-repeat center;
}
.shop .shop-wrapper .shops-li .shop_items li span {
  color: #666;
  font-weight: bold;
  font-size: 14px;
}
</style>