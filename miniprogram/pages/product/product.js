const mock = require('../../utils/mock');
const storage = require('../../utils/storage');

Page({
  data: {
    product: null,
    currentImageIndex: 0,
    quantity: 1,
    savingsText: '',
    salesText: ''
  },

  onLoad(options) {
    const id = parseInt(options.id);
    const product = mock.getProductById(id);
    if (product) {
      this.setData({ product });
      this.formatProduct(product);
      wx.setNavigationBarTitle({ title: product.name });
    }
  },

  /** 格式化商品展示数据（WXML不支持toFixed等JS方法） */
  formatProduct(product) {
    const data = {};
    if (product.originalPrice) {
      data.savingsText = (product.originalPrice - product.price).toFixed(0);
    }
    if (product.sales >= 10000) {
      data.salesText = (product.sales / 10000).toFixed(1) + '万';
    } else {
      data.salesText = String(product.sales);
    }
    this.setData(data);
  },

  /** 轮播图切换 */
  onSwiperChange(e) {
    this.setData({ currentImageIndex: e.detail.current });
  },

  /** 图片预览 */
  onPreviewImage(e) {
    const { index } = e.currentTarget.dataset;
    wx.previewImage({
      current: this.data.product.images[index],
      urls: this.data.product.images
    });
  },

  /** 数量减少 */
  onMinus() {
    if (this.data.quantity > 1) {
      this.setData({ quantity: this.data.quantity - 1 });
    }
  },

  /** 数量增加 */
  onPlus() {
    if (this.data.quantity < this.data.product.stock) {
      this.setData({ quantity: this.data.quantity + 1 });
    } else {
      wx.showToast({ title: '库存不足', icon: 'none' });
    }
  },

  /** 加入购物车 */
  onAddToCart() {
    storage.addToCart(this.data.product, this.data.quantity);
    getApp().updateCartBadge();
    wx.showToast({ title: '已加入购物车', icon: 'success' });
  },

  /** 立即购买 */
  onBuyNow() {
    // 先加入购物车，再跳转结算
    storage.addToCart(this.data.product, this.data.quantity);
    // 将刚加入的商品设为选中
    const cart = storage.getCart();
    cart.forEach(item => {
      item.selected = (item.id === this.data.product.id);
    });
    storage.saveCart(cart);
    getApp().updateCartBadge();
    wx.navigateTo({ url: '/pages/checkout/checkout' });
  },

  /** 分享 */
  onShareAppMessage() {
    const { product } = this.data;
    return {
      title: product ? product.name : '晓峰酱菜',
      path: `/pages/product/product?id=${product.id}`
    };
  }
});
