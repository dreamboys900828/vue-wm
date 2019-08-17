<template>
  <div class="header">
    <van-nav-bar
      title="在线支付"
      left-arrow
      @click-left="onClickLeft"></van-nav-bar>
    <div class="content">
      <p class="pay">支付剩余时间</p>
      <van-count-down :time="time" class="time"></van-count-down>
    </div>
    <div class="pay_way">选择支付方式</div>
    <van-radio-group v-model="radio" class="group">
      <div class="zfb">
        <img src="../../assets/img/4.png" alt="" class="logo">
        <van-cell title="支付宝" class="van"></van-cell>
      </div>
      <div class="zfb">
        <img src="../../assets/img/6.png" alt="" class="weixin">
        <van-cell title="微信" class="van"></van-cell>
      </div>
    </van-radio-group>
    <div class="animated bounceIn fk" v-show="one">
      <div class="tip_icon">
        <img src="../../assets/img/ts.png" alt="" class="img">
      </div>
      <p class="xz">当前环境无法支付，请打开官方APP进行付款</p>
      <van-button type="primary" size="large" class="btn" @click="two">确认</van-button>
    </div>
    <div class="footer">
      <van-button type="primary" size="large" class="login" @click="sub">确认支付</van-button>
    </div>
  </div>
</template>
<script>
  export default {
    name: "paystyle",
    data() {
      return {
        time: 15 * 60 * 1000,
        radio: '0',
        name: "",
        one: false,
      };
    },
    mounted() {
    },
    methods: {
      onClickLeft() {
        this.$router.go(-1)
      },
      sub() {
        this.one = true;
      },
      two() {
        this.one = false
      }
    }
  }
</script>
<style scoped>
  .header {
    height: 6.7rem;
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
    margin-left: -.1rem;
    font-weight: 100;
  }

  .content {
    background-color: #fff;
    padding: .4rem .1rem;
    font-size: .1rem;
    text-align: center;
  }

  .time {
    font-size: .35rem;
    color: #666;
    margin-top: .3rem;
  }

  .pay {
    font-size: .15rem;
    width: 100%;
  }

  .pay_way {
    background-color: #f1f1f1;
    padding: 0 .18rem;
    font-size: .16rem;
    color: #666;
    line-height: .3rem;
  }

  .fq {
    float: left;
  }

  .xx {
    float: right;
  }

  .fk {
    float: right;
    margin: 0 auto;
    background-color: yellowgreen;
  }

  .login {
    width: 90%;
    margin: .1rem 0 0 .18rem;
    border-radius: .04rem;
    color: #FFFFFF;
  }

  .zfb {
    height: .6rem;
    padding-top: .2rem;
    background: #FFFFFF;
  }

  .van {
    height: .6rem;
    font-size: .17rem;
    padding-left: -.5rem;
    margin: -.5rem 0 0 .69rem;
  }

  .logo {
    display: block;
    width: .5rem;
    margin-left: .2rem;
    border-radius: 50%;
  }

  .van-cell__title {
    margin-left: -.1rem;
  }

  .weixin {
    display: block;
    width: .5rem;
    margin-left: .2rem;
    border-radius: 50%;
    color: white;
    background-color: green;
  }

  .img {
    margin: .1rem 1.2rem;
    width: .7rem;
    height: .7rem;
  }

  .xz {
    padding-top: .05rem;
    margin: -.2rem .3rem;
  }

  .btn {
    border-radius: .2rem;
    margin: .4rem 0;
  }

  .fk {
    position: absolute;
    background: white;
    width: 3rem;
    height: 1.7rem;
    text-align: center;
    margin: -1.8rem .4rem;
    border-radius: .2rem;
    z-index: 10;
  }
</style>
