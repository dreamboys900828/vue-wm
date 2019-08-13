<template>
  <!--导航栏-->

  <div class="addDetail">
    <van-nav-bar
      title="搜索地址"
      left-text=" "
      arrow-left
      left-arrow
      @click-left="onClickLeft"
    />

    <div class="seek">
      <input type="text" placeholder="请输入小区/写字楼/学校等" v-model="keyword1"> <button @click="yes">确认</button>
    </div>
    <p class="hint">为了满足商家的送餐要求，建议您从列表中选择地址</p>

    <div class="hint2" v-if="show">
      <p>找不到地址？</p>
      <p>请尝试输入小区、写字楼或学校名</p>
      <p>详细地址（如门牌号）可稍后输入哦。</p>

    </div>

    <ul v-if="show1">
      <!--<router-link :to{path}></router-link>-->
      <li v-for="(value,index) in site" :key="index" @click="DJsite(value)">
        <p>{{value.name}}</p>
        <p>{{value.address}}</p>
      </li>

    </ul>



  </div>


</template>

<script>
  import Vue from 'vue'
  export default {
    name: "addDetail",
    data(){
      return{
        allInfo:[],
        keyword1:"",
        site:[],
        show:true,
        show1:false,
      }
    },
    methods: {
      onClickLeft() {
        this.$router.go(-1);
      },

      //确认点击按钮
      yes(){
        Vue.axios.get("https://elm.cangdu.org/v1/pois",{params:{city_id:this.allInfo.city,keyword:this.keyword1}}).then((result)=>{
          // console.log(result.data);
          this.site=result.data
        });
        this.show=false;
        this.show1=true;
      },

    //  点击地址传参

      DJsite(value){
        // console.log(value);
        this.$router.push({path:"/newRess",query:{value:value}});
        this.$store.commit("saveAddress",value)
      }
    },


    created(){
     this.allInfo = JSON.parse(localStorage.getItem('allInfo'));



    },
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

  /*搜索*/
  .seek{
      padding: 0.117188rem;
    height: 0.6338rem;
    box-sizing: border-box;
    display:flex;


    input{

      flex: 3.7;
      height: 0.3995rem;
      padding: 0.09375rem;
      border: 0.001rem solid #ddd;
      box-sizing: border-box;
      font-size: 0.1406rem;
      border-radius: 0.05rem;
      background: #F2F2F2;
    }
    button{
      flex: 1;
      height: 0.3995rem;
      font-size: 0.164063rem;
      background:#3199e8;
      border: none;
      border-radius: 0.05rem;
      color: white;

    }
  }
  /*提示*/
  .hint{
    height: 0.2858rem;
    color: #FF883F;
    font-size: 0.145313rem;
    padding: 0.046875rem 0;
    background: #fff6e4;
    box-sizing: border-box;
    text-align: center;
  }

  /*定位提示*/
  .hint2{
    font-size: 0.164063rem;
    text-align: center;
    position: absolute;
    top: 45%;
    width: 98%;

    p{
      color: #969696;
      margin-bottom: 0.09375rem;
      line-height: 0.216rem;
    }
  }
  /*地址*/
  ul{

    li{
      padding: 0.09375rem;
      border-bottom: 0.005rem solid #ddd;
      color: #969696;
      font-size: 0.152344rem;
      box-sizing: border-box;
      >p:nth-child(1){
        margin-bottom: 0.046875rem;
        line-height: 0.2rem;
      }
      >p:nth-child(2){
        line-height: 0.2rem;
      }
    }
  }
</style>
