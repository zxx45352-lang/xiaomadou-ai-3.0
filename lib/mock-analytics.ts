export const coreMetrics = [
  {
    id: 'generated',
    name: '素材生成总数',
    value: '12,450',
    trend: '+15.2%',
    isUp: true,
    description: '本月通过 AI 生成的图文与视频总数',
  },
  {
    id: 'distributed',
    name: '内容分发总数',
    value: '8,234',
    trend: '+8.4%',
    isUp: true,
    description: '成功推送到各门店终端的内容批次',
  },
  {
    id: 'store_views',
    name: '门店查看次数',
    value: '45,210',
    trend: '+22.1%',
    isUp: true,
    description: '导购在企业微信/小程序中查看素材的次数',
  },
  {
    id: 'store_shares',
    name: '门店转发次数',
    value: '32,105',
    trend: '+18.5%',
    isUp: true,
    description: '导购将素材转发给顾客或朋友圈的次数',
  },
  {
    id: 'customer_scans',
    name: '顾客扫码/点击',
    value: '128,450',
    trend: '+35.4%',
    isUp: true,
    description: '顾客通过海报扫码或点击链接的访问量',
  },
  {
    id: 'customer_consults',
    name: '顾客咨询次数',
    value: '15,230',
    trend: '+12.3%',
    isUp: true,
    description: '顾客阅览内容后发起的有效咨询对话',
  },
  {
    id: 'coupons_claimed',
    name: '到店领券次数',
    value: '8,450',
    trend: '-2.1%',
    isUp: false,
    description: '顾客在线上领取并在门店核销的优惠券',
  },
  {
    id: 'conversion_rate',
    name: '互动转化率',
    value: '11.8%',
    trend: '+1.2%',
    isUp: true,
    description: '从扫码查看到发起咨询的整体转化率',
  },
];

export const trendData = [
  { date: '03-01', scans: 4200, consults: 450, shares: 1200 },
  { date: '03-02', scans: 4800, consults: 520, shares: 1350 },
  { date: '03-03', scans: 5100, consults: 580, shares: 1420 },
  { date: '03-04', scans: 4900, consults: 510, shares: 1380 },
  { date: '03-05', scans: 6200, consults: 720, shares: 1800 },
  { date: '03-06', scans: 7500, consults: 890, shares: 2100 },
  { date: '03-07', scans: 8100, consults: 950, shares: 2300 },
  { date: '03-08', scans: 12500, consults: 1450, shares: 3500 }, // Campaign day
  { date: '03-09', scans: 9800, consults: 1100, shares: 2800 },
  { date: '03-10', scans: 8500, consults: 920, shares: 2400 },
  { date: '03-11', scans: 8200, consults: 880, shares: 2250 },
  { date: '03-12', scans: 8900, consults: 960, shares: 2500 },
  { date: '03-13', scans: 9500, consults: 1050, shares: 2700 },
  { date: '03-14', scans: 10200, consults: 1180, shares: 2900 },
];

export const productRanking = [
  { id: 'p1', name: '女童春季碎花连衣裙', scans: 24500, consults: 3200, tag: '爆款潜质' },
  { id: 'p2', name: '男童防风防水冲锋衣', scans: 18200, consults: 2100, tag: '稳定转化' },
  { id: 'p3', name: '婴儿A类纯棉连体衣', scans: 15400, consults: 850, tag: '高曝光低转化' },
  { id: 'p4', name: '儿童抗菌防蚊运动裤', scans: 12800, consults: 1950, tag: '高意向' },
  { id: 'p5', name: '女童法式复古针织开衫', scans: 9600, consults: 1200, tag: '稳定转化' },
];

export const templateRanking = [
  { id: 't1', name: '春季上新·早春穿搭指南', uses: 1250, scans: 35000, consults: 4200, type: '上新' },
  { id: 't2', name: '限时秒杀·倒计时海报', uses: 890, scans: 28000, consults: 3800, type: '促销' },
  { id: 't3', name: '店长推荐·日常种草', uses: 2100, scans: 22000, consults: 1500, type: '日常' },
  { id: 't4', name: '节日特辑·女神节专属', uses: 650, scans: 18500, consults: 2900, type: '节日' },
  { id: 't5', name: '换季清仓·断码特惠', uses: 420, scans: 15000, consults: 2100, type: '清仓' },
];

export const storeRanking = [
  { id: 's1', name: '上海静安嘉里中心店', views: 850, shares: 620, feedbacks: 145 },
  { id: 's2', name: '北京三里屯太古里店', views: 780, shares: 590, feedbacks: 132 },
  { id: 's3', name: '广州天环广场店', views: 920, shares: 410, feedbacks: 85 }, // High view, low share
  { id: 's4', name: '深圳万象天地店', views: 650, shares: 580, feedbacks: 128 }, // High conversion
  { id: 's5', name: '成都 IFS 旗舰店', views: 710, shares: 520, feedbacks: 110 },
];

export const aiSuggestions = [
  {
    id: 'sug1',
    type: 'product',
    title: '商品转化漏斗异常',
    content: '发现【婴儿A类纯棉连体衣】近期扫码曝光量极高（15,400次），但咨询转化率仅为 5.5%，远低于大盘平均水平。建议优化该商品的落地页文案，增加“无骨缝制”、“A类安全标准”等宝妈关注的卖点。',
    actionText: '去优化商品',
    actionLink: '/products',
    priority: 'high',
  },
  {
    id: 'sug2',
    type: 'template',
    title: '促销模板场景错配',
    content: '【店长推荐·日常种草】模板被大量用于清仓商品（占比42%），导致顾客领券意愿偏低。建议在模板中心上架更多针对“换季断码、清仓”场景的强转化模板，并向导购推送使用指南。',
    actionText: '查看模板分析',
    actionLink: '/templates',
    priority: 'medium',
  },
  {
    id: 'sug3',
    type: 'store',
    title: '门店执行力亟待提升',
    content: '【广州天环广场店】本周查看总部素材 920 次（区域第一），但实际转发给顾客的次数仅为 410 次（转化率 44%）。导购可能对内容不自信或缺乏分发动力，建议区域督导重点跟进培训。',
    actionText: '联系门店督导',
    actionLink: '/stores',
    priority: 'high',
  },
  {
    id: 'sug4',
    type: 'strategy',
    title: '区域内容偏好洞察',
    content: '数据表明，华南大区门店对【男童防风防水冲锋衣】的推广反馈极佳，顾客咨询率比其他区域高出 35%。建议针对华南大区增加该品类的主推内容投放，并生成更多户外踏青场景的配图。',
    actionText: '生成定向内容',
    actionLink: '/workspace/generate',
    priority: 'low',
  },
];
