/*
包含n个间接更新状态数据的方法的对象
*/
import { reqAddress, reqCategorys, reqShops, reqSessionUser, reqLogout, reqShopInfo, reqShopRatings, reqShopGoods } from '../api/index'
import {
    RECEIVE_ADDRESS,
    RECEIVE_CATEGORYS,
    RECEIVE_SHOPS,
    RECEIVE_USER,
    RESET_USER,
    RECEIVE_USERINFO,
    RECEIVE_GOODS,
    RECEIVE_RATINGS,
    RECEIVE_INFO,
    REDUCE_FOOD_COUNT,
    ADD_FOOD_COUNT
} from './mutation-types'

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

    },



    // 异步获取商家信息
    async getShopInfo({ commit }, cb) {
        const result = await reqShopInfo()
        if (result.code === 0) {
            const info = result.data
            info.score = 3.5
            commit(RECEIVE_INFO, { info })

            cb && cb()
        }
    },

    // 异步获取商家评价列表
    async getShopRatings({ commit }, cb) {
        const result = await reqShopRatings()
        if (result.code === 0) {
            const ratings = result.data
            commit(RECEIVE_RATINGS, { ratings })

            cb && cb()
        }
    },

    // 异步获取商家商品列表
    async getShopGoods({ commit }, cb) {
        const result = await reqShopGoods()
        if (result.code === 0) {
            const goods = result.data
            commit(RECEIVE_GOODS, { goods })
                // 如果组件中传递了接收消息的回调函数, 数据更新后, 调用回调通知调用的组件
            cb && cb()
        }
    },

    updateFoodCount({ commit }, { isAdd, food }) {
        if (isAdd) {
            commit(ADD_FOOD_COUNT, food)
        } else {
            commit(REDUCE_FOOD_COUNT, food)
        }

    }
}