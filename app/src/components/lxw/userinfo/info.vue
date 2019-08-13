<template>
  <!--账户信息-->
  <div class="info" ref="bg">
    <!--导航栏-->
    <van-nav-bar
      title="账户信息"
      left-text=" "
      arrow-left
      left-arrow
      @click-left="onClickLeft"
    />


      <!--头像上传-->
   <div class="heaerPhoto">
     <label for="file1">
       <div class="inputPhoto">
         <van-icon name="arrow" class="right_jt"/>头像
       </div>
       <img src="http://elm.cangdu.org/img/default.jpg" alt="" >
     </label>
     <input type="file" value="" style="display: none" id="file1">
   </div>

    <router-link :to="{path: '/setusername'}">
      <div class="input2">用户名<van-icon name="arrow" class="right_jt2"/></div>
    </router-link>


    <router-link :to="{path:'/address'}">
    <div class="input3">收货地址<van-icon name="arrow" class="right_jt2"/></div>
    </router-link>

    <div class="all">
      <div>账号绑定</div>
      <div @click="popKuang1"><img :src="bluePhone" alt="">手机<van-icon name="arrow" class="right_jt2"/></div>
      <div>安全设置</div>
      <router-link :to="{path:'/reset'}">
        <div class="pw">登录密码<van-icon name="arrow" class="right_jt2"/></div>
      </router-link>

      <div class="quit" @click="clickQuit">退出登录</div>

    </div>

  <div class="xiugai">修改</div>

    <!--弹框-->
    <transition mode="out-in" enter-active-class="animated heartBeat">
      <div v-if="show" class="MyAlter" >
        <svg t="1564970482842" class="icon AT" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2031" width="70" height="70"><path d="M508.8 44.8c-256 0-464 208-464 464s208 464 464 464 464-208 464-464-208-464-464-464z m0 880c-230.4 0-416-185.6-416-416s185.6-416 416-416 416 185.6 416 416-185.6 416-416 416z" fill="#F8CB86" p-id="2032"></path><path d="M521.6 652.8c12.8 0 22.4-9.6 22.4-22.4V201.6c0-12.8-9.6-22.4-22.4-22.4-12.8 0-22.4 9.6-22.4 22.4v428.8c-3.2 9.6 9.6 22.4 22.4 22.4zM486.4 748.8a1.1 1.1 0 1 0 70.4 0 1.1 1.1 0 1 0-70.4 0z" fill="#F8CB86" p-id="2033"></path></svg>
        <p>{{popKuang}}</p>
        <div @click="yes">确定</div>
      </div>
    </transition>

    <!--退出登录弹框-->
    <transition mode="out-in" enter-active-class="animated heartBeat">
    <div class="popExit" v-if="yn">
      <svg t="1565159378062" class="icon at" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2836" width="90" height="90"><path d="M512 957.8c-60.4 0-119-11.8-174.1-35.2-53.3-22.5-101.1-54.8-142.2-95.9-41.1-41.1-73.3-88.9-95.9-142.2-23.3-55.2-35.2-113.8-35.2-174.1 0-60.4 11.8-119 35.2-174.1 22.5-53.3 54.8-101.1 95.9-142.2s88.9-73.3 142.2-95.9C393 74.8 451.6 63 512 63c60.4 0 119 11.8 174.1 35.2 53.3 22.5 101.1 54.8 142.2 95.9 41.1 41.1 73.3 88.9 95.9 142.2 23.3 55.2 35.2 113.8 35.2 174.1 0 60.4-11.8 119-35.2 174.1-22.5 53.3-54.8 101.1-95.9 142.2-41.1 41.1-88.9 73.3-142.2 95.9-55.1 23.3-113.7 35.2-174.1 35.2z m0-854.8c-224.6 0-407.4 182.7-407.4 407.4S287.4 917.8 512 917.8 919.4 735 919.4 510.4 736.6 103 512 103z" p-id="2837" fill="#F8CB86"></path><path d="M515.1 659.8c-11 0-20-9-20-20v-320c0-11 9-20 20-20s20 9 20 20v320c0 11-8.9 20-20 20zM515.1 726.6c-11 0-20-9-20-20s8.9-20 20-20c11 0 20 9 20 20s-8.9 20-20 20z" p-id="2838" fill="#F8CB86"></path></svg>

      <p>是否退出登录</p>
      <!--<div>-->
        <button class="btn1" @click="dd">再等等</button>
        <button class="btn2" @click="clickTC">退出登录</button>
      </div>
    </transition>

    <!--</div>-->

  </div>



</template>

