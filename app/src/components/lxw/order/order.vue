<template>
  <div class="order" ref="bg">
    <!--导航栏-->
    <div>
      <van-nav-bar
        title="订单列表"
        left-text=" "
        arrow-left
        left-arrow
        @click-left="onClickLeft"
      />

    </div>
    
    <ul>
      <li class="order_li" v-for="(value,index) in alldata" :key="index">
       <router-link :to="{path:'/orderDetails',query:{address:value.address_id}}">
         <!--第一行-->
         <div class="one">
           <div>
             <img :src="'//elm.cangdu.org/img/'+value.restaurant_image_url">
           </div>
           <div>
              <p>{{value.restaurant_name}}<span>></span></p>
             <p>{{value.formatted_created_at}}</p>
           </div>
           <div class="dd">等待支付</div>
         </div>
         <div class="two">
           <span>{{value.basket.group[0][0].name}} </span>
           <span>￥{{value.basket.packing_fee.price}}</span>
         </div>
       </router-link>
        <div class="three clearfix">
          <div class="time1">
            <van-count-down
              :time="time"
              format="去支付(还剩mm分ss秒)"
            />
          </div>
        </div>
      </li>
    </ul>
    
  </div>
</template>

<script>
  import Vue from "vue"
  export default {
    name: "order",
    data(){
      return{
        time:  10 * 60 * 1000,
        userid:"",
        alldata:[],
      }
    },
    methods: {
      onClickLeft() {
        this.$router.go(-1);
      },
      finish(){
        console.log("订单超时支付")
      }
    },
    mounted(){
      this.$refs.bg.style.height=window.innerHeight+"px";
    },
    created(){
      this.userid=JSON.parse(localStorage.getItem("allInfo")).id;
      // console.log(this.userid)


      Vue.axios.get(`https://elm.cangdu.org/bos/v2/users/${this.userid}/orders?limit=10&offset=0`).then((result)=>{
        // console.log(result.data);
        this.alldata=result.data
      })
    }
  }
</script>

<style scoped lang="less">

  .order{
    background: rgb(245,245,245);
  }
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

  /*订单列表*/
  .order_li{
    padding: 0.14rem 0.14rem 0;
    box-sizing: border-box;
    background: white;
    a{
      color: black;
      .one{
        border-bottom: .0025rem solid #f5f5f5;
        height: 0.56rem;
        line-height: 0.24rem;
        padding-bottom: 0.07rem;
        box-sizing: border-box;
        >div:nth-child(1){
          display: inline-block;
          margin-right: 0.093rem;
          img{
            width: 0.4688rem;
            height: 0.4688rem;
          }
        }
        /*效果演示*/
        >div:nth-child(2){
          display: inline-block;
          width: 2.11rem;
          >p:nth-child(1){
            font-size: 0.1757rem;
            /*line-height: 0.232rem;*/
            /*display: inline-block;*/
            /*等待支付*/

          }
          >p:nth-child(2){
              color: #999999;
            font-size: 0.129rem;
            line-height: 0.184rem;

          }
        }
        .dd{
          font-size: 0.14rem;
          display: inline-block;
          float: right;
          width: 0.5623rem;
          height: 0.25rem;
          line-height: 0.25rem;
        }
      }
      .two{
          height: 0.464rem;
        line-height: 0.464rem;
        margin-left: 0.6rem;
        border-bottom: .0025rem solid #f5f5f5;
        >span:nth-child(1){
          color: #666666;
          font-size: 0.140625rem;
        }
        >span:nth-child(2){
          color: #FF6600;
          font-size: 0.140625rem;
          float: right;
          font-weight: 700;
        }

      }
    }
    .three{
      height: 0.48rem;
        .time1{
          border: 1px solid orange;

          width: 1.39rem;
          height: 0.2348rem;
          line-height: 0.2348rem;
          text-align: center;
          border-radius: 0.05rem;
          float: right;
          margin-top: 0.12rem;
            .van-count-down{
              font-size: 0.129rem;
              color: #FFa500;

            }
        }
    }
  }

</style>
