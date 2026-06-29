const app = getApp();

Page({
  data: {
    showBuyerModal: false,
    showSellerModal: false,
    buyerName: '',
    sellerPassword: ''
  },

  onLoad() {
    // 检查是否已登录 — 延迟执行等待页面初始化完成
    const role = wx.getStorageSync('user_role');
    if (role === 'buyer') {
      setTimeout(() => wx.switchTab({ url: '/pages/index/index' }), 300);
    } else if (role === 'seller') {
      setTimeout(() => wx.reLaunch({ url: '/pages/admin/admin' }), 300);
    }
  },

  /** 选择买家 */
  onBuyerLogin() {
    const name = wx.getStorageSync('buyer_name');
    if (name) {
      wx.switchTab({ url: '/pages/index/index' });
    } else {
      this.setData({ showBuyerModal: true, buyerName: '' });
    }
  },

  /** 选择卖家 */
  onSellerLogin() {
    this.setData({ showSellerModal: true, sellerPassword: '' });
  },

  /** 买家输入姓名 */
  onBuyerNameInput(e) {
    this.setData({ buyerName: e.detail.value });
  },

  /** 卖家输入密码 */
  onSellerPasswordInput(e) {
    this.setData({ sellerPassword: e.detail.value });
  },

  /** 确认买家登录 */
  confirmBuyer() {
    const name = this.data.buyerName.trim();
    if (!name) {
      wx.showToast({ title: '请输入你的名字', icon: 'none' });
      return;
    }
    wx.setStorageSync('user_role', 'buyer');
    wx.setStorageSync('buyer_name', name);
    this.setData({ showBuyerModal: false });
    wx.showToast({ title: `欢迎，${name}！`, icon: 'success' });
    setTimeout(() => {
      wx.switchTab({ url: '/pages/index/index' });
    }, 800);
  },

  /** 确认卖家登录 */
  confirmSeller() {
    const correctPwd = wx.getStorageSync('seller_password') || '123456';
    if (this.data.sellerPassword === correctPwd) {
      wx.setStorageSync('user_role', 'seller');
      this.setData({ showSellerModal: false });
      wx.showToast({ title: '卖家登录成功', icon: 'success' });
      setTimeout(() => {
        wx.redirectTo({ url: '/pages/admin/admin' });
      }, 800);
    } else {
      wx.showToast({ title: '密码错误', icon: 'error' });
    }
  },

  /** 关闭弹窗 */
  closeModal() {
    this.setData({ showBuyerModal: false, showSellerModal: false });
  },

  /** 阻止冒泡 */
  noop() {}
});
