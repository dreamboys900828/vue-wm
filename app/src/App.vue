<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import {Dialog} from 'vant';
  import '../node_modules/animate.css/animate.min.css'

  export default {
    name: 'App',
  }

</script>

<style scoped lang="less">
  #app {
    width: 100%;
    height: 100%;
    background: #f5f5f5;
  }
</style>
