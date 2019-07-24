import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const state = {
  userinfo: JSON.parse(localStorage.getItem("userinfo"))||'{}',
}
const mutations = {
  SAVE_USERIINFO(state, userinfo) {
    console.log("进入vuex");
    localStorage.setItem("userinfo", JSON.stringify(userinfo));
    // 存储数据
    state.userinfo = userinfo;
  }
}
export default new Vuex.Store({
  state,
  mutations,
})
