// /*
//     引入swiper相关的库
// */

// import Vue from 'vue'
// import VueAwesomeSwiper from 'vue-awesome-swiper'


// // import style from (<=Swiper 5.x)
// import 'swiper/css/swiper.css'

// // 声明使用插件/安装插件 ==> 就能得到内部提供的一些特性(新的组件)
// Vue.use(VueAwesomeSwiper)
import Vue from 'vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'

// import style (>= Swiper 6.x)
// import 'swiper/swiper-bundle.css'

// import style (<= Swiper 5.x)
import 'swiper/css/swiper.css'

Vue.use(VueAwesomeSwiper, /* { default options with global component } */)