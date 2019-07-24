<template>
  <div id="home">
    <ly-tab
      class="fix"
      v-model="selectedId"
      :items="items"
      :options="options"
      @change="handleChange"
    ></ly-tab>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedId: 0,
      items: [
        { label: "热门" },
        { label: "女装" },
        { label: "百货" },
        { label: "鞋包" },
        { label: "食品" },
        { label: "母婴" },
        { label: "内衣" },
        { label: "电器" },
        { label: "男装" },
        { label: "美妆" },
        { label: "手机" }
      ],
      options: {
        activeColor: "crimson"
        // 可在这里指定labelKey为你数据里文字对应的字段
      },
      subRouterUrl: [
        "/home/hot",
        "/home/girl",
        "/home/store",
        "/home/bag",
        "/home/food",
        "/home/mother",
        "/home/underwear",
        "/home/electric",
        "/home/boy",
        "/home/beauty",
        "/home/phone"
      ]
    };
  },

  methods: {
    handleChange(item, index) {
      this.$router.replace(this.subRouterUrl[index]);
    }
  }
};
</script>
<style  scoped>
#home {
  width: 100%;
  height: 100%;
  background: #fff;
  padding-top: 42px;
}
.fix {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 98;
}
.v-enter {
  opacity: 0;
  transform: translateX(100%);
}
.v-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}
</style>