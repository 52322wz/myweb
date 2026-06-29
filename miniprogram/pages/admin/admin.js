const storage = require('../../utils/storage');

Page({
  data: {
    tabs: [
      { key: 'all', label: '全部' },
      { key: 'pending', label: '待付款' },
      { key: 'completed', label: '已完成' }
    ],
    activeTab: 'all',
    orders: [],
    isEmpty: true,
    sellerPassword: ''
  },

  onShow() {
    // 校验卖家身份
    const role = wx.getStorageSync('user_role');
    if (role !== 'seller') {
      wx.redirectTo({ url: '/pages/login/login' });
      return;
    }
    this.loadOrders();
    this.loadPassword();
  },

  loadPassword() {
    this.setData({ sellerPassword: wx.getStorageSync('seller_password') || '123456' });
  },

  loadOrders() {
    const orders = storage.getOrdersByStatus(this.data.activeTab);
    const formatted = orders.map(o => ({
      ...o,
      totalPriceText: o.totalPrice.toFixed(2)
    }));
    this.setData({ orders: formatted, isEmpty: formatted.length === 0 });
  },

  /** 切换 tab */
  onTabTap(e) {
    this.setData({ activeTab: e.currentTarget.dataset.key });
    this.loadOrders();
  },

  /** 查看订单详情 */
  onDetail(e) {
    const { order } = e.currentTarget.dataset;
    const addr = order.address;
    const itemsStr = order.items.map(i => `${i.name} ×${i.quantity} ¥${i.price}`).join('\n');
    const buyerName = order.buyerName || '未知买家';
    wx.showModal({
      title: `订单 ${order.orderId}`,
      content: `👤 买家：${buyerName}\n📞 收货人：${addr.name} ${addr.phone}\n📍 地址：${addr.region} ${addr.detail}\n\n📦 商品：\n${itemsStr}\n\n💰 总价：¥${order.totalPrice.toFixed(2)}\n📌 状态：${order.status === 'completed' ? '已完成' : '待付款'}\n🕐 时间：${order.createTime}`,
      showCancel: false,
      confirmText: '知道了'
    });
  },

  /** 标记已完成 */
  onComplete(e) {
    const { orderId } = e.currentTarget.dataset;
    wx.showModal({
      title: '确认',
      content: '将该订单标记为已完成？',
      success: (res) => {
        if (res.confirm) {
          storage.payOrder(orderId);
          wx.showToast({ title: '已标记完成', icon: 'success' });
          this.loadOrders();
        }
      }
    });
  },

  /** 修改密码 */
  onChangePassword() {
    wx.showModal({
      title: '修改卖家密码',
      editable: true,
      placeholderText: '请输入新密码',
      success: (res) => {
        if (res.confirm && res.content) {
          wx.setStorageSync('seller_password', res.content.trim());
          this.setData({ sellerPassword: res.content.trim() });
          wx.showToast({ title: '密码已更新', icon: 'success' });
        }
      }
    });
  },

  /** 退出登录 */
  onLogout() {
    wx.showModal({
      title: '退出确认',
      content: '确定退出卖家后台吗？',
      success: (res) => {
        if (res.confirm) {
          wx.removeStorageSync('user_role');
          wx.redirectTo({ url: '/pages/login/login' });
        }
      }
    });
  }
});
