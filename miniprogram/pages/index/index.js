const mock = require('../../utils/mock');
const storage = require('../../utils/storage');

Page({
  data: {
    categories: [],
    activeCategory: '全部',
    products: [],
    searchKeyword: '',
    allProducts: []
  },

  onLoad() {
    const categories = mock.getCategories();
    const allProducts = mock.getProducts();
    this.setData({
      categories,
      products: allProducts,
      allProducts,
      activeCategory: '全部'
    });
  },

  onShow() {
    // 同步自定义 tabBar 状态
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 0, badge: storage.getCartCount() });
    }
  },

  /** 切换分类 */
  onCategoryTap(e) {
    const category = e.currentTarget.dataset.category;
    if (category === this.data.activeCategory) return;
    const products = mock.getProductsByCategory(category);
    this.setData({
      activeCategory: category,
      products,
      searchKeyword: ''
    });
  },

  /** 搜索输入 */
  onSearchInput(e) {
    const keyword = e.detail.value;
    this.setData({ searchKeyword: keyword });
    if (!keyword.trim()) {
      this.setData({ products: mock.getProductsByCategory(this.data.activeCategory === '全部' ? '' : this.data.activeCategory) });
      return;
    }
    const results = mock.searchProducts(keyword);
    this.setData({ products: results });
  },

  /** 清除搜索 */
  onClearSearch() {
    this.setData({ searchKeyword: '' });
    this.setData({ products: mock.getProductsByCategory(this.data.activeCategory === '全部' ? '' : this.data.activeCategory) });
  },

  /** 点击商品 */
  onProductTap(e) {
    const { product } = e.detail;
    wx.navigateTo({
      url: `/pages/product/product?id=${product.id}`
    });
  },

  /** 加入购物车 */
  onAddToCart(e) {
    const { product } = e.detail;
    storage.addToCart(product);
    getApp().updateCartBadge();
    wx.showToast({
      title: '已加入购物车',
      icon: 'success',
      duration: 1200
    });
  },

  /** 下拉刷新 */
  onPullDownRefresh() {
    this.setData({
      products: mock.getProducts(),
      activeCategory: '全部',
      searchKeyword: ''
    });
    wx.stopPullDownRefresh();
  }
});
