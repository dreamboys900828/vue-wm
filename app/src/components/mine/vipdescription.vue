<template>
  <div class="header">
      <van-nav-bar
        title="我的优惠"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"></van-nav-bar>
    <blockquote class="header-con">
        <p class="dl">尊敬的用户，随着会员体系逐渐完善，自
          2016年10月10日起，饿了么会员权益将做
          如下优化： 购卡后31天内，累积享有30单
          减免配送费服务（每日最多3单，每单最高
          减免4元）。 注：已购买的会员服务不受
          影响，当前会员服务失效前无法购买新
          卡。
        </p>
    </blockquote>

    <div class="bg">
      <h3>Q1:特权介绍</h3>
          <p class="xx">
            身份标识：饿了么会员服务有效期内，享有专属皇冠标
            识。<br>
            减免配送费： 饿了么会员卡自绑定账户之日起31天
            <br>内，在「蜂鸟专送」标识商家下单，享有30次减免配送
            <br>费特权，每日最多减免3单，每单最高可减4元。<br>
            更多特权，敬请期待！
          </p>
    </div>
    <div class="bg">
      <h3>Q2:资费介绍</h3>
      <ul class="xx">
        <li>饿了么会员卡:20元</li>
      </ul>
    </div>
    <div class="bg">
      <h3>Q3:使用说明</h3>
      <p class="bg-user">当用户满足以下任一条件，会员服务自动失效：</p>
      <p class="xxx">
        自绑定之日起超过31天；
        <br>在31天内累计使用减免配送费的蜂鸟订单数量达
        <br>到30单；
      </p>
    </div>
    <div class="bg">
      <h3>Q4: 购卡说明</h3>
      <p class="xx">
        在线购买：饿了么App>我的>饿了么会员卡
      </p>
    </div>
    <div class="bg">
      <h3>Q5: 温馨提示</h3>
      <p class="xx">
        用户在当前会员服务失效前，无法购买新卡。
        <br>请认准饿了么官方渠道，任何从其他第三方途径获得的
        <br>会员卡，饿了么不保证其可用性。
      </p>
    </div>
  </div>
</template>

<script>
    export default {
        name: "vipdescription",
      methods: {
        onClickLeft() {
          this.$router.go(-1)
        },
      }
    }
</script>

<style scoped>
.van-nav-bar{
  background: #3190e8;
}
.van-nav-bar__title{
  color: white;
  font-size: .18rem;
  font-weight: bold;
}
.van-icon{
  color: white;
  font-size: .25rem;
  margin-left: -.09rem;
  font-weight: 100;
}
  .dl{
    display: block;
    float: left;
    width: 2.62rem;
    font-size: .14rem;
    margin-left: .5rem;
    margin-top: .08rem;
    font-weight: 400;
    line-height: .2rem;
}
  .header-con{
    display: block;
    width: 4rem;
    height: 1.6rem;
    background-color: white;
  }
  h3{
    padding-top: .15rem  ;
    font-size: .16rem;
    font-weight: 600;
    margin-left: .2rem;
    color: #333;
  }
  .ul{
    margin-top: 1.2rem;
  }
  ul>li{
    margin-top: .12rem;
    font-size: .146rem;
  }
  .xx{
    margin-top: .15rem;
    margin-left: .2rem;
      line-height: .2rem;
    font-size: .14rem;
    color: #666;
  }
  .xxx{
    margin-top: .2rem;
    margin-left: .72rem;
    line-height: .2rem;
    font-size: .14rem;
    color: #666;
  }
  .bg{
    background-color: white;
  }
  .bg-user{
    margin-left: .2rem;
    margin-top: .1rem;
  }
  ol>li{
    margin-left: .5rem;
    margin-top: .04rem;
    font-size: .14rem;
  }
</style>
