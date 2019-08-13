<template>
  <div class="elmNavigation">
    <!--      导航-->
    <van-nav-bar title="" left-text="ele.me">
      <span slot="right" class="right-text login" @click="login">登录</span>
      <span slot="right" class="right-text">|</span>
      <span slot="right" class="right-text register" @click="register">注册</span>
    </van-nav-bar>

    <!--      shop-->
    <div class="container">
      <div class="local">
        <span class="md-body-1">当前定位城市：</span>
        <span class="md-caption">定位不准时，请在城市列表中选择</span>
      </div>
      <div class="localCity" @click="searchCity(guessCity.id)">
        <span class="guess-city">{{guessCity.name || '未定位'}}</span>
        <van-icon name="arrow" tag="span" class="arrow-icon"></van-icon>
      </div>
      <section class="hot_city_container">
        <p class="city-title">热门城市</p>
        <ul class="hot-cityList">
          <li v-for="city in hotCity" :key="city.id" @click="searchCity(city.id)">{{city.name}}</li>
          <div class="empty"></div>
        </ul>
      </section>

      <section class="group_city_container" v-for="(group, index) in sortGroupCity" :key="index">
        <p class="city-title">{{index}}</p>
        <ul class="group-cityList">
          <li v-for="city in group" :key="city.id" @click="searchCity(city.id)">{{city.name | omitEd}}</li>
          <div class="empty"></div>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
  import {cityGuess, hotCity, groupcity} from "../../service/getData";
  import {mapMutations, mapState} from "vuex";

  export default {
    name: "elmNavigation",
    created() {
      this.initData();
    },
    data() {
      return {
        guessCity: '北京', // 定位城市
        hotCity: [], // 热门城市
        groupCity: [] // 所有城市
      }
    },
    methods: {
      async initData() {
        // 获取首页默认地址
        this.guessCity = await cityGuess();
        let geoHash = this.guessCity.latitude + ',' + this.guessCity.longitude;
        this.changeUserLocation(geoHash);
        // 获取首页热门城市
        this.hotCity = await hotCity();
        // 获取首页所有城市
        this.groupCity = await groupcity();
      },
      login() {
        this.$router.push({path: '/login'});
      },
      register() {
        this.$router.push({path: '/register'});
      },
      searchCity(cityId) {
        this.$router.push({name: 'searchCity', params: {cities: cityId}});
      },
      ...mapMutations(['changeUserLocation']),
    },
    computed: {
      ...mapState(['userLocation']),
      // 排序
      sortGroupCity() {
        const ordered = {};
        Object.keys(this.groupCity).sort().forEach((key) => ordered[key] = this.groupCity[key]);
        return ordered;
      }
    },
    filters: {
      omitEd(value) {
        if (value.length > 5) {
          return value.replace(value.substr(5), '...');
        } else {
          return value;
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .elmNavigation {
    background: #f5f5f5;

    .van-nav-bar {
      color: #fff;
      background: #3190e8;

      .van-nav-bar__text {
        color: #fff;
        font-size: 0.164rem;
      }

      .van-nav-bar__right {
        .right-text {
          font-size: 0.152rem;
          font-weight: 300;
        }

        .login {
          padding-right: 0.05rem;
        }

        .register {
          padding-left: 0.05rem;
        }
      }
    }

    .container {
      margin-top: 0.0457rem;

      .local {
        padding: 0.18rem 0 0.05rem;
        display: flex;
        justify-content: space-between;
        align-content: center;
        background: #ffffff;

        .md-body-1 {
          font-size: 0.13rem;
          color: #666;
          padding-left: 0.14rem;
        }

        .md-caption {
          color: #9f9f9f;
          font-size: 0.12rem;
          padding-right: 0.14rem;
        }
      }

      .localCity {
        height: 0.42rem;
        background: #ffffff;
        border-top: 0.005rem solid #e4e4e4;
        border-bottom: 0.005rem solid #e4e4e4;
        line-height: 0.42rem;
        font-size: 0.17rem;
        display: flex;
        justify-content: space-between;
        color: #3190e8;

        .guess-city {
          padding-left: 0.15rem;
        }

        .arrow-icon {
          padding-top: 0.12rem;
          padding-right: 0.15rem;
          color: #999;
        }
      }

      .hot_city_container {
        .hot-cityList {
          border: none;
          box-sizing: border-box;
          padding: 0;
          margin: 0;
          color: #3190e8;
          font-size: 0.14rem;
          background: #ffffff;

          li {
            float: left;
            width: 24.87%;
            border-right: .005rem solid #e4e4e4;
            border-bottom: .005rem solid #e4e4e4;
            text-align: center;
            line-height: 0.41rem;
            background: #ffffff;
          }
        }
      }

      .group_city_container {
        .group-cityList {
          list-style: none;
          box-sizing: border-box;
          padding: 0;
          margin: 0;
          color: #666666;
          font-size: 0.14rem;
          background: #ffffff;

          li {
            float: left;
            width: 24.87%;
            border-right: .005rem solid #e4e4e4;
            border-bottom: .005rem solid #e4e4e4;
            text-align: center;
            line-height: 0.41rem;
            background: #ffffff;
          }
        }
      }

      .city-title {
        margin: 0.1rem 0 0;
        padding-left: 0.05rem;
        color: #666;
        font-size: 0.12rem;
        font-weight: 400;
        line-height: 0.36rem;
        text-indent: .1rem;
        border-top: 0.01rem solid #e4e4e4;
        border-bottom: 0.005rem solid #e4e4e4;
        background: #ffffff;
      }

      .empty {
        clear: both;
      }
    }
  }
</style>
