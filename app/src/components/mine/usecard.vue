<template>
  <div class="header">
    <div>
      <van-nav-bar
        title="兑换会员"
        left-arrow
        @click-left="onClickLeft"></van-nav-bar>
    </div>
    <div class="content">
      <p class="cont-dl">成功兑换后将关联到当前帐号:</p>
    </div>
    <div>
      <van-cell-group>
        <van-field v-model="value" placeholder="请输入10位卡号" maxlength="10"></van-field>
        <van-field v-model="value1" placeholder="请输入6位卡密" maxlength="6"></van-field>
      </van-cell-group>
    </div>
    <div class="animated bounceIn fk" v-show="baba">
      <div class="tip_icon">
        <img src="../../assets/img/ts.png" alt="" class="img">
      </div>
      <p class="xz">IOS用户请往APPStore下载</p>
      <van-button type="primary" size="large" class="btn" @click="one">确认</van-button>
    </div>
    <div class="content2">
      <van-button type="primary" size="large" :class="{abc:show,login:!show}" :disabled="flags" @click="change">兑换
      </van-button>
      <h3 class="tishi">——温馨提示——</h3>
      <p class="new account">新兑换的会员服务，权益以「会员说明」为准。</p>
      <p class="new">
        "月卡:"
        <b>30次</b>减免配送费。
      </p>
      <p class="new">
        "季卡:"
        <b>60次</b>减免配送费。
      </p>
      <p class="new">
        "年卡:"
        <b>360次</b>减免配送费。
      </p>
      <p class="new">＊仅限蜂鸟专送订单，每日最多减免3单，每单最高减免4元（一个月按31天计算）</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "usecard",
    data() {
      return {
        value: "",
        value1: "",
        show: false,
        baba: false
      }
    },
    computed: {
      flags() {
        if (!(this.value.length == 10) || !(this.value1.length == 6)) {
          this.show = false
        } else {
          this.show = true
        }
      }
    },
    methods: {
      onClickLeft() {
        this.$router.go(-1)
      },
      change() {
        this.baba = true;
      },
      one() {
        this.baba = false
      }
    }
  }
</script>

<style scoped>
  .abc {
    background: green;
    width: 94%;
    margin: .2rem 0 0 .1rem;
    border-radius: .1rem;
    border: 1px solid gainsboro;
    color: #fff;
  }

  .header {
    width: 100%;
  }

  .content {
    width: 100%;
    height: .3rem;
    margin: .05rem 0 0 .05rem;
  }

  .content2 {
    height: 4.9rem;
  }

  .cont-dl {
    margin: .1rem 0 .15rem 0;
  }

  .login {
    width: 94%;
    margin: .3rem 0 0 .1rem;
    color: #fff;
    background: grey;
    border-radius: .1rem;
    border: 1px solid gainsboro;
  }

  .tishi {
    text-align: center;
    color: #aaa;
    font-weight: 400;
    margin: .2rem 0;
    font-size: .15rem;
  }

  .new {
    font-size: .1rem;
    color: #aaa;
    line-height: .2rem;
    padding-left: .5rem;
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

  .fk {
    position: absolute;
    background: white;
    width: 3rem;
    height: 1.7rem;
    margin: -.5rem .4rem;
    border-radius: .2rem;
    z-index: 10;
  }

  .img {
    margin: .1rem 1.2rem;
    width: .7rem;
    height: .7rem;
  }

  .fk p {
    display: block;
    margin: -.1rem .5rem;
  }

  .btn {
    border-radius: .2rem;
    margin: .4rem 0;
  }

  .xz {
    padding-top: .02rem;
  }
</style>
