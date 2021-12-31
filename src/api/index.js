/* 
    包含应用的所有接口的请求函数
    函数内部调用ajax函数发送请求
    函数的返回是promise对象
*/
import { method } from 'lodash'
import ajax from './ajax'
import mockAjax from './mockAjax'
/* 
    首页三级分类
    /api/product/getBaseCategoryList GET
*/
export function reqCategoryList() {
    // return ajax.get('/api/product/getBaseCategoryList')
    // return ajax() //发不带参数的get请求
    return ajax({
        url: '/product/getBaseCategoryList',
        // method: 'GET'
    })
}

export const reqBannerList = () => mockAjax('/banners')

/* 
    mock接口函数
*/

export const reqRecommends = () => mockAjax('/recommends')
export const reqFloors = () => mockAjax('/floors')

// reqRecommends().then(result => {
//     console.log(result);
// })

// 搜索分页列表
export const reqSearch = (searchParams) => ajax.post('/list', searchParams)
// 获取详情页数据
export const reqDetailInfo = (skuId) => {
    return ajax({
        url: `/item/${skuId}`,
        method: 'GET'
    })
}


// 添加购物车（修改购物车的商品数量）
export const reqAddOrUpdateCart = (skuId, skuNum) => {
    return ajax({
        url: `/cart/addToCart/${skuId}/${skuNum}`,
        method: 'POST'
    })
}

// 获取购物车列表
export const reqCartList = () => {
    return ajax({
        url: '/cart/cartList',
        method: 'GET'
    })
}

// 修改购物车的选中状态
export const reqUpdateCartChecked = (skuId, isChecked) => {
    return ajax({
        url: `/cart/checkCart/${skuId}/${isChecked}`,
        method: 'GET'
    })
}

// 删除购物车
export const reqDeleteCart = (skuId) => {
    return ajax({
        url: `/cart/deleteCart/${skuId}`,
        method: 'DELETE'
    })
}





// 获取验证码
export const reqGetCode = (phone) => {
    return ajax({
        // url: `/user/passport/sendCode/ ${phone}`, 空格不能缺，缺了就完蛋
        url: `/user/passport/sendCode/${phone}`,
        method: 'GET'
    })
}

//注册
//url:/api/user/passport/register  method:post    phone code password

export const reqUserRegister = (data) =>
    ajax({
        url: '/user/passport/register',
        data,
        method: 'post'
    });

export const reqUserLogin = (userInfo) => {
    return ajax({
        url: 'user/passport/login',
        method: 'POST',
        data: userInfo
    })
}

// 根据token获取用户信息
// get
//【需要带着用户的token向服务器要用户信息】
//URL:/api/user/passport/auth/getUserInfo  method:get 
export const reqUserInfo = () => {
    return ajax({
        url: 'user/passport/auth/getUserInfo',
        method: 'GET'
    })
}
// 退出登录
//api/user/passport/logout
export const reqUserLogout = () => {
    return ajax({
        url: '/user/passport/logout',
        method: 'GET'
    })
}


// 获取用户地址信息 
export const reqAddress = () => {
    return ajax({
        url: '/user/userAddress/auth/findUserAddressList',
        method: 'GET'
    })
}


// 获取交易页面信息
// api/order/auth/trade

export const reqTradeInfo = () => {
    return ajax({
        url: '/order/auth/trade',
        method: 'GET'
    })
}


// 提交订单  真正的创建订单
// order/auth/submitOrder?tradeNo={tradeNo}
export const reqSubmitOrder = (tradeNo, tradeData) => {
    return ajax({
        url: `order/auth/submitOrder?tradeNo=${tradeNo}`,
        method: 'POST',
        data: tradeData
    })
}

//获取支付信息
// payment/weixin/createNative/{orderId}
// get
export const reqPayInfo = (orderId) => {
    return ajax({
        url: `payment/weixin/createNative/${orderId}`,
        method: 'GET'
    })
}


// 查询订单支付状态
// /payment/weixin/queryPayStatus/{orderId}
// get
export const reqPayStatus = (orderId) => {
    return ajax({
        url: `/payment/weixin/queryPayStatus/${orderId}`,
        method: 'GET'
    })
}

// /api/order/auth/{page}/{limit}
export const reqMyOrderInfo = (page, limit) => {
    return ajax({
        url: `/order/auth/${page}/${limit}`,
        method: 'GET'
    })
}