/*
使用mockjs提供mock数据接口
 */
import Mock from 'mockjs'
import data from './data.json' //会被解析成js对象或者数组

// 返回goods的接口
Mock.mock('http://localhost:8080/goods', { code: 0, data: data.goods })
    // 返回ratings的接口
Mock.mock('http://localhost:8080/ratings', { code: 0, data: data.ratings })
    // 返回info的接口
Mock.mock('http://localhost:8080/info', { code: 0, data: data.info })

// export default ???  不需要向外暴露任何数据, 只需要保存能执行即可

console.log('mockServer')