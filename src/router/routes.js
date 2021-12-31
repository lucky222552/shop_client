/* 
    所有路由配置的数组
*/

// import Home from '../pages/Home'
const Home = () => import('../pages/Home')
const Search = () => import('../pages/Search')
const Login = () => import('../pages/Login')
// import Search from '../pages/Search'
// import Login from '../pages/Login'
import Register from '../pages/Register'
import Detail from '../pages/Detail'
import AddCartSuccess from '../pages/AddCartSuccess'
import ShopCart from '../pages/ShopCart'
import Trade from '../pages/Trade'
import Pay from '../pages/Pay'
import PaySuccess from '../pages/PaySuccess'
import Center from '../pages/Center'
import MyOrder from '../pages/Center/MyOrder'
import GroupOrder from '../pages/Center/GroupOrder'
import store from '@/store'

export default [
    {
        path: '/center',
        component: Center,
        redirect: '/center/myorder',
        children: [
            {
                path: 'myorder',
                component: MyOrder
            },
            {
                path: 'grouporder',
                component: GroupOrder
            },
            /* {
                path: '',
                redirect: 'myorder'
            } */
        ]

    },
    {
        path: '/pay',
        component: Pay,
        beforeEnter: (to, from, next) => {
            if (from.path === "/trade") {
                next()
            } else {
                next('/')
            }
        }

    },
    {
        path: '/paysuccess',
        component: PaySuccess,
        beforeEnter: (to, from, next) => {
            if (from.path === "/pay") {
                next()
            } else {
                next('/')
            }
        }

    },
    {
        path: '/trade',
        component: Trade,
        beforeEnter: (to, from, next) => {
            if (from.path === "/shopcart") {
                next()
            } else {
                next('/')
            }
        }
    },
    {
        path: '/shopcart',
        component: ShopCart,

    },
    {
        path: '/addcartsucess',
        component: AddCartSuccess,
        beforeEnter: (to, from, next) => {
            // 只有没登录才能看到登录的界面
            let skuNum = to.query.skuNum
            let skuInfo = sessionStorage.getItem('SKUINFO_KEY')

            if (skuNum && skuInfo) {
                next()
            } else {
                // 必须带够参数
                alert('必须带够参数')
                next('/')
            }
        },

    },
    {
        path: '/detail/:skuId',
        component: Detail,

    },
    {
        path: '/',
        component: Home,

    },
    {
        name: 'search',
        path: '/search/:keyword?',
        component: Search,
        // props: true 只映射params参数
        props: (route) => (
            {
                keyword3: route.params.keyword,
                keyword4: route.query.keyword2
            }
        )
    },
    {
        path: '/register',
        component: Register,
        meta: {
            isHideFooter: true
        }
    },
    {
        path: '/login',
        component: Login,
        meta: {
            isHideFooter: true
        },
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            // 只有没登录才能看到登录的界面
            let token = store.state.user.token
            if (token) {
                next('/')
            } else {
                next()
            }
        },

    },
]