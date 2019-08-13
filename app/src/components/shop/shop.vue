<template>
  <div class="shop">
    <transition name="bounce">
      <router-view></router-view>
    </transition>
    <!--底部-->
    <van-tabbar v-model="$store.state.tabBarActive" class="footer-tabbar"
                v-if="!notAllowAccess.includes($store.state.intoRoute)">
      <van-tabbar-item icon="home-o" @click="goToMsite(geoHash)">外卖</van-tabbar-item>
      <van-tabbar-item icon="search" to="searchGood">搜索</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="order">订单</van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="mine">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  import {mapState} from "vuex";

  export default {
    name: 'shop',
    data() {
      return {
        geoHash: null,
        // 如下路由不显示底部主菜单
        notAllowAccess: [
          '/shop/shopDetail',
          '/shop/confirmOrder',
          '/shop/shopDesc',
          '/shop/food',
          '/shop/goodInfo',
          '/shop/bottom-bar',
        ],
      }
    },
    methods: {
      // 进入外卖首页 传参定位
      goToMsite() {
        this.$router.push({path: '/shop/msite', query: {gpsHash: this.userLocation}});
      },
    },
    computed: {
      ...mapState(['userLocation']),
    }
  };
</script>
<style scoped lang="less">
  @import "_shop";
</style>
