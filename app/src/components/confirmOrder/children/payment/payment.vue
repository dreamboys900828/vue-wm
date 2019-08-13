<template>
  <div class="payment">
    <bar :title="'在线支付'"></bar>
    <section class="container">
      <section class="show_time_amount">
        <header class="time_last">支付剩余时间</header>
        <p>{{remaining}}</p>
      </section>
      <header>选择支付方式</header>
      <section class="pay_way_list">
        <section class="pay_item">
          <div class="pay_icon_contaienr clearfix">
            <div class="icon-img vx"></div>
            <span>微信</span>
          </div>
          <i class="iconfont" :class="{choose: selectPayWay === 'vx'}" @click="selectPayWay = 'vx'">&#xe669;</i>
        </section>
        <section class="pay_item">
          <div class="pay_icon_contaienr clearfix">
            <div class="icon-img zfb"></div>
            <span>支付宝</span>
          </div>
          <i class="iconfont" :class="{choose: selectPayWay === 'zfb'}" @click="selectPayWay = 'zfb'">&#xe669;</i>
        </section>
      </section>
      <button class="determine" @click="confirmPay">确认支付</button>
    </section>
    <alert-tip v-if="showAlert" :alertText="alertText" @closeTip="closeTipFun"></alert-tip>
    <loading v-if="isShow"></loading>
  </div>
</template>

<script>
  import {mapMutations, mapState} from "vuex";
  import {placeOrders} from "../../../../service/getData";
  import AlertTip from "../../../common/alertTip/alertTip";
  import Bar from "../../../bar/bar";
  import Loading from "../../../common/loading/loading";

  export default {
    name: 'payment',
    components: {Loading, Bar, AlertTip},
    created() {
      this.initData();
      // 清空 购物车列表
      this.shopCarMenuList[this.shopCarTotal._shop_id] = null;
      this.changeShopCarMenuList(this.shopCarMenuList);
      // 清空购物车计算列表
      this.shopCarTotal = null;
      this.changeShopCarTotal(this.shopCarTotal);

    },
    mounted() {
      this.remainingTime();
    },
    data() {
      return {
        isShow: true, // 动画
        showAlert: false, // 是否显示弹出框
        alertText: '', // 提示框文字
        selectPayWay: 'vx', // 支付方式
        countNum: 900, //倒计时15分钟
        gotoOrders: false, // 跳转到订单页
      }
    },
    methods: {
      ...mapMutations(['changeShopCarMenuList']),
      async initData() {
        // 购物车response
        let checkOutList = this.checkOutList;
        // 选择的默认地址
        let address_id = this.addressSelectEd.find(v => v.is_user_default === false).id;
        let entities = [checkOutList.cart.groups[0]];
        let response = await placeOrders(36660, checkOutList.id, address_id, this.calcDescription, entities, this.userLocation, checkOutList.sig);
        if (response.status === 1) {
          this.showAlert = true;
        }
        this.alertText = response.success;
        this.isShow = false;
      },
      // 倒计时
      remainingTime() {
        clearInterval(this.timer);
        this.timer = setInterval(() => {
          this.countNum--;
          if (this.countNum === 0) {
            clearInterval(this.timer);
            this.showAlert = true;
            this.alertText = '支付超时';
          }
        }, 1000);
      },
      // 确认付款
      confirmPay() {
        this.showAlert = true;
        this.alertText = '当前环境无法支付，请打开官方APP进行付款';
        this.gotoOrders = true;
      },
      //关闭提示框，跳转到订单列表页
      closeTipFun() {
        this.showAlert = false;
        if (this.gotoOrders) {
          this.$router.push('/order');
        }
      }
    },
    computed: {
      ...mapState([
        'checkOutList', 'addressSelectEd', 'remarkText', 'inputText', 'userLocation', 'shopCarTotal', 'shopCarMenuList'
      ]),
      // 订单备注信息
      calcDescription() {
        let str = '';
        if (Object.keys(this.remarkText).length > 0) {
          for (let v of Object.values(this.remarkText)) {
            str += v[1] + ',';
          }
        } else if (this.inputText.length > 0) {
          str += this.inputText;
        }
        return str;
      },
      // 时间转换
      remaining() {
        let minute = parseInt(this.countNum / 60);
        if (minute < 10) {
          minute = '0' + minute;
        }

        let second = parseInt(this.countNum % 60);
        if (second < 10) {
          second = '0' + second;
        }
        return '00 : ' + minute + ' : ' + second;
      }
    },
  };
</script>
<style scoped lang="less">
  @import "_payment";
</style>
