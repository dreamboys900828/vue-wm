<template>
  <div class="searchGood">
    <!--导航-->
    <div class="header">
      <van-nav-bar title="搜索" @click-left="goBack">
        <van-icon name="arrow-left" slot="left" class="back"></van-icon>
      </van-nav-bar>
    </div>
    <div class="main">
      <div class="inputContainer">
        <input type="text" class="inputSearch" v-model="keyword" placeholder="请输入商家或美食名称"
               @keyup.enter="searchRestaurant">
        <button class="send" @click="searchRestaurant">提交</button>
      </div>
    </div>
    <div class="result">
      <h1 class="no-result" v-if="isShowNoRes">很抱歉！无搜索结果</h1>
      <section class="search_history">
        <h4 class="title_restaurant" v-if="history_show && searchHistory.length > 0">搜索历史</h4>
        <h4 class="title_restaurant" v-if="shop_list.length > 0">商家</h4>
        <ul v-if="history_show" class="history_ul">
          <li class="history_list" v-for="(item, index) in searchHistory">
            <span class="history_text" v-if="item" @click="chooseKeyWord(item)">{{item}}</span>
            <i class="iconfont" @click="deleteHistory(index)">&#xe62f;</i>
          </li>
        </ul>
        <footer v-if="history_show && searchHistory.length > 0" class="clear_history" @click="flushHistory">
          清空搜索历史
        </footer>
        <ul v-if="shop_list && !history_show" class="list_container">
          <li class="list_li clearfix" v-for="(item, index) in shop_list" @click="goToShop(item.id)">
            <section class="item_left">
              <img src="//elm.cangdu.org/img/16c6a258e1750484.jpg" alt="">
            </section>
            <section class="item_right">
              <div class="item_right_text">
                <p>
                  <span>{{item.name}}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="24" height="14" class="pay_icon">
                    <polygon points="0,14 4,0 24,0 20,14" style="fill:none;stroke:#FF6000;stroke-width:1"></polygon>
                    <line x1="1.5" y1="12" x2="20" y2="12" style="stroke:#FF6000;stroke-width:1.5"></line>
                    <text x="3.5" y="9" style="fill:#FF6000;font-size:0.09rem;font-weight:bold;">支付</text>
                  </svg>
                </p>
                <p>月售 {{item.month_sales||item.recent_order_num}} 单</p>
                <p>{{item.delivery_fee||item.float_minimum_order_amount}} 元起送 / 距离{{item.distance}}</p>
              </div>
            </section>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
  import {mapMutations, mapState} from "vuex";
  import {searchRestaurant} from "../../service/getData";

  export default {
    name: 'searchGood',
    data() {
      return {
        keyword: '',
        history_show: true, // 搜索历史显示
        isShowNoRes: false, // 是否显示无搜索结果文字
        shop_list: [],
      }
    },
    created() {
      this.history_show = true;
      this.changeTabActive(1);
    },
    watch: {
      keyword() {
        if (this.keyword.length === 0) {
          this.history_show = true;
          this.shop_list = [];
        }
      }
    },
    methods: {
      ...mapMutations(['changeTabActive', 'changeSearchHistory']),
      goToShop(id) {
        this.$router.push({path: `/shop/shopDetail?geohash=${this.userLocation}&id=${id}`});
      },
      chooseKeyWord(item) {
        this.keyword = item;
        this.searchRestaurant();
      },
      goBack() {
        this.$router.go(-1);
      },
      // 搜索餐馆
      async searchRestaurant() {
        this.history_show = false; // 关掉搜索历史
        let isHas = this.searchHistory.some(value => value === this.keyword);

        if (!isHas) {
          this.searchHistory.push(this.keyword);
        }
        this.changeSearchHistory(this.searchHistory);
        let search = await searchRestaurant(this.userLocation, this.keyword);
        if (search.length < 1) {
          this.isShowNoRes = true;
          this.history_show = true; // 显示搜索历史
        } else {
          this.isShowNoRes = false;
          this.history_show = false;
          this.shop_list = search;
        }
      },
      deleteHistory(index) {
        this.searchHistory.splice(index, 1);
        this.changeSearchHistory(this.searchHistory);
      },
      flushHistory() {
        this.shop_list = [];
        this.changeSearchHistory([]);
      }
    },
    computed: {
      ...mapState(['userLocation', 'searchHistory'])
    }
  };
</script>
<style scoped lang="less">
  @import "_searchGood";
</style>
