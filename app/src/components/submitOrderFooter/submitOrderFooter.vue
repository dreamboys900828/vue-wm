<template>
  <div class="footer">
    <div class="noPay_order">待支付 ¥{{totalInfo.totalPrice}}</div>
    <div class="submitOrder" @click="readySubmit">
      确认下单
    </div>
  </div>
</template>

<script>
    export default {
        props: {
          totalInfo: {
            type: Object
          }
        },
      methods: {
          // 确认下单
        readySubmit() {
          // TODO 确认提交前的操作 比如地址是否有选择默认
          this.$router.push({path: '/confirmOrder/payment'});
        }
      },
    };
</script>
<style scoped lang="less">
  @import "_submitOrderFooter";
</style>
