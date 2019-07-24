import Vue from 'vue'
/**
 * vue-router导入
 * 
 */
import VueRouter from 'vue-router'
Vue.use(VueRouter);
/**
 * 一级路由
 * 
 * 
 */

import Home from './../components/Home/index.vue'
import Recommend from './../components/Recommend/index.vue'
import Search from './../components/Search/index.vue'
import Shopping from './../components/Shopping/index.vue'
import Me from './../components/Me/index.vue'
import Tab from './../components/Me/tab.vue'
/**
 * 二级路由
 * 
 * 
 *  */


import Hot from './../components/Home/Children/Hot/Hot.vue'
import Girl from './../components/Home/Children/Girl.vue'
import Store from './../components/Home/Children/Store.vue'
import Bag from './../components/Home/Children/Bag.vue'
import Food from './../components/Home/Children/Food.vue'
import Mother from './../components/Home/Children/Mother.vue'
import Underwear from './../components/Home/Children/Underwear.vue'
import Electric from './../components/Home/Children/Electric.vue'
import Boy from './../components/Home/Children/Boy.vue'
import Beauty from './../components/Home/Children/Beauty.vue'
import Phone from './../components/Home/Children/Phone.vue'


//  me 二级路由
import Reset from './../components/Me/reset.vue'

// login
import SelectedLogin from './../components/Login/index.vue'
import Login from './../components/Login/Login.vue'
// me
import Medetail from './../components/Me/Medetail.vue'
import Text from './../components/Me/Text.vue'
export default new VueRouter({
    mode: 'history',
    routes: [{
            path: '/home',
            component: Home,
            children: [
                { path: 'hot', component: Hot },
                { path: 'girl', component: Girl },
                { path: 'store', component: Store },
                { path: 'bag', component: Bag },
                { path: 'food', component: Food },
                { path: 'mother', component: Mother },
                { path: 'underwear', component: Underwear },
                { path: 'electric', component: Electric },
                { path: 'boy', component: Boy },
                { path: 'beauty', component: Beauty },
                { path: 'phone', component: Phone },
                { path: '/home', redirect: '/home/hot' },


            ]
        },
        { path: '/recommend', component: Recommend },
        { path: '/search', component: Search },
        { path: '/shopping', component: Shopping },
        { path: '/me', component: Me },
        { path: '/reset', component: Reset },
        { path: '/selectlogin', component: SelectedLogin },
        { path: '/login', component: Login },
        { path: '/medetail', component: Medetail },
        { path: '/text', component: Text },
        { path: '/tab', component: Tab },
        { path: '/', redirect: '/home' }

    ]
})