'use client';

import { useState } from 'react';
import { 
  Search, Plus, Upload, Filter, LayoutGrid, List as ListIcon, 
  ChevronDown, MoreHorizontal, X, Image as ImageIcon, Sparkles,
  LayoutTemplate, Send, Tag, Package, Clock, Eye, Edit
} from 'lucide-react';
import Link from 'next/link';
import { mockProducts, productCategories, quickFilters, Product } from '@/lib/mock-products';

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card');
  const [activeCategory, setActiveCategory] = useState('全部商品');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="mx-auto max-w-[1600px] pb-12">
      
      {/* ================= 1. 顶部标题与操作区 ================= */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">商品库管理</h1>
          <p className="mt-1 text-sm text-slate-500">管理可用于内容生产的品牌商品资产</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="搜索商品名称 / SPU / 类目..." 
              className="h-10 w-64 rounded-xl border border-slate-200 bg-white pl-9 pr-4 text-sm text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <button className="flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50">
            <Upload className="h-4 w-4" />
            批量导入
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex h-10 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            新增商品
          </button>
        </div>
      </div>

      {/* ================= 2. 筛选与快捷入口区 ================= */}
      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        {/* 分类筛选 */}
        <div className="flex items-center gap-6 border-b border-slate-100 pb-4">
          <span className="text-sm font-medium text-slate-900 flex-shrink-0">商品分类</span>
          <div className="flex flex-wrap gap-2">
            {productCategories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  activeCategory === cat 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 基础属性 & 内容用途筛选 */}
        <div className="flex items-center justify-between py-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50">
              <Filter className="h-4 w-4" /> 更多筛选
            </button>
            <div className="h-4 w-px bg-slate-200" />
            <select className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600 focus:border-blue-500 focus:outline-none">
              <option>适用性别</option>
              <option>男童</option>
              <option>女童</option>
              <option>通用</option>
            </select>
            <select className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600 focus:border-blue-500 focus:outline-none">
              <option>年龄段</option>
              <option>0-3岁</option>
              <option>4-7岁</option>
              <option>8-12岁</option>
            </select>
            <select className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600 focus:border-blue-500 focus:outline-none">
              <option>适用季节</option>
              <option>春季</option>
              <option>夏季</option>
              <option>秋季</option>
              <option>冬季</option>
            </select>
            <select className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600 focus:border-blue-500 focus:outline-none">
              <option>内容用途</option>
              <option>适合朋友圈</option>
              <option>适合海报</option>
              <option>适合专题页</option>
            </select>
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

        {/* 快捷入口区 */}
        <div className="flex items-center gap-4 pt-4">
          <span className="text-sm font-medium text-slate-900 flex-shrink-0">快捷筛选</span>
          <div className="flex flex-wrap gap-2">
            {quickFilters.map(filter => (
              <button 
                key={filter}
                className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
              >
                <Tag className="h-3 w-3" />
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ================= 3. 商品展示区 ================= */}
      <div className="flex flex-col xl:flex-row items-start gap-6">
        
        {/* 左侧列表/卡片区 */}
        <div className="flex-1 min-w-0 w-full transition-all duration-300">
          {viewMode === 'card' ? (
            <div className={`grid gap-6 ${selectedProduct ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5'}`}>
              {mockProducts.map(product => (
                <div 
                  key={product.id} 
                  className={`group flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition-all hover:shadow-md ${selectedProduct?.id === product.id ? 'border-blue-500 ring-1 ring-blue-500' : 'border-slate-200'}`}
                >
                  {/* 商品主图 */}
                  <div className="relative aspect-square overflow-hidden bg-slate-100 cursor-pointer" onClick={() => setSelectedProduct(product)}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={product.coverUrl} alt={product.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    
                    {/* 状态标签 */}
                    <div className="absolute left-3 top-3 flex flex-col gap-1.5">
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium backdrop-blur-md ${product.status === '上架中' ? 'bg-emerald-500/90 text-white' : 'bg-slate-800/80 text-white'}`}>
                        {product.status}
                      </span>
                      {product.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-medium text-slate-700 backdrop-blur-md shadow-sm">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Hover 遮罩操作 */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/40 opacity-0 backdrop-blur-[2px] transition-opacity group-hover:opacity-100">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setSelectedProduct(product); }}
                        className="flex w-32 items-center justify-center gap-2 rounded-full bg-white py-2 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50"
                      >
                        <Eye className="h-4 w-4" /> 查看详情
                      </button>
                      <Link 
                        href={`/workspace/generate?productId=${product.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="flex w-32 items-center justify-center gap-2 rounded-full bg-blue-600 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
                      >
                        <Sparkles className="h-4 w-4" /> 去生成内容
                      </Link>
                    </div>
                  </div>

                  {/* 商品信息 */}
                  <div className="flex flex-1 flex-col p-4">
                    <div className="mb-1 flex items-start justify-between gap-2">
                      <h3 className="font-medium text-slate-900 line-clamp-2 text-sm cursor-pointer hover:text-blue-600" onClick={() => setSelectedProduct(product)}>
                        {product.name}
                      </h3>
                      <span className="text-sm font-semibold text-rose-600 flex-shrink-0">¥{product.price}</span>
                    </div>
                    <p className="text-xs text-slate-500 mb-3">SPU: {product.spu}</p>
                    
                    <div className="mt-auto flex flex-wrap gap-1.5 mb-4">
                      <span className="rounded bg-slate-50 px-1.5 py-0.5 text-[10px] text-slate-600">{product.category}</span>
                      <span className="rounded bg-slate-50 px-1.5 py-0.5 text-[10px] text-slate-600">{product.gender}</span>
                      <span className="rounded bg-slate-50 px-1.5 py-0.5 text-[10px] text-slate-600">{product.ageGroup}</span>
                    </div>

                    {/* 内容数据摘要 */}
                    <div className="rounded-lg bg-slate-50 p-2.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1 text-slate-500">
                          <Sparkles className="h-3 w-3 text-blue-500" /> 近期生成
                        </span>
                        <span className="font-medium text-slate-900">{product.contentStats.generatedCount} 次</span>
                      </div>
                      <div className="mt-1.5 flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1 text-slate-500">
                          <LayoutTemplate className="h-3 w-3 text-indigo-500" /> 适配模板
                        </span>
                        <span className="font-medium text-slate-900">{product.contentStats.compatibleTemplates} 个</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="border-b border-slate-200 bg-slate-50 text-xs text-slate-500">
                  <tr>
                    <th className="px-6 py-4 font-medium">商品信息</th>
                    <th className="px-6 py-4 font-medium">属性</th>
                    <th className="px-6 py-4 font-medium">状态/标签</th>
                    <th className="px-6 py-4 font-medium">内容使用情况</th>
                    <th className="px-6 py-4 font-medium text-right">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {mockProducts.map(product => (
                    <tr key={product.id} className={`hover:bg-slate-50 transition-colors ${selectedProduct?.id === product.id ? 'bg-blue-50/30' : ''}`}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4 cursor-pointer" onClick={() => setSelectedProduct(product)}>
                          <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={product.coverUrl} alt={product.name} className="h-full w-full object-cover" />
                          </div>
                          <div>
                            <p className="font-medium text-slate-900 line-clamp-1 hover:text-blue-600">{product.name}</p>
                            <p className="text-xs text-slate-500 mt-0.5">SPU: {product.spu}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1 text-xs">
                          <span>{product.category} | {product.gender}</span>
                          <span className="text-slate-400">{product.ageGroup} | {product.season}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col items-start gap-1.5">
                          <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${product.status === '上架中' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-600'}`}>
                            {product.status}
                          </span>
                          <div className="flex gap-1">
                            {product.tags.slice(0, 2).map(tag => (
                              <span key={tag} className="rounded border border-slate-200 px-1 py-0.5 text-[10px] text-slate-500">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1 text-xs">
                          <span className="text-slate-900">生成 <strong className="text-blue-600">{product.contentStats.generatedCount}</strong> 次</span>
                          <span className="text-slate-500">适配 {product.contentStats.compatibleTemplates} 个模板</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link 
                            href={`/workspace/generate?productId=${product.id}`}
                            className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                            title="去生成内容"
                          >
                            <Sparkles className="h-4 w-4" />
                          </Link>
                          <button 
                            onClick={() => setSelectedProduct(product)}
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
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ================= 4. 右侧详情面板 ================= */}
        {selectedProduct && (
          <div className="w-full xl:w-[400px] flex-shrink-0 animate-in slide-in-from-right-8 duration-300">
            <div className="xl:sticky xl:top-6 flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg h-[600px] xl:h-[calc(100vh-6rem)]">
              
              {/* 头部操作区 */}
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                <h2 className="text-base font-semibold text-slate-900">商品资产总览</h2>
                <div className="flex items-center gap-2">
                  <button className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-900" title="编辑">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => setSelectedProduct(null)}
                    className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-900"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* 滚动内容区 */}
              <div className="flex-1 overflow-y-auto p-5 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-200">
                
                {/* 视觉资产 */}
                <div className="mb-6">
                  <div className="aspect-square overflow-hidden rounded-xl bg-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={selectedProduct.coverUrl} alt={selectedProduct.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="mt-3 flex gap-2 overflow-x-auto pb-2 [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-200">
                    {selectedProduct.images.map((img, idx) => (
                      <div key={idx} className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={img} alt={`detail-${idx}`} className="h-full w-full object-cover" />
                      </div>
                    ))}
                    <button className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
                      <Plus className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* 基础信息 */}
                <div className="mb-6">
                  <div className="mb-2 flex items-start justify-between gap-4">
                    <h3 className="text-lg font-semibold text-slate-900 leading-snug">{selectedProduct.name}</h3>
                    <span className="text-lg font-bold text-rose-600 flex-shrink-0">¥{selectedProduct.price}</span>
                  </div>
                  <p className="text-sm text-slate-500 mb-4">SPU: {selectedProduct.spu}</p>
                  
                  <div className="grid grid-cols-2 gap-y-3 text-sm">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-slate-500">商品类目</span>
                      <span className="font-medium text-slate-900">{selectedProduct.category}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-slate-500">适用人群</span>
                      <span className="font-medium text-slate-900">{selectedProduct.gender} · {selectedProduct.ageGroup}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-slate-500">适用季节</span>
                      <span className="font-medium text-slate-900">{selectedProduct.season}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-slate-500">当前状态</span>
                      <span className={`font-medium ${selectedProduct.status === '上架中' ? 'text-emerald-600' : 'text-slate-600'}`}>
                        {selectedProduct.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 卖点与标签 */}
                <div className="mb-6 rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <h4 className="text-xs font-semibold text-slate-900 mb-2">商品卖点 (AI 推荐文案来源)</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">{selectedProduct.sellingPoints}</p>
                  
                  <div className="mt-4 flex flex-wrap gap-2">
                    {selectedProduct.tags.map(tag => (
                      <span key={tag} className="rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                        {tag}
                      </span>
                    ))}
                    <button className="rounded-full border border-dashed border-slate-300 px-2.5 py-1 text-xs text-slate-500 hover:bg-slate-100">
                      + 添加标签
                    </button>
                  </div>
                </div>

                {/* 内容使用情况 */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-blue-600" /> 内容生产数据
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-slate-100 p-3">
                      <p className="text-xs text-slate-500 mb-1">累计生成素材</p>
                      <p className="text-xl font-semibold text-slate-900">{selectedProduct.contentStats.generatedCount} <span className="text-xs font-normal text-slate-500">次</span></p>
                    </div>
                    <div className="rounded-xl border border-slate-100 p-3">
                      <p className="text-xs text-slate-500 mb-1">累计下发门店</p>
                      <p className="text-xl font-semibold text-slate-900">{selectedProduct.contentStats.distributedCount} <span className="text-xs font-normal text-slate-500">次</span></p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 mt-3 text-center">
                    最近一次生成：{selectedProduct.contentStats.lastGeneratedAt}
                  </p>
                </div>

              </div>

              {/* 底部悬浮操作区 */}
              <div className="border-t border-slate-100 bg-white p-4">
                <div className="flex gap-3">
                  <Link 
                    href={`/templates?productId=${selectedProduct.id}`}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
                  >
                    <LayoutTemplate className="h-4 w-4" /> 适配模板 ({selectedProduct.contentStats.compatibleTemplates})
                  </Link>
                  <Link 
                    href={`/workspace/generate?productId=${selectedProduct.id}`}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
                  >
                    <Sparkles className="h-4 w-4" /> 去生成内容
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ================= 5. 新增商品弹窗 ================= */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
          <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
              <h2 className="text-lg font-semibold text-slate-900">新增商品资产</h2>
              <button 
                onClick={() => setShowAddModal(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-900"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="max-h-[70vh] overflow-y-auto p-6 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-200">
              <div className="grid grid-cols-2 gap-6">
                
                {/* 视觉资产上传 */}
                <div className="col-span-2">
                  <label className="mb-2 block text-sm font-medium text-slate-700">商品主图 (白底图/平铺图最佳)</label>
                  <div className="flex h-32 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 transition-colors hover:border-blue-400 hover:bg-blue-50">
                    <Upload className="mb-2 h-6 w-6 text-slate-400" />
                    <span className="text-sm font-medium text-slate-600">点击或拖拽上传图片</span>
                    <span className="mt-1 text-xs text-slate-400">支持 JPG, PNG, 建议 800x800px</span>
                  </div>
                </div>

                {/* 基础信息表单 */}
                <div className="col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">商品名称</label>
                  <input type="text" placeholder="例如：春季新款女童法式碎花连衣裙" className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                </div>
                
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">SPU 编码</label>
                  <input type="text" placeholder="输入 SPU" className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                </div>
                
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">吊牌价 (¥)</label>
                  <input type="number" placeholder="0.00" className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">商品类目</label>
                  <select className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                    <option>请选择类目</option>
                    <option>连衣裙</option>
                    <option>外套</option>
                    <option>套装</option>
                    <option>裤装</option>
                    <option>T恤</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">适用人群</label>
                  <div className="flex gap-2">
                    <select className="w-1/2 rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                      <option>性别</option>
                      <option>男童</option>
                      <option>女童</option>
                      <option>通用</option>
                    </select>
                    <select className="w-1/2 rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                      <option>年龄段</option>
                      <option>0-3岁</option>
                      <option>4-7岁</option>
                      <option>8-12岁</option>
                    </select>
                  </div>
                </div>

                <div className="col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">商品卖点 (用于 AI 生成文案参考)</label>
                  <textarea rows={3} placeholder="描述商品的核心卖点、面料、设计特色等..." className="w-full resize-none rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                </div>

                <div className="col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">运营标签</label>
                  <div className="flex flex-wrap gap-2">
                    {['上新', '清仓', '主推', '爆款', '高转化', '节日特供'].map(tag => (
                      <label key={tag} className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 hover:bg-slate-50">
                        <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                        <span className="text-sm text-slate-700">{tag}</span>
                      </label>
                    ))}
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
                保存并上架
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
