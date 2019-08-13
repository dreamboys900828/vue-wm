<template>
    <div class="my" ref="register">
      <!--导航栏-->
      <van-nav-bar
        title="我的"
        left-text=" "
        arrow-left
          left-arrow
        @click-left="onClickLeft"
      />

      <!--个人信息-->
      <!--<router-link :to="{path:'/info1'}">-->
      <div class="infor" @click="skip">
        <!--头像-->
        <van-image
          round
          width="0.5rem"
          height="0.5rem"
          src="//elm.cangdu.org/img/default.jpg"
        />


          <div class="user_infor">

            <!--用户名-->
            <p class="p1">{{infroData== null?"登录/注册":infroData.username}}</p>
            <!--手机号-->

            <p class="p2">
              <svg t="1564905005519" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9395" width="17" height="17"><path d="M768 0H256a102.4 102.4 0 0 0-102.4 102.4v819.2a102.4 102.4 0 0 0 102.4 102.4h512a102.4 102.4 0 0 0 102.4-102.4V102.4a102.4 102.4 0 0 0-102.4-102.4z m-256 972.8a51.2 51.2 0 1 1 51.2-51.2 51.2 51.2 0 0 1-51.2 51.2z m256-153.6H256V102.4h512z" fill="#ffffff" p-id="9396"></path></svg>
              <span>暂无绑定手机号</span>
            </p>

          </div>



        <!-- > 按钮-->
        <!--<div class="">-->
        <van-icon name="arrow" class="arrows_right arro_left"/>


        <!--</div>-->

      </div>
      <!--</router-link>-->

      <!--余额、优惠、积分栏-->
      <ul class="ul_money">
        <li>
          <router-link :to="{path:'/balance'}">
            <span class="span_money1"><b class="b1">0.00</b>元</span>
            <span class="span_money2">我的余额</span>
          </router-link>

        </li>
        <li>
          <router-link :to="{path:'/LmyDiscounts'}">
            <span class="span_money1"><b class="b2">{{infroData== null?0:hbNumber}}</b>个</span>
            <span class="span_money2">我的优惠</span>
          </router-link>
        </li>
        <li>
          <router-link :to="{path:'/mynumber'}">
          <span class="span_money1"><b class="b3">0</b>分</span>
          <span class="span_money2">我的积分</span>
          </router-link>
        </li>
      </ul>


      <!--剩余列表-->

      <van-cell title="我的订单" is-link to="/order" url="#" class="cell"/>
      <van-cell title="积分商城" is-link to="#" class="cell"/>
      <van-cell  title="饿了么会员卡" is-link to="#" class="cell van-cell-1"/>
      <van-cell title="服务中心" is-link to="/service" class="cell"/>
      <van-cell title="下载饿了么APP" is-link to="/downloadELM" class="cell"/>
    </div>
</template>

<script>
  const photo = require("../../assets/img/photo.png");
    export default {
        name: "Lmy",
      data(){
          return{
            infroData:[],
            photo,
            hbNumber:"",
          }
      },
      methods: {
        onClickLeft() {
        },
        skip(){
          if(this.infroData == null){
            this.$router.push({path:'/logIN'})
          }else{
            this.$router.push({path:'/info1'})
          }
        }
      },
      mounted(){
          this.infroData=JSON.parse(localStorage.getItem('allInfo'));
          console.log(this.infroData);
          this.hbNumber=JSON.parse(localStorage.getItem('hbNumber'));
          console.log(this.hbNumber)
        this.$refs.register.style.height = window.innerHeight+"px";
      }
    }
</script>

<!--<style scoped >-->
<style scoped lang="less">
  .my{
    background: #f5f5f5;
  }
  .van-nav-bar{
    background: #3190e8;
    color: white;
  }
  .van-nav-bar span,.van-nav-bar div{
    color: white;
  }
  .van-nav-bar div{
    font-weight: 800;
    font-size: 0.2rem;
  }
  .infor{
    /*width: 3.47rem;*/
    height: 0.58rem;
    background: #3190e8;
    padding: 0.156rem 0.14rem 0.156rem;

    .photo{
      position: absolute;
      top: 0.59rem;
      left: 0.20rem;
    }
    :before{
      font-size: 0.15rem;

    }
  }
  .name1{
    background: pink;
    height: 50%;
    line-height: 50%;
  }
  :before{
    color: white;
    height: 0.2344rem;
    font-size: 0.25rem;
    font-weight:200;
    margin-left: -0.1rem;
    margin-top: -0.1rem;

  }
  .van-image{
    vertical-align: middle;
    margin-bottom: 0.2rem;
  }
  .user_infor{
    display: inline-block;

    margin-left:0.11rem;
    height: 0.58rem;
    /*line-height: 0.58rem;*/
  }
  .user_infor .p1{
    height: 0.25rem;
    font-size: 0.187rem;
    font-weight: 700;
    color: white;
  }
  .user_infor .p2{
    height: 0.25rem;
    font-size: 0.134rem;
    font-family: Helvetica Neue,Tahoma,Arial;
    color: white;

    span{
      display: inline-block;
      position: absolute;
      top: 0.89rem;
      left: 1rem;
    }
  }
  .arro_left{
    float: right;
    margin-top: 0.16rem;
  }

  ul>li:nth-child(2){
    border-left: 1px #f1f1f1 solid;
    border-right: 1px #f1f1f1 solid;

  }


  .ul_money{
    width: 100%;
    background: white;
    margin-bottom: 0.1rem;



    li{
      display: inline-block;
      width: 31.9%;
      text-align: center;
      font-size: 0.134rem;

      b{
        font-weight: 700;
        font-size: 0.28rem;
      }
      .b1{
        color: orange;
      }
      .b2{
        color: #ff5f3e;
      }
      .b3{
        color: #6ac20b;
      }


      .span_money1{
        display: block;
        height: 0.28rem;
        padding: 0.2rem 0 0.106rem;
        color: black;
        line-height: 0.28rem;
      }
      .span_money2{
        margin-bottom: 0.106rem;
        display: inline-block;
        color: #666666;

      }
    }
  }
  .van-cell{
    font-size: 0.164rem;
    color: black;
  }
  .van-cell :before{
    color: #bbbbbb;
    font-size: 0.15rem;
  }


  .van-cell-1{
    margin-bottom: 0.1rem;
  }
  .cell{
    border-bottom: 1px #f5f5f5 solid;
    border-top: 1px #f5f5f5 solid;
  }

</style>