<script>
  import Vue from "vue"
  const bluePhone=require ('../../../assets/img/bluePhone.png')
  export default {
    name: "info",
    data(){
      return{
        bluePhone,
        show:false,
        popKuang:"请在手机APP中设置",
        yn:false
      }
    },
    methods: {
      //点击退出登录
      clickQuit(){
    this.yn=true
  },
      //点击再等等
    dd(){
      this.yn=false
    },
      //点击确定退出
  clickTC(){
        Vue.axios.get("https://elm.cangdu.org/v2/signout").then((result)=>{
          console.log(result.data)
          if(result.data.message=="退出成功"){
              // this.$router.push({path:'/profile'});
              this.$router.push({path:'/lmy'});
              localStorage.removeItem("allInfo")
          }

        })
  },

      onClickLeft() {
        this.$router.go(-1);
      },
    popKuang1(){
      this.show=true
    },
    yes(){
      this.show=false
    }
    },
    mounted(){
      this.$refs.bg.style.height = window.innerHeight+"px"
    }
  }
</script>



<style scoped lang="less">
  @import "../FZ/popKuang";
  .info{
    background: #f5f5f5;
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

  .heaerPhoto{

    .inputPhoto{

      border-top: 0.5px solid #e5e5e5;
      line-height: 0.7265rem;
      background: white;
      height: 0.7265rem;
      box-sizing: border-box;
      padding: 0 0.09375rem;
      line-height: 0.7265rem;
      margin-top: 0.09375rem;
      font-size: 0.1406rem;
    }
    img{
      width: 0.4688rem;
      border-radius: 0.5rem;
      position: absolute;
      top: 0.68rem;
      right: 0.32rem;
    }
  }

  .input2,.input3{
    display: inline-block;
    /*display: block;*/
    border-top:  1px solid #e5e5e5;
    width: 100%;
    height: 0.4786rem;
    line-height: 0.4786rem;
    font-size: 0.1406rem;
    padding: 0 0.09375rem;
    box-sizing: border-box;
    color: black;
    background: white;
  }
  .input3{
    border-bottom:  1px solid #e5e5e5;

  }

  .all{
    >div:nth-child(1),>div:nth-child(3){
      color: #666666;
      /*display: inline-block;*/
      height: 0.3395rem;
      line-height: 0.3395rem;
      font-size: 0.117188rem;
      padding: 0 0.09375rem;
      border-top: 1px solid #e5e5e5;
      border-bottom:  1px solid #e5e5e5;

    }
    >div:nth-child(2),.pw{
      /*display: inline-block;*/
      font-size: 0.140625rem;
      padding: 0 0.09375rem;
      height: 0.4886rem;
      line-height: 0.4886rem;
      border-top: 1px solid #e5e5e5;
      border-bottom:  1px solid #e5e5e5;
      color: black;
      background: white;
      /*text-align: center;*/
      img{
        width: 0.2rem;
        margin-right: 0.09375rem;
        position: relative;
        bottom: -0.05rem;
      }
    }
  }


  .right_jt{
    position: absolute;
    top: 0.85rem;
    right: 0.09375rem;
    font-size: 18px;
    color: #d8d8d8;
  }
  .right_jt2{
    float: right;
    line-height: 0.4886rem;
    font-size: 18px;
    color: #d8d8d8;
  }
  .xiugai{
    color: #999999;
    font-size: 0.164063rem;
    position: absolute;
    top: 3.63rem;
    right: 0.3rem;
    font-weight: 100;

  }
  /*退出登录*/
  .quit{
    height: 0.344rem;
    background: #D8584A;
    font-size: 0.140625rem;
    color: white;
    margin: 0.304688rem 0.075124rem 0 0.075rem;
    line-height: 0.344rem;
    text-align: center;
    border-radius: 0.05rem;
    /*display: block;*/
  }

  /*退出登录弹框*/
  .popExit{
    width: 3.5269rem;
    height: 2.9795rem;
    padding: 0.17rem;
    text-align: center;
    background: papayawhip;
    box-sizing: border-box;
    border-radius: 0.05rem;
    position: absolute;
    top: 1.39rem;
    left: 0.11rem;
    .at{
      width: 0.9rem;
      margin: 0.2rem 0 ;
    }
    p{
      color: #575757;
      font-size: 0.3rem;
      line-height: 0.4rem;
      margin-bottom: 0.25rem;
    }
    /*div{*/

      .btn1{
        width: 0.9205rem;
        height: 0.3795rem;
        background: #C1C1C1;
        color: white;
        margin: 0.2rem 0.09375rem 0 0;
        border: none;
        border-radius: 0.05rem;
      }
    .btn2{
        background: #DD6B55;
        font-size: 0.140625rem;
        margin: 0.2rem 0 0 ;
        color: white;
        border: none;
        height: 0.3795rem;
        width: 1.071rem;
        border-radius: 0.05rem;

      /*}*/
    }
  }

</style>
