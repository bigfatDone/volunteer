import fetch from '@/utils/fetch'
// 获取购物车列表
export function getShopCartList(data = {}) {
  return fetch(Object.assign({
    url: "/findCartList",
    method: "get",
    params: data
  }))
}

// 猜你喜欢
export function getYouLike() {
  return fetch(Object.assign({
    url: "/kadGuestYouLike",
    method: "get",
  }))
}

// 点击购物车进行加减
export function updateNum(data = {}) {
  return fetch(Object.assign({
    url: "/updateGoodsFromCartList",
    method: "post",
    data: data
  }))
}

// 点击了删除
export function deleteShopCart(data = {}) {
  return fetch(Object.assign({
    url: "/deleteGoodsFromCartList",
    method: "post",
    data: data
  }))
}

// 点击了去结算
export function toPay(data = {}) {
  return fetch(Object.assign({
    url: "/GetOrderRedirectUrl",
    method: "post",
    data: data
  }))
}

// 点击了取消订单
export function cancelOrder(data = {}) {
  return fetch(Object.assign({
    url: "/kadCancelOrde",
    method: "get",
    params: data
  }))
}


