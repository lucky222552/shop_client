<template>
  <div class="swiper-container" ref="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="banner in bannerList" :key="banner.id">
        <img :src="banner.imageUrl" style="width: 100%; height: 464px" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    // swiper对象必须在列表显示之后才能创建
    // new Swiper(".swiper-container", { 这种方式会影响到页面其它的轮播效果
    // new Swiper(this.$refs.swiper, {
    //   // direction: "horizontal",默认可以不写 水平切换选项
    //   loop: true, // 循环模式选项
    //   autoplay: {
    //     delay: 4000,
    //     disableOnInteraction: false, //用户操作后是否停止自动轮播
    //   }, // 自动轮播
    //   // 如果需要分页器
    //   pagination: {
    //     el: ".swiper-pagination",
    //   },
    //   // 如果需要前进后退按钮
    //   navigation: {
    //     nextE1: ".swiper-button-next",
    //     prevE1: ".swiper-button-prev",
    //   },
    //   // 如果需要滚动条
    //   scrollbar: {
    //     el: ".swiper-scrollbar",
    //   },
    // });
  },
  watch: {
    bannerList() {
      this.$nextTick(() => {
        new Swiper(this.$refs.swiper, {
          // direction: "horizontal",默认可以不写 水平切换选项
          loop: true, // 循环模式选项

          autoplay: {
            delay: 4000,
            disableOnInteraction: false, //用户操作后是否停止自动轮播
          }, // 自动轮播
          // 如果需要分页器
          pagination: {
            el: ".swiper-pagination",
            // clickable: true, // 默认是false
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          // 如果需要滚动条
          scrollbar: {
            el: ".swiper-scrollbar",
          },
        });
      });
    },
  },
};
</script>

<style>
</style>