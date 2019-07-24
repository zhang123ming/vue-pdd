<template>
  <div id="tabbar">
    <ul>
      <router-link tag="li" to="/home">
        <img :src="$route.path.includes('/home')?tabBarArr[0].sel:tabBarArr[0].normal" alt />
        <span :class="{current:$route.path.includes('/home')}">首页</span>
      </router-link>
      <router-link tag="li" to="/recommend">
        <img :src="$route.path.includes('/recommend')?tabBarArr[1].sel:tabBarArr[1].normal" alt />
        <span :class="{current:$route.path.includes('/recommend')}">推荐</span>
      </router-link>
      <router-link tag="li" to="/search">
        <img :src="$route.path.includes('/search')?tabBarArr[2].sel:tabBarArr[2].normal" alt />
        <span :class="{current:$route.path.includes('/search')}">搜索</span>
      </router-link>
      <router-link tag="li" to="/shopping">
        <img :src="$route.path.includes('/shopping')?tabBarArr[3].sel:tabBarArr[3].normal" alt />
        <span :class="{current:$route.path.includes('/shopping')}">购物车</span>
      </router-link>
      <router-link tag="li" to="/me">
        <img :src="$route.path.includes('/me')?tabBarArr[4].sel:tabBarArr[4].normal" alt />
        <span :class="{current:$route.path.includes('/me')}">个人中心</span>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabBarArr: [
        {
          normal: ("./../../../static/img/nav/index.svg"),
          sel: ("./../../../static/img/nav/index_s.svg")
        },
        {
          normal: ("./../../../static/img/nav/tui.svg"),
          sel: ("./../../../static/img/nav/tui_s.svg")
        },
        {
          normal: ("./../../../static/img/nav/search.svg"),
          sel: ("./../../../static/img/nav/search_s.svg")
        },
        {
          normal: ("./../../../static/img/nav/shop.svg"),
          sel: ("./../../../static/img/nav/shop_s.svg")
        },
        {
          normal: ("./../../../static/img/nav/me.svg"),
          sel: ("./../../../static/img/nav/me_s.svg")
        }
      ]
    };
  },

  methods: {
    //   点击切换路由改变颜色
    switchTo(path){
        this.$router.replace(path);
    }
  }
};
</script>
<style  scoped>
#tabbar {
  width: 100%;
  height: 60px;
  background: #fff;
  border-top: 1px solid #9b9898;
  z-index: 99;
  position: fixed;
  bottom: 0;
  left: 0;
}
#tabbar ul {
  width: 100%;
  height: 100%;
  display: flex;
}
#tabbar ul li {
  list-style: none;
  width: 25%;
  height: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
  cursor: pointer;
}
#tabbar ul li img {
  margin-top: -8px;
  margin-bottom: 3px;
  width: 28px;
  height: 28px;
}
#tabbar ul li .current{
    color: #1084b2;
}
</style>