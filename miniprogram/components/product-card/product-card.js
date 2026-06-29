Component({
  properties: {
    product: {
      type: Object,
      value: {},
      observer: 'formatProduct'
    },
    // 是否显示"加入购物车"按钮
    showAddBtn: {
      type: Boolean,
      value: true
    }
  },

  methods: {
    formatProduct(product) {
      if (!product) return;
      const sales = product.sales;
      let salesText = '';
      if (sales >= 10000) {
        salesText = (sales / 10000).toFixed(1) + '万';
      } else if (sales > 0) {
        salesText = String(sales);
      }
      this.setData({ salesText });
    },

    onTap() {
      this.triggerEvent('tap', { product: this.data.product });
    },

    onAddToCart(e) {
      // 阻止事件冒泡到父级（防止同时触发跳转）
      e.stopPropagation && e.stopPropagation();
      this.triggerEvent('addtocart', { product: this.data.product });
    }
  }
});
