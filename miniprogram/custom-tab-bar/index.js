Component({
  data: {
    selected: 0,
    badge: 0,
    list: [
      { pagePath: '/pages/index/index', text: '首页', icon: 'home' },
      { pagePath: '/pages/cart/cart', text: '购物车', icon: 'cart' },
      { pagePath: '/pages/orders/orders', text: '订单', icon: 'orders' },
      { pagePath: '/pages/my/my', text: '我的', icon: 'my' }
    ]
  },

  attached() {
    // 根据当前页面设置选中状态
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    if (currentPage) {
      const route = '/' + currentPage.route;
      const index = this.data.list.findIndex(item => item.pagePath === route);
      if (index >= 0) this.setData({ selected: index });
    }
  },

  methods: {
    switchTab(e) {
      const index = e.currentTarget.dataset.index;
      const item = this.data.list[index];
      wx.switchTab({ url: item.pagePath });
    }
  },

  // 供外部调用更新角标
  updateBadge(count) {
    this.setData({ badge: count });
  }
});
