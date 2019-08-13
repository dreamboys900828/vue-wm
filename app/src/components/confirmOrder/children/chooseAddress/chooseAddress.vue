<template>
  <div class="chooseAddress">
    <template v-if="intoRoute === '/confirmOrder/chooseAddress'">
      <bar :title="title"></bar>
      <section class="list_container">
        <ul class="deliverable_address" v-if="calcAddress_list">
          <li class="clearfix" v-for="item in calcAddress_list" :key="item.id">
            <i class="iconfont" @click="isNeedInvoice(item)" :class="{need_invoice: !item.is_user_default}">&#xe669;</i>
            <div>
              <header>
                <span>{{item.name}}</span>
                <span>{{item.sex === 1?'先生':'女士'}}</span>
                <span>{{item.phone}}</span>
              </header>
              <div class="address_detail ellipsis clearfix">
                <span>{{item.tag}}</span>
                <p>{{item.address_detail}}</p>
              </div>
            </div>
          </li>
        </ul>
      </section>
      <router-link to="chooseAddress/addAddress" class="add_icon_footer">
        <div>
          <i class="iconfont addAddress">&#xe609;</i>
          <span>新增收货地址</span>
        </div>
      </router-link>
    </template>
    <router-view></router-view>
  </div>
</template>

<script>
  import Bar from "../../../bar/bar";
  import {mapMutations, mapState} from "vuex";
  import {getAddress} from "../../../../service/getData";

  export default {
    name: 'chooseAddress',
    data() {
      return {
        title: '选择地址',
        address_list: [], // 收货地址
      }
    },
    created() {
      this.initData();
    },
    components: {Bar},
    props: {},
    methods: {
      async initData() {
        if (this.addressSelectEd.length > 0) { // vuex
          this.address_list = this.addressSelectEd;
        } else {
          this.address_list = await getAddress(36660);
          this.changeAddressSelectEd(this.address_list);
        }
      },
      isNeedInvoice(item) { // address_list
        // 重置所有数据的 是否选中状态 全改为 不选中的true
        this.address_list.forEach(v => v.is_user_default = true);
        // false 才是选中默认状态， 狗日的接口默认都是true
        item.is_user_default = false;
        // 存储 || 更新
        this.changeAddressSelectEd(this.address_list);
      },
      ...mapMutations(['changeAddressSelectEd'])
    },
    computed: {
      ...mapState(['intoRoute', 'addressSelectEd']),
      calcAddress_list() {
        return this.address_list;
      }
    },
  };
</script>
<style scoped lang="less">
  @import "_chooseAddress";
</style>
