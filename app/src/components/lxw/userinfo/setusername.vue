<template>
  <!--导航栏-->
  <div class="yhm" ref="bg">
    <van-nav-bar
      title="修改用户名"
      left-text=" "
      arrow-left
      left-arrow
      @click-left="onClickLeft"
    />

    <div class="content">
      <input type="text" placeholder="输入用户名" :class="{box:border1}" v-model="newname" @input="clickName">
      <p v-if="p1" class="p1">用户名只能修改一次（5-24字符之间）</p>
      <p v-if="p2" class="p2">用户名长度在5到24位之间</p>
      <button :disabled="affirm" :class="{green:green}" @click="abc">确认修改</button>
    </div>

  </div>
</template>

<script>
  export default {
    name: "setusername",
    data(){
     return{
       newname:"",
       border1:false,
       p1:true,
       p2:false,
       affirm:true,
       green: true
     }
    },
    methods: {
      onClickLeft() {
        this.$router.go(-1);
      },
      clickName(){
          if(this.newname.length <=4){
            this.border1=true;
            this.p1=false;
            this.p2=true;
            this.affirm=true;
            this.green= true
          }else if(this.newname.length >=4){
            this.border1=false;
            this.p1=true;
            this.p2=false;
            this.affirm=false;
            this.green= false
          }
      },
      abc(){
        console.log(123)
      }
    },
    mounted(){
      this.$refs.bg.style.height= window.innerHeight+'px'
    }
  }
</script>

<style scoped lang="less">
  .yhm{
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

  .content{
    margin: 0.09375rem 0.09475rem 0;
    /*!*框*!*/
    input{
      display: inline-block;
      /*display: block;*/
      border: 1px solid #ddd;
      width: 100%;
      height: 0.398rem;
      line-height: 0.4786rem;
      font-size: 0.1641rem;
      padding: 0 0.02344rem;
      box-sizing: border-box;
      background: #f5f5f5;
    }
    .p1{
      color: #666666;
      height: 0.4561rem;
      font-size: 0.096rem;
      padding: 0.09375rem 0 0.234375rem;
      box-sizing: border-box;
    }
    .p2{
      height: 0.4338rem;
      box-sizing: border-box;
      color: red;
      font-size: 0.135938rem;
      padding: 0.0234375rem 0 0.234375rem;
    }
    button{
      height: 0.464rem;
      background: #3190e8;
      font-size: 0.164063rem;
      width: 3.56rem;
      border: none;
      color: white;
    }
  }
  .box{
    border: 1px solid red !important;
  }

  .green{
      color: #98ccf4 !important;
  }

</style>
