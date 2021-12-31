/* 
    路由器对象
*/
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'
// 安装Vue插件
Vue.use(VueRouter)

// 缓存原型上的push函数
const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace

// 给原型对象上的push指定新函数函数
VueRouter.prototype.push = function (location, onResolve, onReject) {

    // console.log('push()', onResolve, onReject)

    // 判断如果没有指定回调函数, 通过call调用源函数并使用catch来处理错误
    if (onResolve && onReject) {
        // 直接调用原来的push方法
        return originPush.call(this, location, onResolve, onReject)
    }
    // 没有指定成功会失败的回调
    return originPush.call(this, location).catch((err) => {
        // 如果是重复导航的错误,不再向外传递错误
        if (VueRouter.isNavigationFailure(err)) {
            return err; // 产生的是成功的promise， 成功的promise的value是err
        }
        // throw error
        // 如果是其它原因导航的错误，将错误向下传递
        return Promise.reject(err)
    })
    // if (onResolve === undefined && onReject === undefined) {

    //     return originPush.call(this, location).catch(() => { })

    // } else { // 如果有指定任意回调函数, 通过call调用源push函数处理
    //     originPush.call(this, location, onResolve, onReject)
    // }
}
VueRouter.prototype.replace = function (location, onResolve, onReject) {

    // console.log('replace()', onResolve, onReject)

    // 判断如果没有指定回调函数, 通过call调用源函数并使用catch来处理错误
    if (onResolve && onReject) {
        // 直接调用原来的push方法
        return originReplace.call(this, location, onResolve, onReject)
    }
    // 没有指定成功会失败的回调
    return originReplace.call(this, location).catch((err) => {
        // 如果是重复导航的错误,不再向外传递错误
        if (VueRouter.isNavigationFailure(err)) {
            return err; // 产生的是成功的promise， 成功的promise的value是err
        }
        // throw error
        // 如果是其它原因导航的错误，将错误向下传递
        return Promise.reject(err)
    })
    // if (onResolve === undefined && onReject === undefined) {

    //     return originPush.call(this, location).catch(() => { })

    // } else { // 如果有指定任意回调函数, 通过call调用源push函数处理
    //     originPush.call(this, location, onResolve, onReject)
    // }
}
// VueRouter.prototype.replace = function (location, onResolve, onReject) {

//     if (onResolve === undefined && onReject === undefined) {

//         return originReplace.call(this, location, onResolve, onReject).catch(() => { })

//     } else {
//         originReplace.call(this, location, onResolve, onReject)
//     }
// }


const router = new VueRouter({
    // 模式
    mode: 'history', // 不带#
    // 应用所有路由
    routes,
    scrollBehavior(to, from, savedPostion) {
        return { x: 0, y: 0 }
    }

})


router.beforeEach(async (to, from, next) => {
    // 全局前置导航守卫
    // to 代表去的地方的路由对象
    // from 从哪个地方来的路由对象
    // next 是一个函数
    // next()无条件放行
    // next(false)不放行
    // next('/') next({path: '/'})代表最终让他去哪

    // token校验
    let token = store.state.user.token
    if (token) {
        if (to.path === '/login') {
            next('/')
        } else {
            let hasUserInfo = !!store.state.user.userInfo.nickName
            if (hasUserInfo) {
                next()
            } else {
                try {
                    await store.dispatch('getUserInfo')
                    next()
                } catch (error) {
                    alert('用户的token过期')
                    store.dispatch('resetUserInfo')
                    // 去到之前想去却没有去成的地方，需要和登录逻辑配合使用
                    next('/login?redirect=' + to.path)
                }
            }

        }
    } else {
        // 代表用户没登录或者之前也没登录
        // 后期需要判断用户是不是去订单相关的页面，如果是那么就先登录
        if (to.path.indexOf('/trade') === 0 || to.path.startsWith('/pay') || to.path.startsWith('/center')) {
            next('/login?redirect=' + to.path)
        } else {
            next()
        }
    }

})

export default router