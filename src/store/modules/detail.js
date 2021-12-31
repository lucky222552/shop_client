import { reqDetailInfo } from '@/api'
const state = {
    skuDetailInfo: {}
}
const mutations = {
    RECEIVE_SKUDETAILINFO(state, skuDetailInfo) {
        state.skuDetailInfo = skuDetailInfo
    }
}
const actions = {
    async getSkuDetailInfo({ commit }, skuId) {
        let result = await reqDetailInfo(skuId)
        console.log(result);
        if (result.code === 200) {
            commit('RECEIVE_SKUDETAILINFO', result.data)
        }
    }
}
const getters = {
    categoryView(state) {
        return state.skuDetailInfo.categoryView || {}
    },
    skuInfo(state) {
        return state.skuDetailInfo.skuInfo || {}
    },
    spuSaleAttrList(state) {
        return state.skuDetailInfo.spuSaleAttrList || {}
    },
}
export default {
    state,
    mutations,
    actions,
    getters
}
