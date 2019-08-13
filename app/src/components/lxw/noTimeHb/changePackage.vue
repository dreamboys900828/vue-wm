<template>
    <div class="chang" ref="bg">
      <!--导航部分-->
      <van-nav-bar
        title="兑换红包"
        left-text=" "
        arrow-left
        left-arrow
        @click-left="onClickLeft"
      />

      <!---->
      <div class="content">
        <input type="text" placeholder="请输入兑换码" v-model="exchangecode" @input="dhm">
        <input type="text" placeholder="验证码" v-model="captchacode" @input="yzm">

      <p class="p"></p>
        <div @click="exchange" :class="{abc:abc1,convert:true}">兑换</div>
      <!--验证码-->
        <div class="yzm">
          <img :src=code1 alt="">
          <div @click="look">
            <span>看不清</span>
            <span>换一张</span>
          </div>
        </div>
      </div>


    </div>
</template>

<script>
  import Vue from "vue";
    export default {
        name: "changePackage",
      data(){
          return{
            code1:"",
            allInfo1:[],
            exchangecode:"",
            userid:"",
            captchacode:"",
            abc1:false,
            def:false



          }
      },
      methods: {
          //验证码输入框
        yzm(){
          if(this.captchacode.length==4){
            this.def=true
            console.log(this.def)
          }else{
            this.def=false
            console.log(this.def)
          }
        },
          //输入兑换码框
        dhm(){
          if(this.exchangecode==1 && this.def==true ){
            this.abc1=true
          }else{
            this.abc1=false
          }
        },




          exchange(){
            Vue.axios.post('https://elm.cangdu.org/v1/users/:user_id/hongbao/exchange',{user_id:this.allInfo1.username,exchange_code:this.exchangecode,captcha_code:this.captchacode}).then((result)=>{
             if(result.data.message=="无效的兑换码"){
               alert(result.data.message)
             }
            })
          },
        onClickLeft() {
          this.$router.go(-1);
        },
        look(){
          this.aginCode()
        },
        //验证码
        aginCode(){


          Vue.axios.post("https://elm.cangdu.org/v1/captchas").then((result)=>{
            this.code1=result.data.code;
          })
        }
      },
      created(){

        this.aginCode();
        this.allInfo1=JSON.parse(localStorage.getItem('allInfo'));
        console.log(this.allInfo1.username)
      },
      mounted(){
        this.$refs.bg.style.height = window.innerHeight+"px";
      }
    }
</script>

<style scoped lang="less">
/*@import "_changePackage";*/
/*导航栏*/
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

  .content{
    /*background: #999999;*/
    margin-top: 0.16406rem;
    padding: 0 0.11719rem;
    box-sizing: border-box;
    font-size: 0.164rem;
    input{
      border: 0.1px solid grey;
    }
    >input:nth-child(1){
      box-sizing: border-box;
      padding: 0.14063rem 0.09375rem;
      display: block;
      border-radius: 0.05rem;
      width: 100%;
    }
    >input:nth-child(2){
      width: 2.0648rem;
      height: 0.5156rem;
      padding: 0.09375rem;
      box-sizing: border-box;
      border-radius: 0.05rem;
      display: inline;
      margin-top: 0.16406rem;

    }
    p{
      width: 1.38828rem;
      height: 0.5156rem;
      border: 0.1px solid grey;
      border-radius: 0.05rem;
      box-sizing: border-box;
      float: right;
      margin-top: 0.16406rem;
    }
    /*兑换*/
    .convert{
      font-size: 0.164rem;
      background: #CCCCCC;
      margin: 0.164063rem 0.164063rem 0;
      height: 0.416rem;
      /*display: inline-block;*/
      line-height: 0.416rem;
      text-align: center;
      border-radius: 0.05rem;
    }
  }
  /*验证码*/
  .yzm{
    position: absolute;
    top: 1.37rem;
    right: 0.16rem;
    display: inline-block;

    img{
      width: 0.82rem;
      height: 0.3215rem;

    }
    div{
      display: inline-block;
      width: 0.4688rem;
      height: 0.3829rem;
      span{
        color: #666666;
        font-size: 0.1289rem;
      }
      >span:nth-child(2){
        color:#3b95e9;
      }
    }

  }
  .abc{
    background: #4CD964 !important;
  }
  .p{
    background: white;
  }
  .chang{
    background: rgb(241,241,241);
  }
</style>
