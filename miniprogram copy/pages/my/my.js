const storage = require('../../utils/storage');

Page({
  data: {
    userInfo: null,
    orderCounts: {
      all: 0,
      pending: 0,
      completed: 0
    }
  },

  onShow() {
    this.loadOrderCounts();
  },

  onLoad() {
    // 尝试读取缓存的用户信息
    try {
      const userInfo = wx.getStorageSync('user_info');
      if (userInfo) {
        this.setData({ userInfo });
      }
    } catch (e) { /* ignore */ }
  },

  /** 加载订单数量统计 */
  loadOrderCounts() {
    const orders = storage.getOrders();
    this.setData({
      orderCounts: {
        all: orders.length,
        pending: orders.filter(o => o.status === 'pending').length,
        completed: orders.filter(o => o.status === 'completed').length
      }
    });
  },

  /** 获取用户信息 */
  onGetUserInfo() {
    wx.getUserProfile({
      desc: '用于完善个人资料',
      success: (res) => {
        const userInfo = res.userInfo;
        this.setData({ userInfo });
        wx.setStorageSync('user_info', userInfo);
        wx.showToast({ title: '登录成功', icon: 'success' });
      },
      fail: () => {
        wx.showToast({ title: '已取消授权', icon: 'none' });
      }
    });
  },

  /** 跳转订单列表 */
  onGoOrders(e) {
    const { status } = e.currentTarget.dataset;
    wx.switchTab({ url: '/pages/orders/orders' });
    // 通过全局变量传递 tab 信息
    getApp().globalData.orderTab = status || 'all';
  },

  /** 管理收货地址 */
  onManageAddress() {
    wx.chooseAddress({
      success: (res) => {
        const address = {
          name: res.userName,
          phone: res.telNumber,
          region: `${res.provinceName} ${res.cityName} ${res.countyName}`,
          detail: res.detailInfo
        };
        wx.setStorageSync('last_address', address);
        wx.showToast({ title: '地址已保存', icon: 'success' });
      },
      fail: (err) => {
        if (err.errMsg.includes('auth deny')) {
          wx.showModal({
            title: '提示',
            content: '需要授权才能使用地址功能，请在设置中开启',
            showCancel: false
          });
        }
      }
    });
  },

  /** 关于 */
  onAbout() {
    wx.showModal({
      title: '关于 Mini商城',
      content: '一个纯前端微信小程序商城 Demo\n\n技术栈：原生微信小程序\n数据：本地 Storage\n\n仅供学习参考',
      showCancel: false,
      confirmText: '知道了'
    });
  },

  /** 联系我们 */
  onContact() {
    wx.showModal({
      title: '联系我们',
      content: '客服电话：400-000-0000\n客服微信：MiniShop_CS\n工作时间：9:00 - 21:00',
      showCancel: false,
      confirmText: '好的'
    });
  }
});
