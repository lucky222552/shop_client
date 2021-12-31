import {
    reqAddOrUpdateCart,
    reqCartList,
    reqUpdateCartChecked,
    reqDeleteCart
} from '@/api'
const state = {
    cartList: []
}
const mutations = {
    RECEIVECARTLIST(state, cartList) {
        state.cartList = cartList
    }
}
const actions = {
    async addorUpdateCart({ commit }, { skuId, skuNum }) {
        const result = await reqAddOrUpdateCart(skuId, skuNum)

        // 如果和以下写法一样，那么这个异步函数返回的promise只有成功
        // if (result.code === 200) {
        //     return 'ok'
        // } else {
        //     return 'failed'
        // }
        // 下面的写法会让这个promise有成功也有失败
        if (result.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('failed '))
        }
    },

    async getCartList({ commit }) {
        // 调用接口请求函数（发异步ajax请求）
        const result = await reqCartList()
        // console.log(result);
        // 如果请求成功了
        if (result.code === 200) {
            const result = await reqCartList()
            commit('RECEIVECARTLIST', result.data)
        }
    },

    async updateCartChecked({ commit }, { skuId, isChecked }) {
        const result = await reqUpdateCartChecked(skuId, isChecked)
        if (result.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
    },

    updateCartCheckedAll({ commit, dispatch, state }, isChecked) {
        let promises = []
        state.cartList[0].cartInfoList.forEach(item => {
            if (item.isChecked === isChecked) return
            // console.log(item.skuId);
            let promise = dispatch('updateCartChecked', { skuId: item.skuId, isChecked })
            promises.push(promise)
        })
        return Promise.all(promises)
    },

    // 
    async deleteCart({ commit }, skuId) {
        let result = await reqDeleteCart(skuId)
        if (result.code === 200) {
            return 'ok'
        } else {
            Promise.reject(new Error('failed'))
        }
    },
    async deleteCartAll({ commit, dispatch, state }) {
        let promises = []
        state.cartList[0].cartInfoList.forEach(item => {
            if (!item.isChecked) return
            let promise = dispatch('deleteCart', item.skuId)
            promises.push(promise)
        })
        return Promise.all(promises)
    },
    async deleteCartAll({ commit, dispatch, state }) {
        let promises = []
        // console.log(state.cartList[0].cartInfoList);
        state.cartList[0].cartInfoList.forEach(item => {
            // console.log(item.skuId);
            if (!item.isChecked) return
            console.log(item.isChecked);
            let promise = dispatch('deleteCart', item.skuId)
            promises.push(promise)
        })
        return Promise.all(promises)
    }
}
const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    }

}
export default {
    state,
    mutations,
    actions,
    getters
}
