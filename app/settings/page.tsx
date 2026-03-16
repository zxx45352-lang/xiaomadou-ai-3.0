'use client';

import { useState } from 'react';
import { Save, User, Bell, Shield, Database, Globe } from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('account');

  const tabs = [
    { id: 'account', name: '账号设置', icon: User },
    { id: 'notifications', name: '通知设置', icon: Bell },
    { id: 'security', name: '安全与隐私', icon: Shield },
    { id: 'data', name: '数据管理', icon: Database },
    { id: 'system', name: '系统偏好', icon: Globe },
  ];

  return (
    <div className="mx-auto max-w-5xl pb-12">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">系统设置</h1>
        <p className="mt-1 text-sm text-slate-500">管理您的账户信息和系统偏好</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* 左侧导航 */}
        <div className="w-full md:w-64 flex-shrink-0">
          <nav className="flex flex-col gap-1">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <tab.icon className={`h-5 w-5 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* 右侧内容区 */}
        <div className="flex-1 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          {activeTab === 'account' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">个人信息</h2>
                <p className="mt-1 text-sm text-slate-500">更新您的个人资料和联系方式</p>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 text-2xl font-semibold text-slate-500">
                  <User className="h-8 w-8" />
                </div>
                <div className="flex gap-3">
                  <button className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50">
                    更换头像
                  </button>
                  <button className="rounded-lg px-4 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50">
                    删除
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">用户名</label>
                  <input
                    type="text"
                    defaultValue="品牌管理员"
                    className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">邮箱地址</label>
                  <input
                    type="email"
                    defaultValue="admin@brand.com"
                    className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">手机号码</label>
                  <input
                    type="tel"
                    defaultValue="13800138000"
                    className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">所属部门</label>
                  <input
                    type="text"
                    defaultValue="数字营销部"
                    className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-100">
                <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700">
                  <Save className="h-4 w-4" />
                  保存更改
                </button>
              </div>
            </div>
          )}

          {activeTab !== 'account' && (
            <div className="flex h-64 items-center justify-center text-slate-400 animate-in fade-in duration-300">
              <div className="text-center">
                <h2 className="text-lg font-semibold text-slate-900">功能开发中</h2>
                <p className="mt-2 text-sm text-slate-500">该设置模块即将上线，敬请期待。</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
