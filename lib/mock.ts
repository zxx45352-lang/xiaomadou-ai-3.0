export const metrics = [
  { title: '今日生成素材数', value: '1,240', trend: '+12.5%', isUp: true },
  { title: '本周主推商品数', value: '45', trend: '+5.2%', isUp: true },
  { title: '门店已查看素材数', value: '8,432', trend: '+24.1%', isUp: true },
  { title: '门店已转发次数', value: '3,210', trend: '+18.3%', isUp: true },
  { title: '顾客扫码次数', value: '12,540', trend: '+32.4%', isUp: true },
  { title: '顾客咨询次数', value: '840', trend: '-2.1%', isUp: false },
  { title: '到店领券次数', value: '320', trend: '+15.0%', isUp: true },
];

export const scanTrendData = [
  { date: '03-07', scans: 1200 },
  { date: '03-08', scans: 1350 },
  { date: '03-09', scans: 1100 },
  { date: '03-10', scans: 1600 },
  { date: '03-11', scans: 1850 },
  { date: '03-12', scans: 2100 },
  { date: '03-13', scans: 2450 },
];

export const interactionTrendData = [
  { date: '03-07', inquiries: 120, coupons: 45 },
  { date: '03-08', inquiries: 135, coupons: 50 },
  { date: '03-09', inquiries: 110, coupons: 40 },
  { date: '03-10', inquiries: 160, coupons: 65 },
  { date: '03-11', inquiries: 185, coupons: 80 },
  { date: '03-12', inquiries: 210, coupons: 95 },
  { date: '03-13', inquiries: 240, coupons: 120 },
];

export const hotProducts = [
  { id: '1', name: '春季新款女童法式碎花连衣裙', spu: 'DR2024SP001', scans: 3420, status: '上架中' },
  { id: '2', name: '男童防风机能连帽风衣', spu: 'JK2024SP012', scans: 2890, status: '上架中' },
  { id: '3', name: '婴童A类纯棉连体衣套装', spu: 'BS2024SP005', scans: 2150, status: '缺货预警' },
  { id: '4', name: '女童复古水洗直筒牛仔裤', spu: 'PT2024SP008', scans: 1840, status: '上架中' },
  { id: '5', name: '中大童速干运动T恤', spu: 'TS2024SP022', scans: 1560, status: '上架中' },
];

export const activeStores = [
  { id: '1', name: '杭州万象城旗舰店', region: '华东', forwards: 452, status: '极度活跃' },
  { id: '2', name: '上海环球港店', region: '华东', forwards: 385, status: '活跃' },
  { id: '3', name: '北京朝阳大悦城店', region: '华北', forwards: 340, status: '活跃' },
  { id: '4', name: '成都 IFS 国金中心店', region: '西南', forwards: 290, status: '活跃' },
  { id: '5', name: '深圳万象天地店', region: '华南', forwards: 275, status: '活跃' },
];

export const insights = [
  {
    id: '1',
    type: 'warning',
    title: '转化漏斗异常',
    content: '「春季新款女童法式碎花连衣裙」扫码量极高（3,420次），但咨询转化率仅为 2.1%，远低于均值（5%）。建议优化导购话术，或更换更突出卖点的商品海报。',
  },
  {
    id: '2',
    type: 'action',
    title: '门店执行力待提升',
    content: '「广州天环广场店」本周查看素材 120 次，但转发仅 12 次。建议区域督导跟进门店导购的企微使用情况与执行意愿。',
  },
  {
    id: '3',
    type: 'success',
    title: '爆款素材潜力',
    content: '昨日生成的「男童机能风衣-九宫格」素材，在华东大区转发后 2 小时内带来 800+ 扫码，建议将该模板设为本周全网主推。',
  },
];
