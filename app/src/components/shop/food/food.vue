<template>
  <div class="food">
    <div class="header">
      <bar :title="cateTitle"></bar>
      <div class="sort_container">
        <div class="sort_item" @click="selectBy('category')">{{cateTitle?cateTitle:'分类'}}<i class="iconfont sj">&#xe606;</i></div>
        <div class="sort_item" @click="selectBy('sort')">排序<i class="iconfont sj">&#xe606;</i></div>
        <div class="sort_item" @click="selectBy('filters')">筛选<i class="iconfont sj">&#xe606;</i></div>
      </div>
    </div>

    <div class="category_container" v-if="isTouchBar">
      <!--    分类-->
      <transition name="cate" mode="in-out" appear>
        <div class="category" v-show="sortBy === 'category'">
          <transition name="showlist">
            <section>
              <div class="category_left">
                <ul>
                  <li class="category_left_li" v-for="(cate, index) in cateList"
                      :key="cate.id" @click="cacheCateSub(index)" :class="{'active': touchIndex===index}">
                    <section class="flex-left">
                      <img :src="pictures[index]" alt="" v-if="index !== 0">
                      <span class="food-cate">{{cate.name}}</span>
                    </section>
                    <section class="flex-right">
                      <span class="total">{{cate.count || 0}}</span>
                      <i class="iconfont arrow-right">&#xe61a;</i>
                    </section>
                  </li>
                </ul>
              </div>
              <div class="category_right">
                <ul>
                  <li class="category_right_li" v-for="(sub, subIndex) in nowCateSub" :key="sub.id"
                      v-if="subIndex !== 0"
                      @click="getTitleName(sub.name, sub.id)"
                      :class="{'son-active': touchSonIndex===sub.id}"
                  >
                    <span>{{sub.name}}</span>
                    <span>{{sub.count}}</span>
                  </li>
                </ul>
              </div>
            </section>
          </transition>
        </div>
      </transition>
      <!--      排序-->
      <transition name="sort" mode="out-in" appear>
        <div class="sort" v-show="sortBy === 'sort'">
          <transition name="showlist">
            <section class="sort_detail_type">
              <ul class="sort_list_container">
                <li class="sort_list_li" @click="selectSort(4)">
                  <i class="iconfont left-icon smart">&#xe60d;</i>
                  <span :class="{sort_select: sortByType === 4}" class="clearfix">
                  智能排序
                  <i class="iconfont good" v-if="sortByType === 4">&#xe603;</i>
                </span>
                </li>
                <li class="sort_list_li" @click="selectSort(5)">
                  <i class="iconfont left-icon lo-lang">&#xe6f6;</i>
                  <span :class="{sort_select: sortByType === 5}">
                  距离最近
                  <i class="iconfont good" v-if="sortByType === 5">&#xe603;</i>
                </span>
                </li>
                <li class="sort_list_li" @click="selectSort(6)">
                  <i class="iconfont left-icon fire">&#xe601;</i>
                  <span :class="{sort_select: sortByType === 6}">
                  销量最高
                  <i class="iconfont good" v-if="sortByType === 6">&#xe603;</i>
                </span>
                </li>
                <li class="sort_list_li" @click="selectSort(1)">
                  <i class="iconfont left-icon money">&#xe607;</i>
                  <span :class="{sort_select: sortByType === 1}">
                  起送价最低
                  <i class="iconfont good" v-if="sortByType === 1">&#xe603;</i>
                </span>
                </li>
                <li class="sort_list_li" @click="selectSort(2)">
                  <i class="iconfont left-icon time">&#xe665;</i>
                  <span :class="{sort_select: sortByType === 2}">
                  配送速度最快
                  <i class="iconfont good" v-if="sortByType === 2">&#xe603;</i>
                </span>
                </li>
                <li class="sort_list_li" @click="selectSort(3)">
                  <i class="iconfont left-icon star">&#xe684;</i>
                  <span :class="{sort_select: sortByType === 3}">
                  评分最高
                  <i class="iconfont good" v-if="sortByType === 3">&#xe603;</i>
                </span>
                </li>
              </ul>
            </section>
          </transition>
        </div>
      </transition>
      <!--      筛选-->
      <transition name="filter" mode="out-in" appear>
        <div class="filters" v-show="sortBy === 'filters'">
          <section>
            <header class="filter_header_style">
              配送方式
            </header>
            <ul class="filter_ul pei-song">
              <li class="filter_li" v-for="fun in Delivery" :key="fun.id" @click="delivery(fun.id)">
                <i class="iconfont sel-good" v-if="sortRulers.delivery_mode.length > 0">&#xe603;</i>
                <i class="iconfont fng-nio" v-else>&#xe605;</i>
                <span>{{fun.text}}</span>
              </li>
            </ul>
          </section>
          <section>
            <header class="filter_header_style">
              商家属性（可以多选）
            </header>
            <ul class="filter_ul shop-attr clearfix">
              <li class="filter_li" v-for="act in getSupports" :key="act.id" @click="support(act.id)">

                <template v-if="act.icon_name === '品'">
                  <template v-if="act.selectEd">
                    <i class="iconfont sel-good">&#xe603;</i>
                  </template>
                  <template v-else>
                    <i class="iconfont" :style="{color: '#' + act.icon_color}">&#xe664;</i>
                  </template>
                </template>

                <template v-if="act.icon_name === '保'">
                  <template v-if="act.selectEd">
                    <i class="iconfont sel-good">&#xe603;</i>
                  </template>
                  <template v-else>
                    <i class="iconfont" :style="{color: '#' + act.icon_color}">&#xe695;</i>
                  </template>
                </template>

                <template v-if="act.icon_name === '准'">
                  <template v-if="act.selectEd">
                    <i class="iconfont sel-good">&#xe603;</i>
                  </template>
                  <template v-else>
                    <i class="iconfont" :style="{color: '#' + act.icon_color}">&#xe7c9;</i>
                  </template>
                </template>

                <template v-if="act.icon_name === '新'">
                  <template v-if="act.selectEd">
                    <i class="iconfont sel-good">&#xe603;</i>
                  </template>
                  <template v-else>
                    <i class="iconfont" :style="{color: '#' + act.icon_color}">&#xe6f7;</i>
                  </template>
                </template>

                <template v-if="act.icon_name === '付'">
                  <template v-if="act.selectEd">
                    <i class="iconfont sel-good">&#xe603;</i>
                  </template>
                  <template v-else>
                    <i class="iconfont" :style="{color: '#' + act.icon_color}">&#xe608;</i>
                  </template>
                </template>

                <template v-if="act.icon_name === '票'">
                  <template v-if="act.selectEd">
                    <i class="iconfont sel-good">&#xe603;</i>
                  </template>
                  <template v-else>
                    <i class="iconfont" :style="{color: '#' + act.icon_color}">&#xe7c5;</i>
                  </template>
                </template>

                <span>{{act.name}}</span>
              </li>
            </ul>
          </section>
          <footer class="confirm_filter">
            <button class="clear_all filter_button_style" @click="clearAll">清空</button>
            <button class="confirm_select filter_button_style" @click="submitRulers">确定</button>
          </footer>
        </div>
      </transition>
    </div>
    <!--  商品列表-->
    <div class="main" @scroll="touchOnscroll">
      <div class="shop-main clearfix" v-for="shop in shopList" :key="shop.id" @click="goShop(shop.id)">
        <van-image class="shop-img" :src="'http://elm.cangdu.org/img/' + shop.image_path"></van-image>
        <div class="title-right">
          <section class="right-top clearfix">
            <h4>{{shop.name | omitEd}}</h4>
            <ul class="shop_detail_ul">
              <li class="supports">保</li>
              <li class="supports">准</li>
              <li class="supports">稳</li>
            </ul>
          </section>
          <section class="sale-main">
            <van-rate v-model="shop.rating" size="8" allow-half class="rate"></van-rate>
            <span class="rate-text">{{shop.rating}}</span>
            <span class="sale">月销售{{shop.recent_order_num}}单</span>
            <div class="right-send">
              <button class="fn-send">蜂鸟专送</button>
              <button class="fn-zsd">准时达</button>
            </div>
            <div class="fee_distance">
              <p class="fee">
                ¥{{shop.float_minimum_order_amount}}起送
                <span class="segmentation">/</span>
                {{shop.piecewise_agent_fee.tips}}元
              </p>
              <p class="distance_time">
                <span>{{shop.distance}}</span>
                <span class="segmentation">/</span>
                <span class="order_time">{{shop.order_lead_time}}</span>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
    <transition name="loading">
    <loading v-if="showLoading"></loading>
    </transition>
  </div>
