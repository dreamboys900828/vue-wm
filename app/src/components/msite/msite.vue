<template>
  <div class="msite">
    <!--导航-->
    <div class="header">
      <van-nav-bar :title="infoList.name | omitEd" left-text="" fixed>
        <van-icon name="search" slot="left" class="search" @click="toSearch"></van-icon>
        <span slot="right" class="right-text login" @click="login">登录</span>
        <span slot="right" class="right-text shu">|</span>
        <span slot="right" class="right-text register" @click="register">注册</span>
      </van-nav-bar>
    </div>
    <div class="msite_nav">
      <van-swipe :autoplay="3000" indicator-color="#3190e8">
        <van-swipe-item v-for="cate in cateList" :key="cate.id">
          <van-grid square>
            <van-grid-item
              v-for="cat in cate"
              :key="cat.id"
              :icon="cat.image_url | joinPath"
              :text="cat.title"
              @click="goFood(cat.title)"
            >
            </van-grid-item>
          </van-grid>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="main">
      <div class="shop-header">
        <van-icon name="shop-collect-o" class="shop-collect-o"></van-icon>
        <span class="span-title">附近商家</span>
      </div>
      <div class="shop-main" v-for="info in shopList" :key="info.id" @click="goShop(info.id)">
        <van-image class="shop-img" :src="'http://elm.cangdu.org/img/'+ info.image_path"></van-image>
        <div class="title-right">
          <h4>{{info.name}}</h4>
          <ul class="shop_detail_ul">
            <li class="supports" v-for="item in info.supports">{{item.icon_name}}</li>
          </ul>
          <section class="sale-main">
            <van-rate v-model="info.rating" size="8" allow-half class="rate"></van-rate>
            <span class="rate-text">{{info.rating}}</span>
            <span class="sale">月销售{{info.recent_order_num}}单</span>
            <div class="right-send">
              <button class="fn-send">蜂鸟专送</button>
              <button class="fn-zsd">准时达</button>
            </div>
            <div class="fee_distance">
              <p class="fee">
                ¥{{info.float_minimum_order_amount}}起送
                <span class="segmentation">/</span>
                {{info.piecewise_agent_fee.tips}}
              </p>
              <p class="distance_time">
                <span>{{info.distance}}</span>
                <span class="segmentation">/</span>
                <span class="order_time">{{info.order_lead_time}}</span>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {mapMutations, mapState} from "vuex";

  export default {
    name: 'msite',
    created() {
      // 更改底部tabBar索引
      this.changeTabActive(0);
      // 获取定位
      let gpsHash = this.$route.query.gpsHash;
      this.gpsHash = gpsHash;

      Vue.axios.get(`v2/pois/${gpsHash}`).then(res => {
        let data = res.data;
        this.infoList = data;
        // 获取附近商店
        Vue.axios.get(`shopping/restaurants?latitude=${data.latitude}&longitude=${data.longitude}`)
          .then(res => {
            this.shopList = res.data;
          })
      });
      // 调取食品分类
      Vue.axios.get('v2/index_entry').then(res => {
        let cList = res.data;
        // 处理数组
        let newArr = [];
        newArr.push(cList.slice(0, cList.length / 2));
        newArr.push(cList.slice(cList.length / 2));
        this.cateList = newArr;
      });
    },
    data() {
      return {
        infoList: {name: ''},
        cateList: [],
        shopList: [],
        gpsHash: null
      }
    },
    methods: {
      ...mapMutations(['changeTabActive', 'changeUserLocation']),
      login() {
        this.$router.push({path: '/login'});
      },
      register() {
        this.$router.push({path: '/register'});
      },
      toSearch() {
        this.$router.push({path: 'searchGood'});
      },
      goShop(id) {
        this.$router.push({path: `shopDetail?geohash=${this.gpsHash}&id=${id}`});
      },
      goFood(title) {
        this.$router.push({path: `food?geohash=${this.gpsHash}&title=${title}`});
      },
    },
    computed: {
      ...mapState(['userLocation']),
    },
    filters: {
      omitEd(value) {
        if (value.length > 9) {
          return value.replace(value.substr(9), '...');
        } else {
          return value;
        }
      },
      joinPath(value) {
        return 'https://fuss10.elemecdn.com' + value;
      }
    }
  };
</script>
<style scoped lang="less">
  @import "_msite";
</style>
