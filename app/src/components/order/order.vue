<template>
    <div class="order">
        <h1>这里是订单页面</h1>
    </div>
</template>

<script>
    import {mapMutations} from "vuex";

    export default {
        name: 'order',
      created() {
          this.changeTabActive(2);
      },
      methods: {
          ...mapMutations(['changeTabActive'])
      },
    };
</script>
<style scoped lang="less">
  @import "_order";
</style>
