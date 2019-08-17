<template>
  <div class="shopDetail">
    <div class="banner clearfix" v-if="shop">
      <div class="back" @click="onClickLeft">
        <i class="iconfont arrow-back">&#xe6f1;</i>
      </div>
      <div class="ban-shopImg">
        <img :src="'https://elm.cangdu.org/img/' + shop.image_path" alt="">
      </div>
      <div class="right-ban-shop">
        <h2 class="title">{{shop.name || null}}</h2>
        <p class="service">{{shop.delivery_mode.text}}／分钟送达／{{shop.piecewise_agent_fee.tips}}</p>
        <p class="desc">公告：{{shop.promotion_info}}</p>
        <i class="iconfont arrow-right" @click="goShopDesc">&#xe6f2;</i>
      </div>
      <div class="foot-ban" v-if="shop.activities[0]">
        <p class="notice">
          <span>
            <i class="iconfont cut-sale">&#xe6f5;</i>
            &nbsp;&nbsp;{{shop.activities[0].description}}
          </span>
          <span class="sales">{{totalSale > 0 ? totalSale + '个活动': null}}</span>
        </p>
        <i class="iconfont arrow-right">&#xe6f2;</i>
      </div>
      <!--      顶部tab-bar-->
      <van-tabs v-model="active" animated color="#3190e8" line-width="34px" title-active-color="#3190e8">
        <van-tab title="商品"></van-tab>
        <van-tab title="评价"></van-tab>
      </van-tabs>
    </div>
    <div class="main">
      <template v-if="active === 0">
        <!--      左侧菜单-->
        <section id="wrapper_menu" class="menu_left">
          <ul>
            <li class="menu_left_li"
                v-if="searchGoods"
                v-for="(menu, index) in searchGoods"
                :key="menu.id"
                :class="{'activity_menu': index === currentIndex}"
                @click.stop="clickList(index)"
                ref="menuList">
              {{menu.name}}
            </li>
          </ul>
        </section>
        <!--        右侧菜单-->
        <section class="menu_right"
                 @scroll="_initBScroll"
                 v-if="searchGoods">
          <ul ref="itemList">
            <li v-for="(goods, index) in searchGoods"
                :key="goods.id"
                class="shops-li">
              <header class="menu_detail_header">
                <section class="menu_detail_header_left">
                  <strong class="menu_item_title">{{goods.name}}</strong>
                  <span class="menu_item_description">{{goods.description}}</span>
                </section>
                <!--                <span class="menu_detail_header_right"></span>-->
                <!--          <p class="description_tip">-->
                <!--            <span>热销榜</span>-->
                <!--          </p>-->
              </header>
              <ul>
                <li v-for="(list,index) in goods.foods"
                    :key="index"
                    v-if="!list.specfoods[0].sold_out"
                    class="menu_detail_list"
                    @click="goGoodInfo(list.image_path,list.description,list.month_sales,list.name,list.specfoods[0].price,list.rating,list.rating_count,list.satisfy_rate,goods.id)">
                  <div class="menu_detail_link clearfix">
                    <section class="menu_food_img">
                      <img :src="'http://elm.cangdu.org/img/' + list.image_path"
                           alt="">
                    </section>
                    <section class="menu_food_description">
                      <h3 class="food_description_head">{{list.name}}</h3>
                      <p class="food_description_content">{{list.description}}</p>
                      <p class="food_description_sale_rating">
                        <span>月售{{list.month_sales}}份</span>
                        <span>好评率{{list.satisfy_rate}}%</span>
                      </p>
                    </section>
                  </div>
                  <div class="menu_detail_footer">
                    <section class="food_price">
                      <span>￥</span>
                      <span>{{list.specfoods[0].price}}</span>
                    </section>
                    <section class="cart_button">
                      <i class="iconfont plus" v-if="list.isShowIcon" @click.stop="cutCart(list)">&#xe7ca;</i>
                      <span class="cart_num" v-if="list.isShowIcon">{{list.count !== 0 ? list.count: null}}</span>
                      <i class="iconfont plus" @click.stop="addCart(list)">&#xe609;</i>
                    </section>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </section>
      </template>
      <template v-if="active === 1">
        <section class="ratingContainer">
          <header class="rating_header clearfix" v-if="rating_list_scores">
            <section class="rating_header_left">
              <p>{{rating_list_scores.overall_score | fixRound(0)}}</p>
              <p>综合评价</p>
              <p>高于周边商家{{(100 * rating_list_scores.compare_rating) | fixRound(1)}}%</p>
            </section>
            <section class="rating_header_right">
              <p class="clearfix">
                <span>服务态度</span>
                <van-rate
                  v-model="rating1"
                  allow-half
                  void-icon="star"
                  size="1"
                  gutter="1"
                  void-color="#eee" class="rating_container"></van-rate>
                <span class="rating_num">{{rating_list_scores.service_score | fixRound(1)}}</span>
              </p>
              <p class="clearfix">
                <span>菜品评价</span>
                <van-rate
                  v-model="rating2"
                  allow-half
                  void-icon="star"
                  size="8"
                  void-color="#eee" class="rating_container"></van-rate>
                <span class="rating_num">{{rating_list_scores.food_score | fixRound(1)}}</span>
              </p>
              <p class="clearfix">
                <span>送达时间</span>
                <span class="delivery_time">{{rating_list_scores.deliver_time}}分钟</span>
              </p>
            </section>
          </header>
          <ul class="tag_list_ul clearfix">
            <li v-for="(tag, index) in tags" :key="tag._id"
                v-if="tags"
                @click="changeCate(index)"
                :class="{unsatisfied: tag.unsatisfied,tagActivity: isTagActivity === index}">
              {{tag.name}}({{tag.count}})
            </li>
          </ul>
          <ul class="rating_list_ul">
            <li class="rating_list_li clearfix"
                v-if="ratingList"
                v-for="item in ratingList" :key="item._id">
              <img :src="item.avatar | getImgPath('avatar')" class="user_avatar" alt="头像">
              <section class="rating_list_details">
                <header>
                  <section class="username_star">
                    <p class="username">{{item.username}}</p>
                    <p class="star_desc clearfix">
                      <van-rate
                        v-model="item.rating_star"
                        allow-half
                        void-icon="star"
                        size="1"
                        gutter="1"
                        void-color="#eee" class="rating_container"></van-rate>
                      <span class="time_spent_desc">{{item.time_spent_desc}}</span>
                    </p>
                  </section>
                  <time class="rated_at">{{item.rated_at}}</time>
                </header>
                <ul class="food_img_ul clearfix">
                  <li v-for="ratImg in item.item_ratings" :key="ratImg.food_id"><img
                    :src="ratImg.image_hash | getImgPath('food')" alt=""></li>
                </ul>
                <ul class="food_name_ul clearfix" v-if="item.item_ratings">
                  <li class="ellipsis" v-for="ratImg in item.item_ratings" :key="ratImg.food_id">
                    {{ratImg.food_name | omitEd}}
                  </li>
                </ul>
              </section>
            </li>
          </ul>
        </section>
      </template>
      <!--      底部结算框-->
      <bottom-bar v-if="active === 0" @clearShopCar="clearShopCarList"></bottom-bar>
    </div>
    <loading v-if="loading_show"></loading>
  </div>
