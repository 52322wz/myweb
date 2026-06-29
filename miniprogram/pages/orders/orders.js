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
    isEmpty: true
  },

  onShow() {
    this.loadOrders();
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 2, badge: storage.getCartCount() });
    }
  },

  /** 切换 tab */
  onTabTap(e) {
    const { key } = e.currentTarget.dataset;
    this.setData({ activeTab: key });
    this.loadOrders();
  },

  /** 加载订单 */
  loadOrders() {
    const { activeTab } = this.data;
    const orders = storage.getOrdersByStatus(activeTab);
    // 预格式化价格（WXML 不支持 toFixed）
    const formatted = orders.map(o => ({ ...o, totalPriceText: o.totalPrice.toFixed(2) }));
    this.setData({
      orders: formatted,
      isEmpty: orders.length === 0
    });
  },

  /** 模拟支付 */
  onPay(e) {
    const { orderId } = e.currentTarget.dataset;
    wx.showModal({
      title: '确认支付',
      content: '模拟支付操作，确定要支付该订单吗？',
      success: (res) => {
        if (res.confirm) {
          storage.payOrder(orderId);
          wx.showToast({ title: '支付成功！', icon: 'success' });
          this.loadOrders();
        }
      }
    });
  },

  /** 查看订单详情 */
  onOrderDetail(e) {
    const { order } = e.currentTarget.dataset;
    const itemsStr = order.items.map(i => `${i.name} ×${i.quantity}`).join('\n');
    const addr = order.address;
    wx.showModal({
      title: `订单 ${order.orderId}`,
      content: `收货人：${addr.name} ${addr.phone}\n地址：${addr.region} ${addr.detail}\n\n商品：\n${itemsStr}\n\n总价：¥${order.totalPrice.toFixed(2)}\n状态：${order.status === 'completed' ? '已完成' : '待付款'}\n时间：${order.createTime}`,
      showCancel: false,
      confirmText: '知道了'
    });
  }
});
