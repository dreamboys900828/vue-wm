<template>
  <!--密码登录页面-->
  <div class="longin">
    <!--导航栏-->
    <van-nav-bar
      title="密码登录"
      left-text=" "
      arrow-left
      left-arrow
      @click-left="onClickLeft"
    />

    <!--内容-->
    <div class="content">
        <input type="text" name="" placeholder="账号" v-model="username"/>
    <input :type="checked ? 'text':'password' " placeholder="密码" v-model="password"/>
      <van-switch v-model="checked" class="onOff" size="0.18rem" active-color="#4CD964" inactive-color="#CCC" />
      <span class="abc">abc...</span>
    <input type="text" placeholder="验证码" v-model="codeA"/>

      <div class="look" @click="click">
        <p>看不清</p>
        <p>换一张</p>
      </div>

      <!--验证码图片-->
      <div class="code2">
        <img :src="code1" alt="">
      </div>

    </div>

    <p>温馨提示：未注册过的账号，登录时将自动注册</p>
    <p>注册过的用户可凭账号密码登录</p>
    
    <div class="dneglu" @click="enter1">登录</div>

    <router-link :to="{path:'/reset'}" class="reset">重置密码？</router-link>
    <div>

    </div>
  </div>

</template>

<script>
  import Vue from 'vue'
  export default {
    name: "Lnavigation",
    data(){
      return{
        checked:true,
        code1:"",
        username:"",
        password:"",
        //验证码
        codeA:"",
        allInfo:[],
      }
    },
    mounted(){
      this.agin();
      // Vue.axios.post("https://elm.cangdu.org/v2/login")
    },
    methods: {
      onClickLeft() {
        this.$router.go(-1);
      },
      //获取验证码
      click(){
        this.agin()
      },
      //登录点击事件enter
      enter1(){
        //获取用户信息
        Vue.axios.post('https://elm.cangdu.org/v2/login',{
          username:this.username,password:this.password,captcha_code:this.codeA,
        }).then((result)=>{
          // console.log(result.data);
          this.allInfo=result.data;

          if(result.data.message == "密码错误"){
            alert(result.data.message)
          }else if (result.data.message == "验证码不正确"){
            alert(result.data.message)
          }else {
            localStorage.setItem('allInfo',JSON.stringify(this.allInfo));
            this.$router.push({path:'/lmy'});
          }
        })
      },
      //获取验证码
      agin(){
        Vue.axios.post('https://elm.cangdu.org/v1/captchas').then((err)=>{
          console.log(err.data.code);
          this.code1=err.data.code;
        });
      }
    }
  }
</script>

<style scoped lang="less">
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

  /*内容部分*/
.content{
  margin-top: 0.141rem;
  background: bisque;
}



  input{
    border: 1px  solid #f1f1f1;
    display:inline-block;
    width: 100%;
    height: 0.4913rem;
    box-sizing: border-box;
    padding: 0.14rem 0.1875rem;
    font-size: 0.164rem;
  }

  /*开关*/
  .van-switch{
    display: inline-block;
    position: absolute;
    top: 1.25rem;
    right: 0.2rem;


    .van-switch__node{
      size: 20px;
      width: 0.28rem;
      height: 0.28rem;
      line-height: 0.2rem;
      position: absolute;
      top: -0.05rem;
      left: -0.01rem;
    }
  }
  .onOff{
    width: 0.35rem;
    height: 0.164rem;
  }
  /*abc*/
  .abc{
    font-size: 0.1056rem;
    color: white;
    position: absolute;
    top: 1.28rem;
    right: 0.25rem;
  }
  /*看不清 换一张*/
  .look{
    display: inline;
    position: absolute;
    top: 1.67rem;
    right: 0.23rem;
    >p:nth-child(1){
      font-size: 0.1289rem;
      color: #666;
      margin-bottom: 0.07rem;
    }
    >p:nth-child(2){
      font-size: 0.1289rem;
      color: #3B95E9;
    }
  }
  /*验证码图片*/
  .code2{
    position: absolute;
    top: 1.69rem;
    right: 0.83rem;
    display: inline-block;
    width: 0.8203rem;
  }
/*登录*/
  .dneglu{
    background: #4CD964;
    font-size: 0.164rem;
    color: white;
    margin: 0 0.1172rem 0.23438rem;
    height: 0.45rem;
    line-height: 0.45rem;
    text-align: center;
  }
  /*温馨提示*/
  .longin>p:nth-child(3),.longin>p:nth-child(4){
    color: red;
    padding: 0.09375rem 0.1406rem;
    font-size: 0.117188rem;
  }
  /*重置密码*/
  .reset{
    font-size: 0.140625rem;
    color: #3B95e9;
    /*float: right;*/
    margin-left: 2.95rem;

  }

</style>
