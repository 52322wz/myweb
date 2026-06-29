Component({
  properties: {
    product: {
      type: Object,
      value: {}
    },
    // 是否显示"加入购物车"按钮
    showAddBtn: {
      type: Boolean,
      value: true
    }
  },

  methods: {
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