</template>

<script>
  import hba from '../../../assets/img/hb.png';
  import yx from '../../../assets/img/yx.png';
  import cs from '../../../assets/img/cs.png';
  import hb from '../../../assets/img/hb.png';
  import sc from '../../../assets/img/sc.png';
  import sj from '../../../assets/img/sj.jpg';
  import tp from '../../../assets/img/tp.png';
  import tsc from '../../../assets/img/tsc.jpeg';
  import xh from '../../../assets/img/xh.png';

  import Vue from 'vue';
  import Bar from "../../bar/bar";

  import {
    foodCategory,
    foodDelivery,
    foodActivity,
    shopLists
  } from "../../../service/getData";
  import Loading from "../../common/loading/loading";

  export default {
    name: 'food',
    data() {
      return {
        showLoading: true, //显示加载动画
        title: null,
        geoHash: null,
        touchIndex: 0, // 存取的是点击的index
        touchSonIndex: 0, // 点击的子集菜单
        icon: [hba, yx, cs, hb, sc, sj, tp, tsc, xh],
        cateList: [], // 分类列表
        noErrorNowCateSub: [], // 二级列表
        shopList: [], // 商铺列表
        Delivery: [], // 配送方式
        Activity: [], // 商家属性
        sortByType: 4, // 排序的选择
        sortBy: 'category', // 分类|排序|筛选 的选择
        isTouchBar: false,
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
      async initData() {
        //获取从msite页面传递过来的参数
        const request = this.$route.query;
        const title = request.title;
        const geoHash = request.geohash;
        let local = geoHash.split(',');
        this.sortRulers.latitude = local[0]; // 维度
        this.sortRulers.longitude = local[1]; // 经度
        this.title = title;
        this.geoHash = geoHash;

        //获取category分类左侧数据
        this.cateList = await foodCategory(this.latitude, this.longitude);

        //获取筛选列表的配送方式
        this.Delivery = await foodDelivery(this.latitude, this.longitude);

        //获取筛选列表的商铺活动
        this.Activity = await foodActivity(this.latitude, this.longitude);

        // 商铺的数据
        this.submitRulers();
        this.showLoading = false;
      },
      cacheCateSub: function (index) { // 获取二级列表
        this.touchIndex = index;
        this.noErrorNowCateSub = this.cateList[this.touchIndex].sub_categories;
      },
      async getTitleName(titleName, rid) { // 获取标题名
        this.title = titleName;
        this.isTouchBar = false;
        this.sortRulers.offset = 0;
        this.sortRulers.restaurant_category_ids = [rid];
        // TODO 请求点击的分类商铺
        this.shopList = await shopLists(this.sortRulers);
        this.touchSonIndex = rid;
      },
      //点击分类 排序等 是否显示子集菜单
      selectBy(params) {
        if (this.sortBy === params) {
          this.isTouchBar = !this.isTouchBar;
        } else {
          this.isTouchBar = true;
        }
        this.sortBy = params;
      },
      async selectSort(ind) { // 选择排序方式
        this.sortByType = ind;
        this.sortRulers.order_by = ind;
        this.isTouchBar = false;
        // TODO 发起排序的请求
        this.shopList = await shopLists(this.sortRulers);

      },
      goShop(id) {
        this.$router.push({path: `/shop/shopDetail?geohash=${this.geoHash}&id=${id}`});
      },
      // 配送方式
      delivery(did) {
        let isHas = this.sortRulers.delivery_mode.some(v => v === did);
        if (!isHas) {
          this.sortRulers.delivery_mode.push(did);
        } else {
          let index = this.sortRulers.delivery_mode.findIndex(v => v === did);
          this.sortRulers.delivery_mode.splice(index, 1);
        }
      },
      // 点击商家属性
      support(sid) {
        let isHas = this.sortRulers.support_ids.some(v => v === sid);
        if (!isHas) {
          this.sortRulers.support_ids.push(sid);
        } else {
          let index = this.sortRulers.support_ids.findIndex(v => v === sid);
          this.sortRulers.support_ids.splice(index, 1);
        }
      },
      // 清空所有筛选选项
      clearAll() {
        this.sortRulers.delivery_mode = [];
        this.sortRulers.support_ids = [];
      },
      // 提交选项
      async submitRulers() {
        this.shopList = await shopLists(this.sortRulers);
        this.isTouchBar = false;
      },
      // 懒加载
      async touchOnscroll() {
        // 求出main的scrolltop 以及 shop_main的高度 差值 总高度-main高度 scrollTop

        // main的高度
        let main = document.querySelector('.main');
        let main_height = main.offsetHeight - parseInt(window.getComputedStyle(main).paddingTop);

        // li总高度
        let shop_main = [...document.querySelectorAll('.shop-main')];
        let shop_main_height = 0;
        shop_main.forEach(li => {
          shop_main_height += li.clientHeight;
        });

        // 移出main的高度
        let scroll_top = main.scrollTop;

        // 求出单个shop-main的高度
        // let s_main_height = [...document.querySelectorAll('.shop-main')][0].clientHeight;

        let diff_height = shop_main_height - main_height - scroll_top;
        if (diff_height < 10) {
          // TODO 每次+20 this.sortRulers.offset+20 顺便加载动画
          // 显示动画
          this.showLoading = true;
          this.sortRulers.offset += 20;
          let response = await shopLists(this.sortRulers);
          this.shopList = [...this.shopList,...response];
          this.showLoading = false;
        }
      },
    },
    computed: {
      // 二级分类
      nowCateSub: {
        get() {
          return this.noErrorNowCateSub;
        }
      },
      // 标题
      cateTitle: {
        get() {
          return this.title;
        }
      },
      // 商家属性
      getSupports: {
        get() {
          this.Activity.map(value => value.selectEd = this.sortRulers.support_ids.includes(value.id));
          return this.Activity;
        }
      },
      // 获取图片路径
      pictures: {
        get() {
          let arr = [];
          this.cateList.forEach((value, index) => {
            switch (value.name) {
              // case '异国料理':
              //   arr[index] = null;
              //   break;
              case '快餐便当':
                arr[index] = hba;
                break;
              case '小吃夜宵':
                arr[index] = yx;
                break;
              case '果蔬生鲜':
                arr[index] = sc;
                break;
              case '特色菜系':
                arr[index] = tsc;
                break;
              case '商店超市':
                arr[index] = sc;
                break;
              case '鲜花蛋糕':
                arr[index] = xh;
                break;
              case '全部商家':
                arr[index] = sj;
                break;
              case '甜品饮品':
                arr[index] = tp;
                break;
            }
          });

          return arr;
        }
      }
    },
    components: {Loading, Bar},
    filters: {
      omitEd(value) {
        if (value.length > 8) {
          return value.replace(value.substr(8), '...');
        } else {
          return value;
        }
      }
    }
  };
</script>
<style scoped lang="less">
  @import "_food";
</style>
