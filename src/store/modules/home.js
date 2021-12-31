/* 
    管理首页相关数据的vuex子模块
*/
import {
    reqBannerList,
    reqCategoryList,
    reqFloors,
    reqRecommends

} from '../../api'
const state = {
    categoryList: [],
    bannerList: [],
    recommends: [],
    floors: [],
}
const mutations = {
    // 接收保存分类列表
    RECEIVE_CATEGORY_LIST(state, categoryList) {
        state.categoryList = categoryList.splice(0, 15)
    },
    // 广告轮播列表
    RECEIVE_BANNER_LIST(state, bannerList) {
        state.bannerList = bannerList
    },
    // 推荐列表
    RECEIVE_RECOMMEND_LIST(state, recommends) {
        state.recommends = recommends
    },
    // 楼层
    RECEIVE_FlOORS(state, floors) {
        state.floors = floors
    },
    // aaa(state) {
    //     // state是当前模块的
    // }
}
const actions = {
    // 获取三级分类列表的异步action
    async getCategoryList({ commit }) {
        // 调用接口请求函数（发异步ajax请求）
        const result = await reqCategoryList()
        // 如果请求成功了
        if (result.code === 200) {
            const categoryList = result.data
            commit('RECEIVE_CATEGORY_LIST', categoryList)
        }
    },
    // 获取广告轮播列表
    async getBannerList({ commit }) {
        // 调用接口请求函数（发异步ajax请求）
        const result = await reqBannerList()
        // 如果请求成功了
        if (result.code === 200) {
            const bannerList = result.data
            commit('RECEIVE_BANNER_LIST', bannerList)
        }
    },
    // 获取recommends
    async getRecommends({ commit }) {
        // 调用接口请求函数（发异步ajax请求）
        const result = await reqRecommends()
        // 如果请求成功了
        if (result.code === 200) {
            const recommends = result.data
            commit('RECEIVE_RECOMMEND_LIST', recommends)
        }
        console.log('reqRecommends');
    },
    // 获取floors
    async getFloors({ commit }) {
        // 调用接口请求函数（发异步ajax请求）
        const result = await reqFloors()
        // 如果请求成功了
        if (result.code === 200) {
            const floors = result.data
            commit('RECEIVE_FlOORS', floors)
        }
        console.log('getFloors');
    },
    // yyy(commit) {
    //     commit('yyy')
    // commit出发的是所有匹配的mutation
    // 可能是其他模块或者总的mutation
    // }
}
const getters = {}


export default {
    state,
    mutations,
    actions,
    getters
}