export interface Store {
  id: string;
  name: string;
  code: string;
  type: '直营店' | '加盟店';
  region: string;
  city: string;
  district: string;
  address: string;
  contactName: string;
  contactPhone: string;
  status: '已启用' | '未启用';
  activityLevel: '高活跃' | '持续活跃' | '待激活';
  configStatus: {
    contentDistribution: boolean;
    miniProgram: boolean;
    qrCode: boolean;
    guideInfo: boolean;
  };
  stats: {
    weeklyContentViews: number;
    weeklyCustomerScans: number;
    recentDistributions: number;
    recentInquiries: number;
  };
}

export const storeFilters = {
  basic: ['全部门店', '直营店', '加盟店', '已启用', '未启用'],
  region: ['华东', '华南', '华北', '西南', '其他区域'],
  operation: ['本周活跃', '最近已接收分发', '配置未完成', '二维码待配置', '近期高转化门店']
};

export const mockStores: Store[] = [
  {
    id: 's1',
    name: '上海静安嘉里中心店',
    code: 'SH-001',
    type: '直营店',
    region: '华东',
    city: '上海市',
    district: '静安寺商圈',
    address: '上海市静安区南京西路1515号',
    contactName: '林店长',
    contactPhone: '13800138001',
    status: '已启用',
    activityLevel: '高活跃',
    configStatus: {
      contentDistribution: true,
      miniProgram: true,
      qrCode: true,
      guideInfo: true,
    },
    stats: {
      weeklyContentViews: 342,
      weeklyCustomerScans: 856,
      recentDistributions: 12,
      recentInquiries: 45,
    }
  },
  {
    id: 's2',
    name: '杭州万象城旗舰店',
    code: 'HZ-001',
    type: '直营店',
    region: '华东',
    city: '杭州市',
    district: '钱江新城',
    address: '浙江省杭州市上城区富春路701号',
    contactName: '陈店长',
    contactPhone: '13900139002',
    status: '已启用',
    activityLevel: '持续活跃',
    configStatus: {
      contentDistribution: true,
      miniProgram: true,
      qrCode: true,
      guideInfo: false,
    },
    stats: {
      weeklyContentViews: 156,
      weeklyCustomerScans: 420,
      recentDistributions: 8,
      recentInquiries: 22,
    }
  },
  {
    id: 's3',
    name: '广州天河城加盟店',
    code: 'GZ-102',
    type: '加盟店',
    region: '华南',
    city: '广州市',
    district: '天河路商圈',
    address: '广东省广州市天河区天河路208号',
    contactName: '王老板',
    contactPhone: '13700137003',
    status: '已启用',
    activityLevel: '待激活',
    configStatus: {
      contentDistribution: true,
      miniProgram: false,
      qrCode: false,
      guideInfo: false,
    },
    stats: {
      weeklyContentViews: 12,
      weeklyCustomerScans: 5,
      recentDistributions: 2,
      recentInquiries: 1,
    }
  },
  {
    id: 's4',
    name: '北京三里屯太古里店',
    code: 'BJ-001',
    type: '直营店',
    region: '华北',
    city: '北京市',
    district: '三里屯',
    address: '北京市朝阳区三里屯路19号',
    contactName: '张店长',
    contactPhone: '13600136004',
    status: '已启用',
    activityLevel: '高活跃',
    configStatus: {
      contentDistribution: true,
      miniProgram: true,
      qrCode: true,
      guideInfo: true,
    },
    stats: {
      weeklyContentViews: 428,
      weeklyCustomerScans: 1024,
      recentDistributions: 15,
      recentInquiries: 68,
    }
  },
  {
    id: 's5',
    name: '成都IFS国际金融中心店',
    code: 'CD-001',
    type: '直营店',
    region: '西南',
    city: '成都市',
    district: '春熙路',
    address: '四川省成都市锦江区红星路三段1号',
    contactName: '李店长',
    contactPhone: '13500135005',
    status: '已启用',
    activityLevel: '持续活跃',
    configStatus: {
      contentDistribution: true,
      miniProgram: true,
      qrCode: false,
      guideInfo: true,
    },
    stats: {
      weeklyContentViews: 210,
      weeklyCustomerScans: 380,
      recentDistributions: 10,
      recentInquiries: 30,
    }
  },
  {
    id: 's6',
    name: '深圳万象天地加盟店',
    code: 'SZ-105',
    type: '加盟店',
    region: '华南',
    city: '深圳市',
    district: '科技园',
    address: '广东省深圳市南山区深南大道9668号',
    contactName: '赵老板',
    contactPhone: '13400134006',
    status: '未启用',
    activityLevel: '待激活',
    configStatus: {
      contentDistribution: false,
      miniProgram: false,
      qrCode: false,
      guideInfo: false,
    },
    stats: {
      weeklyContentViews: 0,
      weeklyCustomerScans: 0,
      recentDistributions: 0,
      recentInquiries: 0,
    }
  }
];
