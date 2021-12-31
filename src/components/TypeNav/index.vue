<template>
  <div class="type-nav">
    <div class="container" @mouseleave="hideFirst" @mouseenter="showFirst">
      <h2 class="all">全部商品分类</h2>
      <transition name="slide">
        <div class="sort" v-show="isShowFirst">
          <div class="all-sort-list2" @click="toSearch">
            <div
              class="item"
              v-for="(c1, index) in categoryList"
              :key="c1.categoryId"
              :class="{ active: currentIndex === index }"
              @mouseenter="showSubList(index)"
            >
              <h3>
                <!--  @click="
                  $router.push(
                    `/search?categoryName=${c1.categoryName}&category1Id=${c1.categoryId}`
                  )
                " -->
                <a
                  href="javascript:;"
                  :data-category1Id="c1.categoryId"
                  :data-categoryName="c1.categoryName"
                  >{{ c1.categoryName }}</a
                >
                <!-- <router-link
                :to="`/search?categoryName=${c1.categoryName}&categoryId=${c1.categoryId}`"
                >{{ c1.categoryName }}</router-link
              > -->
              </h3>
              <div class="item-list clearfix">
                <div class="subitem">
                  <dl
                    class="fore"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dt>
                      <!--  @click="
                        $router.push(
                          `/search?categoryName=${c2.categoryName}&category2Id=${c2.categoryId}`
                        )
                      " -->
                      <a
                        href="javascript:;"
                        :data-category2Id="c2.categoryId"
                        :data-categoryName="c2.categoryName"
                        >{{ c2.categoryName }}</a
                      >

                      <!-- <router-link
                      :to="`/search?categoryName=${c2.categoryName}&category2Id=${c2.categoryId}`"
                    >
                      {{ c2.categoryName }}</router-link
                    > -->
                    </dt>
                    <dd>
                      <em
                        v-for="c3 in c2.categoryChild"
                        :key="c3.categoryChild"
                      >
                        <a
                          href="javascript:;"
                          :data-category3Id="c3.categoryId"
                          :data-categoryName="c3.categoryName"
                          >{{ c3.categoryName }}</a
                        >
                        <!--  @click="
                          $router.push(
                            `/search?categoryName=${c3.categoryName}&category3Id=${c3.categoryId}`
                          )
                        " -->
                        <!-- <router-link
                        :to="`/search?categoryName=${c3.categoryName}&category3Id=${c3.categoryId}`"
                      >
                        {{ c3.categoryName }}</router-link
                      > -->
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// import _ from "lodash"; 按需引入
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    const path = this.$route.path;
    return {
      currentIndex: -2,
      isShowFirst: path === "/", // 是否显示一级列表
    };
  },
  methods: {
    toSearch(event) {
      const target = event.target;
      console.dir(target);
      // 取出data自定义属性值
      const { categoryname, category1id, category2id, category3id } =
        target.dataset;
      // if (target.tagName.toUpperCase() === "A") {
      if (categoryname) {
        // 准备query参数
        const query = {
          categoryName: categoryname,
        };
        console.log(category1id);
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else if (category3id) {
          query.category3Id = category3id;
        }
        // 准备一个用于跳转到对象
        const location = {
          name: "search",
          query,
          params: this.$route.params,
        };
        // 跳转到search
        /* 
          从其他页面到搜索页：push()
          从搜索页到搜素页面 ： replace()
        */

        if (this.$route.name === "search") {
          this.$router.replace(location);
        } else {
          this.$router.push(location);
        }
        // 隐藏一级分类列表
        this.hideFirst();
      }
    },
    // 显示下表的子分类列表 箭头函数不行 箭头函数没有this 不能通过bind指定特定的this
    showSubList: throttle(
      function (index) {
        // 节流函数 throttle
        // 只有当还没有离开整个分类的div时才更新下标
        if (this.currentIndex !== -2) {
          this.currentIndex = index;
        }
      },
      200
      // {
      //   trailing: false, //最后一次事件不延迟处理
      // }
    ),
    // showSubList(index) { // 事件监听回调函数调用的频率太高
    //   this.currentIndex = index;
    // },
    // 显示一级列表
    showFirst() {
      // 标识当前已经进入包含分类的div了
      this.currentIndex = -1;
      // 保证显示一级列表
      this.isShowFirst = true;
    },
    /* 
        隐藏一级列表
      */
    hideFirst() {
      // 标识当前已经离开了整个div
      this.currentIndex = -2;
      // 如果当前不是首页，隐藏一级列表
      if (this.$route.path !== "/") {
        this.isShowFirst = false;
      }
    },
  },
  computed: {
    // ...mapState(['categoryList']) 单模块方式 不可以
    // categoryList() {
    //   return this.$store.state.home.categoryList;
    // },
    ...mapState({
      categoryList: (state) => state.home.categoryList,
    }),
  },
  mounted() {
    // 在初始显示之后 会更新
    // 判断当前请求的是否是首页，如果是就显示一级路由
    // 非异步请求不在mounted中写 会多更新一次页面
    // const path = this.$route.path;
    // if (path === "/") {
    //   this.isShowFirst = true;
    // }
  },
  // created() {
  //   // 判断当前请求的是否是首页，如果是就显示一级路由
  //   const path = this.$route.path;
  //   if (path === "/") {
  //     this.isShowFirst = true;
  //   }
  // },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;
      // 指定过度的样式
      &.slide-enter-active,
      &.slide-leave-active {
        transition: all 0.3s;
      }
      // 指定隐藏时的样式
      &.slide-enter,
      &.slide-leave-to {
        opacity: 0;
        height: 0;
      }

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &.active {
            background: #ccc;
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>