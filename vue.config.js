module.exports = {
    // lintOnSave：'warning' 关闭ESLint检查
    lintOnSave: 'warning',//输出提示错误，但项目继续运行
    devServer: {
        proxy: {
            '/api': {
                target: 'http://39.98.123.211',
                changeOrigin: true, //支持跨域
                // pathRewrite: {'^/api': ''}后台接口都有api不能写
            }
        }
    }
}