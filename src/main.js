import Vue from 'vue'
import App from './App.vue'
import router from './router'
import TypeNav from './components/TypeNav'
import MyPagination from './components/Pagination'
import Carsousel from './components/Carousel'
import store from './store'
import "swiper/css/swiper.css";
import './plugins/element'
import './plugins/swiper' //加载swiper的配置
import './plugins/validate' //加载swiper的配置
import './mock/mockServer'

import * as API from '@/api'
// 浏览器控制台不显示非生产环境打包的提示
Vue.config.productionTip = false
import VueLazyload from 'vue-lazyload'
import loading from '@/assets/images/loading.gif'
Vue.use(VueLazyload, {
  // 
  loading, // 指定未加载的到图片之前的loading图片
})

//创建或指定时间总线对象，保存到Vue的原型上
// Vue.prototype.$bus = new Vue()

// 注册全局组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(MyPagination.name, MyPagination)
Vue.component(Carsousel.name, Carsousel)
new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API; // 当不使用vux的时候，可以把接口请求函数挂载Vue原型身上
  },
  render: h => h(App),
  router, //注册路由器 
  store, // $store
}).$mount('#app')

// /* eslint-disable no-unused-vars */
// const a = 123;

/* 
  store对象的功能
  读取数据
    store.state.xxx
    store.getters.yyy
  更新数据
    store.dispatch(action名称,数据)
    store.commit(mutation名称,data)
*/