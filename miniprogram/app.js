const storage = require('./utils/storage');

App({
  onLaunch() {
    this.updateCartBadge();
  },

  /**
   * 更新购物车角标（通过全局事件通知自定义 tabBar）
   */
  updateCartBadge() {
    const count = storage.getCartCount();
    this.globalData.cartBadge = count;
    // 通知所有页面更新 tabBar
    const pages = getCurrentPages();
    const tabPages = pages.filter(p => {
      const r = p.route || '';
      return ['pages/index/index','pages/cart/cart','pages/orders/orders','pages/my/my'].includes(r);
    });
    tabPages.forEach(p => {
      if (typeof p.getTabBar === 'function') {
        const tabBar = p.getTabBar();
        if (tabBar) tabBar.setData({ badge: count });
      }
    });
  },

  globalData: {
    userInfo: null,
    cartBadge: 0
  }
});
