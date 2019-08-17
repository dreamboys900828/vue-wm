<template>
  <div class="header">
    <div>
      <van-nav-bar
        title="会员中心"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"></van-nav-bar>
    </div>
    <div class="content">
      <p class="cont-dl">为xxx购买会员</p>
    </div>
    <div>
      <van-cell title="会员特权" class="van" value="会员说明 >" @click="sm"></van-cell>
      <div class="content-all">
        <div class="cont-img">
          <img src="../../assets/img/2.png" alt="" class="img">
        </div>
        <div class="cont-right">
          <h4>减免配送费</h4>
          <h6>每月减免30单，每日可减免3单，每单最少减免4元</h6>
          <h6>蜂鸟专送专享</h6>
        </div>
      </div>
      <van-divider class="fgx"></van-divider>
      <div class="content-all">
        <div class="cont-img">
          <img src="../../assets/img/3.png" alt="" class="img">
        </div>
        <div class="cont-right">
          <h4>减免配送费</h4>
          <h6>每月减免30单，每日可减免3单，每单最少减免4元</h6>
          <h6>蜂鸟专送专享</h6>
        </div>
      </div>
      <div class="content1">
        <van-cell title="开通会员" class="van1"></van-cell>
        <div class="content-footer">
          <p class="dl">一个月
            <span class="wz">￥20</span>
          </p>
        </div>
        <div class="con-btn">
          <van-button type="primary" size="mini" class="buy" @click="buy">购买</van-button>
        </div>
        <div class="employ"></div>
      </div>
    </div>
    <router-link :to="{path:'usecard'}">
      <van-cell title="兑换会员" class="van" value="使用卡号卡密 >"></van-cell>
    </router-link>
    <van-cell title="购买记录" class="van2" value="开发票 >"></van-cell>
  </div>
</template>
<script>
  export default {
    name: "vipcard",
    data() {
      return {}
    },
    methods: {
      onClickLeft() {
        this.$router.go(-1)
      },
      buy() {
        this.$router.push({path: 'paystyle'})
      },
      sm() {
        this.$router.push({path: 'vipdescription'})
      },
    }
  }
</script>

<style scoped>
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

  .header {
    width: 100%;
  }

  .content-all {
    height: .915rem;
    background-color: white;
  }

  .content {
    width: 100%;
    height: .35rem;
    margin: .2rem 0 0 .15rem;
  }

  .img {
    width: 0.4rem;
    margin: .2rem 0 0 .17rem;
  }

  div > h5 {
    color: #333;
  }

  h6 {
    margin-top: .07rem;
    color: #999999;
  }

  .cont-right {
    width: 10rem;
    display: block;
    padding-left: .7rem;
    margin: -.6rem 0 .2rem 0;
  }

  .van {
    border-bottom: 1px solid #f5f5f5;
    line-height: .24rem;
  }

  .van2 {
    margin-top: .1rem;
  }

  .van-divider {
    margin: 0;
  }

  .cont-img {
    margin-bottom: .1rem;
  }

  .con-btn {
    float: right;
    margin-right: .15rem
  }

  .content-footer {
    float: left;
    height: .7rem;
  }

  .dl {
    margin: .2rem 0 0 .2rem;
  }

  .content-footer > div {
    display: block;
    margin-top: 0.1rem;
  }

  .wz {
    color: red;
    font-weight: bold;
  }

  .content1 {
    height: 1rem;
    margin-top: .1rem;
    background-color: white;
  }

  .buy {
    width: .6rem;
    height: .3rem;
    font-size: .15rem;
    display: inline-block;
    margin: .15rem 0 0 1rem;
    color: red;
    background-color: white;
    border: 1px solid red;
    border-radius: 0.05rem;
  }

  .employ {
    clear: both;
  }

  .cont-dl {
    margin: .1rem 0 .15rem 0;
  }
</style>
