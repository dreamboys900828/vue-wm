<template>
  <div class="orderDetail">
    <!--顶部订单-->
    <!--<div class="detail_top"><van-nav-bar title="订单详情" left-arrow  fixed="true"></van-nav-bar></div>-->
    <!--商家头像-->
    <div class="userImg">
      <img src="" alt="">
      <p>123456</p>
      <button>再来一单</button>
    </div>
    <!--购买信息-->
    <div class="purchase">
      <div class="pur_one">
        <img src="" alt="">
        <span>55555</span>
        <van-icon name="arrow" class="pull-right"/>
      </div>
      <div class="pur_two">
        <span>hahahah</span>
        <span class="pull-right"><span class="shuliang">xhahahah</span>￥0000</span>
      </div>
      <div class="pur_three">
        <span>配送费</span>
        <span class="pull-right">11111</span>
      </div>
      <div class="pur_four">
        <span class="pull-right">11111</span>
      </div>
      <div class="clearfix"></div>
    </div>
    <!--配送信息-->
    <div class="distribution">
      <div class="dis_one">配送信息</div>
      <div class="dis_two">送达时间：</div>
      <div class="dis_three">
        送货地址：
        <div class="pull-right">
          <p>11111</p>
          <p>11111</p>
        </div>
      </div>
      <div class="clearfix"></div>
      <div class="dis_four">配送方式：蜂鸟配送</div>
    </div>
    <!--订单信息-->
    <div class="distribution ddxinxi">
      <div class="dis_one">订单信息</div>
      <div class="dis_p">
        <p>订单号:11111</p>
        <p>支付方式:11111</p>
        <p>下单时间:11111</p>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from "vue"
  export default {
    name: "orderDeta",
    data(){
      return{
        // allOrders:[],
        // allOrderDetail:[],
      }
    },
    methods: {
      // onClickLeft() {
      //
      // },
    },
    created(){
      // this.allOrders=this.$route.params;
      // Vue.axios.get(`https://elm.cangdu.org/bos/v1/users/${this.$store.state.p.ZYMpublic.user_id}/orders/${this.allOrders.unique_id}/snapshot`).then((result)=>{
      //   this.allOrderDetail=result.data;
      //   console.log(this.allOrderDetail);
      // }).catch((error)=>{
      //   console.log(error);
      // })
    }
  }
</script>

<style scoped>
  /*商家头像外框*/
  .userImg{
    width: 100%;
    height: 20rem;
    text-align: center;
    background: white;
    margin-top: 4rem;
  }
  /*商家头像img*/
  .userImg img{
    width: 7rem;
    border-radius: 50%;
    border: 0.1rem solid #3793e9;
    margin-top: 2.5rem;
  }
  /*支付状态*/
  .userImg p{
    font-size: 2rem;
    font-weight: bold;
    line-height: 4rem;
  }
  /*再来一单*/
  .userImg button{
    width: 8rem;
    height: 2.8rem;
    font-size: 1.5rem;
    border-radius: 0.3rem;
    background: none;
    border: 0.1rem solid #3190e8;
    color: #3190e8;
    margin-top: 1.5rem;
  }
  /*购买信息*/
  .purchase{
    width: 100%;
    background: white;
    margin-top: 1rem;
  }
  .purchase div{
    padding: 1rem 2rem;
    border-bottom: 0.1rem solid #f1f1f1;
  }
  /*购买信息one*/
  .pur_one img{
    width: 3rem;
  }
  .pur_one span{
    font-size: 2rem;
    line-height: 3rem;
    padding-left: 1rem;
    font-weight: bold;
    vertical-align: top;
  }
  .pur_one i{
    font-size: 1.5rem;
    line-height: 3rem;
  }
  /*商品单价和数量*/
  .pur_two,.pur_three span{
    font-size: 1.5rem;
    line-height: 2rem;
  }
  .pur_two>span>span{
    color: #d9d9d9;
    margin-right: 2rem;
  }
  .pur_four{
    border-bottom: none!important;
  }
  .pur_four span{
    font-size: 1.8rem;
    line-height: 2rem;
    font-weight: bold;
    color: #fb6b23;
  }
  /*配送方式*/
  .distribution{
    margin-top: 1rem;
    width: 100%;
    background: white;
  }
  .distribution div{
    padding: 0rem 2rem;
  }
  .dis_one{
    font-size: 2rem;
    line-height: 4rem;
    border-bottom: 0.1rem solid #d9d9d9;
  }
  .dis_two,.dis_four{
    font-size: 1.5rem;
    line-height: 7rem;
  }
  .dis_three>div{
    width: 75%;
    padding: 0rem;
    display: inline-block;
  }
  .dis_three>div p{
    line-height: 2rem;
  }
  /*订单信息*/
  .dis_p p{
    padding: 0.5rem 2rem;
    font-size: 1.5rem;
    line-height: 3.5rem;
  }
</style>
