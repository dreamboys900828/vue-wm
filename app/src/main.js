// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false;

//引入Vuex
import Vuex from 'vuex';

Vue.use(Vuex);

// 引入 vuex-persistedstate
import createPersistedState from 'vuex-persistedstate';

// 引入vue-axIos
import axios from 'axios'
import VueAxios from 'vue-axios';

axios.interceptors.request.use(
  config => {
    // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    config.withCredentials = true; // 允许携带token ,这个是解决跨域产生的相关问题

    return config;
  },
  error => {
    return Promise.error(error);
  });
Vue.use(VueAxios,axios);

// 样式重置
import '@/assets/css/reset.css';
// 公共样式
import '@/assets/css/common.css'
// 页面调整
import '@/assets/js/resize.js';

// 引入 vAnt
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);

router.afterEach((to, from) => {
  store.commit('changeRouter', to.path);
  console.log(to.path);
});
/*
  Vuex状态管理
 */
// import modulesVueX from './vuex';

const store = new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    intoRoute: null, // 当前进入的路由
    userLocation: null, // 用户经纬度
    placeHistory: [], // 地区搜索历史
    searchHistory: [], // 食品搜索历史
    tabBarActive: 0, // 底部切换索引
    shopInfo: {}, // 商店信息
    shopCarTotal: {}, // 购物车存取的钱数量商品名等信息
    shopCarMenuList: {}, // 购物车菜单列表
    checkOutList: {}, // 提交购物车成功返回的消息
    addressSelectEd: [], // 用户地址列表
    invoice: false, // 是否需要发票
    remarkText: {},//可选备注内容
    inputText: '',//输入备注内容
    address:{}, // 后台地址
  },
  mutations: {
    saveAddress(state,payload){
      state.address=payload;
    },
    changePlaceHistory(state, payload) {
      state.placeHistory = payload;
    },
    changeSearchHistory(state, payload) {
      state.searchHistory = payload;
    },
    changeRouter(state, payload) {
      state.intoRoute = payload;
    },
    changeUserLocation(state, payload) {
      state.userLocation = payload;
    },
    changeTabActive(state, payload) {
      state.tabBarActive = payload;
    },
    changeShopInfo(state, payload) {
      state.shopInfo = payload;
    },
    changeShopCarTotal(state, payload) {
      state.shopCarTotal = payload;
    },
    changeShopCarMenuList(state, payload) {
      Vue.set(state.shopCarMenuList, state.shopInfo.id,payload);
    },
    changeAddressSelectEd(state, payload) {
      state.addressSelectEd = payload;
    },
    changeInvoice(state, payload) {
      state.invoice = payload;
    },
    //记录订单页面用户选择的备注, 传递给订单确认页面
    CONFIRM_REMARK(state, {
      remarkText,
      inputText
    }) {
      state.remarkText = remarkText;
      state.inputText = inputText;
    },
    // 每一次成功提交购物车 都要更新列表
    CHANGE_CHECKOUT_RESPONSE(state, payload) {
      state.checkOutList = payload;
    }
  },
  getters: {
    // 获取购物车列表
    getShopCarMenuList(state) {
      let arr = [];
      if (state.shopCarMenuList[state.shopInfo.id]) {
        state.shopCarMenuList[state.shopInfo.id].forEach(value => {
          value.foods.filter(v => {
            if (v.count) {
              arr.push(v);
            }
          });
        });
      } else {
        arr = [];
      }
      return arr;
    },
    // 获取购物车 总价
    getShopTotalPrice(state) {
      let totalCount = 0; // 总数
      let totalPrice = 0; // 总价
      let total;
      let diff_money;
      if (state.shopCarMenuList[state.shopInfo.id]) {
        state.shopCarMenuList[state.shopInfo.id].forEach(value => {
          value.foods.forEach(val => {
            if (val.count) {
              totalCount += val.count;
              totalPrice += val.count * val.specfoods[0].price;
            }
          })
        });
        // 判断商品添加的够不够起送费用，不够的话就disabled
        // 起送费
        let minimum_order_amount = parseInt(state.shopInfo.float_minimum_order_amount);
        diff_money = minimum_order_amount - totalPrice;

        total = {
          totalCount: totalCount, totalPrice: totalPrice,
          _shop_id: state.shopInfo.id, geohash: state.userLocation,
          diff_money,
        };
      } else {
        let minimum_order_amount = parseInt(state.shopInfo.float_minimum_order_amount);
        diff_money = minimum_order_amount - totalPrice;
        total = {
          totalCount: 0,
          totalPrice: totalPrice,
          _shop_id: state.shopInfo.id,
          geohash: state.userLocation,
          diff_money: diff_money
        };
      }
      return total;
    },
    getSearchHistory(state) {
      return state.searchHistory;
    },
  }
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
