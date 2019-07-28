// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
    /**
     * 1、引入router
     * 
     */
import router from './routers/index'


/**
 * 2、ly-tab
 * 
 *  */
import LyTab from 'ly-tab'
Vue.use(LyTab)

/**
 * 3、axios
 * 
 *  */
import axios from 'axios'
// axios.defaults.baseURL = "http://localhost:3000";
Vue.prototype.axios = axios;


/**
 *4、mint-ui 按需导入 
 * 
 *  */

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)
    // 轮播图
import {
    Swipe,
    SwipeItem
} from 'mint-ui';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
// 加载更多按钮
import {
    Button
} from 'mint-ui';
Vue.component(Button.name, Button);
// 图片懒加载
import {
    Lazyload
} from 'mint-ui';
// 下拉加载
import {
    InfiniteScroll
} from 'mint-ui';
Vue.use(InfiniteScroll);
import {
    Search
} from 'mint-ui';

Vue.component(Search.name, Search);


// 头部
import {
    Header
} from 'mint-ui';
Vue.component(Header.name, Header);

import {
    Switch
} from 'mint-ui';

Vue.component(Switch.name, Switch);

import {
    Field
} from 'mint-ui';

Vue.component(Field.name, Field);
// 出生日期
import {
    Picker
} from 'mint-ui';
Vue.component(Picker.name, Picker);

Vue.use(Lazyload);

/**
 * 5、vuex
 * 
 * 
 */




import store from './store/store'

/**
 * 全部过滤器
 * 
 *  */
Vue.filter('FilterPhone', function(phone) {
        return phone.substr(0, 3) + "****" + phone.substr(7) || '';


    })
    /**
     * 二维码生成器
     * 
     *  */

import QRCode from 'qrcodejs2'
Vue.prototype.$qrCode = QRCode;


/**
 * Toast
 * 
 *  */
import toastRegistry from './components/Toast/index'

// 这里也可以直接执行 toastRegistry()
Vue.use(toastRegistry)
    /**
     * 
     * 
     *  */
    /**
     * 
     * 
     *  */

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: {
        App
    },
    template: '<App/>'
})