<template>
    <div class="shopDesc">
      <!--导航-->
      <bar :title="'商家详情'"></bar>
      <div class="activities_container">
        <header class="p14">活动与属性</header>
        <ul class="activities_ul p14">
          <li><i class="iconfont cut">&#xe6f5;</i><span>满30减5，满60减8(APP专享)</span></li>
          <li><i class="iconfont cut">&#xe61c;</i><span>已加入“外卖保”计划，食品安全有保障(APP专享)</span></li>
          <li><i class="iconfont cut">&#xe7c9;</i><span>准时必达，超时秒赔(APP专享)</span></li>
          <li><i class="iconfont cut">&#xe7c5;</i><span>该商家支持开发票，请在下单时填写好发票抬头(APP专享)</span></li>
        </ul>
      </div>
      <section class="shop_status_container">
        <header class="shop_status_header">
          <span class="shop_detail_title">食品监督安全公示</span>
          <span class="identification_detail">
            <span>企业认证详情</span>
            <i class="iconfont arrow-right">&#xe61a;</i>
          </span>
        </header>
        <div class="shop_status_detail">
          <div class="smile"><i class="iconfont smile-icon">&#xe62a;</i></div>
          <div class="check_date">
            <p>
              <span>监督检查结果：</span>
              <span class="shop_status_well">良好</span>
            </p>
            <p>
              <span>检查日期：</span>
              <span></span>
            </p>
          </div>
        </div>
      </section>
      <section class="shop_status_info">
        <header>商家信息</header>
        <p>德国大使馆</p>
        <p>地址：浙江省宁波市江北区风华路818号</p>
        <p>营业时间：[05:45/07:00]</p>
        <p class="flex-between"><span>营业执照</span><i class="iconfont arrow-right-gray-18">&#xe61a;</i></p>
        <p class="flex-between"><span>餐饮服务许可证</span><i class="iconfont arrow-right-gray-18">&#xe61a;</i></p>
      </section>
    </div>
</template>

<script>
    import Bar from "../../bar/bar";
    export default {
        name: 'shopDesc',
      components: {Bar},
    };
</script>
<style scoped lang="less">
  @import "_shopDesc";
</style>
