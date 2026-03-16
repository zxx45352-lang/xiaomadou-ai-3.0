'use client';

import { useState } from 'react';
import { 
  Send, ChevronDown, Copy, RefreshCw, MoreHorizontal, 
  Loader2, QrCode, MessageSquare, Trash2, Star,
  Package, LayoutTemplate, Smartphone, CheckCircle2
} from 'lucide-react';
import Link from 'next/link';

// Mock Data
const mockSelectedContent = {
  taskName: '春季连衣裙上新',
  templateName: '法式复古胶片风',
  productName: '春季新款女童法式碎花连衣裙',
  imageCount: 4,
  contentType: '朋友圈图',
  images: [
    { id: 1, url: 'https://picsum.photos/seed/new-1/800/1200', role: '主图', selected: true },
    { id: 2, url: 'https://picsum.photos/seed/new-2/800/1200', role: '副图', selected: true },
    { id: 3, url: 'https://picsum.photos/seed/new-3/800/1200', role: '细节图', selected: true },
    { id: 4, url: 'https://picsum.photos/seed/new-4/800/1200', role: '场景图', selected: true },
  ],
  copywriting: '春日出游必备！法式复古碎花连衣裙，轻盈透气，给宝贝最舒适的穿着体验。#春季上新 #女童穿搭',
};

const mockHistory = [
  {
    id: 'd1',
    title: '周末特惠活动海报',
    time: '今天 10:30',
    storeCount: 128,
    status: 'published',
    thumbnail: 'https://picsum.photos/seed/d1/200/300',
  },
  {
    id: 'd2',
    title: '夏季防晒服预热',
    time: '昨天 15:45',
    storeCount: 45,
    status: 'draft',
    thumbnail: 'https://picsum.photos/seed/d2/200/300',
  },
  {
    id: 'd3',
    title: '会员专属生日礼',
    time: '2024-03-10',
    storeCount: 256,
    status: 'ended',
    thumbnail: 'https://picsum.photos/seed/d3/200/300',
  },
];

