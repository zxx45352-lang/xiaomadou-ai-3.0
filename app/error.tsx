'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global Error Boundary caught an error:', error);
  }, [error]);

  return (
    <div className="flex h-[80vh] w-full flex-col items-center justify-center space-y-6 px-4 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-rose-50 text-rose-600">
        <AlertTriangle className="h-10 w-10" />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          页面遇到了一些问题
        </h2>
        <p className="mx-auto max-w-md text-sm text-slate-500">
          抱歉，加载此页面时发生了意外错误。这可能是由于网络波动或临时的数据异常引起的。
        </p>
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-4 max-w-2xl overflow-auto rounded-lg bg-slate-100 p-4 text-left text-xs text-rose-600">
            <p className="font-semibold">{error.name}: {error.message}</p>
            <pre className="mt-2 whitespace-pre-wrap">{error.stack}</pre>
          </div>
        )}
      </div>
      <button
        onClick={() => reset()}
        className="flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-slate-800"
      >
        <RefreshCw className="h-4 w-4" />
        尝试恢复
      </button>
    </div>
  );
}
