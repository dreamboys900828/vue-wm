<template>
  <div class="bar">
    <i class="iconfont arrow-left" @click="goBack">&#xe643;</i>
    <div class="title">{{title}}</div>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String
      }
    },
    name: 'bar',
    methods: {
      goBack() {
        this.$router.go(-1);
      }
    },
  };
</script>
<style scoped lang="less">
  @import "_bar";
</style>
