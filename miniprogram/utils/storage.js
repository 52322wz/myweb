/**
 * 本地存储工具 — 购物车 & 订单 CRUD
 */

const CART_KEY = 'shop_cart';
const ORDERS_KEY = 'shop_orders';

// ==================== 购物车 ====================

/**
 * 获取购物车全部商品
 */
function getCart() {
  try {
    return wx.getStorageSync(CART_KEY) || [];
  } catch (e) {
    return [];
  }
}

/**
 * 保存购物车
 */
function saveCart(cart) {
  wx.setStorageSync(CART_KEY, cart);
}

/**
 * 添加商品到购物车
 * 已存在则增加数量，不存在则新增
 */
function addToCart(product, quantity) {
  const qty = quantity || 1;
  const cart = getCart();
  const index = cart.findIndex(item => item.id === product.id);

  if (index > -1) {
    cart[index].quantity += qty;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      image: product.images ? product.images[0] : '',
      price: product.price,
      quantity: qty,
      selected: true
    });
  }

  saveCart(cart);
  return cart;
}

/**
 * 更新购物车商品数量
 */
function updateCartItem(id, changes) {
  const cart = getCart();
  const index = cart.findIndex(item => item.id === id);
  if (index > -1) {
    Object.assign(cart[index], changes);
    // 数量为 0 则删除
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }
  }
  saveCart(cart);
  return cart;
}

/**
 * 删除购物车商品
 */
function removeCartItem(id) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== id);
  saveCart(cart);
  return cart;
}

/**
 * 全选 / 取消全选
 */
function toggleSelectAll(selected) {
  const cart = getCart();
  cart.forEach(item => { item.selected = selected; });
  saveCart(cart);
  return cart;
}

/**
 * 切换单个商品选中状态
 */
function toggleSelectItem(id) {
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if (item) item.selected = !item.selected;
  saveCart(cart);
  return cart;
}

/**
 * 获取购物车总数量（用于 tabBar 角标）
 */
function getCartCount() {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

/**
 * 获取选中商品的总价
 */
function getSelectedTotal() {
  const cart = getCart();
  return cart
    .filter(item => item.selected)
    .reduce((sum, item) => sum + item.price * item.quantity, 0);
}

/**
 * 获取选中的商品
 */
function getSelectedItems() {
  const cart = getCart();
  return cart.filter(item => item.selected);
}

/**
 * 清空已选中的商品（下单后）
 */
function clearSelectedItems() {
  let cart = getCart();
  cart = cart.filter(item => !item.selected);
  saveCart(cart);
  return cart;
}

/**
 * 清空指定 ID 的商品
 */
function clearCartItems(ids) {
  let cart = getCart();
  cart = cart.filter(item => !ids.includes(item.id));
  saveCart(cart);
  return cart;
}

// ==================== 订单 ====================

/**
 * 获取全部订单
 */
function getOrders() {
  try {
    return wx.getStorageSync(ORDERS_KEY) || [];
  } catch (e) {
    return [];
  }
}

/**
 * 保存订单列表
 */
function saveOrders(orders) {
  wx.setStorageSync(ORDERS_KEY, orders);
}

/**
 * 创建订单
 */
function addOrder(orderData) {
  const orders = getOrders();
  const order = {
    orderId: Date.now().toString(),
    items: orderData.items,
    totalPrice: orderData.totalPrice,
    status: 'pending', // pending | completed
    address: orderData.address || {},
    buyerName: orderData.buyerName || '未知买家',
    createTime: formatTime(new Date())
  };
  orders.unshift(order);
  saveOrders(orders);
  return order;
}

/**
 * 更新订单状态
 */
function updateOrderStatus(orderId, status) {
  const orders = getOrders();
  const order = orders.find(o => o.orderId === orderId);
  if (order) {
    order.status = status;
    saveOrders(orders);
  }
  return orders;
}

/**
 * 根据状态筛选订单
 */
function getOrdersByStatus(status) {
  const orders = getOrders();
  if (!status || status === 'all') return orders;
  return orders.filter(o => o.status === status);
}

/**
 * 模拟支付（更新订单状态为已完成）
 */
function payOrder(orderId) {
  return updateOrderStatus(orderId, 'completed');
}

// ==================== 工具 ====================

function formatTime(date) {
  const y = date.getFullYear();
  const m = (date.getMonth() + 1).toString().padStart(2, '0');
  const d = date.getDate().toString().padStart(2, '0');
  const h = date.getHours().toString().padStart(2, '0');
  const min = date.getMinutes().toString().padStart(2, '0');
  const s = date.getSeconds().toString().padStart(2, '0');
  return `${y}-${m}-${d} ${h}:${min}:${s}`;
}

module.exports = {
  // 购物车
  getCart,
  saveCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  toggleSelectAll,
  toggleSelectItem,
  getCartCount,
  getSelectedTotal,
  getSelectedItems,
  clearSelectedItems,
  clearCartItems,
  // 订单
  getOrders,
  addOrder,
  updateOrderStatus,
  payOrder,
  getOrdersByStatus,
  formatTime
};
