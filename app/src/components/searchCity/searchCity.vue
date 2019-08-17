<template>
  <div class="searchCity">
    <!--      导航-->
    <van-nav-bar :title="cityName" left-arrow color="#fff" @click-left="goBack">
      <span slot="right" class="right-text tab" @click="tabCity">切换城市</span>
    </van-nav-bar>
    <div class="searchContainer">
      <section class="searchInput">
        <input type="text" placeholder="输入学校、商务楼、地址" class="sInput" v-model="keyword" @keyup.enter="getSearchAddress">
        <van-button type="primary" size="large" @click="getSearchAddress">提交</van-button>
      </section>

      <p class="sHistory" v-if="isTouchSearch">搜索历史</p>
      <div class="isShowHistory">
        <div class="history" v-for="(item, index) in cityList" :key="index" @click="getPoints(item.geohash)">
          <h4 class="address-tittle">{{item.name}}</h4>
          <p class="address-desc">{{item.address}}</p>
        </div>
      </div>
      <div class="clearAll" v-if="isAllDeleteShow" @click="flushLocalStorage">
        <p>清空所有</p>
      </div>
    </div>
  </div>
</template>

<script>

  import Vue from 'vue';
  import {getStore, setStore} from "../../utils/mUtils";
  import {mapMutations, mapState} from "vuex";
  import {searchplace} from "../../service/getData";

  export default {
    name: 'searchCity',
    data() {
      return {
        cName: null, // 城市标题
        keyword: null, // 查询的关键字
        city_id: null, // 城市id
        cityList: [], // 信息列表
        isTouchSearch: true, // 搜索历史是否显示
        isAllDeleteShow: true //清空所有是否显示
      }
    },
    computed: {
      cityName: {
        get() {
          return this.cName;
        }
      },
      ...mapState(['placeHistory']),
    },
    created() {
      // 显示所选该城市信息
      this.city_id = this.$route.params.cities;
      this.cName = this.$route.params.cName;

      // 调取历史记录
      this.getHistory();
    },
    methods: {
      ...mapMutations(['changePlaceHistory']),
      goBack() {
        this.$router.go(-1);
      },
      // 搜索地址
      async getSearchAddress() {
        if (!this.keyword) {
          alert('请填写地址');
          return false;
        }
        this.isTouchSearch = false; // 搜索历史文字是否显示
        this.isAllDeleteShow = false; // 清空所有是否显示
        // let getSearchAdd = (await Vue.axios.get('/v1/pois', {
        //   params: {
        //     city_id: this.city_id,
        //     keyword: this.keyword
        //   }
        // })).data;
        let getSearchAdd = await searchplace(this.city_id, this.keyword);
        if (getSearchAdd) {
          this.cityList = getSearchAdd;
          this.changePlaceHistory(getSearchAdd);
        } else {
          this.cityList = this.placeHistory;
        }
      },
      // 获取历史记录
      getHistory() {
        if (this.placeHistory.length > 0) {
          this.isAllDeleteShow = true;
          this.cityList = this.placeHistory;
        } else {
          this.isAllDeleteShow = false;
        }
      },
      tabCity() {
        this.$router.push({path: '/home'});
      },
      // 清空 cityListHistory 本地数据
      flushLocalStorage() {
        this.changePlaceHistory([]);
        this.isAllDeleteShow = false; // 清空所有按钮隐藏
        this.cityList = null; // 清空历史数据
      },
      // 根据经纬度详细定位
      getPoints(gpsHash) {
        this.$router.push({path: '/shop/msite', query: {gpsHash: gpsHash}});
      },
    },
  };
</script>
<style scoped lang="less">
  @import './_searchCity.less';
</style>
