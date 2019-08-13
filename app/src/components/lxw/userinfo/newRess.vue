<template>
  <!--导航栏-->
  <div class="newRess">
    <van-nav-bar
      title="新增地址"
      left-text=" "
      arrow-left
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="center">
      <div class="div1">
        <input type="text" placeholder="请填写你的姓名" v-model="Yname" :class="{input1:redKuang}" @input="clickName">
        <p v-if="PnameIf">{{nameTS}}</p>
      </div>
      <router-link :to="{path:'/addDetail'}">
        <div class="div1">
          <input type="text" placeholder="小区/写字楼/学校等"  class="dizhi" v-model="all.name" @click="school">
        </div>
      </router-link>
      <div class="div1">
        <input type="text" placeholder="请填写详细送餐地址" v-model="address" @input="clickRess" :class="{input1:ressKuang}">
        <p v-if="pressIf">{{ressTS}}</p>
      </div>
      <div class="div1">
        <input type="text" placeholder="请填写能够联系到您的手机号" v-model="Yphone" @input="clickPhone" :class="{input1:phoneKuang}">
        <p v-if="phoneIf">{{phoneTS}}</p>
      </div>
     <div class="div1">
       <input type="text" placeholder="备用联系电话（选填）" v-model="byPhone" @input="click1Phone" :class="{input1:phone1Kuang}">
       <p v-if="phone1If">{{phone1TS}}</p>
     </div>
    </div>
    <div class="newDZ" @click="new1">新增地址</div>
  </div>
</template>

<script>
  import Vue from "vue";
  export default {
    name: "newRess",
    data(){
      return{
        all:{},
        abc:"",
        //收货人姓名
        Yname:"",
      //  地址
        address:"",
        //电话
        Yphone:"",
        allInfo:"",
        user_id:"",
        byPhone:"",
      //  姓名提示
        nameTS:'',
        redKuang:false,
        PnameIf:false,
      //  详细地址
        ressTS:'',
        ressKuang:false,
        pressIf:false,
      //  手机号
        phoneTS:'',
        phoneKuang:false,
        phoneIf:false,
      //备用手机号
        phone1TS:'',
        phone1Kuang:false,
        phone1If:false


      }
    },
    methods: {
      //点击姓名输入框
      clickName(){
        if(this.Yname.length == 0){
          this.nameTS="请填写您的姓名";
          this.redKuang=true;
          this.PnameIf=true
        }else {
          this.redKuang=false;
          this.PnameIf=false
        }
      },
      //点击详细送餐地址输入框
      clickRess(){
        if(this.address.length == 0){
          this.ressTS = "请详细填写送餐地址";
          this.ressKuang = true;
          this.pressIf = true;

        }else if(this.address.length <= 3 ){
          this.ressTS = "送餐地址太短了，不能辨识";
          this.ressKuang = true;
          this.pressIf = true;
        }else if(this.address.length > 3){
          this.ressKuang = false;
          this.pressIf = false;
        }
      },
      //点击手机号输入框
      clickPhone(){
          if(this.Yphone.length ==0){
            this.phoneTS = "手机号不能为空";
            this.phoneKuang = true;
            this.phoneIf = true;
          }else if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.Yphone))){
            this.phoneTS = "手机号格式错误";
            this.phoneKuang = true;
            this.phoneIf = true;
          }else{
            this.phoneKuang = false;
            this.phoneIf = false;
          }
      },
      click1Phone(){
        if(this.byPhone.length ==0){
          this.phone1TS = "手机号不能为空";
          this.phone1Kuang = true;
          this.phone1If = true;
        }else if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.byPhone))){
          this.phone1TS = "手机号格式错误";
          this.phone1Kuang = true;
          this.phone1If = true;
        }else{
          this.phone1Kuang = false;
          this.phone1If = false;
        }
      },


      onClickLeft() {
        this.$router.go(-1);
        localStorage.removeItem('Yname');
        localStorage.removeItem('Yphone');
        localStorage.removeItem('byPhone');
        localStorage.removeItem('address');
        localStorage.removeItem('ressData');

      },
      // 点击新增地址
      new1(){
        Vue.axios.post(`https://elm.cangdu.org/v1/users/${this.allInfo.user_id}/addresses`,{
          user_id:this.allInfo.user_id,address:this.all.name,address_detail :this.address,geohash:this.all.geohash,name:this.Yname,phone:this.Yphone,tag:"公司",sex:1,phone_bk:this.Yphone,tag_type:4
        }).then((result)=>{
          if(result.data.success == "添加地址成功"){
            this.$router.push({path:'/address'})
          }
        })
      },
    //  点击 地址选取
      school(){
        localStorage.setItem('Yname',JSON.stringify(this.Yname));
        localStorage.setItem('Yphone',JSON.stringify(this.Yphone));
        localStorage.setItem('byPhone',JSON.stringify(this.byPhone));
        localStorage.setItem('address',JSON.stringify(this.address));
      }
    },
    //数据监测
    watch:{

    },
    mounted(){
      this.all=this.$store.state.address;
      console.log(this.all);
      this.allInfo=JSON.parse(localStorage.getItem('allInfo'));

      this.user_id=this.$route.query.user_id;
      console.log(this.user_id)

    //取出输入框里的值
      this.Yname=JSON.parse(localStorage.getItem('Yname'));
      this.Yphone=JSON.parse(localStorage.getItem('Yphone'));
      this.byPhone=JSON.parse(localStorage.getItem('byPhone'));
      this.address=JSON.parse(localStorage.getItem('address'));

    },
  }
</script>

<style scoped lang="less">
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

  .center{
    padding: 0.09375rem 0;
    box-sizing: border-box;
    /*display: flex;*/
    /*justify-content: center;*/
    /*align-items: center;*/

    input{
      width: 3.5156rem;
      height: 0.3525rem;
      margin: 0 0.11825rem;
      padding: 0.0703125rem;
      border: 1px solid #ddd;
      box-sizing: border-box;
      font-size: 0.1406rem;
      border-radius: 0.05rem;
      background: #F2F2F2;
    }
  }
  .newDZ{
    color: white;
    font-weight: 700;
    width: 3.5156rem;
    height: 0.368rem;
    text-align: center;
    display: inline-block;
    background: #4cd964;
    line-height: 0.368rem;
    font-size: 0.1406rem;
    margin-left: 0.11825rem ;
    border-radius: 0.05rem;
  }
  .dizhi{
    color: black;
  }

  .input1{
    border: 1px solid red !important;
  }
  p{
   color: red;
    /*background: papayawhip;*/
    height: 0.128rem;
    padding-left: 0.117188rem;
    font-size: 0.096rem;
    box-sizing: border-box;
    margin-top: 0.046875rem;
  }
  .div1{
    margin-bottom: 0.09375rem;
  }

</style>
