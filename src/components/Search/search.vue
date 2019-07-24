<template>
  <div id="sear">
    <!-- 搜索 -->
    <mt-search class="mt-search" ref="mtSearch" v-model="searchGoods" autofocus></mt-search>
    <!-- 内容区域 -->
    <div class="kong">什么也没有哦~~</div>
    <div class="searchDv">
      <ul>
        <li v-for="(item,index) in searchAllList" :key="index">
          <img v-lazy="item.image_url" alt />
          <p class="search_title">{{item.goods_name}}</p>
          <p class="search_content">
            <span class="min">¥</span>
            <span class="price">{{item.price/100}}</span>
            <span class="ok">{{item.sales_tip}}</span>
            <button class="fa">发现 &nbsp;&nbsp;&gt;</button>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    isShowSearchPanel: Function
  },
  data() {
    return {
      searchGoods: "",
      searchAllList: []
    };
  },
  watch: {
    searchGoods(newVal) {
      var that = this;
      this.cancelRequest();
      this.axios
        .post(
          "http://localhost:3000/api/searchRecommend",
          {
            goods_name: newVal
          },
          {
            cancelToken: new this.axios.CancelToken(function executor(c) {
              that.source = c;
            })
          }
        )
        .then(res => {
          if (res.status === 200) {
            this.searchAllList = res.data.message;
            console.log(this.searchAllList);
          }
        })
        .catch(err => {
          if (this.axios.isCancel(err)) {
            console.log("Rquest canceled", err.message);
          } else {
            console.log(err);
          }
        });
    }
  },
  methods: {
    // 终止多次请求
    cancelRequest() { if (typeof this.source === "function") { this.source("终止请求"); } }
  },
  mounted() {
    // 点击取消按钮触发事件
    this.$nextTick(() => {
      let cancel = this.$refs.mtSearch.$el.querySelectorAll(
        ".mint-searchbar-cancel"
      )[0];
      cancel.onclick = () => {
        this.isShowSearchPanel(false);
      };
    });
  }
};
</script>
<style  scoped>
#sear {
  width: 100%;
  height: 100%;
  background: #fff;
  position: absolute;
  z-index: 99;
  top: 0;
  left: 0;
}
.searchDv {
  margin-top: 52px;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
}
.searchDv ul {
  width: 100%;
  height: 100%;
}
.searchDv ul li {
  width: 100%;
  height: auto;
  background: #fff;
  border-bottom: 8px solid #ddd;
}
.searchDv ul li img {
  width: 100%;
  height: 180px;
  border-bottom: 1px solid #ddd;
}
.searchDv ul li:last-child {
  margin-bottom: 60px;
}
.searchDv ul li .search_title {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-height: 30px;
  font-size: 20px;
  margin-top: 10px;
  padding: 0 5px;
}
.searchDv ul li .search_content {
  display: flex;
  position: relative;
  /* overflow: hidden; */
  margin-bottom: 10px;
  margin-top: 10px;
}
.searchDv ul li .search_content .min {
  color: crimson;
  margin-left: 5px;
}
.searchDv ul li .search_content .price {
  color: crimson;
}
.searchDv ul li .search_content .ok {
  color: #9c9c9c;
  margin-left: 10px;
}
.searchDv ul li .search_content .fa {
  position: absolute;
  padding: 5px 10px;
  right: 0;
  margin-top: -8px;
  border-radius: 20px 0 0 20px;
  background: #fff;
  border-right: 0;
  color: #58595b;
}
button {
  outline: none;
}
</style>