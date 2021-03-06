/* 
    vuex最核心的管理对象store==>仓库
*/
import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'
// 
Vue.use(Vuex)

// const mutations = {
//     xxx(state) {

//     }
// }

// const actions = {
//     yyy({ commit }) {

//     }
// }

// const getters = {
//     zzz(state) {
//         return state.home.xxx.length
//     }
// }
// 向外暴露store对象
export default new Vuex.Store({
    // mutations,
    // actions,
    // getters,
    modules
    // modules: {
    //     home,
    //     user
    // }
})

/* 
    vuex多模块编程的总状态结构
    {
        home: {
            categoryList: []
        },
        user: {
            userInfo: {}, //用户信息对象
        }
    }
*/

