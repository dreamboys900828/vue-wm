<template>
  <div class="invoice">
    <bar :title=title></bar>
    <div class="choose_invoice">
      <span>不需要开发票</span>
      <i class="iconfont" @click="isNeedInvoice" :class="{need_invoice: is_need_invoice}">&#xe669;</i>
    </div>
    <div class="determine" @click="goConfirmOrder">确定</div>
  </div>
</template>

<script>
  import Bar from "../../../bar/bar";
  import {mapMutations, mapState} from "vuex";
  import {getStore, setStore} from "../../../../utils/mUtils";

  export default {
    name: 'invoice',
    data() {
      return {
        title: '发票抬头',
        is_need_invoice: false,
        geoHash: null, // 经纬度
        shop_information: {},
      }
    },
    created() {
      this.initData();
    },
    components: {Bar},
    props: {},
    methods: {
      initData() {
        // 获取 vuex 顺便更改样式
        this.is_need_invoice = this.invoice;
        if (this.shopInfo) {
          this.shop_information = this.shopInfo;
        } else {
          this.shop_information = getStore('shopInfo');
        }

        if (this.userLocation) {
          this.geoHash = this.userLocation;
        } else {
          this.geoHash = JSON.parse(getStore('userLocation'));
        }
      },
      isNeedInvoice() {
        this.is_need_invoice = !this.is_need_invoice;
      },
      goConfirmOrder() {
        this.changeInvoice(this.is_need_invoice);
        this.$router.push({path: '/confirmOrder', query: {_shop_id: this.shop_information.id, geohash: this.geohash}});
      },
      ...mapMutations(['changeInvoice']),
    },
    computed: {
      ...mapState(['userLocation', 'shopInfo', 'invoice']),
    }
  };
</script>
<style scoped lang="less">
  @import "_invoice";
</style>
