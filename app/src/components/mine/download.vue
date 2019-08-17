<template>
    <div class="header">
      <div class="header-he">
        <van-nav-bar
          title="下载"
          left-arrow
          @click-left="onClickLeft"></van-nav-bar>
      </div>
      <div class="eat">
        <img src="../../assets/img/elm.jpg" alt="" class="logo">
        <p class="cont">下载饿了吗APP</p>
      </div>
      <div class="animated bounceIn fk" v-show="baba">
        <div class="tip_icon">
          <img src="../../assets/img/ts.png" alt="" class="img">
        </div>
        <p class="xz">IOS用户请往APPStore下载</p>
        <van-button type="primary" size="large" class="btn" @click="one">确认</van-button>
      </div>
      <div>
        <van-button type="primary" size="large" class="login" @click="upload">下载</van-button>
      </div>
    </div>
</template>

<script>
    export default {
        name: "download",
      data(){
        return{
          baba:false
        }
      },
      methods: {
        onClickLeft() {
          this.$router.go(-1);
        },
        upload(){
          this.baba=true;
        },
        one(){
          this.baba=false
        }


      }
    }
</script>

<style scoped>
  .header{
    background: white;
  }
  .van-nav-bar{
    background: #3190e8;
    margin-top: -.14rem;
    height: .46rem;
    line-height: .46rem;
  }
  .van-nav-bar__title{
    color: white;
    font-size: .18rem;
    font-weight: bold;
    margin-top: .13rem;
  }
  .van-icon{
    color: white;
    font-size: .25rem;
    font-weight: 100;
    margin:-.05rem 0 0 -.09rem;
  }
  .eat{
    text-align: center;
  }
  .logo{
    display: inline-block;
    margin: .2rem auto;
    border-radius: .2rem;
  }
  .cont{
    margin-top: -.1rem;
    font-size: .18rem;
  }
  .login{
    width: 90%;
    margin:.3rem 0 0 .15rem;
    border-radius: .07rem;
    background-color: #4cd964;
    color: white;
  }
  .van-button--large{
    height: .4rem;
    line-height: .3rem;
  }
  .fk{
    position: absolute;
    background: white;
    width: 3rem;
    height: 1.7rem;
    margin: -.5rem .4rem;
    border-radius: .2rem;
    z-index: 10;
  }
  .img{
    margin: .1rem 1.2rem;
    width: .7rem;
    height: .7rem;
  }
  .fk p{
    display: block;
    margin: -.1rem .5rem;
  }
  .btn{
    border-radius: .2rem;
    margin: .4rem 0;
  }
  .xz{
    padding-top: .02rem;
  }
</style>
