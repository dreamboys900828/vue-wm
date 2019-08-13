<template>
  <div class="payment" v-if="isShow">
    <div class="cover" @click="closePayment"></div>
    <section class="pay"  @click="closePayment">
      <header>支付方式</header>
      <ul v-if="shopCarPayments">
        <li :class="{choose: item.is_online_payment}" v-for="(item, index) in shopCarPayments" :key="index">
          <span>{{item.name}}<span>{{item.description}}</span></span>
          <i class="iconfont">&#xe669;</i>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'payment-tip',
    data() {
      return {
        isShow: true, // 是否显示该组件
      }
    },
    props: {
      shopCarPayments: {
        type: Array,
      }
    },
    methods: {
      closePayment() {
        this.isShow = false;
        this.$emit('closePayment')
      }
    },
  };
</script>
<style scoped lang="less">
  @import "_paymentTip";
</style>
