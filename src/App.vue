<template>
  <div id="app">
    <Header></Header>
    <!-- 所有的一级路由都在此显示 -->
    <router-view></router-view>
    <Footer v-show="!$route.meta.isHideFooter"></Footer>
  </div>
</template>

<script>
import Footer from "./components/Footer";
import Header from "./components/Header";

export default {
  name: "App",
  components: {
    Footer,
    Header,
  },
  mounted() {
    // 分发请求分类列表的异步action
    this.$store.dispatch("getCategoryList");
    // 异步获取三级分类
    /* reqCategoryList().then((result) => {
      console.log("result", result);
    }); */
    this.$store.dispatch("getBannerList");
  },
};
</script>

<style>
</style>
