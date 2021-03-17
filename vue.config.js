module.exports = {

    //配置开发服务器的代理
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:4000',
                changeOrigin: true, //支持跨域
                pathRewrite: {
                    '^/api': '',
                }
            }
        }
    }
}