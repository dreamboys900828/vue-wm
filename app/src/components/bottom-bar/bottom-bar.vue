<template>
  <div class="bottom-bar">
    <div class="cross" v-if="bottom_show" @click="bottom_show=!bottom_show"></div>
    <transition name="slowAlert" mode="out-in" appear>
      <section class="shopBox" v-if="bottom_show">
        <header>
          <h4>购物车</h4>
          <div @click="clearCart">
            <i class="iconfont">&#xe62f;</i>
            <span>清空</span>
          </div>
        </header>
        <section class="cart_food_details">
          <ul>
            <li class="cart_food_li" v-if="getShopCarMenuList" v-for="(item, index) in getShopCarMenuList" :key="index">
              <div class="cart_list_num" v-if="item.specfoods">
                <p class="ellipsis">{{item.specfoods[0].name}}</p>
                <p class="ellipsis"
                   v-if="item.specfoods[0].specs"
                   v-for="spec in item.specfoods[0].specs">{{spec.value}}</p>
              </div>
              <div class="cart_list_price">
                <span>￥</span>
                <span>{{item.specfoods[0].price}}</span>
              </div>
              <div class="cart_list_control">
                <i class="iconfont cut" @click="cutShopCart(item.specfoods[0].food_id)">&#xe7ca;</i>
                <span>{{item.count}}</span>
                <i class="iconfont plus" @click="addShopCart(item.specfoods[0].food_id)">&#xe609;</i>
              </div>
            </li>
          </ul>
        </section>
      </section>
    </transition>

    <div class="contain">
      <div class="cart_icon_container" @click="showBox">
        <div class="little-circle" :class="{'little-circle-disabled': getShopTotalPrice.diff_money >= 0}">
          <i class="iconfont shop-car">&#xe611;</i>
          <i class="total_select_count">{{getShopTotalPrice.totalCount}}</i>
        </div>
      </div>
      <div class="cart_num">
        <span class="total-money">¥ {{getShopTotalPrice.totalPrice}}</span>
        <span class="drive-money">配送费¥5</span>
      </div>
      <div class="submit-button" @click="onSubmit" v-if="getShopTotalPrice.diff_money <= 0">去结算</div>
      <div class="submit-button disabled-button" v-else>还差{{getShopTotalPrice.diff_money}}起送</div>
    </div>
  </div>
</template>

<script>

  import {mapGetters, mapMutations, mapState} from "vuex";

  export default {
    name: 'bottom-bar',
    data() {
      return {
        bottom_show: false, // 是否显示购物车商品栏
        food_list: [], // 商店的商品
      }
    },
    methods: {
      ...mapMutations(['changeShopCarMenuList']),
      showBox() {
        if (this.getShopTotalPrice.totalCount >= 1) {
          this.bottom_show = !this.bottom_show;
        }
      },
      cutShopCart(food_id) {
        this.shopCarMenuList[this.shopInfo.id].forEach(value => {
          return value.foods.filter(v => {
            if (v.specfoods[0].food_id === food_id) {
              if (v.count > 1) {
                v.count--;
              } else {
                this.$set(v, 'isShowIcon', false);
                this.$delete(v, 'count');
              }
              return v;
            }
          })
        });
        this.changeShopCarMenuList(this.shopCarMenuList);
      },
      addShopCart(food_id) {
        this.shopCarMenuList[this.shopInfo.id].forEach(value => {
          return value.foods.filter(v => {
            if (v.specfoods[0].food_id === food_id) {
              v.count++;
              return v;
            }
          })
        });
        this.changeShopCarMenuList(this.shopCarMenuList);
      },
      // 清空购物车
      clearCart() {
        // 清空 购物车列表
        this.shopCarMenuList[this.shopInfo.id] = null;
        this.changeShopCarMenuList(this.shopCarMenuList);
        this.bottom_show = false;
        this.$emit('clearShopCar');
      },
      // 提交订单
      onSubmit() {
        this.$router.push({
          path: '/confirmOrder',
          query: {_shop_id: this.getShopTotalPrice._shop_id, geohash: this.getShopTotalPrice.geohash}
        });
      },
    },
    computed: {
      ...mapState(['shopCarMenuList', 'shopInfo']),
      ...mapGetters(['getShopCarMenuList', 'getShopTotalPrice']),
    }
  };
</script>
<style scoped lang="less">
  @import "_bottom-bar";
</style>
