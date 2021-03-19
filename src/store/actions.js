/*
包含n个间接更新状态数据的方法的对象
*/
import { reqAddress, reqCategorys, reqShops, reqSessionUser, reqLogout } from '../api/index'
import { RECEIVE_ADDRESS, RECEIVE_CATEGORYS, RECEIVE_SHOPS, RECEIVE_USER, RESET_USER, RECEIVE_USERINFO } from './mutation-types'

export default {
    // 异步获取地址
    async getAddress({ commit, state }) {
        const geohash = state.latitude + ',' + state.longitude
        const result = await reqAddress(geohash)
        commit(RECEIVE_ADDRESS, { address: result.data })
    },

    // 异步获取分类列表
    async getCategorys({ commit }) {
        const result = await reqCategorys()
        commit(RECEIVE_CATEGORYS, { categorys: result.data })
    },

    // 异步获取商家列表
    async getShops({ commit, state }) {
        const { latitude, longitude } = state
        const result = await reqShops({ latitude, longitude })
        commit(RECEIVE_SHOPS, { shops: result.data })
    },
    //保存user 的同步action
    saveUser({ commit }, user) {
        commit(RECEIVE_USER, user)
    },
    //退出登录
    async logout({ commit }) {
        const result = await reqLogout()
        console.log(result)
        commit(RESET_USER)
    },
    async getUserinfo({ commit }) {
        const result = await reqSessionUser()
        console.log(result)
        commit(RECEIVE_USERINFO, result)

    }
}