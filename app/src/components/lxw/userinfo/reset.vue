<template>
  <!--重置密码页面-->
  <div class="reset" ref="bg">
    <!--导航栏-->
    <van-nav-bar
      title="重置密码"
      left-text=" "
      arrow-left
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="content">
      <input type="text" placeholder="账号" v-model="myID1"/>
      <input type="text" placeholder="旧密码" v-model="oldpassWord1"/>
      <input type="text" placeholder="请输入新密码" v-model="newpassWord1"/>
      <input type="text" placeholder="请确认密码" v-model="confirmpassword1"/>
      <input type="text" placeholder="验证码" v-model="captcha_code1"/>
      <!--验证码-->
      <img :src="imgSrc" alt="">
      <!--看不清换一张-->
      <div class="look" @click="look1">
        <p>看不清</p>
        <p>换一张</p>
      </div>

      <div class="amend" @click="click">确认修改</div>

      <!--弹框信息-->
      <!--heartBeat-->
      <transition name="fade" mode="out-in" >
        <div v-if="show" class="MyAlter" >
        <svg t="1564970482842" class="icon AT" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2031" width="70" height="70"><path d="M508.8 44.8c-256 0-464 208-464 464s208 464 464 464 464-208 464-464-208-464-464-464z m0 880c-230.4 0-416-185.6-416-416s185.6-416 416-416 416 185.6 416 416-185.6 416-416 416z" fill="#F8CB86" p-id="2032"></path><path d="M521.6 652.8c12.8 0 22.4-9.6 22.4-22.4V201.6c0-12.8-9.6-22.4-22.4-22.4-12.8 0-22.4 9.6-22.4 22.4v428.8c-3.2 9.6 9.6 22.4 22.4 22.4zM486.4 748.8a1.1 1.1 0 1 0 70.4 0 1.1 1.1 0 1 0-70.4 0z" fill="#F8CB86" p-id="2033"></path></svg>

          <p>{{popKuang}}</p>
      <div @click="yes">确定</div>
      </div>
      </transition>

    </div>

  </div>




</template>

<script>
  import Vue from "vue";


    export default {
        name: "reset",
      data(){
          return{
            myID1:"",
            oldpassWord1:"",
            newpassWord1:"",
            confirmpassword1:"",
            captcha_code1:"",
            imgSrc:"",
            show: false,
            popKuang:"",
          }
      },
      methods: {
        //  点击确定
        yes(){
          this.show=false
        },

        //  导航栏后退按钮
        onClickLeft() {
          this.$router.go(-1);
        },
        look1(){
          this.abc();
        },
        click(){

          this.show=true;
          //  修改密码
          Vue.axios.post("https://elm.cangdu.org/v2/changepassword",{username:this.myID1,oldpassWord:this.oldpassWord1,newpassword:this.newpassWord1,confirmpassword:this.confirmpassword1,captcha_code:this.captcha_code1}).then((result)=>{
            console.log(result.data);
            if (result.data.message == "未找到当前用户"){
              this.popKuang="未找到当前用户";
            } else if (result.data.message == "密码不正确") {
              this.popKuang="密码不正确"
            }else if (result.data.message == "必须添加旧密码") {
              this.popKuang="必须添加旧密码"
            } else if (result.data.message == "两次密码不一致") {
              this.popKuang=result.data.message
            }else if (result.data.message == "必须填写新密码") {
              this.popKuang=result.data.message
            }else if (result.data.message == "验证码不正确") {
              this.popKuang=result.data.message
            }else if (result.data.message == "用户名参数错误") {
              this.popKuang=result.data.message
            }else{
              this.popKuang="密码修改成功";
            }

          })

        },
        abc(){
          //  获取验证码
          Vue.axios.post("https://elm.cangdu.org/v1/captchas").
          then((result)=>{
            // console.log(result.data);
            this.imgSrc=result.data.code;
          });
        },

      },
      created(){
        this.abc();

      },
      mounted(){
          this.$refs.bg.style.height=window.innerHeight+"px"
      }
    }
</script>



<style scoped lang="less">

  .reset{
    background: #f5f5f5;
  }


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
  /*****/
  .reset{
  .content{

    input{
      border: 1px  solid #f1f1f1;
      display:inline-block;
      width: 100%;
      height: 0.4913rem;
      box-sizing: border-box;
      padding: 0.14rem 0.1875rem;
      font-size: 0.164rem;
    }
    >input:nth-child(1){
      padding: 0.07031rem 0.1875rem;
      line-height: 0.216rem;
      height: 0.3665rem;
      margin-top: 0.14063rem;

    }
    /*验证码图片*/
    img{
      width: 0.82rem;
      position: absolute;
      top: 2.55rem;
      right: 0.76rem;
    }

    /*确认修改*/
    .amend{
      background: #4CD964;
      font-size: 0.164rem;
      color: white;
      margin: 0.23438rem 0.11719rem;
      height: 0.45rem;
      line-height: 0.45rem;
      text-align: center;
      border-radius: 0.05rem;
    }
  }
}
  /*看不清换一张*/
  .look{
    display: inline;
    position: absolute;
    top: 2.55rem;
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

  /*弹出提示框*/
  .MyAlter{
    width: 2.8125rem;
    height: 1.8428rem;
    background: white;
    position: absolute;
    top:1.9rem;
    left: 0.47rem;
    box-sizing: border-box;
    padding-top: 0.14rem;
    text-align: center;
    /*提示图片*/
    .AT{
      display: inline-block;
    }
    /*请输入正确的账号*/
    p{
       font-size: 0.164rem;
      margin-top: 0.1875rem;

    }
    /*确认*/
    div{
      background: #4CD964;
      color: white;
      font-weight: 700;
      margin-top: 0.23rem;
      height: 0.416rem;
      line-height: 0.146rem;
      font-size: 0.1875rem;
      /*display: inline-block;*/
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 0 0 0.05rem 0.05rem;
    }
  }



</style>
