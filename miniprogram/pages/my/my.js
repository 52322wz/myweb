const storage = require('../../utils/storage');

Page({
  data: {
    userInfo: null,
    buyerName: '',
    userRole: '',
    orderCounts: {
      all: 0,
      pending: 0,
      completed: 0
    }
  },

  onShow() {
    this.loadOrderCounts();
    this.loadUserInfo();
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 3, badge: storage.getCartCount() });
    }
  },

  onLoad() {
    this.loadUserInfo();
  },

  /** 加载用户身份信息 */
  loadUserInfo() {
    const role = wx.getStorageSync('user_role') || '';
    const buyerName = wx.getStorageSync('buyer_name') || '';
    this.setData({ userRole: role, buyerName });
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
      title: '关于 晓峰酱菜',
      content: '晓峰酱菜 — 纯前端微信小程序商城\n\n技术栈：原生微信小程序\n数据：本地 Storage',
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
  },

  /** 退出登录 */
  onLogout() {
    wx.showModal({
      title: '退出确认',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          wx.removeStorageSync('user_role');
          wx.removeStorageSync('buyer_name');
          getApp().updateCartBadge();
          wx.reLaunch({ url: '/pages/login/login' });
        }
      }
    });
  }
});
