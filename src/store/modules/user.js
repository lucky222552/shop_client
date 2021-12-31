/* 
    管理登录用户数据的vuex子模块
*/
import { reqUserRegister, reqUserInfo, reqGetCode, reqUserLogin, reqUserLogout } from '@/api'
import { getUserTempId, setToken, getToken, removeToken } from '@/utils/userabout'
const state = {
    // getUserTempId()获取临时标识id
    userTempId: getUserTempId(),
    code: '',
    token: getToken(), // 先从localStorage从获取token
    userInfo: {}
}

const mutations = {
    GETCODE(state, code) {
        state.code = code;
    },
    RECEIVE_TOKEN(state, token) {
        state.token = token
    },
    RECEIVE_USERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    RESET_USERINFO(state) {
        // 这个里面包含用户信息和token
        state.userInfo = {}
        state.token = ''
    }

}
const actions = {

    async userLogout({ commit }) {
        const result = await reqUserLogout()
        if (result.code === 200) {
            removeToken()
            commit('RESET_USERINFO')
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
    },

    // 
    async getUserInfo({ commit }) {
        const result = await reqUserInfo()
        if (result.code === 200) {
            commit('RECEIVE_USERINFO', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
    },

    // 重置用户信息
    async resetUserInfo({ commit }) {
        removeToken() //清空localStorage当中的token信息
        commit('RESET_USERINFO')
    },

    async userLogin({ commit }, userInfo) {
        const result = await reqUserLogin(userInfo)
        if (result.code === 200) {
            commit('RECEIVE_TOKEN', result.data.token)
            // localStorage.setItem('TOKEN_KEY', result.data.token)
            setToken(result.data.token)
            return 'ok' // 之前没有写返回值，是因为没有后续
            // 这个需要 因为不但要存储token，而且根据登录成功还是失败决定下一步向拿跳转
        } else {
            return Promise.reject(new Error('failed'))
        }
    },


    async userRegister({ commit }, user) {
        let result = await reqUserRegister(user);
        if (result.code == 200) {
            return "ok";
        } else {
            return Promise.reject(new Error("faile"));
        }
    },

    async getCode({ commit }, phone) {
        const result = await reqGetCode(phone)
        console.log(result);
        if (result.code === 200) {
            commit('GETCODE', result.data)
        } else {
            return Promise.reject(new Error('failed'))
        }
    },
}
const getters = {
    userInfo(state) {
        return state.userInfo || {}
    }
}
export default {
    state,
    actions,
    mutations,
    getters
}