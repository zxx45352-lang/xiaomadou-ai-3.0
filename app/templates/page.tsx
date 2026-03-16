'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Plus, ChevronDown, X, Play, Eye, Flame, Sparkles } from 'lucide-react';
import { templates, templateCategories, filterOptions, Template } from '@/lib/mock-templates';

export default function TemplatesPage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('全部模板');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  // 简单的筛选逻辑
  const filteredTemplates = templates.filter((t) => {
    const matchCategory = activeCategory === '全部模板' || t.category === activeCategory;
    const matchSearch = t.title.includes(searchQuery) || t.style.includes(searchQuery);
    return matchCategory && matchSearch;
  });

  const handleUseTemplate = (templateId: string) => {
    router.push(`/workspace/generate?templateId=${templateId}`);
  };

  return (
    <div className="mx-auto max-w-7xl pb-12">
      {/* 1. 顶部标题区 */}
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">模板中心</h1>
          <p className="mt-1 text-sm text-slate-500">
            选择适合本次营销任务的内容模板，快速进入生成流程
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="搜索模板名称、风格..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-64 rounded-lg border border-slate-200 bg-white pl-9 pr-4 text-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <button className="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-slate-800">
            <Plus className="h-4 w-4" /> 新建模板
          </button>
        </div>
      </div>

      {/* 2. 顶部分类导航区 */}
      <div className="mb-6 flex items-center gap-2 overflow-x-auto border-b border-slate-200 pb-px">
        {templateCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
              activeCategory === cat
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 3. 筛选区 */}
      <div className="mb-8 flex flex-wrap gap-3">
        {Object.entries(filterOptions).map(([key, options]) => (
          <div key={key} className="relative">
            <select
              className="appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-4 pr-10 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              defaultValue=""
            >
              <option value="" disabled>
                {key === 'outputType'
                  ? '输出类型'
                  : key === 'style'
                  ? '风格类型'
                  : key === 'target'
                  ? '适用对象'
                  : '使用频率'}
              </option>
              {options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>
        ))}
      </div>

      {/* 4. 模板卡片区 (瀑布流布局模拟) */}
      <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 xl:columns-4">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className="group relative mb-6 break-inside-avoid overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all hover:shadow-xl"
          >
            {/* 封面图区域 */}
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={template.coverUrl}
                alt={template.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              {/* 顶部标签 */}
              <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 rounded-md bg-black/50 px-2 py-1 text-xs font-medium text-white backdrop-blur-md">
                  <Sparkles className="h-3 w-3" /> AI 模板
                </span>
              </div>

              {/* 爆款标签 */}
              {template.isHot && (
                <div className="absolute bottom-3 left-3">
                  <span className="inline-flex items-center gap-1 rounded-md bg-rose-500 px-2 py-1 text-xs font-medium text-white shadow-sm">
                    <Flame className="h-3 w-3" /> 爆款
                  </span>
                </div>
              )}

              {/* Hover 遮罩层 */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-slate-900/60 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                <button
                  onClick={() => setSelectedTemplate(template)}
                  className="flex w-32 items-center justify-center gap-2 rounded-lg bg-white/20 px-4 py-2.5 text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-white/30"
                >
                  <Eye className="h-4 w-4" /> 查看详情
                </button>
                <button
                  onClick={() => handleUseTemplate(template.id)}
                  className="flex w-32 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg transition-colors hover:bg-blue-700"
                >
                  <Play className="h-4 w-4 fill-current" /> 立即使用
                </button>
              </div>
            </div>

            {/* 信息区域 */}
            <div className="p-5">
              <h3 className="text-base font-semibold text-slate-900 line-clamp-1">
                {template.title}
              </h3>
              <p className="mt-1.5 text-sm text-slate-500 line-clamp-2">
                {template.description}
              </p>
              
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
                  {template.outputType}
                </span>
                <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
                  {template.style}
                </span>
                {template.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-md bg-orange-50 px-2 py-1 text-xs font-medium text-orange-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                <span className="text-xs font-medium text-slate-400">
                  {template.usageCount.toString()} 次使用
                </span>
                <span className="text-xs font-medium text-slate-400">
                  适用: {template.target}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 5. 模板详情弹窗 */}
      {selectedTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedTemplate(null)}
          />
          <div className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:flex-row">
            {/* 左侧大图 */}
            <div className="relative h-64 w-full bg-slate-100 sm:h-auto sm:w-1/2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedTemplate.coverUrl}
                alt={selectedTemplate.title}
                className="h-full w-full object-cover"
              />
            </div>
            
            {/* 右侧信息 */}
            <div className="flex w-full flex-col p-6 sm:w-1/2 sm:p-8 overflow-y-auto">
              <button
                onClick={() => setSelectedTemplate(null)}
                className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center rounded-md bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                    {selectedTemplate.category}
                  </span>
                  {selectedTemplate.isHot && (
                    <span className="inline-flex items-center gap-1 rounded-md bg-rose-50 px-2.5 py-1 text-xs font-medium text-rose-700">
                      <Flame className="h-3 w-3" /> 爆款模板
                    </span>
                  )}
                </div>
                <h2 className="text-2xl font-bold text-slate-900">{selectedTemplate.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {selectedTemplate.description}
                </p>
              </div>

              <div className="space-y-6 flex-1">
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-2">模板属性</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-500">输出类型：</span>
                      <span className="font-medium text-slate-900">{selectedTemplate.outputType}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">视觉风格：</span>
                      <span className="font-medium text-slate-900">{selectedTemplate.style}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">适用对象：</span>
                      <span className="font-medium text-slate-900">{selectedTemplate.target}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">使用热度：</span>
                      <span className="font-medium text-slate-900">{selectedTemplate.usageCount.toString()} 次</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-2">推荐搭配商品</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-600">连衣裙</span>
                    <span className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-600">碎花元素</span>
                    <span className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-600">春季上新</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <button
                  onClick={() => handleUseTemplate(selectedTemplate.id)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
                >
                  <Play className="h-4 w-4 fill-current" />
                  使用此模板创建内容
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
