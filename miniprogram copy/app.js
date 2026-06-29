const storage = require('./utils/storage');

App({
  onLaunch() {
    // 启动时更新购物车角标
    this.updateCartBadge();
  },

  /**
   * 更新购物车 TabBar 角标
   */
  updateCartBadge() {
    const count = storage.getCartCount();
    if (count > 0) {
      wx.setTabBarBadge({
        index: 1,
        text: count > 99 ? '99+' : String(count)
      });
    } else {
      wx.removeTabBarBadge({ index: 1 });
    }
  },

  globalData: {
    userInfo: null
  }
});