export default function DistributePage() {
  const [viewMode, setViewMode] = useState<'hq' | 'store'>('hq');
  const [isPublishing, setIsPublishing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handlePublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      setShowSuccessModal(true);
    }, 1500);
  };

  return (
    <div className="flex flex-col xl:flex-row xl:h-[calc(100vh-8rem)] gap-6 xl:overflow-hidden">
      
      {/* ================= 左侧：分发配置区 ================= */}
      <div className="w-full xl:w-80 flex-shrink-0 flex flex-col gap-4 xl:overflow-y-auto pr-2 pb-4 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-200">
        
        {/* 1. 页面标题 */}
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-slate-900">内容分发中心</h1>
          <p className="mt-1 text-xs text-slate-500">将已生成内容发布到指定门店，完成门店宣发下发</p>
        </div>

        {/* 2. 已选内容摘要 */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-slate-400" />
              <h2 className="text-sm font-semibold text-slate-900">已选内容</h2>
            </div>
            <Link href="/workspace/generate" className="text-xs font-medium text-blue-600 hover:text-blue-700">
              返回生成
            </Link>
          </div>
          <div className="flex gap-3">
            <div className="h-16 w-12 flex-shrink-0 overflow-hidden rounded-md bg-slate-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={mockSelectedContent.images[0].url} alt="cover" className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-sm font-medium text-slate-900 line-clamp-1">{mockSelectedContent.taskName}</p>
              <p className="mt-1 text-xs text-slate-500 line-clamp-1">{mockSelectedContent.productName}</p>
              <div className="mt-1.5 flex gap-1">
                <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-600">{mockSelectedContent.contentType}</span>
                <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-600">共 {mockSelectedContent.imageCount} 张</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. 分发范围 */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="mb-3 text-sm font-semibold text-slate-900">分发范围</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-600">选择门店</span>
              <div className="flex items-center gap-1 rounded border border-slate-200 px-2 py-1 text-xs cursor-pointer hover:bg-slate-50">
                华东大区 - 核心门店 (28家) <ChevronDown className="h-3 w-3 text-slate-400" />
              </div>
            </div>
          </div>
        </div>

        {/* 4. 分发设置 */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="mb-3 text-sm font-semibold text-slate-900">分发设置</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-600">生效时间</span>
              <div className="flex items-center gap-1 rounded border border-slate-200 px-2 py-1 text-xs cursor-pointer hover:bg-slate-50">
                立即生效 <ChevronDown className="h-3 w-3 text-slate-400" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-600">结束时间</span>
              <div className="flex items-center gap-1 rounded border border-slate-200 px-2 py-1 text-xs cursor-pointer hover:bg-slate-50">
                7天后 <ChevronDown className="h-3 w-3 text-slate-400" />
              </div>
            </div>
            
            <div className="my-2 h-px w-full bg-slate-100" />
            
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-xs text-slate-700">设为今日主推</span>
              <input type="checkbox" defaultChecked className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-xs text-slate-700">附带门店专属二维码</span>
              <input type="checkbox" defaultChecked className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-xs text-slate-700">同步推荐文案</span>
              <input type="checkbox" defaultChecked className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
            </label>
          </div>
        </div>

        {/* 5. 门店触达形式 */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="mb-3 text-sm font-semibold text-slate-900">门店触达形式</h2>
          <div className="space-y-2.5">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
              <span className="text-xs text-slate-700">导购素材列表展示 (供转发)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
              <span className="text-xs text-slate-700">门店首页轮播图展示</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
              <span className="text-xs text-slate-700">顾客专题页展示</span>
            </label>
          </div>
        </div>

        {/* 6. 底部操作 */}
        <div className="mt-2 flex gap-3">
          <button 
            className="flex-1 rounded-xl border border-slate-200 bg-white py-3 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
          >
            存为草稿
          </button>
          <button 
            onClick={handlePublish}
            disabled={isPublishing}
            className="flex-[2] flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 disabled:opacity-70"
          >
            {isPublishing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            {isPublishing ? '发布中...' : '立即发布'}
          </button>
        </div>
      </div>

      {/* ================= 中间：待分发内容预览区 ================= */}
      <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/50 shadow-sm min-h-[600px] xl:min-h-0">
        {/* 顶部标签切换 */}
        <div className="flex h-14 flex-shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6">
          <div className="flex gap-6">
            {['朋友圈素材', '门店海报', '商品专题页', '顾客体验图'].map(tab => (
              <button 
                key={tab}
                className={`relative flex h-full items-center text-sm font-medium ${tab === '朋友圈素材' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-900'}`}
              >
                {tab}
                {tab === '朋友圈素材' && <span className="absolute bottom-0 left-0 h-0.5 w-full bg-blue-600" />}
              </button>
            ))}
          </div>
          
          {/* 视角切换 */}
          <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50 p-1">
            <button 
              onClick={() => setViewMode('hq')}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${viewMode === 'hq' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <LayoutTemplate className="h-3.5 w-3.5" /> 总部视角
            </button>
            <button 
              onClick={() => setViewMode('store')}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${viewMode === 'store' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <Smartphone className="h-3.5 w-3.5" /> 门店视角
            </button>
          </div>
        </div>

        {/* 核心展示区 */}
        <div className="flex flex-1 flex-col overflow-y-auto p-6 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-200">
          {viewMode === 'hq' ? (
            <div className="flex h-full flex-col">
              {/* 画廊区域 */}
              <div className="flex-1 pb-6">
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                  {mockSelectedContent.images.map((img, idx) => (
                    <div key={idx} className="group relative aspect-[3/4] overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img.url} alt={`result-${idx}`} className="h-full w-full object-cover" />
                      
                      {/* 视角标签 */}
                      <div className="absolute left-1/2 top-3 -translate-x-1/2 rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                        {img.role}
                      </div>

                      {/* 微调操作 */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                        <button className="flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm hover:bg-white hover:text-slate-900">
                          <Star className="h-3.5 w-3.5" /> 设为封面
                        </button>
                        <button className="flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-rose-600 shadow-sm hover:bg-white hover:text-rose-700">
                          <Trash2 className="h-3.5 w-3.5" /> 移除此图
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 底部内容说明区 */}
              <div className="flex-shrink-0 rounded-xl border border-slate-200 bg-white p-5 shadow-sm mt-auto">
                <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-4 text-sm text-slate-600">
                    <span className="flex items-center gap-1.5 font-medium text-slate-900">
                      <Package className="h-4 w-4 text-blue-600" />
                      {mockSelectedContent.productName}
                    </span>
                    <span className="h-3 w-px bg-slate-200" />
                    <span className="flex items-center gap-1.5">
                      <LayoutTemplate className="h-3.5 w-3.5" /> 来源: {mockSelectedContent.templateName}
                    </span>
                    <span className="h-3 w-px bg-slate-200" />
                    <span className="flex items-center gap-1.5">
                      <QrCode className="h-3.5 w-3.5" /> 已带门店参数
                    </span>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    <MessageSquare className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xs font-medium text-slate-900 mb-1">推荐转发文案</h4>
                    <p className="text-sm leading-relaxed text-slate-600">
                      {mockSelectedContent.copywriting}
                    </p>
                  </div>
                  <button className="flex flex-shrink-0 items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50">
                    <Copy className="h-3.5 w-3.5" /> 复制文案
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* 门店视角预览 */
            <div className="flex h-full items-center justify-center">
              <div className="relative h-[600px] w-[320px] overflow-hidden rounded-[2.5rem] border-[8px] border-slate-800 bg-white shadow-2xl">
                {/* 模拟手机顶部 */}
                <div className="absolute top-0 w-full h-12 bg-white/80 backdrop-blur-md z-10 flex items-center justify-center">
                  <div className="w-20 h-5 bg-black rounded-full" />
                </div>
                
                {/* 模拟朋友圈内容 */}
                <div className="pt-16 px-4 pb-4 h-full overflow-y-auto [&::-webkit-scrollbar]:hidden">
                  <div className="flex gap-3 mb-3">
                    <div className="w-10 h-10 rounded-md bg-slate-200 flex-shrink-0 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="https://picsum.photos/seed/avatar/100/100" alt="avatar" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="text-[15px] font-medium text-[#576b95]">门店导购 - 小王</h3>
                      <p className="text-[14px] text-slate-800 mt-1 leading-relaxed">
                        {mockSelectedContent.copywriting}
                      </p>
                      <div className="grid grid-cols-2 gap-1 mt-2">
                        {mockSelectedContent.images.map((img, idx) => (
                          <div key={idx} className="aspect-square bg-slate-100">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={img.url} alt={`preview-${idx}`} className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-between mt-3 text-xs text-slate-400">
                        <span>刚刚</span>
                        <div className="w-8 h-5 bg-slate-100 rounded flex items-center justify-center">
                          <MoreHorizontal className="w-3 h-3" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ================= 右侧：分发记录区 ================= */}
      <div className="w-full xl:w-72 flex-shrink-0 flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm min-h-[400px] xl:min-h-0">
        <div className="flex h-14 items-center justify-between border-b border-slate-200 px-5">
          <h2 className="text-sm font-semibold text-slate-900">最近分发任务</h2>
          <span className="text-xs text-slate-500">{mockHistory.length} 条</span>
        </div>
        
        <div className="flex-1 overflow-y-auto p-3 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-200">
          <div className="space-y-3">
            {mockHistory.map((item) => {
              return (
                <div 
                  key={item.id}
                  className="group relative flex cursor-pointer gap-3 rounded-xl border border-transparent p-2 transition-colors hover:bg-slate-50"
                >
                  {/* 缩略图 */}
                  <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.thumbnail} alt="history" className="h-full w-full object-cover" />
                  </div>
                  
                  {/* 信息 */}
                  <div className="flex flex-1 flex-col justify-center overflow-hidden">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-900 truncate pr-2">{item.title}</span>
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                      <span className={`rounded px-1.5 py-0.5 text-[10px] ${
                        item.status === 'published' ? 'bg-emerald-50 text-emerald-600' :
                        item.status === 'draft' ? 'bg-amber-50 text-amber-600' :
                        'bg-slate-100 text-slate-500'
                      }`}>
                        {item.status === 'published' ? '已发布' : item.status === 'draft' ? '草稿' : '已结束'}
                      </span>
                      <span className="text-[10px] text-slate-500">{item.storeCount} 家门店</span>
                    </div>
                    <p className="mt-1.5 text-[10px] text-slate-400">{item.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ================= 弹层：发布成功确认 ================= */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
          <div className="w-[400px] overflow-hidden rounded-2xl bg-white shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="p-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                <CheckCircle2 className="h-8 w-8 text-emerald-600" />
              </div>
              <h2 className="text-xl font-semibold text-slate-900">分发任务已发布</h2>
              <p className="mt-2 text-sm text-slate-500">
                已成功发布到 <span className="font-medium text-slate-900">28</span> 家门店<br/>
                其中 <span className="font-medium text-slate-900">12</span> 家设为今日主推
              </p>
            </div>
            <div className="flex flex-col gap-2 bg-slate-50 p-6">
              <button 
                onClick={() => setShowSuccessModal(false)}
                className="w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
              >
                查看门店端效果
              </button>
              <button 
                onClick={() => setShowSuccessModal(false)}
                className="w-full rounded-xl bg-white py-3 text-sm font-medium text-slate-700 shadow-sm border border-slate-200 hover:bg-slate-50"
              >
                继续新建分发任务
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
