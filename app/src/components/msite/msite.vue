<template>
  <div class="msite">
<!--    <div class="header">-->
<!--      <bar :title="infoList.name | omitEd"></bar>-->
<!--    </div>-->
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
    <loading v-if="loading_show"></loading>
  </div>
</template>

<script>
  import {mapMutations, mapState} from "vuex";
  import {msiteAddress, msiteFoodTypes, shopLists} from "../../service/getData";
  import Loading from "../common/loading/loading";
  import Bar from "../bar/bar";

  export default {
    name: 'msite',
    components: {Bar, Loading},
    data() {
      return {
        loading_show: true, // 动画
        infoList: {name: ''},
        cateList: [],
        shopList: [],
        gpsHash: null,
        sortRulers: {
          latitude: null, // 纬度 Y string <<< 必选
          longitude: null, // 经度 Y string <<< 必选
          offset: 0, // 跳过多少条数据，默认0 N int 记录每次用户的发请求起始位置 每次加载20个 起始位置为0 每次+20
          limit: 20, // 请求数据的数量，默认20 N int
          restaurant_category_id: null, // 餐馆分类id N int 进来shop页面的值
          restaurant_category_ids: [], // 餐馆分类id N array 在shop页面请求的时候的值
          order_by: 4, // 排序方式id： 1：起送价、2：配送速度、3:评分、4: 智能排序(默认)、5:距离最近、6:销量最高  N int
          delivery_mode: [], // 配送方式id N array
          support_ids: [], // 餐馆支持特权的id 品牌商家 准时达等 商家属性
        }
      }
    },
    mounted() {
      this.initData();
    },
    methods: {
      ...mapMutations(['changeTabActive', 'changeUserLocation']),
      async initData() {
        // 更改底部tabBar索引
        this.changeTabActive(0);
        // 获取定位
        let geoHash = this.$route.query.gpsHash;
        let local = geoHash.split(',');
        this.sortRulers.latitude = local[0]; // 维度
        this.sortRulers.longitude = local[1]; // 经度

        // 获取附近信息
        this.infoList = await msiteAddress(geoHash);

        // 获取附近商店
        let shop_list = await shopLists(this.sortRulers);
        if (shop_list.length > 0) {
          this.shopList = shop_list;
        } else {
          alert('附近没有商店~');
        }

        // 调取食品分类
        let cList = await msiteFoodTypes(geoHash);
        if (cList.length > 0) {
          let newArr = [];
          newArr.push(cList.slice(0, cList.length / 2));
          newArr.push(cList.slice(cList.length / 2));
          this.cateList = newArr;
        } else {
          alert('分类没有数据~');
        }
        this.loading_show = false;
      },
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
        this.$router.push({path: `shopDetail?geohash=${this.userLocation}&id=${id}`});
      },
      goFood(title) {
        this.$router.push({path: `food?geohash=${this.userLocation}&title=${title}`});
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
