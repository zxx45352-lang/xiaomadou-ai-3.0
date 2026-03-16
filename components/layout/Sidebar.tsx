'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  LayoutTemplate,
  Sparkles,
  Send,
  Store,
  BarChart3,
  Settings,
} from 'lucide-react';

const navItems = [
  { name: '概览', href: '/', icon: LayoutDashboard },
  { name: '商品库管理', href: '/products', icon: Package },
  { name: '模板中心', href: '/templates', icon: LayoutTemplate },
  { name: '内容生成中心', href: '/workspace/generate', icon: Sparkles },
  { name: '内容分发中心', href: '/workspace/distribute', icon: Send },
  { name: '门店管理', href: '/stores', icon: Store },
  { name: '数据中心', href: '/analytics', icon: BarChart3 },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-64 shrink-0 flex-col border-r border-slate-200 bg-slate-50">
      <div className="flex h-16 items-center px-6">
        <div className="flex items-center gap-2 font-semibold text-slate-900">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="text-lg tracking-tight">小麻豆AI 1.0</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <item.icon
                  className={`h-5 w-5 ${
                    isActive ? 'text-blue-600' : 'text-slate-400'
                  }`}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-slate-200 p-4">
        <Link href="/settings" className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900">
          <Settings className="h-5 w-5 text-slate-400" />
          系统设置
        </Link>
      </div>
    </div>
  );
}
