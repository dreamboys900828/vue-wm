<template>
  <!--导航栏-->
  <div class="all" ref="bg">
    <van-nav-bar
      title="红包说明"
      left-text=" "
      arrow-left
      left-arrow
      @click-left="onClickLeft"
    />

    <div class="content">
      <p class="p1">Q1: 怎么获得红包？</p>
      <p class="p2">通过邀请好友获<br>
      在下单返红包的商家下单获得<br>
      抢微信朋友分享的红包获得</p>
      <p class="p1">Q2: 红包可以做什么？</p>
      <p class="p2">可以抵扣在线支付时的实际支付金额。</p>

      <p class="p1">Q3: 红包的门槛金额按照什么金额计算？</p>
      <p class="p2">红包的的门槛金额按照（选购菜品折后价＋餐盒费）的金额作为计算门槛，即购物车显示的金额（7.3以上版本）。假设红包满30可用，只要选购的菜品现价（折后价）＋餐盒费超过30，就可以使用红包。</p>

      <p class="p1">Q4: 一个红包能拆开多次使用吗？</p>
      <p class="p2">不能，一个红包只能一次性使用，不能分开使用。</p>

      <p class="p1">Q5: 下单的时候使用了红包，但是后来订单取消了，红包还会返还吗？</p>
      <p class="p2">会的，订单无效后红包会自动返还到您的账户里。</p>

      <p class="p1">Q6: 红包兑换码怎样兑换成红包，怎样查看红包？</p>
      <p class="p2">在个人中心 > 我的红包 > 兑换红包，输入兑换码进行兑换。</p>

      <p class="p1">Q7: 邀请好友了，为什么没获得红包？</p>
      <p class="p2">先检查下您是否在同一设备上进行的邀请？或者被邀请人是否通过您发给对方的链接进行注册？而非自己复制链接注册的。同一设备上邀请或没有按照点击发送的链接邀请都是无效邀请。如果您是正常邀请没获得红包，可以致电客服进行查实。</p>

      <p class="p1">Q8: 预订早餐、预订午餐的红包怎么使用？在哪里查询？
      <p class="p2">预订早餐、预订午餐的红包暂时不支持直接点外卖使用，并且当前点外卖的红包也暂时不支持在预订早餐、预订午餐时使用。<br>
      预订早餐、预订午餐的红包从APP首页点击“预订早餐”按钮进入后在右上角的个人中心中查找预订早餐、预订午餐的红包。</p>
      <p class="p1">Q9: 互斥红包怎么使用？</p>
      <p class="p2">互斥红包不与其他优惠活动（包含但不限于：新用户专享、满X元减X元、满X元赠XX）同时使用。</p>
      <p class="p1">Q10: 返红包活动， 红包领取规则是什么?</p>
      <p class="p2">同一个手机号一天限领取三个。
      同一注册用户一天限领取三个。<br>
      注册用户红包直接发送至用户账户里。<br>
      非注册用户红包以兑换码短信的形式发送至用户手机，注册后凭兑换码兑换即可。<br>
      红包的使用周期为1周，自红包发放的第2天开始计算。<br>
      同一个手机号一天最多使用两个红包。<br>
      未收到红包短信的用户注意查看手机里的拦截短信。<br>
      有任何问题请拨打客服电话：10105757。</p>
    </div>

  </div>
</template>

<script>
  export default {
    name: "HBexplain",
    methods: {
      onClickLeft() {
        this.$router.go(-1);
      },
    },
    mounted(){
      this.$refs.bg.style.height = window.innerHeight+"px"
    }
  }
</script>

<style scoped lang="less">
  .van-nav-bar{
    background: #3190e8;
    color: white;

    :before{
      color: white;
      height: 0.2344rem;
      font-size: 0.25rem;
      font-weight:200;
      margin-left: -0.1rem;
      margin-top: -0.1rem;
    }
    span,div{
      color: white;
    }
    div{
      font-weight: 800;
      font-size: 0.1875rem;
    }
  }

  .all{
    background: #f5f5f5;

    box-sizing: border-box;
    .content{
      padding: 0 0.117188rem;
      .p1{
        font-size: 0.164531rem;
        line-height: 0.464rem;
        font-family: Microsoft Yahei;
      }
      .p2{
        color: #666666;
        font-size: 0.140625rem;
        line-height: 0.232rem;
      }
    }
  }


</style>
