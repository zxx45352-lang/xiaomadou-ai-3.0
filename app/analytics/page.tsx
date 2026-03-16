'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from 'recharts';
import {
  Calendar,
  ChevronDown,
  Download,
  TrendingUp,
  TrendingDown,
  Sparkles,
  ArrowRight,
  Package,
  LayoutTemplate,
  Store,
  FileText,
  Eye,
  Share2,
  ScanLine,
  MessageCircle,
  Ticket,
  Percent,
} from 'lucide-react';

import {
  coreMetrics,
  trendData,
  productRanking,
  templateRanking,
  storeRanking,
  aiSuggestions,
} from '@/lib/mock-analytics';

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('近14天');

  // Map metric IDs to icons
  const getMetricIcon = (id: string) => {
    switch (id) {
      case 'generated': return <FileText className="h-5 w-5" />;
      case 'distributed': return <Share2 className="h-5 w-5" />;
      case 'store_views': return <Eye className="h-5 w-5" />;
      case 'store_shares': return <Share2 className="h-5 w-5" />;
      case 'customer_scans': return <ScanLine className="h-5 w-5" />;
      case 'customer_consults': return <MessageCircle className="h-5 w-5" />;
      case 'coupons_claimed': return <Ticket className="h-5 w-5" />;
      case 'conversion_rate': return <Percent className="h-5 w-5" />;
      default: return <TrendingUp className="h-5 w-5" />;
    }
  };

  return (
    <div className="mx-auto max-w-7xl pb-12 space-y-8">
      {/* 1. 顶部标题与筛选区 */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">数据中心</h1>
          <p className="mt-1 text-sm text-slate-500">查看内容生产、门店分发与顾客互动的整体效果</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 cursor-pointer">
            <Calendar className="h-4 w-4 text-slate-400" />
            {timeRange}
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 cursor-pointer">
            全国区域
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </div>
          <button className="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 transition-colors">
            <Download className="h-4 w-4" />
            导出简报
          </button>
        </div>
      </div>

      {/* 2. 核心指标概览区 */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {coreMetrics.map((metric) => (
          <div
            key={metric.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                  {getMetricIcon(metric.id)}
                </div>
                {metric.name}
              </div>
              <div
                className={`flex items-center gap-1 text-xs font-medium ${
                  metric.isUp ? 'text-emerald-600' : 'text-rose-600'
                }`}
              >
                {metric.isUp ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {metric.trend}
              </div>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-bold tracking-tight text-slate-900">
                {metric.value}
              </div>
              <p className="mt-1 text-xs text-slate-500 line-clamp-1" title={metric.description}>
                {metric.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 3. 趋势分析区 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* 顾客互动趋势 */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h3 className="text-base font-semibold text-slate-900">顾客互动趋势</h3>
            <p className="text-sm text-slate-500">最近14天顾客扫码与咨询量变化</p>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorScans" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorConsults" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  labelStyle={{ fontWeight: 'bold', color: '#0f172a', marginBottom: '4px' }}
                />
                <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                <Area type="monotone" dataKey="scans" name="顾客扫码量" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorScans)" />
                <Area type="monotone" dataKey="consults" name="顾客咨询量" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorConsults)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 门店执行趋势 */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h3 className="text-base font-semibold text-slate-900">门店执行趋势</h3>
            <p className="text-sm text-slate-500">最近14天导购查看与转发素材次数</p>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip
                  cursor={{ fill: '#f1f5f9' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="shares" name="导购转发次数" fill="#8b5cf6" radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 4. 多维榜单区 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* 商品热度榜 */}
        <div className="flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 p-5">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold text-slate-900">商品热度榜</h3>
            </div>
            <Link href="/products" className="text-xs font-medium text-blue-600 hover:text-blue-700">
              查看全部
            </Link>
          </div>
          <div className="flex-1 p-5">
            <div className="space-y-5">
              {productRanking.map((item, index) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    index < 3 ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-slate-900" title={item.name}>{item.name}</p>
                    <div className="mt-1 flex items-center gap-3 text-xs text-slate-500">
                      <span>扫码: {item.scans.toLocaleString()}</span>
                      <span>咨询: {item.consults.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="shrink-0">
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-600">
                      {item.tag}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 模板效果榜 */}
        <div className="flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 p-5">
            <div className="flex items-center gap-2">
              <LayoutTemplate className="h-5 w-5 text-emerald-600" />
              <h3 className="font-semibold text-slate-900">模板效果榜</h3>
            </div>
            <Link href="/templates" className="text-xs font-medium text-blue-600 hover:text-blue-700">
              查看全部
            </Link>
          </div>
          <div className="flex-1 p-5">
            <div className="space-y-5">
              {templateRanking.map((item, index) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    index < 3 ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-slate-900" title={item.name}>{item.name}</p>
                    <div className="mt-1 flex items-center gap-3 text-xs text-slate-500">
                      <span>使用: {item.uses.toLocaleString()}</span>
                      <span>扫码: {item.scans.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="shrink-0">
                    <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-medium text-emerald-700">
                      {item.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 门店执行力榜 */}
        <div className="flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 p-5">
            <div className="flex items-center gap-2">
              <Store className="h-5 w-5 text-purple-600" />
              <h3 className="font-semibold text-slate-900">门店执行力榜</h3>
            </div>
            <Link href="/stores" className="text-xs font-medium text-blue-600 hover:text-blue-700">
              查看全部
            </Link>
          </div>
          <div className="flex-1 p-5">
            <div className="space-y-5">
              {storeRanking.map((item, index) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    index < 3 ? 'bg-purple-50 text-purple-600' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-slate-900" title={item.name}>{item.name}</p>
                    <div className="mt-1 flex items-center gap-3 text-xs text-slate-500">
                      <span>查看: {item.views.toLocaleString()}</span>
                      <span>转发: {item.shares.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="text-sm font-semibold text-slate-900">{item.feedbacks}</div>
                    <div className="text-[10px] text-slate-500">顾客反馈</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 5. 底部 AI 运营建议区 */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-amber-500" />
          <h2 className="text-lg font-semibold text-slate-900">AI 运营洞察与建议</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {aiSuggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-blue-200 hover:shadow-md"
            >
              {/* Priority Indicator */}
              <div
                className={`absolute left-0 top-0 h-full w-1 ${
                  suggestion.priority === 'high'
                    ? 'bg-rose-500'
                    : suggestion.priority === 'medium'
                    ? 'bg-amber-500'
                    : 'bg-blue-500'
                }`}
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
                    {suggestion.type === 'product' && '商品洞察'}
                    {suggestion.type === 'template' && '模板洞察'}
                    {suggestion.type === 'store' && '门店洞察'}
                    {suggestion.type === 'strategy' && '策略洞察'}
                  </span>
                  <h3 className="font-semibold text-slate-900">{suggestion.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {suggestion.content}
                </p>
              </div>
              <div className="mt-6">
                <Link
                  href={suggestion.actionLink}
                  className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  {suggestion.actionText}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