</template>

<script>
  import {
    foodMenu,
    getRatingList,
    ratingScores,
    ratingTags,
    shopDetails
  } from "../../service/getData";

  import BottomBar from "../bottom-bar/bottom-bar";
  import {mapMutations, mapState} from 'vuex';
  import Loading from "../common/loading/loading";

  export default {
    name: 'shopDetail',
    components: {Loading, BottomBar},
    data() {
      return {
        loading_show: true,
        geohash: '', //geohash位置信息
        _shop_id: null, // 商店ID
        scrollY: 0, //右侧列表滑动的y轴坐标
        rightLiTops: [], //所有分类头部位置
        ratingList: [], // 评价
        isTagActivity: 0, // 评论分类默认第一个高亮
        shopInfo: '',
        foodMenuList: [], // 请求的商品基础数据
        active: 0, // 商品 还评价 显示
        rating1: 4,
        rating2: 5,
        rating_list_scores: {}, // 获取商铺评价分数
        tags: [], // 获取商铺评价分类
        shopCart: [], //购物车
      }
    },
    mounted() {
      this.initData();
    },
    watch: {
      searchGoods() {
        //监听数据
        this.$nextTick(() => {
          //左右两边滚动
          this._initBScroll();
          //右边列表高度
          this._initRightHeight()
        })
      }
    },
    methods: {
      async initData() {
        const request = this.$route.query;
        const shopId = request.id;
        this._shop_id = shopId;
        this.geohash = request.geohash;
        const geoHash = request.geohash.split(',');
        let latitude = geoHash[0]; // 维度
        let longitude = geoHash[1]; // 经度
        // 获取商店信息
        this.shopInfo = await shopDetails(shopId, latitude, longitude);
        this.changeShopInfo(this.shopInfo); // 商店信息添加到vuex
        // 获取shop页面菜单列表
        let localFood = this.shopCarMenuList;
        if (Object.keys(localFood).length < 1) { // 没有添加任何店铺
          this.foodMenuList = await foodMenu(shopId);
        } else if (localFood && (localFood[shopId] === undefined || localFood[shopId] === null)) {
          this.foodMenuList = await foodMenu(shopId);
          console.log(this.foodMenuList);
        } else {
          this.foodMenuList = this.shopCarMenuList[this._shop_id]; // 本店商品列表
        }


        // 初始化获取评论
        await this.getRatingComment(shopId, 0);
        // 获取商铺评价分数
        this.rating_list_scores = await ratingScores(shopId);
        console.log(this.rating_list_scores);
        // 获取商铺评价分类
        this.tags = await ratingTags(shopId);
        this.loading_show = false;
      },
      // 页面滚动
      _initBScroll() {
        let menu_right = document.querySelector('.menu_right');
        this.scrollY = menu_right.scrollTop;

      },

      //求出右边列表的高度
      _initRightHeight() {
        let itemArray = []; //定义一个伪数组
        let top = 0;
        itemArray.push(top);
        //获取右边所有li的礼
        let allList = this.$refs.itemList.getElementsByClassName('shops-li');
        //allList伪数组转化成真数组
        Array.prototype.slice.call(allList).forEach(li => {
          top += li.clientHeight; //获取所有li的每一个高度
          itemArray.push(top)
        });
        this.rightLiTops = itemArray;
      },
      //点击左边实现滚动
      clickList(index) {
        let menu_right = document.querySelector('.menu_right');
        this.timer = setInterval(() => {
          if (menu_right.scrollTop < this.rightLiTops[index]) {
            menu_right.scrollTop += 25;
            if (menu_right.scrollTop >= this.rightLiTops[index]) {
              clearInterval(this.timer);
            }
          } else {
            menu_right.scrollTop -= 25;
            if (menu_right.scrollTop <= this.rightLiTops[index]) {
              clearInterval(this.timer);
            }
          }
        }, 10);
      },
      //左右联调
      _initLeftScroll(index) {
        let menu = this.$refs.menuList;
        let el = menu[index];
      },
      onClickLeft() {
        this.$router.go(-1);
      },

      // 店家详情
      goShopDesc() {
        this.$router.push({path: '/shop/shopDesc'})
      },
      // 获取评论
      async getRatingComment(shopId, offset, tag_name = '') {
        this.ratingList = await getRatingList(shopId, offset, tag_name);
        console.log(this.ratingList);
      },
      // 跳转商品详情页
      goGoodInfo(image_path, description, month_sales, name, price, rating, rating_count, satisfy_rate, shopId) {
        this.$router.push({
          path: '/shop/goodInfo',
          query: {
            image_path,
            description,
            month_sales,
            name,
            price,
            rating,
            rating_count,
            satisfy_rate,
            shopId
          }
        });
      },
      // 更改高亮的分类评论
      changeCate(index) {
        this.isTagActivity = index;
      },
      // 添加购物车
      addCart(foods) {

        this.$set(foods, 'isShowIcon', true);
        if (foods.count) {
          foods.count++;
        } else {
          this.$set(foods, 'count', 1);
        }

        // 更改vuex购物车
        this.changeShopCarMenuList(this.foodMenuList);
      },
      // 减购物车
      cutCart(foods) {
        if (foods.count > 1) {
          foods.count--;
          this.$set(foods, 'isShowIcon', true);
        } else {
          this.$set(foods, 'isShowIcon', false);
          this.$delete(foods, 'count');
        }

        // 提交
        this.changeShopCarMenuList(this.foodMenuList);
      },
      // 清空购物车 拷贝的原始数据直接赋值给展示的数据 不用再请求
      async clearShopCarList() {
        this.foodMenuList = await foodMenu(this.shopInfo.id);
      },
      ...mapMutations(['changeShopInfo', 'changeShopCarMenuList']),
    },
    computed: {
      ...mapState([
        'shopCarMenuList',
        {shop_informationS: 'shopInfo'},
      ]),
      currentIndex() {
        const {scrollY, rightLiTops} = this;
        return rightLiTops.findIndex((tops, index) => {
          this._initLeftScroll(index);
          return scrollY >= tops && scrollY < rightLiTops[index + 1];
        });
      },
      shop: {
        get() {
          return this.shopInfo;
        }
      },
      totalSale: { // N个活动
        get() {
          return this.shopInfo.activities.length;
        }
      },
      searchGoods: {
        get() {
          return this.foodMenuList;
        }
      },
    },
    filters: {
      // 四舍五入
      fixRound(value, n) {
        return value.toFixed(n);
      },
      // 切割图片地址
      getImgPath(value, type) {
        let path = '';
        let baseImgUrl = '//fuss10.elemecdn.com/';
        if (value !== "") {
          path = baseImgUrl + value.slice(0, 1) + '/' + value.slice(1, 2) + '/' + value.slice(2) + '.jpeg';
        } else {
          if (type === 'avatar') {
            path = '//elm.cangdu.org/img/default.jpg';
          } else {
            path = '';
          }
        }
        return path;
      },
      // 文字省略
      omitEd(value) {
        if (value.length > 2) {
          return value.replace(value.substr(2), '...');
        } else {
          return value;
        }
      }
    }
  };
</script>
<style scoped lang="less">
  @import "_shopDetail";
</style>
