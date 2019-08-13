<template>
    <div>
      <!--单个弹框信息-->
      <transition mode="out-in" enter-active-class="animated heartBeat">
        <div v-if="show" class="MyAlter" >
          <svg t="1564970482842" class="icon AT" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2031" width="70" height="70"><path d="M508.8 44.8c-256 0-464 208-464 464s208 464 464 464 464-208 464-464-208-464-464-464z m0 880c-230.4 0-416-185.6-416-416s185.6-416 416-416 416 185.6 416 416-185.6 416-416 416z" fill="#F8CB86" p-id="2032"></path><path d="M521.6 652.8c12.8 0 22.4-9.6 22.4-22.4V201.6c0-12.8-9.6-22.4-22.4-22.4-12.8 0-22.4 9.6-22.4 22.4v428.8c-3.2 9.6 9.6 22.4 22.4 22.4zM486.4 748.8a1.1 1.1 0 1 0 70.4 0 1.1 1.1 0 1 0-70.4 0z" fill="#F8CB86" p-id="2033"></path></svg>
          <p>{{popKuang}}</p>
          <div @click="yes">确定</div>
        </div>
      </transition>

      <!--退出登录弹框-->

    </div>
</template>

<script>
    export default {
        name: "popKuang",
      data(){
          return{
            show: false,
          }
      },
      methods:{
        yes(){
          this.show=false
        },

      }
    }
</script>

<style scoped lang="less">
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
