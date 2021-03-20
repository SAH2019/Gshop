/*
包含n个直接跟新状态数据的方法的对象
*/
// import mutation_types from './mutation-types.js'

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
    //msite7页面的数据
    [RECEIVE_ADDRESS](state, { address }) {
        state.address = address
    },
    [RECEIVE_CATEGORYS](state, { categorys }) {
        state.categorys = categorys
    },
    [RECEIVE_SHOPS](state, { shops }) {
        state.shops = shops
    },

    //用户信息的数据
    [RECEIVE_USER](state, user) {
        state.user = user
    },
    [RESET_USER](state) {
        state.user = {}
    },
    [RECEIVE_USERINFO](state, result) {
        if (result.data) {
            state.user = result.data
        }
    },

    //商家详情的相关数据
    [RECEIVE_INFO](state, { info }) {
        state.info = info
    },

    [RECEIVE_RATINGS](state, { ratings }) {
        state.ratings = ratings
    },

    [RECEIVE_GOODS](state, { goods }) {
        state.goods = goods
    },



    [ADD_FOOD_COUNT](state, food) {
        if (food.count) {
            food.count++
        } else {
            food.count = 1
        }
    },
    [REDUCE_FOOD_COUNT](state, food) {
        if (food.count > 0) {
            food.count--
        }
    },
}