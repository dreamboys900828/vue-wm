<template>
  <div class="header">
    <van-nav-bar
      title="余额问题"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"></van-nav-bar>
    <div class="bg">
      <h4>Q1:使用余额的条件</h4>
      <p class="bg-user">为了保护账户安全，使用余额前必须先绑定手机号。</p>
    </div>
    <div class="bg">
      <h4>Q2: 余额可以怎么用？</h4>
      <p class="bg-user">余额可以在饿了么平台上提现，当余额大于等于待支付金
        <br/>额时可以在支持在线支付的商家中进行消费。提现功能将
        <br/>于2016年12月25日00:00全面开放。</p>
    </div>
    <div class="bg">
      <h4>Q3:我要如何提现？</h4>
      <p class="bg-user">为了保护账户和资金安全，您在提现前需要输入真实姓名
        <br>和用该姓名开通的银行卡号、选择开户行，并验证已绑定
        <br>饿了么账号的手机号。每日只能提现1次，每次限额50
        <br>元。若提现金额超过50元，点击【提现】时系统会提示
        <br>您已超额，请您修改提现金额。</p>
    </div>
    <div class="bg">
      <h4>Q4:为什么会提现失败？</h4>
      <p class="bg-user">可能原因有：您的姓名、开户行、银行卡号等信息不匹
        <br>配；您当日的提现次数和金额超过限制；您的账户存在异
        <br>常，被风控拦截。</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "detail",
    methods: {
      onClickLeft() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>
  .header {
    background: white;
  }

  .van-nav-bar {
    background: #3190e8;
  }

  .van-nav-bar__title {
    color: white;
    font-size: .18rem;
    font-weight: bold;
  }

  .van-icon {
    color: white;
    font-size: .25rem;
    margin-left: -.09rem;
    font-weight: 100;
  }

  .bg-user {
    font-size: .14rem;
    line-height: .2rem;
    margin: .1rem 0 0 .11rem;
  }

  h4 {
    padding-top: .14rem;
    font-size: .16rem;
    font-weight: 100;
    margin-left: .11rem;
    color: #333;
  }
</style>
