<template>
  <div class="submitOrder">
    <!--导航-->
    <template v-if="intoRoute === '/confirmOrder' && shopCarStatus">
      <div class="header">
        <van-nav-bar title="确认订单" left-arrow @click-left="goBack">
          <van-icon name="arrow-left" slot="left" class="back"></van-icon>
          <span slot="right" class="right-text login" @click="login">登录</span>
          <span slot="right" class="right-text">|</span>
          <span slot="right" class="right-text register" @click="register">注册</span>
        </van-nav-bar>
      </div>
      <div class="container">
        <router-link class="address_container" to="/confirmOrder/chooseAddress">
          <template v-if="!calcAddress">
            <span><i class="iconfont location">&#xe6f6;</i>请添加一个收货地址</span>
            <span><i class="iconfont arrow-right">&#xe61a;</i></span>
          </template>
          <template v-else>
            <div class="address-left">
              <span><i class="iconfont location">&#xe6f6;</i></span>
              <div class="address_detail_container">
                <header>
                  <span>{{calcAddress.name}}</span>
                  <span>{{calcAddress.sex === 1? '先生': '女士'}}</span>
                  <span>{{calcAddress.phone}}</span>
                </header>
                <div class="address_detail">
                  <span>{{calcAddress.tag}}</span>
                  <p>{{calcAddress.address_detail}}</p>
                </div>
              </div>
            </div>

            <span><i class="iconfont arrow-right">&#xe61a;</i></span>
          </template>
        </router-link>
        <div class="delivery_model clearfix">
          <div class="deliver_text">送达时间</div>
          <div class="deliver_time">
            <p class="qu-send">尽快送达 | 预计 {{shopCarStatus.delivery_reach_time}}</p>
            <p class="fn-send">蜂鸟专送</p>
          </div>
        </div>
        <!--      支付方式-->
        <div class="pay_way">
          <div class="header_style" @click="choosePayFor">
            <span>支付方式</span>
            <div class="more_type">
              <span>在线支付</span>
            </div>
            <i class="iconfont arrow-right">&#xe61a;</i>
          </div>
          <div class="hog-bao">
            <span>红包</span>
            <span>暂时只在饿了么 APP 中支持</span>
          </div>
        </div>
        <!--      购买的商品-->
        <div class="food_list">
          <header>
            <img src="http://elm.cangdu.org/img/16b218200c241687.png" alt="">
            <span>肯德基6668812412412</span>
          </header>
          <ul class="food_list_ul" v-if="food_list">

            <li class="food_item_style" v-for="list in food_list">
              <p class="food_name">{{list.name}}</p>
              <div class="num_price">
                <span class="count">x {{list.quantity}}</span>
                <span>¥{{list.price}}</span>
              </div>
            </li>

            <li class="food_item_style">
              <p class="food_name">餐盒</p>
              <span>¥{{calcTotal.packing_fee}}</span>
            </li>
            <li class="food_item_style">
              <p class="food_name">配送费</p>
              <span>¥{{information.float_delivery_fee}}</span>
            </li>
            <li class="food_item_style">
              <p class="food_name">订单</p>
              <span class="count">待支付</span>
            </li>
            <li class="food_item_style">
              <p class="count fright">￥{{calcTotal.allMoney}}</p>
            </li>
          </ul>
        </div>
        <!--      备注-->
        <div class="pay_way">
          <router-link class="header_style"
                       :to="{path: '/confirmOrder/remark', query:{id: shopCarStatus.id, sig: shopCarStatus.sig}}">
            <span>订单备注</span>
            <div class="more_type">
              <span>{{calcRemark}}</span>
            </div>
            <i class="iconfont arrow-right">&#xe61a;</i>
          </router-link>
          <router-link
            :to="shopCarStatus.invoice.is_available?{path: '/confirmOrder/invoice'}:''"
            v-if="shopCarStatus.invoice"
            class="hog-bao">
            <span>发票抬头</span>
            <span>
            {{!shopCarStatus.invoice.is_available?shopCarStatus.invoice.status_text:invoice?'不需要开发票':'需要开发票'}}
          <i class="iconfont arrow-right">&#xe61a;</i></span>
          </router-link>
        </div>
      </div>
    </template>
    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>
    <!--    底部支付方式-->
    <transition name="payment" mode="out-in">
      <payment-tip v-if="paymentIsShow && shopCarStatus && !showSubmitComponent" @closePayment="closePayBox"
                   :shopCarPayments="shopCarStatus.payments"></payment-tip>
    </transition>
    <!--    加载动画-->
    <loading v-if="showLoading"></loading>
    <!--    警示弹出框-->
    <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="'你还没有添加过地址后🙂'"></alert-tip>
    <!--    底部提交订单-->
    <submit-order-footer :totalInfo="total" v-if="ALLOW_ACCESS_SUBMIT_ORDER.includes(intoRoute)"></submit-order-footer>
  </div>
</template>

