<template>
    <div class="header">
      <div class="content">
          <h2>请重新进入</h2>
          <p>请返回后重新进入积分商城~</p>
          <img src="//yun.duiba.com.cn/webapp/img/retrylogin.png" alt="" class="logo">
      </div>
    </div>
</template>

<script>
    export default {
        name: "points"
    }
</script>

<style scoped>
  .header{
    height: 6rem;
  }
.content{
    margin: 0 auto;
}
.content h2{
  display:inline-block;
  margin: 2rem 0 0 1.3rem;
  color: #0d7fd5;
  font-weight: bold;
}
.content p{
  margin:.2rem 0 0 1rem;
  color: #666666;
}
  .logo{
    width: 1.8rem;
    margin: .2rem 1rem;
  }
</style>
