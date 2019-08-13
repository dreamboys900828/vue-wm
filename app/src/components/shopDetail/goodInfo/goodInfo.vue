<template>
  <div class="goodInfo">
    <bar :title="info.name"></bar>
    <div class="rating_page">
      <section class="header_img">
        <img :src="'//elm.cangdu.org/img/' + info.image_path" alt="" class="food-img">
      </section>
      <p class="description">{{info.description}}</p>
      <section class="detail_container clearfix">
        <section class="detail_left clearfix">
          <p class="clearfix">{{info.name}}</p>
          <div class="rating_sale clearfix">
            <span>评分</span>
            <!--            <div>star</div>-->
            <span>{{info.rating}}</span>
          </div>
          <p class="clearfix">
            <span>月售 {{info.month_sales}}单</span>
            <span>售价 ¥{{info.price}}</span>
            <span>起</span>
          </p>
          <p class="clearfix">
            <span>评论数 {{info.rating_count}}</span><span>好评率 {{info.satisfy_rate}}%</span>
          </p>
        </section>
      </section>
    </div>


    <bottom-bar :totalCalcProps="total"></bottom-bar>
  </div>
</template>

<script>
  import Bar from "../../bar/bar";
  import BottomBar from "../../bottom-bar/bottom-bar";
  import {mapState} from "vuex";
  import {getStore, setStore} from "../../../utils/mUtils";

  export default {
    name: 'goodInfo',
    data() {
      return {
        info: {}, // 传输过来的值
        total: {}, // 总价 数量
      }
    },
    components: {BottomBar, Bar},
    created() {
      this.info = this.$route.query;
      let total = this.TotalMoney;
      if (total.totalCount) {
        setStore('shopCarTotal', JSON.stringify(total));
        this.total = total;
      } else { // 从缓存取
        this.total = JSON.parse(getStore('shopCarTotal'));

      }
    },
    computed: {
      ...mapState({
        TotalMoney: 'shopCarTotal'
      }),
    }
  };
</script>
<style scoped lang="less">
  @import "_goodInfo";
</style>
