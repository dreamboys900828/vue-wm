import fetch from '../utils/fetch';

/**
 * 获取首页默认地址
 */

export const cityGuess = () => fetch('/v1/cities', {
  type: 'guess'
});


/**
 * 获取首页热门城市
 */

export const hotCity = () => fetch('/v1/cities', {
  type: 'hot'
});


/**
 * 获取首页所有城市
 */

export const groupcity = () => fetch('/v1/cities', {
  type: 'group'
});

/**
 * 获取搜索地址
 */

export const searchplace = (cityid, value) => fetch('/v1/pois', {
  type: 'search',
  city_id: cityid,
  keyword: value
});

/**
 * 获取food页面的 category 种类列表
 */

export const foodCategory = (latitude, longitude) => fetch('/shopping/v2/restaurant/category', {
  latitude,
  longitude
});

/**
 * 获取food页面的配送方式
 */
export const foodDelivery = (latitude, longitude) => fetch('/shopping/v1/restaurants/delivery_modes', {
  latitude,
  longitude,
  kw: ''
});

/**
 * 获取food页面的商家属性活动列表
 */
export const foodActivity = (latitude, longitude) => fetch('/shopping/v1/restaurants/activity_attributes', {
  latitude,
  longitude,
  kw: ''
});

/**
 * 获取msite页面地址信息
 */

export const msiteAddress = geohash => fetch('/v2/pois/' + geohash);

/**
 * 获取msite商铺列表
 */
export const shopLists = ({latitude, longitude, offset, limit, restaurant_category_id = '', restaurant_category_ids = '', order_by = '', delivery_mode = '', support_ids = []}) => {
  let supportStr = '';
  support_ids.forEach(value => {
    if (value) {
      supportStr += '&support_ids[]=' + value;
    }
  });
  let data = {
    latitude,
    longitude,
    offset,
    limit,
    'extras[]': 'activities',
    keyword: '',
    restaurant_category_id,
    'restaurant_category_ids[]': restaurant_category_ids,
    order_by,
    'delivery_mode[]': delivery_mode + supportStr
  };
  return fetch('/shopping/restaurants', data);
};

/**
 * 获取msite页面食品分类列表
 */

export const msiteFoodTypes = geohash => fetch('/v2/index_entry', {
  geohash,
  group_type: '1',
  'flags[]': 'F'
});

/**
 * 获取shop页面商铺详情
 */

export const shopDetails = (shopid, latitude, longitude) => fetch('/shopping/restaurant/' + shopid, {
  latitude,
  longitude: longitude + '&extras[]=activities&extras[]=album&extras[]=license&extras[]=identification&extras[]=statistics'
});

/**
 * 获取shop页面菜单列表
 */
export const foodMenu = restaurant_id => fetch('/shopping/v2/menu', {restaurant_id});

/**
 * 获取商铺评价列表
 */
export const getRatingList = (shopid, offset, tag_name = '') => fetch('/ugc/v2/restaurants/' + shopid + '/ratings', {
  offset,
  limit: 10,
  tag_name
});

/**
 * 获取商铺评价分数
 */
export const ratingScores = shopid => fetch('/ugc/v2/restaurants/' + shopid + '/ratings/scores');

/**
 * 获取商铺评价分类
 */
export const ratingTags = shopid => fetch('/ugc/v2/restaurants/' + shopid + '/ratings/tags');

/**
 * 搜索地址
 */
export const searchNearby = keyword => fetch('/v1/pois', {
  type: 'nearby',
  keyword
});

/**
 * 确认订单
 */

export const checkOut = (geohash, entities, shopid) => fetch('/v1/carts/checkout', {
  come_from: "web",
  geohash,
  entities,
  restaurant_id: shopid,
}, 'POST');

/**
 * 获取快速备注列表
 */

export const getRemark = (id, sig) => fetch('/v1/carts/' + id + '/remarks', {
  sig
});
/**
 * 获取地址列表
 */

export const getAddress = (id) => fetch('/v1/users/' + id + '/addresses');

/**
 * 添加地址
 */
export const postAddAddress = (userId, address, address_detail, geohash, name, phone, phone_bk, poi_type, sex, tag, tag_type) => fetch('/v1/users/' + userId + '/addresses', {
  address,
  address_detail,
  geohash,
  name,
  phone,
  phone_bk,
  poi_type,
  sex,
  tag,
  tag_type
}, 'POST');

/**
 * 下订单
 */

export const placeOrders = (user_id, cart_id, address_id, description, entities, geohash, sig) => fetch('/v1/users/' + user_id + '/carts/' + cart_id + '/orders', {
  address_id,
  come_from: "mobile_web",
  deliver_time: "",
  description,
  entities,
  geohash,
  paymethod_id: 1,
  sig,
}, 'POST');

/**
 * 下订单
 */

export const validateOrders = (
  {
    user_id,
    cart_id,
    address_id,
    description,
    entities,
    geohash,
    sig
  }) => fetch('/v1/users/' + user_id + '/carts/' + cart_id + '/orders',
  {
    address_id,
    come_from: "mobile_web",
    deliver_time: "",
    description,
    entities,
    geohash,
    paymethod_id: 1,
    sig
  }, 'POST');


/**
 * 获取search页面搜索结果
 */

export const searchRestaurant = (geohash, keyword) => fetch('/v4/restaurants', {
  'extras[]': 'restaurant_activity',
  geohash,
  keyword,
  type: 'search'
});

/**
 * 账号密码登录
 */
export const accountLogin = (username, password, captcha_code) => fetch('/v2/login', {username, password, captcha_code}, 'POST');

/**
 * 获取图片验证码
 */

export const getcaptchas = () => fetch('/v1/captchas', {},'POST');

/**
 * 获取红包
 */

export const getHongbaoNum = id => fetch('/promotion/v2/users/' + id + '/hongbaos?limit=20&offset=0');

/**
 * 获取订单列表
 */

export const getOrderList = (user_id, offset) => fetch('/bos/v2/users/' + user_id + '/orders', {
  limit: 10,
  offset,
});

/**
 * 获取订单详情
 */

export const getOrderDetail = (user_id, orderid) => fetch('/bos/v1/users/' + user_id + '/orders/' + orderid + '/snapshot');

/**
 * 获取服务中心信息
 */

export const getService = () => fetch('/v3/profile/explain');

/**
 * 兑换红包
 */

export const exChangeHongbao = (id, exchange_code, captcha_code) => fetch('/v1/users/' + id + '/hongbao/exchange',{
  exchange_code,
  captcha_code,
}, 'POST');

/**
 * 退出登录
 */
export const signout = () => fetch('/v2/signout');

/**
 * 删除地址
 */

export const deleteAddress = (userid, addressid) => fetch( '/v1/users/' + userid + '/addresses/' + addressid, {}, 'DELETE')

/**
 *个人中心里搜索地址
 */

export const getSearchAddress = (keyword) => fetch('v1/pois',{
  keyword:keyword,
  type:'nearby'
});
