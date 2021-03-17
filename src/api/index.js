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