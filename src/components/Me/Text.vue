<template>
  <div id="text">
    <!-- 导航 -->
    <div class="box" ref="box">
      <ul>
        <li v-for="item in navinfo" :key="item.user_img">
          <img :src="item.user_img" alt />
          <span>{{item.user_name}}</span>
        </li>
      </ul>
    </div>
    <!-- 图片区域 -->
    <div
      class="content"
      ref="content"
      @touchend="handelend"
      @touchstart="handelstart"
      @touchmove="handlemove"
    >
      <ul>
        <li>内容1</li>
        <li>内容2</li>
        <li>内容3</li>
        <li>内容4</li>
        <li>内容5</li>
        <li>内容6</li>
        <li>内容7</li>
        <li>内容8</li>
        <li>内容9</li>
        <li>内容10</li>
        <li>内容11</li>
        <li>内容12</li>
        <li>内容13</li>
        <li>内容14</li>
        <li>内容15</li>
        <li>内容16</li>
        <li>内容17</li>
        <li>内容18</li>
        <li>内容19</li>
        <li>内容20</li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { Indicator } from "mint-ui";
export default {
  data() {
    return {
      navinfo: [],
      contentHeight: 493
    };
  },
  created() {
    this.$nextTick(() => {
      this.personScroll();
    });
  },
  mounted() {
    this.getinfonav();
  },
  methods: {
    // 触摸开始
    handelstart() {
      console.log("触摸开始");
    },
    // 触摸结束
    handelend() {
      console.log("触摸结束");
    },
    // 触摸过程
    handlemove() {
      console.log("过程");
    },
    //获取信息
    getinfonav() {
      this.axios.get("http://localhost:3000/api/text").then(res => {
        if (res.data.success_code === 200) {
          this.navinfo = res.data.message;
        }
      });
    },
    personScroll() {
      this.navScroll = new BScroll(this.$refs.box, {
        scrollX: true
      });

      if (!this.scroll) {
        // 内容滚动
        if (!this.contentScroll) {
          this.contentScroll = new BScroll(this.$refs.content, {
            scrollY: true,
            probeType: 3
          });
        } else {
          this.contentScroll.refresh();
        }

        // 监听
        this.contentScroll.on("scroll", pos => {
          if (pos.y > 50) {
            Indicator.open({
              text: "下拉加载信息",
              spinnerType: "fading-circle"
            });
            setTimeout(() => {
              Indicator.close();
            }, 1000);
          } else if (Math.abs(pos.y) > this.contentHeight) {
            Indicator.open({
              text: "上拉加载信息",
              spinnerType: "fading-circle"
            });
            setTimeout(() => {
              Indicator.close();
            }, 1000);
          }
        });
      }
    }
  }
};
</script>
<style  scoped>
#text {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  position: relative;
}
#text .nav {
  width: 100%;
  height: 50px;
  background: darkkhaki;
  overflow: hidden;
  position: absolute;
}

#text .nav ul {
  height: 100%;
  width: 800px;
}
#text .nav ul li {
  width: 100px;
  height: 100%;
  background: darkgoldenrod;
  float: left;
  list-style: none;
  font-size: 20px;
  text-align: center;
  line-height: 50px;
  font-weight: bolder;
}
#text .nav ul li:nth-of-type(even) {
  background: darkorchid;
}
.content {
  width: 100px;
  position: absolute;
  top: 100px;
  left: 0;
  bottom: 60px;
  background: #bcc8e0;
  overflow: hidden;
}
.content ul {
  width: 100%;
  height: auto;
}
.content ul li {
  width: 100px;
  height: 50px;
  background: darkmagenta;
  font-size: 20px;
  text-align: center;
  line-height: 50px;
  font-weight: bolder;
  color: #fff;
}
.content ul li:nth-of-type(even) {
  background: darkorange;
}
.box {
  width: 100%;
  height: 100px;
  background: palegreen;
  top: 0px;
  position: absolute;
  left: 0;
  overflow: hidden;
}
.box ul {
  height: 100%;
  width: 1000px;
  display: flex;
}
.box ul li {
  width: 100px;
  /* background: orangered; */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.box ul li img {
  width: 60px;
  margin-bottom: 10px;
}
</style>