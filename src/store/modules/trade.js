/* 
    管理首页相关数据的vuex子模块
*/
import { reqTradeInfo, reqAddress } from '../../api'
const state = {
    tradeInfo: {},
    address: []
}
const mutations = {
    RECEIVE_ADDRESS(state, address) {
        state.address = address;
    },
    RECEIVE_TRADEINFO(state, tradeInfo) {
        state.tradeInfo = tradeInfo
    }
}
const actions = {
    // 获取地址信息
    async getAddress({ commit }) {
        let result = await reqAddress()
        // console.log(result);
        if (result.code === 200) {
            commit('RECEIVE_ADDRESS', result.data)
        }
    },
    async getTradeInfo({ commit }) {
        let result = await reqTradeInfo()
        if (result.code === 200) {
            commit('RECEIVE_TRADEINFO', result.data)
            // console.log(result.data);
        }
    },

}
const getters = {
    detailArrayList() {
        return state.tradeInfo.detailArrayList || []
    },

}


export default {
    state,
    mutations,
    actions,
    getters
}