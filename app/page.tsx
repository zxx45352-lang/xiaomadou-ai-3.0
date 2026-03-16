'use client';

import { useState, useEffect } from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  Calendar,
  ChevronRight,
  Download,
  Lightbulb,
  TrendingUp,
} from 'lucide-react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  activeStores,
  hotProducts,
  insights,
  interactionTrendData,
  metrics,
  scanTrendData,
} from '@/lib/mock';

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return <div className="mx-auto max-w-7xl space-y-8 pb-12 animate-pulse"><div className="h-64 bg-slate-100 rounded-2xl"></div></div>;
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8 pb-12">
      {/* 1. 顶部页面标题区 */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            品牌内容总览
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            今天的内容生产、门店分发与顾客互动情况
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50 hover:text-slate-900">
            <Calendar className="h-4 w-4 text-slate-400" />
            2026-03-13
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50 hover:text-slate-900">
            <Download className="h-4 w-4 text-slate-400" />
            导出简报
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700">
            查看今日任务
          </button>
        </div>
      </div>

      {/* 2. 第一屏核心数据卡片区 */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <div
            key={metric.title}
            className={`rounded-2xl border border-slate-100 bg-white p-6 shadow-sm ${
              index === 6 ? 'sm:col-span-2 lg:col-span-2' : ''
            }`}
          >
            <h3 className="text-sm font-medium text-slate-500">{metric.title}</h3>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-semibold tracking-tight text-slate-900">
                {metric.value}
              </span>
              <span
                className={`flex items-center text-xs font-medium ${
                  metric.isUp ? 'text-emerald-600' : 'text-rose-600'
                }`}
              >
                {metric.isUp ? (
                  <ArrowUpRight className="mr-0.5 h-3 w-3" />
                ) : (
                  <ArrowDownRight className="mr-0.5 h-3 w-3" />
                )}
                {metric.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 3. 第二屏趋势分析区 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* 扫码趋势 */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-slate-900">
                最近 7 天扫码趋势
              </h3>
              <p className="text-sm text-slate-500">顾客扫码查看商品详情次数</p>
            </div>
            <TrendingUp className="h-5 w-5 text-slate-400" />
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={scanTrendData}>
                <defs>
                  <linearGradient id="colorScans" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#64748B' }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#64748B' }}
                  dx={-10}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: '8px',
                    border: 'none',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="scans"
                  stroke="#2563EB"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorScans)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 咨询与领券趋势 */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-slate-900">
                最近 7 天咨询与领券趋势
              </h3>
              <p className="text-sm text-slate-500">导购承接咨询与顾客领券转化</p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-blue-600" />
                <span className="text-slate-600">咨询</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-orange-400" />
                <span className="text-slate-600">领券</span>
              </div>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={interactionTrendData} barSize={20}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#64748B' }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#64748B' }}
                  dx={-10}
                />
                <Tooltip
                  cursor={{ fill: '#F8FAFC' }}
                  contentStyle={{
                    borderRadius: '8px',
                    border: 'none',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                />
                <Bar dataKey="inquiries" fill="#2563EB" radius={[4, 4, 0, 0]} />
                <Bar dataKey="coupons" fill="#FB923C" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 4. 第三屏榜单模块 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* 热门商品榜 */}
        <div className="rounded-2xl border border-slate-100 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 p-6">
            <h3 className="text-base font-semibold text-slate-900">热门商品榜</h3>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
              查看全部
            </button>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {hotProducts.map((product, index) => (
                <div key={product.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-sm font-semibold text-slate-500">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        {product.name}
                      </p>
                      <p className="text-xs text-slate-500">SPU: {product.spu}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-right">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {product.scans.toString()}
                      </p>
                      <p className="text-xs text-slate-500">扫码次数</p>
                    </div>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        product.status === '上架中'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-rose-50 text-rose-700'
                      }`}
                    >
                      {product.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 活跃门店榜 */}
        <div className="rounded-2xl border border-slate-100 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 p-6">
            <h3 className="text-base font-semibold text-slate-900">活跃门店榜</h3>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
              查看全部
            </button>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {activeStores.map((store, index) => (
                <div key={store.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-sm font-semibold text-slate-500">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        {store.name}
                      </p>
                      <p className="text-xs text-slate-500">{store.region}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-right">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {store.forwards.toString()}
                      </p>
                      <p className="text-xs text-slate-500">转发次数</p>
                    </div>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        store.status === '极度活跃'
                          ? 'bg-orange-50 text-orange-700'
                          : 'bg-blue-50 text-blue-700'
                      }`}
                    >
                      {store.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 5. 底部运营提示模块 */}
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-orange-500" />
          <h3 className="text-base font-semibold text-slate-900">
            AI 运营洞察与建议
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {insights.map((insight) => (
            <div
              key={insight.id}
              className="group relative flex flex-col justify-between rounded-xl border border-slate-100 bg-slate-50 p-5 transition-colors hover:bg-slate-100"
            >
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      insight.type === 'warning'
                        ? 'bg-rose-500'
                        : insight.type === 'action'
                        ? 'bg-orange-500'
                        : 'bg-emerald-500'
                    }`}
                  />
                  <h4 className="text-sm font-semibold text-slate-900">
                    {insight.title}
                  </h4>
                </div>
                <p className="text-sm leading-relaxed text-slate-600">
                  {insight.content}
                </p>
              </div>
              <button className="mt-4 flex items-center text-sm font-medium text-blue-600 opacity-0 transition-opacity group-hover:opacity-100">
                去处理 <ChevronRight className="ml-1 h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
