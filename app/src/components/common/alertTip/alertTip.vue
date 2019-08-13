<template>
  <div class="alet_container">
    <section class="tip_text_container">
      <div class="tip_icon">
        <span></span>
        <span></span>
      </div>
      <p class="tip_text">{{alertText}}</p>
      <div class="confrim" @click="closeTip">确认</div>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'alertTip',
    data() {
      return {
        positionY: 0,
        timer: null,
      }
    },
    mounted() {

    },
    props: ['alertText'],
    methods: {
      closeTip() {
        this.$emit('closeTip')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../../style/mixin';

  @keyframes tipMove {
    0% {
      transform: scale(1)
    }
    35% {
      transform: scale(.8)
    }
    70% {
      transform: scale(1.1)
    }
    100% {
      transform: scale(1)
    }
  }

  .alet_container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 200;
  }

  .tip_text_container {
    position: absolute;
    top: 54.3%;
    left: 50%;
    margin-top: -1.2rem;
    margin-left: -1.2rem;
    width: 2.4rem;
    -webkit-animation: tipMove-data-v-0ccf490a .4s;
    animation: tipMove-data-v-0ccf490a .4s;
    background-color: mediumseagreen;
    padding-top: .12rem;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    border: 1px;
    border-radius: 0.25rem;

    .tip_icon {
      @include wh(0.6rem, 0.6rem);
      border: 0.03rem solid #f8cb86;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      span:nth-of-type(1) {
        @include wh(.024rem, 0.3rem);
        background-color: #f8cb86;
      }

      span:nth-of-type(2) {
        @include wh(.04rem, .04rem);
        border: 1px;
        border-radius: 50%;
        margin-top: .04rem;
        background-color: #f8cb86;
      }
    }

    .tip_text {
      @include sc(.14rem, #333);
      line-height: .18rem;
      text-align: center;
      margin-top: .16rem;
      padding: 0 .08rem;
    }

    .confrim {
      @include sc(.16rem, #fff);
      font-weight: bold;
      margin-top: .16rem;
      background-color: #4cd964;
      width: 100%;
      text-align: center;
      line-height: 0.36rem;
      border: 1px;
      border-bottom-left-radius: 0.05rem;
      border-bottom-right-radius: 0.05rem;
    }
  }

</style>