<script>

  import SubmitOrderFooter from "../submitOrderFooter/submitOrderFooter";
  import {mapMutations, mapState} from 'vuex';
  import loading from '../common/loading/loading';
  import {checkOut, getAddress} from "../../service/getData";
  import AlertTip from "../common/alertTip/alertTip";
  import PaymentTip from "../common/paymentTip/paymentTip";

  export default {
    name: 'submitOrder',
    components: {PaymentTip, AlertTip, SubmitOrderFooter, loading},
    data() {
      return {
        showLoading: true, //显示加载动画
        showAlert: false, // 当地址没有的时候 提示地址没有添加
        address_list: [], // 收货地址
        total: {}, // 总价信息
        food_list: null, // 购物清单
        information: null, //商店信息
        shopCarStatus: {}, // 添加购物车返回的购物车信息
        paymentIsShow: false, // 支付方式是否显示
        showSubmitComponent: true, // 底部提交框是否显示
        ALLOW_ACCESS_SUBMIT_ORDER: [
          '/confirmOrder'
        ]
      }
    },
    mounted() {
      this.initData();
    },
    watch: {
      paymentIsShow() {
        this.showSubmitComponent = !this.paymentIsShow;
      }
    },
    methods: {
      ...mapMutations([
        'changeShopCarTotal', 'changeShopInfo', 'CHANGE_CHECKOUT_RESPONSE',
      ]),
      async initData() {
        // 提交购物车
        this.shopCarStatus = await checkOut(this.userLocation, [this.getShopByList], this.shopInfo.id);
        this.CHANGE_CHECKOUT_RESPONSE(this.shopCarStatus);
        // 获取最新地址 address_list
        this.address_list = await getAddress(36660);

        if (this.address_list < 1) {
          this.showAlert = true;
        }

        // 获取商店信息
        if (this.shopInfo) {
          this.information = this.shopInfo;
        } else {
          this.information = JSON.parse(getStore('shopInfo'));
        }

        // 更新vuex存储的商店Id
        this.changeShopInfo(this.information);

        // 获取vuex底部组件价格
        this.total = this.shopCarTotal;

        // 获取清单
        this.food_list = this.getShopByList;

        this.showLoading = false;
      },
      // 主页面选择支付方式
      choosePayFor() {
        this.showSubmitComponent = false;
        this.paymentIsShow = !this.paymentIsShow;
      },
      // 组件内点击任意位置 关闭底部弹窗
      closePayBox() {
        this.paymentIsShow = false;
        this.showSubmitComponent = true;
      },
      goBack() {
        this.$router.go(-1);
      },
      login() {
        this.$router.push({path: '/login'});
      },
      register() {
        this.$router.push({path: '/register'});
      },
    },
    computed: {
      // shopCarTotal 购物车计算出来的总价 总数 // shopCarList 购物车详细列
      ...mapState([
        'userLocation', 'shopCarTotal', 'shopCarList', 'intoRoute', 'shopCarMenuList',
        'shopInfo', 'addressSelectEd', 'invoice', 'remarkText', 'inputText'
      ]),
      getShopByList() {
        let map = new Set();
        let arr = this.shopCarMenuList[this.shopInfo.id];
        arr.forEach(value => {
          value.foods.forEach(v => {
            if (v.count) {
              map.add({
                attrs: [],
                extra: {},
                id: v.specfoods[0].food_id, // 商品id
                name: v.specfoods[0].name, // 商品名
                packing_fee: v.specfoods[0].packing_fee, // 打包费
                price: v.specfoods[0].price, // 商品价格
                quantity: (v.count <= v.specfoods[0].stock ? v.count : v.specfoods[0].stock), // 购买数量 小于库存可保存，否则按照库存数量来算
                sku_id: v.specfoods[0].sku_id, // 规格id
                specs: v.specfoods[0].specs.length > 0 ? v.specfoods[0].specs : [''], // 规格
                stock: v.specfoods[0].stock, // 库存
              });
            }
          });
        });
        return map;
      },
      calcTotal() {
        let totalMoney = {};
        // 餐盒费
        totalMoney.packing_fee = 0;
        totalMoney.shopMoney = 0;
        this.food_list.forEach(value => {
          totalMoney.packing_fee += value.packing_fee;
          totalMoney.shopMoney += (value.quantity * value.price);
        });
        // 配送费
        totalMoney.float_delivery_fee = this.information.float_delivery_fee;
        totalMoney.allMoney = totalMoney.packing_fee + totalMoney.shopMoney + totalMoney.float_delivery_fee;

        // 渲染底部价钱组件
        this.shopCarTotal.totalPrice = totalMoney.allMoney;
        this.changeShopCarTotal(this.shopCarTotal);
        this.total = this.shopCarTotal;
        return totalMoney;
      },
      calcAddress() {
        let addressList;
        if (this.addressSelectEd.length > 0) {
          addressList = this.addressSelectEd;
          return addressList.filter(v => v.is_user_default === false)[0];
        } else {
          return this.address_list[0];
        }
      },
      // 订单备注
      calcRemark() {
        let str = '';
        if (Object.keys(this.remarkText).length > 0) {
          for (let v of Object.values(this.remarkText)) {
            str += v[1] + ',';
          }
        } else if (this.inputText.length > 0) {
          str += this.inputText;
        } else {
          str += '口味、偏好等';
        }
        return str;
      },
    },
  };
</script>
<style scoped lang="less">
  @import "_confirmOrder";
</style>
