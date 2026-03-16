export interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  outputType: string;
  style: string;
  target: string;
  tags: string[];
  usageCount: number;
  coverUrl: string;
  isHot?: boolean;
}

export const templateCategories = [
  '全部模板',
  '上新推广',
  '清仓促销',
  '门店种草',
  '活动海报',
  '商品专题页',
  '顾客体验引导',
];

export const filterOptions = {
  outputType: ['朋友圈图', '多图套图', '专题页封面', '海报'],
  style: ['清新买手店', '韩系潮搭', '日杂上新', '轻运动', '活动促销'],
  target: ['男童', '女童', '通用'],
  frequency: ['常用', '最近新增', '平台推荐'],
};

export const templates: Template[] = [
  {
    id: 't1',
    title: '春季法式碎花裙上新',
    description: '适合春季连衣裙、碎花元素的单品上新，带有一点复古法式滤镜，能很好地衬托女童的甜美气质。',
    category: '上新推广',
    outputType: '朋友圈图',
    style: '清新买手店',
    target: '女童',
    tags: ['适合上新', '高转化'],
    usageCount: 12540,
    coverUrl: 'https://picsum.photos/seed/t1/600/800',
    isHot: true,
  },
  {
    id: 't2',
    title: '户外机能风穿搭多图',
    description: '适合冲锋衣、运动裤等户外机能风商品，多图排版展示细节，突出服装的功能性与活力感。',
    category: '门店种草',
    outputType: '多图套图',
    style: '轻运动',
    target: '男童',
    tags: ['平台推荐'],
    usageCount: 8430,
    coverUrl: 'https://picsum.photos/seed/t2/600/600',
  },
  {
    id: 't3',
    title: '夏日清仓大促海报',
    description: '强视觉冲击力的促销海报，大字号排版，适合季末清仓、节日大促使用，能有效吸引顾客注意力。',
    category: '清仓促销',
    outputType: '海报',
    style: '活动促销',
    target: '通用',
    tags: ['适合清仓'],
    usageCount: 23100,
    coverUrl: 'https://picsum.photos/seed/t3/600/900',
    isHot: true,
  },
  {
    id: 't4',
    title: '韩系简约日常穿搭',
    description: '干净清爽的韩系风格，低饱和度色调，适合基础款T恤、牛仔裤的日常种草，百搭不出错。',
    category: '门店种草',
    outputType: '朋友圈图',
    style: '韩系潮搭',
    target: '通用',
    tags: ['高转化'],
    usageCount: 15200,
    coverUrl: 'https://picsum.photos/seed/t4/600/750',
  },
  {
    id: 't5',
    title: '日系元气少女感封面',
    description: '适合色彩明快、元气可爱的女童服饰，用于专题页封面，带有日系杂志排版风格。',
    category: '商品专题页',
    outputType: '专题页封面',
    style: '日杂上新',
    target: '女童',
    tags: ['平台推荐'],
    usageCount: 6800,
    coverUrl: 'https://picsum.photos/seed/t5/600/500',
  },
  {
    id: 't6',
    title: '冬日保暖羽绒服特辑',
    description: '强调保暖、厚实感的冬日场景，适合羽绒服、棉服推广，带有雪景或暖色调室内背景。',
    category: '上新推广',
    outputType: '多图套图',
    style: '清新买手店',
    target: '通用',
    tags: ['适合上新'],
    usageCount: 9200,
    coverUrl: 'https://picsum.photos/seed/t6/600/850',
  },
  {
    id: 't7',
    title: '六一儿童节活动海报',
    description: '充满童趣和欢乐氛围的节日专属海报模板，色彩丰富，带有气球、礼物等元素。',
    category: '活动海报',
    outputType: '海报',
    style: '活动促销',
    target: '通用',
    tags: ['节日专属'],
    usageCount: 18500,
    coverUrl: 'https://picsum.photos/seed/t7/600/700',
    isHot: true,
  },
  {
    id: 't8',
    title: '男童街头滑板风',
    description: '酷炫的街头运动风格，高对比度，适合潮牌童装、运动鞋服，展现男童个性。',
    category: '门店种草',
    outputType: '朋友圈图',
    style: '轻运动',
    target: '男童',
    tags: ['高转化'],
    usageCount: 11300,
    coverUrl: 'https://picsum.photos/seed/t8/600/650',
  },
  {
    id: 't9',
    title: '高级感极简商品展示',
    description: '纯色背景，极简排版，突出商品本身的材质和剪裁，适合高端线童装。',
    category: '上新推广',
    outputType: '多图套图',
    style: '清新买手店',
    target: '通用',
    tags: ['高级感'],
    usageCount: 5400,
    coverUrl: 'https://picsum.photos/seed/t9/600/800',
  },
  {
    id: 't10',
    title: '开学季穿搭指南',
    description: '学院风排版，适合秋季开学季的衬衫、百褶裙、针织衫等商品推广。',
    category: '活动海报',
    outputType: '专题页封面',
    style: '日杂上新',
    target: '通用',
    tags: ['场景化'],
    usageCount: 14200,
    coverUrl: 'https://picsum.photos/seed/t10/600/600',
    isHot: true,
  }
];
