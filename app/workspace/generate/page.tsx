'use client';

import { useState, Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Sparkles, Image as ImageIcon, Wand2, 
  Upload, Copy, RefreshCw, Star, Maximize2,
  Clock, CheckCircle2, Loader2, ChevronDown,
  Info, LayoutTemplate, Package
} from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Product, Template, Generation } from '@/lib/types';
import { mockModels } from '@/lib/mock-generate';

function GenerateContent() {
  const searchParams = useSearchParams();
  const templateIdParam = searchParams.get('templateId');

  const [status, setStatus] = useState<'idle' | 'generating' | 'success'>('idle');
  const [activeResult, setActiveResult] = useState<Generation | null>(null);
  
  const [products, setProducts] = useState<Product[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [history, setHistory] = useState<Generation[]>([]);
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState('3:4');
  const [isLoadingData, setIsLoadingData] = useState(true);

  // Fetch initial data
  useEffect(() => {
    async function fetchData() {
      setIsLoadingData(true);
      try {
        // Fetch products
        const { data: productsData } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (productsData) {
          setProducts(productsData);
          if (productsData.length > 0) setSelectedProduct(productsData[0]);
        }

        // Fetch templates
        const { data: templatesData } = await supabase
          .from('templates')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (templatesData) {
          setTemplates(templatesData);
          const initialTemplate = templateIdParam 
            ? templatesData.find(t => t.id === templateIdParam) 
            : templatesData[0];
            
          if (initialTemplate) {
            setSelectedTemplate(initialTemplate);
            setPrompt(initialTemplate.prompt_base || '');
          }
        }

        // Fetch history
        await fetchHistory();
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoadingData(false);
      }
    }
    
    fetchData();
  }, [templateIdParam]);

  const fetchHistory = async () => {
    const { data: historyData } = await supabase
      .from('generations')
      .select(`
        *,
        product:product_id (*),
        template:template_id (*)
      `)
      .order('created_at', { ascending: false });
      
    if (historyData) {
      setHistory(historyData);
    }
  };

  const handleGenerate = async () => {
    if (!selectedProduct || !selectedTemplate) return;
    
    setStatus('generating');
    setActiveResult(null);
    
    // Simulate API call and generation process
    setTimeout(async () => {
      const finalPrompt = `${selectedTemplate.prompt_base}\n商品信息：${selectedProduct.name} ${selectedProduct.spu}\n补充说明：${prompt}`;
      
      const newGeneration = {
        product_id: selectedProduct.id,
        template_id: selectedTemplate.id,
        task_name: `${selectedProduct.name} - ${selectedTemplate.name}`,
        prompt_text: finalPrompt,
        generated_image_url: `https://picsum.photos/seed/${Date.now()}/800/1200`,
        marketing_copy: `【上新必看】${selectedProduct.name}，专为宝贝设计的${selectedTemplate.style}风格！\n采用舒适面料，${selectedProduct.season}季百搭单品。\n#童装上新 #${selectedProduct.category} #小麻豆AI`,
        status: 'completed',
        aspect_ratio: aspectRatio,
      };

      try {
        const { data, error } = await supabase
          .from('generations')
          .insert(newGeneration)
          .select(`
            *,
            product:product_id (*),
            template:template_id (*)
          `)
          .single();

        if (error) throw error;

        if (data) {
          setHistory(prev => [data, ...prev]);
          setActiveResult(data);
          setStatus('success');
        }
      } catch (error) {
        console.error('Error saving generation:', error);
        setStatus('idle');
        alert('保存生成记录失败');
      }
    }, 3000);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('zh-CN'),
      time: date.toLocaleTimeString('zh-CN', { hour12: false })
    };
  };

  if (isLoadingData) {
    return (
      <div className="flex h-[calc(100vh-8rem)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="flex flex-col xl:flex-row xl:h-[calc(100vh-8rem)] gap-6 xl:overflow-hidden">
      
      {/* ================= 左侧：功能配置区 ================= */}
      <div className="w-full xl:w-80 flex-shrink-0 flex flex-col gap-4 xl:overflow-y-auto pr-2 pb-4 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-200">
        
        {/* 1. 页面标题 */}
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-slate-900">内容生成中心</h1>
          <p className="mt-1 text-xs text-slate-500">基于模板与商品，快速生成门店营销内容</p>
        </div>

        {/* 2. 当前模板模块 */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <LayoutTemplate className="h-4 w-4 text-slate-400" />
              <h2 className="text-sm font-semibold text-slate-900">当前模板</h2>
            </div>
            <Link href="/templates" className="text-xs font-medium text-blue-600 hover:text-blue-700">
              更换
            </Link>
          </div>
          {selectedTemplate ? (
            <div className="flex gap-3">
              <div className="h-16 w-12 flex-shrink-0 overflow-hidden rounded-md bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={selectedTemplate.cover_image} alt="cover" className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-sm font-medium text-slate-900 line-clamp-1">{selectedTemplate.name}</p>
                <div className="mt-1 flex gap-1">
                  <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-600">{selectedTemplate.style}</span>
                  <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-600">{selectedTemplate.output_type}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 py-4">
              <span className="text-xs text-slate-500">未选择模板</span>
            </div>
          )}
        </div>

        {/* 3. 参考商品模块 */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-slate-400" />
              <h2 className="text-sm font-semibold text-slate-900">参考商品</h2>
            </div>
            <button className="text-xs font-medium text-blue-600 hover:text-blue-700">
              重新选择
            </button>
          </div>
          {selectedProduct ? (
            <div className="flex gap-3">
              <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={selectedProduct.image_url} alt="product" className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-sm font-medium text-slate-900 line-clamp-1">{selectedProduct.name}</p>
                <p className="mt-1 text-xs text-slate-500">SPU: {selectedProduct.spu}</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 py-4">
              <span className="text-xs text-slate-500">未选择商品</span>
            </div>
          )}
        </div>

        {/* 4. 模特 / 风格参考模块 */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-900">参考图 & 模特</h2>
            <span className="text-[10px] text-slate-400">最多 4 张</span>
          </div>
          <div className="flex gap-2">
            <div className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100">
              <Upload className="h-4 w-4 text-slate-400" />
            </div>
            {mockModels.slice(0, 3).map((model) => (
              <div key={model.id} className="relative h-14 w-14 overflow-hidden rounded-lg border border-slate-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={model.url} alt={model.name} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs text-slate-500">官方模特库</span>
            <button className="text-xs font-medium text-slate-700 hover:text-slate-900">查看全部</button>
          </div>
        </div>

        {/* 5. 提示词 / 核心描述模块 */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-900">核心提示词</h2>
            <Info className="h-3.5 w-3.5 text-slate-400" />
          </div>
          <div className="relative">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="h-32 w-full resize-none rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs leading-relaxed text-slate-700 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="输入画面描述..."
            />
            <span className="absolute bottom-2 right-2 text-[10px] text-slate-400">
              {prompt.length} / 800
            </span>
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <span className="cursor-pointer rounded border border-slate-200 px-1.5 py-0.5 text-[10px] text-slate-500 hover:bg-slate-50">+ 阳光明媚</span>
            <span className="cursor-pointer rounded border border-slate-200 px-1.5 py-0.5 text-[10px] text-slate-500 hover:bg-slate-50">+ 胶片质感</span>
            <span className="cursor-pointer rounded border border-slate-200 px-1.5 py-0.5 text-[10px] text-slate-500 hover:bg-slate-50">+ 抓拍动态</span>
          </div>
        </div>

        {/* 6. 生成设置模块 */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="mb-3 text-sm font-semibold text-slate-900">生成设置</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-600">版本</span>
              <div className="flex items-center gap-1 rounded border border-slate-200 px-2 py-1 text-xs">
                高级版 V3 <ChevronDown className="h-3 w-3 text-slate-400" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-600">输出比例</span>
              <select 
                value={aspectRatio}
                onChange={(e) => setAspectRatio(e.target.value)}
                className="flex items-center gap-1 rounded border border-slate-200 px-2 py-1 text-xs outline-none focus:border-blue-500"
              >
                <option value="3:4">3:4 (竖图)</option>
                <option value="1:1">1:1 (方图)</option>
                <option value="16:9">16:9 (横图)</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-600">生成数量</span>
              <div className="flex items-center gap-1 rounded border border-slate-200 px-2 py-1 text-xs">
                1 张 <ChevronDown className="h-3 w-3 text-slate-400" />
              </div>
            </div>
          </div>
        </div>

        {/* 7. 底部主操作按钮 */}
        <button
          onClick={handleGenerate}
          disabled={status === 'generating' || !selectedProduct || !selectedTemplate}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === 'generating' ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="h-4 w-4" />
          )}
          {status === 'generating' ? 'AI 生成中...' : '开始 AI 生成'}
        </button>
      </div>

      {/* ================= 中间：结果展示区 ================= */}
      <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/50 shadow-sm min-h-[600px] xl:min-h-0">
        
        {/* 顶部切换区 */}
        <div className="flex h-14 flex-shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6">
          <div className="flex gap-6">
            <button className="relative flex h-full items-center text-sm font-medium text-blue-600">
              当前结果
              <span className="absolute bottom-0 left-0 h-0.5 w-full bg-blue-600" />
            </button>
            <button className="flex h-full items-center text-sm font-medium text-slate-500 hover:text-slate-900">
              案例库
            </button>
          </div>
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
              仅看当前功能
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
              仅看收藏
            </label>
          </div>
        </div>

        {/* 核心展示区 */}
        <div className="flex flex-1 flex-col overflow-y-auto p-6 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-200">
          {status === 'idle' && !activeResult && (
            <div className="flex h-full flex-col items-center justify-center text-slate-400">
              <ImageIcon className="mb-4 h-12 w-12 opacity-20" />
              <p className="text-sm">配置左侧参数后，点击“开始 AI 生成”</p>
            </div>
          )}

          {status === 'generating' && (
            <div className="flex h-full flex-col items-center justify-center">
              <div className="relative flex h-20 w-20 items-center justify-center">
                <div className="absolute inset-0 animate-ping rounded-full bg-blue-100 opacity-75"></div>
                <Sparkles className="relative h-8 w-8 text-blue-600 animate-pulse" />
              </div>
              <p className="mt-4 text-sm font-medium text-slate-600">AI 正在为您生成大片...</p>
              <p className="mt-1 text-xs text-slate-400">预计需要 10-15 秒，请稍候</p>
            </div>
          )}

          {(status === 'success' || activeResult) && activeResult && (
            <div className="flex h-full flex-col">
              {/* 画廊区域 */}
              <div className="flex-1 pb-6">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 max-w-2xl mx-auto">
                  <div className="group relative aspect-[3/4] overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={activeResult.generated_image_url} alt="result" className="h-full w-full object-cover" />
                    
                    {/* 视角标签 */}
                    <div className="absolute left-1/2 top-3 -translate-x-1/2 rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                      AI 生成结果
                    </div>

                    {/* Hover 放大按钮 */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                      <button className="rounded-full bg-white/90 p-2 text-slate-700 shadow-sm hover:bg-white hover:text-slate-900">
                        <Maximize2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  {/* 营销文案展示 */}
                  <div className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                      <Wand2 className="h-4 w-4 text-blue-600" />
                      AI 营销文案
                    </h3>
                    <div className="flex-1 whitespace-pre-wrap text-sm leading-relaxed text-slate-600 bg-slate-50 p-4 rounded-lg border border-slate-100">
                      {activeResult.marketing_copy}
                    </div>
                    <button 
                      onClick={() => navigator.clipboard.writeText(activeResult.marketing_copy)}
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                      <Copy className="h-4 w-4" /> 复制文案
                    </button>
                  </div>
                </div>
              </div>

              {/* 底部结果说明区 */}
              <div className="flex-shrink-0 rounded-xl border border-slate-200 bg-white p-5 shadow-sm mt-auto">
                <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-4 text-sm text-slate-600">
                    <span className="flex items-center gap-1.5 font-medium text-slate-900">
                      <Sparkles className="h-4 w-4 text-blue-600" />
                      {activeResult.task_name}
                    </span>
                    <span className="h-3 w-px bg-slate-200" />
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" /> {formatDate(activeResult.created_at).date} {formatDate(activeResult.created_at).time}
                    </span>
                    <span className="h-3 w-px bg-slate-200" />
                    <span>比例: {activeResult.aspect_ratio}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700" title="收藏">
                      <Star className="h-4 w-4" />
                    </button>
                    <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700" title="重新生成">
                      <RefreshCw className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <div className="flex items-start justify-between gap-6">
                  <p className="text-sm leading-relaxed text-slate-600 line-clamp-2 flex-1">
                    {activeResult.prompt_text}
                  </p>
                  <button 
                    onClick={() => navigator.clipboard.writeText(activeResult.prompt_text)}
                    className="flex flex-shrink-0 items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
                  >
                    <Copy className="h-3.5 w-3.5" /> 复制提示词
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ================= 右侧：历史记录区 ================= */}
      <div className="w-full xl:w-72 flex-shrink-0 flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm min-h-[400px] xl:min-h-0">
        <div className="flex h-14 items-center justify-between border-b border-slate-200 px-5">
          <h2 className="text-sm font-semibold text-slate-900">历史记录</h2>
          <span className="text-xs text-slate-500">{history.length} 条</span>
        </div>
        
        <div className="flex-1 overflow-y-auto p-3 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-200">
          <div className="space-y-3">
            {history.map((item) => {
              const isActive = activeResult?.id === item.id;
              const { date, time } = formatDate(item.created_at);
              return (
                <div 
                  key={item.id}
                  onClick={() => {
                    setActiveResult(item);
                    setStatus('success');
                  }}
                  className={`group relative flex cursor-pointer gap-3 rounded-xl border p-2 transition-colors ${
                    isActive 
                      ? 'border-blue-500 bg-blue-50/50' 
                      : 'border-transparent hover:bg-slate-50'
                  }`}
                >
                  {/* 缩略图 */}
                  <div className="relative h-20 w-14 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.generated_image_url} alt="history" className="h-full w-full object-cover" />
                  </div>
                  
                  {/* 信息 */}
                  <div className="flex flex-1 flex-col justify-center overflow-hidden">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-900 truncate pr-2">{item.template?.name || '自定义模板'}</span>
                      {isActive && <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0 text-blue-600" />}
                    </div>
                    <p className="mt-1 text-[10px] text-slate-500 truncate">{item.product?.name || item.task_name}</p>
                    <p className="mt-2 text-[10px] text-slate-400">{date} {time}</p>
                  </div>
                </div>
              );
            })}
            
            {history.length === 0 && (
              <div className="flex h-32 flex-col items-center justify-center text-slate-400">
                <Clock className="mb-2 h-6 w-6 opacity-20" />
                <span className="text-xs">暂无生成记录</span>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}

export default function GeneratePageWrapper() {
  return (
    <Suspense fallback={<div className="flex h-full items-center justify-center text-slate-500"><Loader2 className="h-6 w-6 animate-spin" /></div>}>
      <GenerateContent />
    </Suspense>
  );
}
