const storage = require('../../utils/storage');

function fmtPrice(n) {
  return n.toFixed(2);
}

Page({
  data: {
    items: [],
    totalPrice: 0,
    totalPriceText: '0.00',
    address: null
  },

  onShow() {
    const items = storage.getSelectedItems();
    if (items.length === 0) {
      wx.showToast({ title: '请先选择商品', icon: 'none' });
      setTimeout(() => wx.navigateBack(), 1500);
      return;
    }
    const totalPrice = storage.getSelectedTotal();
    this.setData({ items, totalPrice, totalPriceText: fmtPrice(totalPrice) });

    // 读取上次使用的地址
    try {
      const addr = wx.getStorageSync('last_address');
      if (addr) this.setData({ address: addr });
    } catch (e) { /* ignore */ }
  },

  /** 选择收货地址 */
  onChooseAddress() {
    wx.chooseAddress({
      success: (res) => {
        const address = {
          name: res.userName,
          phone: res.telNumber,
          region: `${res.provinceName} ${res.cityName} ${res.countyName}`,
          detail: res.detailInfo
        };
        this.setData({ address });
        wx.setStorageSync('last_address', address);
      },
      fail: (err) => {
        if (err.errMsg.includes('auth deny')) {
          wx.showToast({ title: '需要授权才能获取地址', icon: 'none' });
        }
      }
    });
  },

  /** 提交订单 */
  onSubmit() {
    if (!this.data.address) {
      wx.showToast({ title: '请先选择收货地址', icon: 'none' });
      return;
    }

    const buyerName = wx.getStorageSync('buyer_name') || '未知买家';
    const order = storage.addOrder({
      items: this.data.items,
      totalPrice: this.data.totalPrice,
      address: this.data.address,
      buyerName: buyerName
    });

    // 清空购物车中已下单的商品
    storage.clearSelectedItems();
    getApp().updateCartBadge();

    wx.showToast({
      title: '下单成功！',
      icon: 'success',
      duration: 2000
    });

    // 跳转到订单详情
    setTimeout(() => {
      wx.redirectTo({ url: '/pages/orders/orders' });
    }, 1500);
  }
});
