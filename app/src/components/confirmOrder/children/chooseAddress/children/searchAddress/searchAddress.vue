<template>
  <div class="searchAddress">
    <bar :title="title"></bar>
    <div class="search_form">
      <input type="search" name="search" placeholder="请输入小区/写字楼/学校等" v-model="keyword">
      <button @click.stop="searchDetailAddress">搜索</button>
    </div>
    <div class="empty_tips" v-if="isEmpty">
      <p>找不到地址？</p>
      <p>尝试输入小区、写字楼或学校名</p>
      <p>详细地址（如门牌号等）可稍后输入哦</p>
    </div>
    <ul class="address_list" v-if="search_list">
      <li v-for="(item, index) in search_list" :key="index" @click="goAddress(item.name)">
        <h4>{{item.name}}</h4>
        <p>{{item.address}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
  import Bar from "../../../../../bar/bar";
  import {searchNearby} from "../../../../../../service/getData";
  import {mapMutations} from "vuex";

  export default {
    name: 'searchAddress',
    data() {
      return {
        title: '搜索', // 标题
        isEmpty: true, // 是否显示搜索为空 结构
        keyword: null, // 搜索关键词
        search_list: [], // 搜索出来的数据
      }
    },
    methods: {
      async searchDetailAddress() {
        this.isEmpty = false;
        this.search_list = await searchNearby(this.keyword);
      },
      // 返回到添加地址页
      goAddress(itemName) {
        this.changeSelectAddressName(itemName);
        this.$router.go(-1);
      },
      ...mapMutations(['changeSelectAddressName']),
    },
    components: {Bar},
    props: {},
  };
</script>
<style scoped lang="less">
  @import "_searchAddress";
</style>
