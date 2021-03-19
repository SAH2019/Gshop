/*



*/

import ajax from './ajax.js'


// 根据经纬度获取位置详情
export const reqAddress = (jingdu, weidu) => ajax({
    methods: 'GET',
    url: `/api/position/${jingdu},${weidu}`
})


// 获取食物的分类列表
export const reqCategorys = () => ajax.get('/api/index_category')

//根据经纬度获取商铺列表

// reqAddress('23.045278', '113.381944').then((result) => {
//     console.log(result)
// })

// 根据经纬度获取商铺列表
export const reqShops = ({ latitude, longitude }) => ajax({
    method: 'GET',
    url: '/api/shops',
    params: { latitude, longitude },
    // headers: {
    //     needToken: true
    // }
})


export const reqSendCode = (phone) => ajax.get('/api/sendcode', {
    params: {
        phone
    },
})


export const reqPwdLogin = ({ name, pwd, captcha }) => ajax.post('/api/login_pwd', { name, pwd, captcha })
    // 手机号验证码等登陆
export const reqSmsLogin = (phone, code) => ajax.post('/api/login_sms', { phone, code })
export const reqSessionUser = () => ajax.get('/api/userinfo')
export const reqLogout = () => ajax.get('/api/logout')