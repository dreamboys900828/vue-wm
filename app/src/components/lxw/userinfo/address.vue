<template>
  <!--编辑地址-->


  <!--导航栏-->
  <div class="add" ref="bg">
    <van-nav-bar
      title="编辑地址"
      left-text=" "
      arrow-left
      left-arrow
      @click-left="onClickLeft"
    />

    <ul>
      <li v-for="(value,index) in newRess" :key="index">
        <div class="div2">
          <p>{{value.name}}</p>
          <span>13245465</span>
        </div>
        <span class="X" v-if="Xshow" @click="Xclick(value.id,index)">x</span>
      </li>
    </ul>


    <router-link :to="{path:'newRess',query:{user_id:USER_STATUS.id}}">
      <div class="input2">
        新增地址
        <van-icon name="arrow" class="right_jt2"/>
      </div>
    </router-link>


    <div class="delete" @click="remove1">{{delete1}}</div>

  </div>
</template>

<script>
  import {deleteAddress, getAddress} from "../../../service/getData";
  import {mapState} from "vuex";

  export default {
    name: "daaress",
    data() {
      return {
        allinfo1: {},
        newRess: [],
        delete1: "编辑",
        Xshow: false,
      }
    },
    methods: {
      //点击X删除
      async Xclick(value, index) {
        this.newRess.splice(index, 1);
        //获取删除收货地址
        await deleteAddress(this.USER_STATUS.id, value);

      },
      async getAddress() {
        //  获取收货地址列表
        this.newRess = await getAddress(this.USER_STATUS.id);
        console.log(this.newRess);
      },
      onClickLeft() {
        this.$router.go(-1);
      },
      remove1() {
        if (this.delete1 === "编辑") {
          this.delete1 = "完成"
          this.Xshow = true
        } else {
          this.delete1 = "编辑"
          this.Xshow = false
        }
      }
    },
    created() {
      this.getAddress();


    },
    mounted() {
      this.$refs.bg.style.height = window.innerHeight + 'px'
    },
    computed: {
      ...mapState(['USER_STATUS']),
    }
  }
</script>

<style scoped lang="less">
  .add {
    background: #f5f5f5;
  }

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

  /*!*input框*!*/
  .input2 {
    background: white;
    display: inline-block;
    /*display: block;*/
    border-top: 1px solid #d8d8d8;
    border-bottom: 1px solid #d8d8d8;
    width: 100%;
    height: 0.4786rem;
    line-height: 0.4786rem;
    font-size: 0.1406rem;
    padding: 0 0.09375rem;
    box-sizing: border-box;
    color: black;
    margin-top: 0.09375rem;
    font-size: 0.164063rem;
  }

  .right_jt2 {
    float: right;
    line-height: 0.4886rem;
    font-size: 18px;
    color: #d8d8d8;

  }

  ul {
    margin-top: 0.09375rem;

    > li:nth-child(1) {
      border-top: 0.5px solid #d9d9d9;
    }

    li {
      background: white;
      height: 0.6135rem;
      padding: 0.09375rem;
      font-size: 0.140625rem;
      box-sizing: border-box;
      border-bottom: 0.5px solid #d9d9d9;
      color: #333;
      /*line-height: 0.3rem;*/

      p {
        line-height: 0.208rem;

        /*display: inline-block;*/
      }

      > span:nth-child(1) {
        line-height: 0.208rem;
      }

      .X {
        float: right;
        font-size: 0.1875rem;
        color: #999999;
        display: inline-block;
        line-height: 0.41rem;


      }
    }

  }

  /*编辑删除按钮*/
  .delete {
    position: absolute;
    top: 0.15rem;
    right: 0.12rem;

    z-index: 10;
    font-size: 0.164063rem;
    color: white;
    /*background: red;*/

  }

  .div2 {
    width: 3rem;
    display: inline-block;
  }

</style>
