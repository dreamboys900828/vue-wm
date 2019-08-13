<template>
  <!--余额说明组件-->
    <div class="balanceExplain">
      <!--导航栏-->
      <van-nav-bar
        title="余额问题"
        left-text=" "
        arrow-left
        left-arrow
        @click-left="onClickLeft"
      />
      <!--剩余内容-->
      <div class="content">
        <h3>Q1: 使用余额的条件</h3>
        <p>为了保护账户安全，使用余额前必须先绑定手机号。</p>

        <h3> Q2: 余额可以怎么用？</h3>
        <p>余额可以在饿了么平台上提现，当余额大于等于待支付金额时可以在支持在线支付的商家中进行消费。提现功能将于2016年12月25日00:00全面开放。</p>

        <h3>Q3:我要如何提现？</h3>
        <p>为了保护账户和资金安全，您在提现前需要输入真实姓名和用该姓名开通的银行卡号、选择开户行，并验证已绑定饿了么账号的手机号。每日只能提现1次，每次限额50元。若提现金额超过50元，点击【提现】时系统会提示您已超额，请您修改提现金额。</p>

        <h3> Q4:为什么会提现失败？</h3>
        <p>可能原因有：您的姓名、开户行、银行卡号等信息不匹配；您当日的提现次数和金额超过限制；您的账户存在异常，被风控拦截。</p>







      </div>


    </div>
</template>

<script>
    export default {
        name: "balanceExplain",
      methods: {
        onClickLeft() {
          // Toast('返回');
          this.$router.go(-1);
        },
      }
    }
</script>

<style scoped lang="less">
  /*<!--导航栏-->*/
  .van-nav-bar{
    background: #3190e8;
    color: white;
  }
  .van-nav-bar span,.van-nav-bar div{
    color: white;
  }
  .van-nav-bar div{
    font-weight: 800;
    font-size: 0.1875rem;
  }
  :before{
    color: white;
    height: 0.2344rem;
    font-size: 0.25rem;
    font-weight:200;
    margin-left: -0.1rem;
    margin-top: -0.1rem;
  }

  /*内容*/
  .content{
    width: 100%;
    height: 4.639rem;
    box-sizing: border-box;
    padding: 0 0.11719rem;
    h3{
      width: 3.5178rem;
      height: 0.464rem;
      font-size: 0.165rem;
      line-height: 0.464rem;
    }
    p{
      font-size: 0.14rem;
      color: #666;
      line-height: 0.234rem;
    }
  }

</style>
