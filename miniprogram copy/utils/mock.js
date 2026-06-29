/**
 * 模拟商品数据
 * 使用 picsum.photos 作为商品图片（微信小程序需配置 downloadFile 域名）
 */

const products = [
  {
    id: 1,
    name: '无线蓝牙耳机 Pro Max',
    category: '数码',
    price: 299.00,
    originalPrice: 499.00,
    images: [
      'https://picsum.photos/seed/headphone1/400/400',
      'https://picsum.photos/seed/headphone2/400/400',
      'https://picsum.photos/seed/headphone3/400/400'
    ],
    desc: '高品质降噪蓝牙耳机，40小时超长续航，佩戴舒适，音质出色。支持蓝牙5.3，低延迟游戏模式，IPX5级防水，运动无忧。',
    sales: 3280,
    stock: 99
  },
  {
    id: 2,
    name: '轻薄笔记本电脑 15.6英寸',
    category: '数码',
    price: 4999.00,
    originalPrice: 5999.00,
    images: [
      'https://picsum.photos/seed/laptop1/400/400',
      'https://picsum.photos/seed/laptop2/400/400'
    ],
    desc: '12代酷睿i7处理器，16GB内存，512GB固态硬盘。15.6英寸2K高清屏，全金属机身，轻薄便携。',
    sales: 1560,
    stock: 45
  },
  {
    id: 3,
    name: '智能手表 S8 Ultra',
    category: '数码',
    price: 899.00,
    originalPrice: 1299.00,
    images: [
      'https://picsum.photos/seed/watch1/400/400',
      'https://picsum.photos/seed/watch2/400/400',
      'https://picsum.photos/seed/watch3/400/400'
    ],
    desc: '1.75英寸AMOLED屏幕，支持心率/血氧/睡眠监测，100+运动模式，5ATM防水，14天超长续航。',
    sales: 5680,
    stock: 120
  },
  {
    id: 4,
    name: '纯棉圆领短袖T恤 男款',
    category: '服饰',
    price: 79.00,
    originalPrice: 159.00,
    images: [
      'https://picsum.photos/seed/tshirt1/400/400',
      'https://picsum.photos/seed/tshirt2/400/400'
    ],
    desc: '100%新疆长绒棉，亲肤透气，不易变形。多色可选，简约百搭，四季可穿。',
    sales: 12500,
    stock: 500
  },
  {
    id: 5,
    name: '复古高腰直筒牛仔裤',
    category: '服饰',
    price: 189.00,
    originalPrice: 359.00,
    images: [
      'https://picsum.photos/seed/jeans1/400/400',
      'https://picsum.photos/seed/jeans2/400/400',
      'https://picsum.photos/seed/jeans3/400/400'
    ],
    desc: '高品质牛仔面料，复古水洗工艺，高腰设计修饰腿型。四季百搭单品。',
    sales: 8900,
    stock: 320
  },
  {
    id: 6,
    name: '休闲运动跑鞋 轻便透气',
    category: '服饰',
    price: 269.00,
    originalPrice: 499.00,
    images: [
      'https://picsum.photos/seed/shoes1/400/400',
      'https://picsum.photos/seed/shoes2/400/400'
    ],
    desc: '飞织透气鞋面，EVA缓冲中底，橡胶防滑大底。轻盈舒适，适合日常运动和休闲穿搭。',
    sales: 6700,
    stock: 200
  },
  {
    id: 7,
    name: '每日坚果混合装 750g',
    category: '食品',
    price: 69.00,
    originalPrice: 99.00,
    images: [
      'https://picsum.photos/seed/nuts1/400/400',
      'https://picsum.photos/seed/nuts2/400/400'
    ],
    desc: '精选6种坚果果干：腰果、巴旦木、核桃仁、蔓越莓干、蓝莓干、榛子仁。每日一包，营养均衡。',
    sales: 23500,
    stock: 800
  },
  {
    id: 8,
    name: '进口牛奶巧克力礼盒',
    category: '食品',
    price: 128.00,
    originalPrice: 198.00,
    images: [
      'https://picsum.photos/seed/chocolate1/400/400',
      'https://picsum.photos/seed/chocolate2/400/400',
      'https://picsum.photos/seed/chocolate3/400/400'
    ],
    desc: '比利时进口可可脂，纯手工制作，16颗精致礼盒装。送女友、送闺蜜、送同事的最佳选择。',
    sales: 4200,
    stock: 150
  },
  {
    id: 9,
    name: '有机绿茶 明前龙井 200g',
    category: '食品',
    price: 158.00,
    originalPrice: 258.00,
    images: [
      'https://picsum.photos/seed/tea1/400/400',
      'https://picsum.photos/seed/tea2/400/400'
    ],
    desc: '西湖核心产区，明前采摘头采嫩芽，手工炒制。色泽翠绿，香气清高，滋味鲜爽回甘。',
    sales: 3100,
    stock: 90
  },
  {
    id: 10,
    name: '保湿补水精华液 30ml',
    category: '美妆',
    price: 149.00,
    originalPrice: 289.00,
    images: [
      'https://picsum.photos/seed/serum1/400/400',
      'https://picsum.photos/seed/serum2/400/400'
    ],
    desc: '三重玻尿酸深层补水，神经酰胺修护屏障，烟酰胺提亮肤色。适合所有肤质，敏感肌也可使用。',
    sales: 9800,
    stock: 260
  },
  {
    id: 11,
    name: '哑光口红唇膏 6色可选',
    category: '美妆',
    price: 89.00,
    originalPrice: 169.00,
    images: [
      'https://picsum.photos/seed/lipstick1/400/400',
      'https://picsum.photos/seed/lipstick2/400/400',
      'https://picsum.photos/seed/lipstick3/400/400'
    ],
    desc: '丝绒哑光质地，高显色不拔干。含维生素E护唇成分，持久不脱色。日常百搭6色可选。',
    sales: 15600,
    stock: 400
  },
  {
    id: 12,
    name: '氨基酸温和洁面乳 120g',
    category: '美妆',
    price: 59.00,
    originalPrice: 99.00,
    images: [
      'https://picsum.photos/seed/cleanser1/400/400',
      'https://picsum.photos/seed/cleanser2/400/400'
    ],
    desc: '氨基酸表活温和清洁，不紧绷不假滑。添加神经酰胺和积雪草提取物，洁面同时修护肌肤屏障。',
    sales: 21000,
    stock: 600
  }
];

/**
 * 获取所有商品
 */
function getProducts() {
  return products;
}

/**
 * 根据分类筛选商品
 * @param {string} category - 分类名，传 '全部' 返回所有
 */
function getProductsByCategory(category) {
  if (!category || category === '全部') return products;
  return products.filter(p => p.category === category);
}

/**
 * 根据关键词搜索商品
 * @param {string} keyword
 */
function searchProducts(keyword) {
  if (!keyword) return products;
  const kw = keyword.toLowerCase();
  return products.filter(p =>
    p.name.toLowerCase().includes(kw) ||
    p.category.toLowerCase().includes(kw) ||
    p.desc.toLowerCase().includes(kw)
  );
}

/**
 * 根据 ID 获取商品详情
 * @param {number} id
 */
function getProductById(id) {
  return products.find(p => p.id === id) || null;
}

/**
 * 获取所有分类
 */
function getCategories() {
  return ['全部', ...new Set(products.map(p => p.category))];
}

module.exports = {
  getProducts,
  getProductsByCategory,
  searchProducts,
  getProductById,
  getCategories
};
