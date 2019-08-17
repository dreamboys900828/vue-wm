<template>
  <div class="orderDetails" ref="bg">
    <!--导航栏-->
    <div>
      <van-nav-bar
        title="订单详情"
        left-text=" "
        arrow-left
        left-arrow
        @click-left="onClickLeft"></van-nav-bar>

    </div>
    <div v-if="!show">
      <div class="header">
        <img
          src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1565415232100&di=2ffd5d3b55c036a11c264b82818ea5dc&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201707%2F26%2F20170726235852_R43Ww.jpeg"
          alt=""><br>
        <p class="headerP1">等待支付</p><br>
        <p class="headerP2">再来一单</p>
      </div>

      <div class="content">
        <div>
          <img
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1565415232100&di=2ffd5d3b55c036a11c264b82818ea5dc&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201707%2F26%2F20170726235852_R43Ww.jpeg"
            alt="">
          效果演示a
        </div>
        <div>
          <span>哈哈哈哈哈哈哈</span>
          <span>￥20</span>
          <span>×1</span>

        </div>
        <div class="clearfix">
          <span>4</span>
          <span>配送费</span>
        </div>
        <div class="clearfix">
          <span>实付2000.00</span>
        </div>
      </div>

      <div class="footer1">
        <div>
          <span>配送信息</span>
        </div>
        <div>
          <span>送达时间：</span>
          <span>尽快送达</span>
        </div>
        <div>
          <p>送货地址:</p>
          <div class="pp">
            <p class="p1">1222</p>
            <p class="p2">136555555555</p>
          </div>
        </div>
        <div>
          <span>配送方式:</span>
          <span>蜂鸟转送</span>
        </div>
      </div>

      <div class="footer2">
        <div>订单信息</div>
        <div>
          <span>订单号:</span>
          <span>11115</span>
        </div>
        <div>
          <span>支付方式：</span>
          <span>在线支付</span>
        </div>
        <div>
          <span>下单时间：</span>
          <span>2019-08-09 20:35</span>
        </div>
      </div>
    </div>

    <!--loding-->
    <div id="elmloading" v-if="show">
      <div class="imgbox">
        <div class="img">
        </div>
      </div>
      <div class="loadfoot">
        <span class="footspan"></span>
      </div>
    </div>

  </div>
</template>

<script>
  import {mapState} from "vuex";
  import {getOrderDetail} from "../../../service/getData";

  export default {
    name: "orderDetails",
    data() {
      return {
        show: true,
        list: [],
      }
    },
    mounted() {
      this.$refs.bg.style.height = window.innerHeight + "px";
      this.initData();
    },
    methods: {
      async initData() {
        let order_id = this.$route.query.order_id;
        let status = await getOrderDetail(this.USER_STATUS.id, order_id);
        console.log(status);
        if (status._doc) {
          this.list = status;
          this.show = false;
        }
      },
      onClickLeft() {
        this.$router.go(-1);
      },
    },
    computed: {
      ...mapState(['USER_STATUS']),
    }
  }
</script>

<style scoped lang="less">
  @import "../loading/londing";

  .van-nav-bar {
    background: #3190e8;
    color: white;

    :before {
      color: white;
      height: 0.2344rem;
      font-size: 0.25rem;
      font-weight: 200;
      margin-left: -0.1rem;
      margin-top: -0.1rem;
    }

    span, div {
      color: white;
    }

    div {
      font-weight: 800;
      font-size: 0.1875rem;
    }
  }

  .orderDetails {
    background: rgb(241, 241, 241);

    /*头部*/

    .header {
      background: white;
      text-align: center;
      padding: 0.164rem 0;
      box-sizing: border-box;
      margin-bottom: 0.164rem;

      img {
        width: 0.726rem;
        height: 0.726rem;
        border-radius: 0.5rem;
      }

      .headerP1 {
        display: inline-block;
        margin-top: 0.09375rem;
        font-size: 0.211rem;
        font-weight: 700;
        margin-bottom: 0.2rem;
      }

      .headerP2 {
        width: 0.7613rem;
        height: 0.2738rem;
        line-height: 0.2438rem;
        text-align: center;
        color: #3190e8;
        /*padding: 0.035rem 0.0937rem;*/
        font-size: 0.1406rem;
        box-sizing: border-box;
        border: .0025rem solid #3190e8;
        display: inline-block;
      }
    }

    /*中间*/

    .content {
      div {
        padding: 0 0.117rem;
        background: white;
      }

      > div:nth-child(1) {
        /*background: #90B4FC;*/
        height: 0.429rem;
        line-height: 0.429rem;
        font-size: 0.17578rem;
        font-weight: 700;

        img {
          display: inline-block;
          width: 0.2813rem;
          height: 0.2813rem;
          margin-left: 0.0468rem;
          vertical-align: -0.08rem;
          margin-top: 0.08rem;
        }
      }

      > div:nth-child(2) {
        line-height: 0.464rem;
        /*background: pink;*/
        font-size: 0.1406rem;

        > span:nth-child(1) {
          color: #666666;
        }

        > span:nth-child(3) {
          color: #CCCCCC;
          float: right;
          margin-right: 0.3rem;
        }

        > span:nth-child(2) {
          color: #666666;
          float: right;

        }
      }

      > div:nth-child(3) {
        display: block;

        font-size: 0.1406rem;
        line-height: 0.474rem;
        border-bottom: 1px solid #f5f5f5;
        color: #666666;

        > span:nth-child(2) {

        }

        > span:nth-child(1) {
          float: right;

        }
      }

      > div:nth-child(4) {
        font-weight: 700;
        line-height: 0.474rem;
        font-size: 0.1406rem;
        color: #fb6b23;

        span {
          float: right;
        }
      }
    }
  }

  .footer1 {
    background: white;
    margin: 0.1171888rem 0;

    div {
      padding: 0 0.117188rem;
      box-sizing: border-box;
      font-size: 0.1523rem;
      color: #666666;
    }

    > div:nth-child(1) {
      color: black;
      font-size: 0.17578rem;
      line-height: 0.4763rem;
    }

    > div:nth-child(2) {
      line-height: 0.4763rem;
    }

    > div:nth-child(3) {
      height: 0.7rem;
      padding: 0.1171rem;

      > p:nth-child(1) {
        width: 0.77rem;
        height: 0.464rem;
        display: inline-block;
        float: left;
      }

      .pp {
        display: inline-block;
        width: 1.5rem;
        box-sizing: border-box;
        line-height: 0.23rem;
        padding: 0;
        box-sizing: border-box;
        height: 0.464rem;

        .p1 {
          /*display: inline-block;*/
          line-height: 0.23rem;
        }

        .p2 {
          display: inline-block;
          line-height: 0.23rem;
        }
      }
    }

    > div:nth-child(4) {
      height: 0.4663rem;
      line-height: 0.4663rem;

    }
  }

  .footer2 {
    div {
      padding: 0 0.117188rem;
      box-sizing: border-box;
      font-size: 0.15234rem;
      line-height: 0.4763rem;
      color: #666666;
    }

    > div:nth-child(1) {
      font-size: 0.175781rem;
      color: black;
    }
  }
</style>
