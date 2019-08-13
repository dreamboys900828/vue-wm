<template>
  <div class="remark">
    <section v-if="!showLoading">
      <bar :title="title"></bar>
      <section class="quick_remark">
        <header class="header_style">快速备注</header>
        <ul class="remark_arr_list_ul" v-if="remark">
          <li class="remark_arr_list_li" v-for="(item, index) in remark.remarks" :key="index">
            <span class="remark_item_li"
                  v-if="item"
                  v-for="(remarkTtem, remarkIndex) in item"
                  :key="remarkIndex"
                  :class="{first: remarkIndex === 0,
                   last: remarkIndex === item.length - 1,
                   choose: remarkText[index] && (remarkText[index][0] === remarkIndex)}"
                  @click="chooseRemark(index, remarkIndex, remarkTtem)">
              {{remarkTtem}}
            </span>
          </li>
        </ul>
      </section>
      <section class="input_remark quick_remark">
        <header class="header_style">其他备注</header>
        <textarea class="input_text" placeholder="请输入备注内容(可不填)" v-model="inputText"></textarea>
      </section>
      <div class="determine" @click="confirmRemark">确定</div>
    </section>
    <loading v-if="showLoading"></loading>
  </div>
</template>

<script>
  import Bar from "../../../bar/bar";
  import {getRemark} from "../../../../service/getData";
  import Loading from "../../../common/loading/loading";
  import {mapMutations, mapState} from "vuex";

  export default {
    name: 'remark',
    data() {
      return {
        title: '订单备注',
        id: null,
        sig: null,
        remark: [], // 备注列表
        showLoading: true, // 动画
        remarkText: {},
        inputText: '', // 输入框
      }
    },
    created() {
      this.id = this.$route.query.id;
      this.sig = this.$route.query.sig;
    },
    mounted() {
      this.initData();
    },
    methods: {
      ...mapMutations([
        'CONFIRM_REMARK'
      ]),
      async initData() {
        // 获取快速备注列表
        this.remark = await getRemark(this.id, this.sig);
        this.showLoading = false;
      },
      //选择备注
      chooseRemark(index, remarkIndex, text) {
        this.remarkText[index] = [remarkIndex, text];
        this.remarkText = Object.assign({}, this.remarkText);
      },
      //确认选择
      confirmRemark() {
        this.CONFIRM_REMARK({remarkText: this.remarkText, inputText: this.inputText});
        this.$router.go(-1);
      }
    },
    components: {Loading, Bar},
    props: {},
  };
</script>
<style scoped lang="less">
  @import "_remark";
</style>
