<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
 <Tabbar></Tabbar>
  </div>
</template>

<script>

import Tabbar from './components/Tabbar/index'
export default {
  name: 'App',
  components: {
  Tabbar,
  }
}
</script>

<style>
#app{
  width: 100%;
  height: 100%;
}
</style>
