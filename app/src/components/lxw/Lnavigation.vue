<template>
  <!--导航栏-->
  <div>
  <van-nav-bar
    title="我的余额"
    left-text=" "
    arrow-left
    left-arrow
    @click-left="onClickLeft"
  />

  <!--<div class="input3">收货地址</div>-->
  </div>
</template>

<script>
    export default {
        name: "Lnavigation",
      methods: {
        onClickLeft() {
          this.$router.go(-1);
        },
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



  /*!*input框*!*/
  /*.input2{*/
    /*display: inline-block;*/
    /*!*display: block;*!*/
    /*border: 1px solid #999999;*/
    /*width: 100%;*/
    /*height: 0.4786rem;*/
    /*line-height: 0.4786rem;*/
    /*font-size: 0.1406rem;*/
    /*padding: 0 0.09375rem;*/
    /*box-sizing: border-box;*/
    /*color: black;*/
  /*}*/
</style>
