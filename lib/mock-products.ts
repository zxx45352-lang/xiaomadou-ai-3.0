export interface Product {
  id: string;
  name: string;
  spu: string;
  category: string;
  gender: string;
  ageGroup: string;
  season: string;
  price: number;
  status: '上架中' | '已下架';
  tags: string[];
  coverUrl: string;
  images: string[];
  sellingPoints: string;
  contentStats: {
    generatedCount: number;
    compatibleTemplates: number;
    distributedCount: number;
    lastGeneratedAt: string;
  };
}

export const productCategories = [
  '全部商品',
  '上新商品',
  '清仓商品',
  '主推商品',
  '节日活动',
  '已下架',
];

export const quickFilters = [
  '今日主推候选',
  '最近新增',
  '最近生成过内容',
  '高扫码商品',
  '适合本周上新',
  '适合清仓海报',
];

export const mockProducts: Product[] = [
  {
    id: 'p1',
    name: '春季新款女童法式碎花连衣裙',
    spu: 'DR2024SP001',
    category: '连衣裙',
    gender: '女童',
    ageGroup: '3-8岁',
    season: '春季',
    price: 299,
    status: '上架中',
    tags: ['上新', '主推', '高转化'],
    coverUrl: 'https://picsum.photos/seed/p1/400/400',
    images: [
      'https://picsum.photos/seed/p1/800/800',
      'https://picsum.photos/seed/p1-2/800/800',
    ],
    sellingPoints: '法式复古碎花设计，纯棉透气面料，A字版型显瘦，适合春日踏青出游。',
    contentStats: {
      generatedCount: 12,
      compatibleTemplates: 8,
      distributedCount: 5,
      lastGeneratedAt: '2026-03-12',
    },
  },
  {
    id: 'p2',
    name: '男童防风机能连帽风衣',
    spu: 'JK2024SP012',
    category: '外套',
    gender: '男童',
    ageGroup: '5-12岁',
    season: '春季',
    price: 359,
    status: '上架中',
    tags: ['上新', '户外'],
    coverUrl: 'https://picsum.photos/seed/p2/400/400',
    images: [
      'https://picsum.photos/seed/p2/800/800',
    ],
    sellingPoints: '防风防泼水面料，多口袋机能设计，轻薄便携，适合春季多变天气。',
    contentStats: {
      generatedCount: 8,
      compatibleTemplates: 5,
      distributedCount: 3,
      lastGeneratedAt: '2026-03-10',
    },
  },
  {
    id: 'p3',
    name: '婴童A类纯棉连体衣套装',
    spu: 'BS2024SP005',
    category: '套装',
    gender: '通用',
    ageGroup: '0-2岁',
    season: '四季',
    price: 159,
    status: '上架中',
    tags: ['爆款', '高复购'],
    coverUrl: 'https://picsum.photos/seed/p3/400/400',
    images: [
      'https://picsum.photos/seed/p3/800/800',
    ],
    sellingPoints: 'A类婴幼儿标准，100%精梳棉，无骨缝制工艺，保护宝宝娇嫩肌肤。',
    contentStats: {
      generatedCount: 24,
      compatibleTemplates: 12,
      distributedCount: 15,
      lastGeneratedAt: '2026-03-13',
    },
  },
  {
    id: 'p4',
    name: '女童复古水洗直筒牛仔裤',
    spu: 'PT2024SP008',
    category: '裤装',
    gender: '女童',
    ageGroup: '4-10岁',
    season: '春秋',
    price: 199,
    status: '上架中',
    tags: ['百搭', '日常'],
    coverUrl: 'https://picsum.photos/seed/p4/400/400',
    images: [
      'https://picsum.photos/seed/p4/800/800',
    ],
    sellingPoints: '环保水洗工艺，柔软不僵硬，直筒宽松版型，百搭各种上衣。',
    contentStats: {
      generatedCount: 5,
      compatibleTemplates: 15,
      distributedCount: 2,
      lastGeneratedAt: '2026-03-05',
    },
  },
  {
    id: 'p5',
    name: '中大童速干运动T恤',
    spu: 'TS2024SP022',
    category: 'T恤',
    gender: '通用',
    ageGroup: '6-14岁',
    season: '夏季',
    price: 99,
    status: '上架中',
    tags: ['清仓', '运动'],
    coverUrl: 'https://picsum.photos/seed/p5/400/400',
    images: [
      'https://picsum.photos/seed/p5/800/800',
    ],
    sellingPoints: '冰丝速干面料，吸湿排汗，抗菌防臭，适合夏季高强度运动。',
    contentStats: {
      generatedCount: 3,
      compatibleTemplates: 6,
      distributedCount: 1,
      lastGeneratedAt: '2026-02-28',
    },
  },
  {
    id: 'p6',
    name: '女童甜美针织开衫',
    spu: 'CD2024SP015',
    category: '毛衣/针织',
    gender: '女童',
    ageGroup: '3-9岁',
    season: '春秋',
    price: 229,
    status: '已下架',
    tags: ['季末清仓'],
    coverUrl: 'https://picsum.photos/seed/p6/400/400',
    images: [
      'https://picsum.photos/seed/p6/800/800',
    ],
    sellingPoints: '马卡龙色系，柔软包芯纱，珍珠纽扣点缀，温柔甜美。',
    contentStats: {
      generatedCount: 18,
      compatibleTemplates: 10,
      distributedCount: 8,
      lastGeneratedAt: '2025-11-15',
    },
  }
];
