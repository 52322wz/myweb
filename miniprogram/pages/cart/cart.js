const storage = require('../../utils/storage');

function fmtPrice(n) {
  return n.toFixed(2);
}

Page({
  data: {
    cart: [],
    allSelected: false,
    totalPrice: 0,
    totalPriceText: '0.00',
    isEmpty: true
  },

  onShow() {
    this.loadCart();
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 1, badge: storage.getCartCount() });
    }
  },

  /** 加载购物车数据 */
  loadCart() {
    const cart = storage.getCart();
    const allSelected = cart.length > 0 && cart.every(item => item.selected);
    const totalPrice = storage.getSelectedTotal();
    this.setData({
      cart,
      allSelected,
      totalPrice,
      totalPriceText: fmtPrice(totalPrice),
      isEmpty: cart.length === 0
    });
    getApp().updateCartBadge();
  },

  /** 全选 / 取消全选 */
  onToggleAll() {
    const cart = storage.toggleSelectAll(!this.data.allSelected);
    const totalPrice = storage.getSelectedTotal();
    this.setData({
      cart,
      allSelected: !this.data.allSelected,
      totalPrice,
      totalPriceText: fmtPrice(totalPrice)
    });
  },

  /** 切换单个商品选中 */
  onToggleItem(e) {
    const { id } = e.currentTarget.dataset;
    const cart = storage.toggleSelectItem(id);
    const totalPrice = storage.getSelectedTotal();
    const allSelected = cart.length > 0 && cart.every(item => item.selected);
    this.setData({
      cart,
      allSelected,
      totalPrice,
      totalPriceText: fmtPrice(totalPrice)
    });
  },

  /** 数量减少 */
  onMinus(e) {
    const { id } = e.currentTarget.dataset;
    const item = this.data.cart.find(i => i.id === id);
    if (item && item.quantity > 1) {
      storage.updateCartItem(id, { quantity: item.quantity - 1 });
      this.loadCart();
    }
  },

  /** 数量增加 */
  onPlus(e) {
    const { id } = e.currentTarget.dataset;
    const item = this.data.cart.find(i => i.id === id);
    if (item) {
      storage.updateCartItem(id, { quantity: item.quantity + 1 });
      this.loadCart();
    }
  },

  /** 删除商品 */
  onDelete(e) {
    const { id } = e.currentTarget.dataset;
    const item = this.data.cart.find(i => i.id === id);
    wx.showModal({
      title: '提示',
      content: `确定要删除「${item ? item.name : '该商品'}」吗？`,
      success: (res) => {
        if (res.confirm) {
          storage.removeCartItem(id);
          this.loadCart();
          wx.showToast({ title: '已删除', icon: 'success' });
        }
      }
    });
  },

  /** 去结算 */
  onCheckout() {
    const selected = storage.getSelectedItems();
    if (selected.length === 0) {
      wx.showToast({ title: '请先选择商品', icon: 'none' });
      return;
    }
    wx.navigateTo({ url: '/pages/checkout/checkout' });
  }
});
