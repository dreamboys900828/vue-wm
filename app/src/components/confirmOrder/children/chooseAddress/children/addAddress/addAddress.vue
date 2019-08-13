<template>
  <div class="addAddress">
    <template v-if="intoRoute === '/confirmOrder/chooseAddress/addAddress'">
      <bar :title="title"></bar>
      <section class="page_text_container">
        <section class="section_list clearfix">
          <span class="section_left line">联系人</span>
          <section class="section_right">
            <input type="text" v-model="name" class="input_style" placeholder="你的名字">
            <div class="choose_sex">
              <span class="choose_option">
                <i class="iconfont" :class="{select_sex: sex === 1}" @click="selectSex(1)">&#xe669;</i>
                <span>先生</span>
              </span>
              <span class="choose_option">
                <i class="iconfont" :class="{select_sex: sex === 2}" @click="selectSex(2)">&#xe669;</i>
                <span>女士</span>
              </span>
            </div>
          </section>
        </section>
        <section class="section_list clearfix">
          <span class="section_left phone">联系电话</span>
          <section class="section_right">
            <div class="phone_add">
              <input type="text" v-model="phone" placeholder="你的手机号" class="input_style">
              <i class="iconfont" @click="is_show_by_phone = !is_show_by_phone">&#xe60a;</i>
            </div>
            <input v-model="phone_bk" name="anntherPhoneNumber" placeholder="备选电话" class="input_style phone_bk"
                   v-if="is_show_by_phone">
          </section>
        </section>
        <section class="section_list clearfix">
          <span class="section_left sendAddress">送餐地址</span>
          <section class="section_right">
            <router-link class="choose_address" v-model="address = selectAddressName"
                         to="addAddress/searchAddress">
              {{selectAddressName || '小区/写字楼/学校等'}}
            </router-link>
            <input type="text" v-model="address_detail" class="input_style address_detail" placeholder="详细地址（如门牌号等）">
          </section>
        </section>
        <section class="section_list clearfix">
          <span class="section_left tags">标签</span>
          <section class="section_right">
            <input type="text" v-model="tag" class="input_style" placeholder="无/家/学校/公司">
          </section>
        </section>
      </section>
      <div class="determine" @click="submitAddress">确定</div>
      <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
    </template>
    <router-view></router-view>
  </div>
</template>

<script>
  import Bar from "../../../../../bar/bar";
  import {mapState} from "vuex";
  import {postAddAddress} from "../../../../../../service/getData";
  import AlertTip from "../../../../../common/alertTip/alertTip";

  export default {
    components: {AlertTip, Bar},
    data() {
      return {
        title: '添加地址',
        showAlert: false, // 是否显示提示框
        alertText: null, // 提示框文字
        is_show_by_phone: false, // 是否显示备用电话
        geohash: null, // 经纬度
        name: null, // 联系人
        sex: 1, // 性别
        phone: null, // 电话
        phone_bk: null, // 备用电话
        address: null, // 详细地址
        address_detail: null, // 详细地址
        tag: null, // 标签文字
        tag_type: null, // 标签数字
        poi_type: 0,
      }
    },
    created() {
      // 获取 经纬度
      this.geohash = this.userLocation;
      //   if (this.$route.query.selectAddressName) {
      //     this.address = this.$route.query.selectAddressName;
      //   }
    },
    // updated() {
    //   if (this.$route.query.selectAddressName) {
    //     this.address = this.$route.query.selectAddressName;
    //     console.log('页面更新了');
    //   }
    // },
    watch: {
      tag() {
        switch (this.tag) {
          case '无':
            this.tag_type = 1;
            break;
          case '家':
            this.tag_type = 2;
            break;
          case '学校':
            this.tag_type = 3;
            break;
          case '公司':
            this.tag_type = 4;
            break;
          default:
            this.tag_type = 1;
            break;
        }
      }
    },
    methods: {
      // 选择性别
      selectSex(value) {
        this.sex = value;
      },
      // 提交地址
      async submitAddress() {
        if (this.name === null) {
          this.showAlert = true;
          this.alertText = '请填写姓名';
          return;
        }
        if (this.phone === null) {
          this.showAlert = true;
          this.alertText = '请填写联系电话';
          return;
        }
        if (this.address === null) {
          this.showAlert = true;
          this.alertText = '请选择地址';
          return;
        }
        if (this.address_detail === null) {
          this.showAlert = true;
          this.alertText = '请填写详细地址';
          return;
        }
        if (this.tag === null) {
          this.showAlert = true;
          this.alertText = '请填写标签';
          return;
        }
        let status = await postAddAddress(
          36660, this.address, this.address_detail,
          this.geohash, this.name, this.phone,
          this.phone_bk, this.poi_type, this.sex,
          this.tag, this.tag_type
        );
        if (status.status === 0) {
          switch (status.message) {
            case '标签错误':
              this.showAlert = true;
              this.alertText = '标签错误';
              break;
            case '详细地址信息错误':
              this.showAlert = true;
              this.alertText = '详细地址信息错误';
              break;
            case '收货人姓名错误':
              this.showAlert = true;
              this.alertText = '收货人姓名错误';
              break;
            case '收获手机号错误':
              this.showAlert = true;
              this.alertText = '收获手机号错误';
              break;
          }
          return false;
        } else {
          this.$router.go(-1);
        }
      }
    },
    computed: {
      ...mapState(['intoRoute', 'userLocation', 'selectAddressName'])
    }
  };
</script>
<style scoped lang="less">
  @import "_addAddress";
</style>
