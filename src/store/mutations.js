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
    // LOGOUT
} from './mutation-types'

export default {
    [RECEIVE_ADDRESS](state, { address }) {
        state.address = address
    },
    [RECEIVE_CATEGORYS](state, { categorys }) {
        state.categorys = categorys
    },
    [RECEIVE_SHOPS](state, { shops }) {
        state.shops = shops
    },
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
    // [LOGOUT](state, result) {

    // },

}