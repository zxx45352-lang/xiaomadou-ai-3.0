'use client';

import { useState } from 'react';
import { 
  Search, Plus, Upload, Download, LayoutGrid, List as ListIcon, 
  MapPin, Phone, CheckCircle2, XCircle, QrCode, Send, Activity, 
  Users, Eye, Edit, MoreHorizontal, X, Store as StoreIcon,
  Smartphone, FileText, AlertCircle, ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import { mockStores, storeFilters, Store } from '@/lib/mock-stores';

export default function StoresPage() {
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card');
  const [activeFilter, setActiveFilter] = useState('全部门店');
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Helper to calculate config completeness
  const getConfigScore = (config: Store['configStatus']) => {
    let score = 0;
    if (config.contentDistribution) score++;
    if (config.miniProgram) score++;
    if (config.qrCode) score++;
    if (config.guideInfo) score++;
    return score;
  };

  return (
    <div className="mx-auto max-w-[1600px] pb-12">
      
      {/* ================= 1. 顶部标题与概览区 ================= */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">门店管理</h1>
          <p className="mt-1 text-sm text-slate-500">管理品牌门店信息、内容接收状态与运营配置</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="搜索门店名称 / 区域 / 联系人..." 
              className="h-10 w-64 rounded-xl border border-slate-200 bg-white pl-9 pr-4 text-sm text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <button className="flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50">
            <Download className="h-4 w-4" />
            导出
          </button>
          <button className="flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50">
            <Upload className="h-4 w-4" />
            导入
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex h-10 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            新增门店
          </button>
        </div>
      </div>

      {/* 概览卡片 */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <StoreIcon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">门店总数</p>
              <p className="text-2xl font-bold text-slate-900">128</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Send className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">已开通内容分发</p>
              <p className="text-2xl font-bold text-slate-900">112</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <Activity className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">本周活跃门店</p>
              <p className="text-2xl font-bold text-slate-900">86</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <AlertCircle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">配置未完成</p>
              <p className="text-2xl font-bold text-slate-900">16</p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= 2. 筛选区 ================= */}
      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4">
          {/* 基础筛选 */}
          <div className="flex items-center gap-6">
            <span className="text-sm font-medium text-slate-900 flex-shrink-0 w-16">门店状态</span>
            <div className="flex flex-wrap gap-2">
              {storeFilters.basic.map(filter => (
                <button 
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                    activeFilter === filter 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
          
          {/* 区域筛选 */}
          <div className="flex items-center gap-6">
            <span className="text-sm font-medium text-slate-900 flex-shrink-0 w-16">所属区域</span>
            <div className="flex flex-wrap gap-2">
              {storeFilters.region.map(filter => (
                <button 
                  key={filter}
                  className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* 运营筛选 */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <div className="flex items-center gap-6">
              <span className="text-sm font-medium text-slate-900 flex-shrink-0 w-16">运营标签</span>
              <div className="flex flex-wrap gap-2">
                {storeFilters.operation.map(filter => (
                  <button 
                    key={filter}
                    className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
            
            {/* 视图切换 */}
            <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50 p-1">
              <button 
                onClick={() => setViewMode('card')}
                className={`flex items-center justify-center rounded-md p-1.5 transition-colors ${viewMode === 'card' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                title="卡片视图"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`flex items-center justify-center rounded-md p-1.5 transition-colors ${viewMode === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                title="列表视图"
              >
                <ListIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= 3. 门店展示区 ================= */}
      <div className="flex flex-col xl:flex-row items-start gap-6">
        
        {/* 左侧列表/卡片区 */}
        <div className="flex-1 min-w-0 w-full transition-all duration-300">
          {viewMode === 'card' ? (
            <div className={`grid gap-6 ${selectedStore ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5'}`}>
              {mockStores.map(store => {
                const configScore = getConfigScore(store.configStatus);
                return (
                  <div 
                    key={store.id} 
                    className={`group flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition-all hover:shadow-md ${selectedStore?.id === store.id ? 'border-blue-500 ring-1 ring-blue-500' : 'border-slate-200'}`}
                  >
                    {/* 头部信息 */}
                    <div className="p-5 border-b border-slate-100 cursor-pointer" onClick={() => setSelectedStore(store)}>
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-slate-900 text-base group-hover:text-blue-600 transition-colors">{store.name}</h3>
                          <p className="text-xs text-slate-500 mt-1">{store.code} · {store.type}</p>
                        </div>
                        <span className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${
                          store.activityLevel === '高活跃' ? 'bg-emerald-50 text-emerald-600' :
                          store.activityLevel === '持续活跃' ? 'bg-blue-50 text-blue-600' :
                          'bg-slate-100 text-slate-500'
                        }`}>
                          {store.activityLevel}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-1.5 text-xs text-slate-600 mb-2">
                        <MapPin className="h-3.5 w-3.5 text-slate-400" />
                        <span className="truncate">{store.city} {store.district}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-600">
                        <Phone className="h-3.5 w-3.5 text-slate-400" />
                        <span>{store.contactName} {store.contactPhone}</span>
                      </div>
                    </div>

                    {/* 运营状态 */}
                    <div className="p-5 bg-slate-50/50 flex-1 flex flex-col justify-between">
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium text-slate-700">配置完整度</span>
                          <span className="text-xs font-medium text-slate-900">{configScore}/4</span>
                        </div>
                        <div className="flex gap-1">
                          <div className={`h-1.5 flex-1 rounded-full ${store.configStatus.contentDistribution ? 'bg-emerald-500' : 'bg-slate-200'}`} title="内容分发" />
                          <div className={`h-1.5 flex-1 rounded-full ${store.configStatus.miniProgram ? 'bg-emerald-500' : 'bg-slate-200'}`} title="小程序专题页" />
                          <div className={`h-1.5 flex-1 rounded-full ${store.configStatus.qrCode ? 'bg-emerald-500' : 'bg-slate-200'}`} title="专属二维码" />
                          <div className={`h-1.5 flex-1 rounded-full ${store.configStatus.guideInfo ? 'bg-emerald-500' : 'bg-slate-200'}`} title="导购信息" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-xl bg-white p-3 border border-slate-100 shadow-sm">
                          <p className="text-[10px] text-slate-500 mb-1 flex items-center gap-1"><Eye className="h-3 w-3" /> 本周内容查看</p>
                          <p className="text-lg font-semibold text-slate-900">{store.stats.weeklyContentViews}</p>
                        </div>
                        <div className="rounded-xl bg-white p-3 border border-slate-100 shadow-sm">
                          <p className="text-[10px] text-slate-500 mb-1 flex items-center gap-1"><QrCode className="h-3 w-3" /> 本周顾客扫码</p>
                          <p className="text-lg font-semibold text-slate-900">{store.stats.weeklyCustomerScans}</p>
                        </div>
                      </div>
                    </div>

                    {/* 底部操作 */}
                    <div className="border-t border-slate-100 p-3 flex items-center justify-between bg-white">
                      <button 
                        onClick={() => setSelectedStore(store)}
                        className="text-xs font-medium text-slate-600 hover:text-blue-600 px-2 py-1"
                      >
                        查看详情
                      </button>
                      <Link 
                        href="/workspace/distribute"
                        className="flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-100 transition-colors"
                      >
                        <Send className="h-3.5 w-3.5" /> 去分发
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="border-b border-slate-200 bg-slate-50 text-xs text-slate-500">
                  <tr>
                    <th className="px-6 py-4 font-medium">门店信息</th>
                    <th className="px-6 py-4 font-medium">区域/类型</th>
                    <th className="px-6 py-4 font-medium">联系方式</th>
                    <th className="px-6 py-4 font-medium">配置与活跃</th>
                    <th className="px-6 py-4 font-medium text-right">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {mockStores.map(store => {
                    const configScore = getConfigScore(store.configStatus);
                    return (
                      <tr key={store.id} className={`hover:bg-slate-50 transition-colors ${selectedStore?.id === store.id ? 'bg-blue-50/30' : ''}`}>
                        <td className="px-6 py-4">
                          <div className="cursor-pointer" onClick={() => setSelectedStore(store)}>
                            <p className="font-medium text-slate-900 hover:text-blue-600">{store.name}</p>
                            <p className="text-xs text-slate-500 mt-0.5">{store.code}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1 text-xs">
                            <span className="text-slate-900">{store.region} · {store.city}</span>
                            <span className="text-slate-500">{store.type}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1 text-xs">
                            <span className="text-slate-900">{store.contactName}</span>
                            <span className="text-slate-500">{store.contactPhone}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col items-start gap-1.5">
                            <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                              store.activityLevel === '高活跃' ? 'bg-emerald-50 text-emerald-600' :
                              store.activityLevel === '持续活跃' ? 'bg-blue-50 text-blue-600' :
                              'bg-slate-100 text-slate-500'
                            }`}>
                              {store.activityLevel}
                            </span>
                            <span className="text-[10px] text-slate-500">配置 {configScore}/4</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link 
                              href="/workspace/distribute"
                              className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                              title="去分发"
                            >
                              <Send className="h-4 w-4" />
                            </Link>
                            <button 
                              onClick={() => setSelectedStore(store)}
                              className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-900"
                              title="查看详情"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-900">
                              <MoreHorizontal className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ================= 4. 右侧详情面板 ================= */}
        {selectedStore && (
          <div className="w-full xl:w-[420px] flex-shrink-0 animate-in slide-in-from-right-8 duration-300">
            <div className="xl:sticky xl:top-6 flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg h-[600px] xl:h-[calc(100vh-6rem)]">
              
              {/* 头部操作区 */}
              <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
                <h2 className="text-base font-semibold text-slate-900">门店运营总览</h2>
                <div className="flex items-center gap-2">
                  <button className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-900" title="编辑">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => setSelectedStore(null)}
                    className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-900"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* 滚动内容区 */}
              <div className="flex-1 overflow-y-auto p-6 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-200">
                
                {/* 基础信息 */}
                <div className="mb-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 leading-snug">{selectedStore.name}</h3>
                      <p className="text-sm text-slate-500 mt-1">{selectedStore.code} · {selectedStore.type}</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                      selectedStore.status === '已启用' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {selectedStore.status}
                    </span>
                  </div>
                  
                  <div className="space-y-3 rounded-xl bg-slate-50 p-4 border border-slate-100">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-4 w-4 text-slate-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-slate-900">{selectedStore.address}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{selectedStore.region} · {selectedStore.city} · {selectedStore.district}</p>
                      </div>
                    </div>
                    <div className="h-px w-full bg-slate-200" />
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-slate-400" />
                      <p className="text-sm text-slate-900">{selectedStore.contactName} <span className="text-slate-500 ml-2">{selectedStore.contactPhone}</span></p>
                    </div>
                  </div>
                </div>

                {/* 配置状态 */}
                <div className="mb-8">
                  <h4 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <SettingsIcon className="h-4 w-4 text-blue-600" /> 运营配置状态
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <ConfigItem 
                      label="内容分发接收" 
                      active={selectedStore.configStatus.contentDistribution} 
                      icon={<Send className="h-4 w-4" />}
                    />
                    <ConfigItem 
                      label="小程序专题页" 
                      active={selectedStore.configStatus.miniProgram} 
                      icon={<Smartphone className="h-4 w-4" />}
                    />
                    <ConfigItem 
                      label="门店专属二维码" 
                      active={selectedStore.configStatus.qrCode} 
                      icon={<QrCode className="h-4 w-4" />}
                    />
                    <ConfigItem 
                      label="导购名片信息" 
                      active={selectedStore.configStatus.guideInfo} 
                      icon={<Users className="h-4 w-4" />}
                    />
                  </div>
                </div>

                {/* 内容运营数据 */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                      <Activity className="h-4 w-4 text-indigo-600" /> 内容活跃数据
                    </h4>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                      selectedStore.activityLevel === '高活跃' ? 'bg-emerald-50 text-emerald-600' :
                      selectedStore.activityLevel === '持续活跃' ? 'bg-blue-50 text-blue-600' :
                      'bg-slate-100 text-slate-500'
                    }`}>
                      {selectedStore.activityLevel}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="rounded-xl border border-slate-100 p-4">
                      <p className="text-xs text-slate-500 mb-1">最近接收分发</p>
                      <p className="text-2xl font-semibold text-slate-900">{selectedStore.stats.recentDistributions} <span className="text-xs font-normal text-slate-500">次</span></p>
                    </div>
                    <div className="rounded-xl border border-slate-100 p-4">
                      <p className="text-xs text-slate-500 mb-1">本周素材查看</p>
                      <p className="text-2xl font-semibold text-slate-900">{selectedStore.stats.weeklyContentViews} <span className="text-xs font-normal text-slate-500">次</span></p>
                    </div>
                    <div className="rounded-xl border border-slate-100 p-4">
                      <p className="text-xs text-slate-500 mb-1">本周顾客扫码</p>
                      <p className="text-2xl font-semibold text-slate-900">{selectedStore.stats.weeklyCustomerScans} <span className="text-xs font-normal text-slate-500">次</span></p>
                    </div>
                    <div className="rounded-xl border border-slate-100 p-4">
                      <p className="text-xs text-slate-500 mb-1">专题页咨询量</p>
                      <p className="text-2xl font-semibold text-slate-900">{selectedStore.stats.recentInquiries} <span className="text-xs font-normal text-slate-500">次</span></p>
                    </div>
                  </div>

                  {selectedStore.activityLevel === '高活跃' && (
                    <div className="rounded-xl bg-indigo-50 p-4 border border-indigo-100">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-indigo-900">推荐重点赋能</p>
                          <p className="text-xs text-indigo-700 mt-1 leading-relaxed">该门店近期内容查看与顾客扫码转化率极高，建议将其加入本周“今日主推”核心分发名单。</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

              </div>

              {/* 底部悬浮操作区 */}
              <div className="border-t border-slate-100 bg-white p-5">
                <div className="flex gap-3">
                  <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50">
                    <FileText className="h-4 w-4" /> 历史分发
                  </button>
                  <Link 
                    href="/workspace/distribute"
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
                  >
                    <Send className="h-4 w-4" /> 去分发内容
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ================= 5. 新增门店弹窗 ================= */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
          <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
              <h2 className="text-lg font-semibold text-slate-900">新增门店</h2>
              <button 
                onClick={() => setShowAddModal(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-900"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="max-h-[70vh] overflow-y-auto p-6 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-200">
              <div className="grid grid-cols-2 gap-6">
                
                {/* 基础信息 */}
                <div className="col-span-2">
                  <h3 className="text-sm font-semibold text-slate-900 mb-4">基础信息</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700">门店名称 *</label>
                      <input type="text" placeholder="例如：上海静安嘉里中心店" className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700">门店编号 *</label>
                      <input type="text" placeholder="例如：SH-001" className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700">门店类型</label>
                      <select className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                        <option>直营店</option>
                        <option>加盟店</option>
                      </select>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700">状态</label>
                      <select className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                        <option>已启用</option>
                        <option>未启用</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* 地址与联系人 */}
                <div className="col-span-2">
                  <h3 className="text-sm font-semibold text-slate-900 mb-4 mt-2">地址与联系人</h3>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <select className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                      <option>选择大区</option>
                      <option>华东</option>
                    </select>
                    <select className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                      <option>选择城市</option>
                      <option>上海市</option>
                    </select>
                    <input type="text" placeholder="所在商圈" className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                  </div>
                  <div className="mb-4">
                    <input type="text" placeholder="详细地址" className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="联系人姓名" className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                    <input type="text" placeholder="联系电话" className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                  </div>
                </div>

                {/* 运营配置 */}
                <div className="col-span-2">
                  <h3 className="text-sm font-semibold text-slate-900 mb-4 mt-2">运营配置</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="flex items-center justify-between rounded-xl border border-slate-200 p-4 cursor-pointer hover:bg-slate-50">
                      <div>
                        <p className="text-sm font-medium text-slate-900">启用内容分发</p>
                        <p className="text-xs text-slate-500 mt-0.5">允许该门店接收总部下发的素材</p>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-4 w-4" />
                    </label>
                    <label className="flex items-center justify-between rounded-xl border border-slate-200 p-4 cursor-pointer hover:bg-slate-50">
                      <div>
                        <p className="text-sm font-medium text-slate-900">启用小程序专题页</p>
                        <p className="text-xs text-slate-500 mt-0.5">允许生成该门店专属顾客页面</p>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-4 w-4" />
                    </label>
                  </div>
                </div>

              </div>
            </div>
            
            <div className="flex items-center justify-end gap-3 border-t border-slate-100 bg-slate-50 px-6 py-4">
              <button 
                onClick={() => setShowAddModal(false)}
                className="rounded-xl border border-slate-200 bg-white px-6 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
              >
                取消
              </button>
              <button 
                onClick={() => setShowAddModal(false)}
                className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
              >
                保存门店
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// Helper component for config items
function ConfigItem({ label, active, icon }: { label: string, active: boolean, icon: React.ReactNode }) {
  return (
    <div className={`flex items-center gap-3 rounded-xl border p-3 ${active ? 'border-emerald-100 bg-emerald-50/50' : 'border-slate-100 bg-slate-50'}`}>
      <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${active ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-200 text-slate-400'}`}>
        {icon}
      </div>
      <div>
        <p className="text-xs font-medium text-slate-900">{label}</p>
        <p className={`text-[10px] mt-0.5 ${active ? 'text-emerald-600' : 'text-slate-500'}`}>
          {active ? '已配置' : '未配置'}
        </p>
      </div>
    </div>
  );
}

// Simple icon wrapper since we don't have Settings imported directly
function SettingsIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
