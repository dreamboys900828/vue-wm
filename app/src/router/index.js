import Vue from 'vue';
import Router from 'vue-router';


Vue.use(Router);
// 选择城市
import elmNavigation from '../components/elmNavigation/elmNavigation';
import lmy from '../components/lxw/Lmy';
import balance from '../components/lxw/MyBalance'
import balanceExplain from '../components/lxw/balanceExplain'
import LmyDiscounts from '../components/lxw/LmyDiscounts'
import downloadELM from '../components/lxw/noTimeHb/downloadELM'
import noTimeHb from '../components/lxw/noTimeHb/noTimeHb'
import changePackage from '../components/lxw/noTimeHb/changePackage'
import logIN from '../components/lxw/userinfo/logIN'
import reset from '../components/lxw/userinfo/reset'
import profile from "../components/lxw/userinfo/profile"
import commend from "../components/lxw/noTimeHb/commend"
import mynumber from "../components/lxw/myNumber"
import info from "../components/lxw/userinfo/info"
import address from "../components/lxw/userinfo/address"
import newress from "../components/lxw/userinfo/newRess"
import addDetail from "../components/lxw/userinfo/addDetail"
import setusername from "../components/lxw/userinfo/setusername"
import service from "../components/lxw/service/service"
import questionDetail from "../components/lxw/service/questionDetail"
import order from "../components/lxw/order/order"
import orderDetails from "../components/lxw/order/orderDetails"
import HBexplain from "../components/lxw/noTimeHb/HBexplain"


// 查询城市
import searchCity from '../components/searchCity/searchCity';


// 外卖容器主页面
import shop from '../components/shop/shop';
// 外卖主页附近商家
import mSite from '../components/msite/msite';
// 搜索商店
import searchGood from '../components/searchGood/searchGood';
// 商品首页分类
import Food from '../components/shop/food/food';
/*
  商店相关逻辑页面
 */
// 商家首页
import shopDetail from '../components/shopDetail/shopDetail';
// 单个商品详情
import goodInfo from '../components/shopDetail/goodInfo/goodInfo';
// 店家详情
import shopDesc from '../components/shopDetail/shopDesc/shopDesc';
// 提交订单
import confirmOrder from '../components/confirmOrder/confirmOrder';
import remark from '../components/confirmOrder/children/remark/remark';
import invoice from '../components/confirmOrder/children/invoice/invoice';
import payment from '../components/confirmOrder/children/payment/payment';
import userValidation from '../components/confirmOrder/children/userValidation/userValidation';
// import chooseAddress from '../components/confirmOrder/children/chooseAddress/chooseAddress';
const chooseAddress = r => require.ensure([], () => r(require('../components/confirmOrder/children/chooseAddress/chooseAddress')), 'chooseAddress');
const addAddress = r => require.ensure([], () => r(require('../components/confirmOrder/children/chooseAddress/children/addAddress/addAddress')), 'addAddress');
const searchAddress = r => require.ensure([], () => r(require('../components/confirmOrder/children/chooseAddress/children/searchAddress/searchAddress')), 'searchAddress');

// 我的订单
import myOrder from '../components/order/order';
// 个人中心
import Mine from '../components/mine/mine';

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {path: '/', redirect: '/profile'},
    {path: '/home', component: elmNavigation},
    //最初 我的登录注册页面
    {path: "/profile", component: profile},
    //密码登录页面
    {path: '/logIN', component: logIN},
    //密码修改
    {path: '/reset', component: reset},
    //我的页面
    {path: '/lmy', component: lmy},
    //我的余额
    {path: '/balance', component: balance},
    //我的积分
    {path: '/mynumber', component: mynumber},
    //余额说明
    {path: '/balanceExplain', component: balanceExplain},
    //  我的优惠
    {path: '/LmyDiscounts', component: LmyDiscounts},
    //  提示下载饿了么app界面
    {path: '/downloadELM', component: downloadELM},
    //查看历史红包
    {path: '/noTimeHb', component: noTimeHb},
    //  红包说明
    {path: "/HBexplain", component: HBexplain},
    //  兑换红包组件
    {path: '/changePackage', component: changePackage},
    //  推荐有奖组件
    {path: '/commend', component: commend},
    //账户信息页面
    {path: '/info1', component: info},
    //  编辑地址页面
    {path: "/address", component: address},
    //  新增地址
    {path: "/newRess", component: newress},
    // 搜索地址
    {path: "/addDetail", component: addDetail},
    //  修改用户名
    {path: "/setusername", component: setusername},
    //  服务中心
    {path: "/service", component: service},
    //  服务中心里的问题说明
    {path: "/questionDetail", component: questionDetail},

    //  订单列表
    {path: "/order", component: order},
    //  订单详情
    {path: "/orderDetails", component: orderDetails},
    {path: '/', redirect: '/home'},
    {path: '/home', component: elmNavigation},
    {path: '/searchCity', name: 'searchCity', component: searchCity},
    {
      path: '/shop',
      component: shop,
      children: [
        {path: 'msite', component: mSite},
        {path: 'food', component: Food},
        {path: 'shopDetail', component: shopDetail},
        {path: 'goodInfo', component: goodInfo},
        {path: 'shopDesc', component: shopDesc},
        // 搜索
        {path: 'searchGood', component: searchGood},
        // 订单
        {path: 'order', component: myOrder},
        // 我的
        {path: 'mine', component: Mine},
      ]
    },
    // 购物车
    {
      path: "/confirmOrder",
      component: confirmOrder,
      children: [{
        path: 'remark', //订单备注
        component: remark,
      }, {
        path: 'invoice', //发票抬头
        component: invoice,
      }, {
        path: 'payment', //付款页面
        component: payment,
      },
        {
          path: 'userValidation', //用户验证
          component: userValidation,
        }, {
          path: 'chooseAddress', //选择地址
          component: chooseAddress,
          children: [{
            path: 'addAddress', //添加地址
            component: addAddress,
            children: [{
              path: 'searchAddress', //搜索地址
              component: searchAddress,
            }]
          },]
        },]
    },
  ]
})
