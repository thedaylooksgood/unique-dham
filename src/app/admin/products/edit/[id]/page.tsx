'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { 
    ChevronLeft, Save, X, ShoppingBag, 
    Sparkles, Droplets, Flame, Zap, Gem,
    Trash2, AlertCircle
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import Link from 'next/link';

const iconMap: Record<string, any> = {
    Sparkles, Droplets, Flame, Zap, Gem, ShoppingBag
};

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        id: '',
        name: '',
        description: '',
        category: '',
        icon: 'ShoppingBag',
        color: 'text-temple-red',
        bg: 'bg-temple-red/10'
    });

    useEffect(() => {
        const fetchProduct = async () => {
            setIsLoading(true);
            try {
                const { data, error } = await supabase
                    .from('products')
                    .select('*')
                    .eq('id', id)
                    .single();
                
                if (error) throw error;
                if (data) {
                    setFormData({
                        id: data.id,
                        name: data.name,
                        description: data.description || '',
                        category: data.category || '',
                        icon: data.icon || 'ShoppingBag',
                        color: data.color || 'text-temple-red',
                        bg: data.bg || 'bg-temple-red/10'
                    });
                }
            } catch (err: any) {
                console.error(err);
                setError(err.message || 'Failed to load product');
            } finally {
                setIsLoading(false);
            }
        };

        if (id !== 'new') {
            fetchProduct();
        } else {
            setIsLoading(false);
        }
    }, [id]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setError(null);
        try {
            if (id === 'new') {
                const { error } = await supabase
                    .from('products')
                    .insert([formData]);
                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('products')
                    .update(formData)
                    .eq('id', id);
                if (error) throw error;
            }
            router.push('/admin/products');
            router.refresh();
        } catch (err: any) {
            setError(err.message || 'Failed to save product');
            console.error(err);
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
                <div className="w-12 h-12 border-4 border-[#E95D24]/20 border-t-[#E95D24] rounded-full animate-spin"></div>
                <p className="text-slate-500 font-medium">Loading product data...</p>
            </div>
        );
    }

    return (
        <div className="w-full space-y-10 pb-20 px-4 md:px-8">
            {/* Minimal Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200/60 pb-8">
                <div className="flex items-center gap-6">
                    <Link 
                        href="/admin/products"
                        className="p-3 hover:bg-slate-100 rounded-xl transition-all text-slate-500 bg-white border border-slate-200 shadow-sm hover:scale-105 active:scale-95"
                    >
                        <ChevronLeft size={22} />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                            {id === 'new' ? 'New Ritual Product' : 'Edit Product'}
                        </h1>
                        <p className="text-sm text-slate-500 mt-1 font-medium flex items-center gap-2">
                            {id === 'new' ? (
                                <>Sacred Store <span className="w-1 h-1 bg-slate-300 rounded-full"></span> New Item Creation</>
                            ) : (
                                <>Managing <span className="text-[#E95D24] font-bold">{formData.name}</span> <span className="w-1 h-1 bg-slate-300 rounded-full"></span> {formData.id}</>
                            )}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <Link 
                        href="/admin/products"
                        className="px-8 py-3.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all shadow-sm active:scale-95"
                    >
                        Cancel
                    </Link>
                    <button 
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex items-center gap-2 px-10 py-3.5 bg-[#E95D24] text-white rounded-xl text-sm font-bold hover:bg-[#d14d1b] transition-all shadow-lg shadow-[#E95D24]/20 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-95"
                    >
                        {isSaving ? (
                            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <Save size={18} />
                        )}
                        {id === 'new' ? 'Create Product' : 'Update Product'}
                    </button>
                </div>
            </div>

            {error && (
                <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-5 bg-red-50 border border-red-100 rounded-xl flex items-center gap-4 text-red-600 text-sm font-semibold shadow-sm"
                >
                    <AlertCircle size={20} className="shrink-0" />
                    {error}
                </motion.div>
            )}

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                {/* Primary Content */}
                <div className="xl:col-span-8 space-y-10">
                    <section className="space-y-6">
                        <div className="flex items-center gap-2 px-1">
                            <div className="w-1 h-4 bg-[#E95D24] rounded-full"></div>
                            <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">Core Information</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-8 md:p-10 rounded-2xl border border-slate-200/60 shadow-sm">
                            <div className="space-y-3">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block ml-1">Product ID (Slug)</label>
                                <input 
                                    required
                                    type="text" 
                                    disabled={id !== 'new'}
                                    value={formData.id}
                                    onChange={(e) => setFormData({...formData, id: e.target.value})}
                                    placeholder="e.g. kamya-sindur"
                                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-[#E95D24] focus:ring-4 focus:ring-[#E95D24]/5 outline-none transition-all disabled:opacity-60"
                                />
                                {id === 'new' && <p className="text-[10px] text-slate-400 font-medium ml-1">Unique identifier used for URLs. Cannot be edited later.</p>}
                            </div>
                            <div className="space-y-3">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block ml-1">Product Name</label>
                                <input 
                                    required
                                    type="text" 
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    placeholder="e.g. Kamya Sindur"
                                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:border-[#E95D24] focus:ring-4 focus:ring-[#E95D24]/5 outline-none transition-all"
                                />
                            </div>
                        </div>
                    </section>

                    <section className="space-y-6">
                        <div className="flex items-center gap-2 px-1">
                            <div className="w-1 h-4 bg-[#E95D24] rounded-full"></div>
                            <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">Full Content</h2>
                        </div>
                        <div className="bg-white p-8 md:p-10 rounded-2xl border border-slate-200/60 shadow-sm">
                            <textarea 
                                rows={15}
                                value={formData.description}
                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                                placeholder="Describe the significance, usage, and spiritual benefits of this item..."
                                className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-[#E95D24] focus:ring-4 focus:ring-[#E95D24]/5 outline-none transition-all resize-none custom-scrollbar leading-relaxed"
                            />
                        </div>
                    </section>
                </div>

                {/* Sidebar Attributes */}
                <div className="xl:col-span-4 space-y-10">
                    <section className="space-y-6">
                        <div className="flex items-center gap-2 px-1">
                            <div className="w-1 h-4 bg-[#E95D24] rounded-full"></div>
                            <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">Categorization</h2>
                        </div>
                        <div className="bg-white p-8 rounded-2xl border border-slate-200/60 shadow-sm space-y-8">
                            <div className="space-y-3">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block ml-1">Category</label>
                                <input 
                                    required
                                    type="text" 
                                    value={formData.category}
                                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                                    placeholder="e.g. From Kamakhya"
                                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-[#E95D24] focus:ring-4 focus:ring-[#E95D24]/5 outline-none transition-all"
                                />
                            </div>

                            <div className="space-y-4">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block ml-1">Select Icon</label>
                                <div className="grid grid-cols-3 gap-3">
                                    {Object.keys(iconMap).map(icon => {
                                        const Icon = iconMap[icon];
                                        return (
                                            <button
                                                key={icon}
                                                type="button"
                                                onClick={() => setFormData({...formData, icon})}
                                                className={`p-5 rounded-xl border transition-all flex flex-col items-center gap-2 ${
                                                    formData.icon === icon 
                                                    ? 'bg-[#E95D24]/10 border-[#E95D24] text-[#E95D24] shadow-inner shadow-[#E95D24]/5' 
                                                    : 'bg-slate-50 border-slate-100 text-slate-400 hover:border-slate-300'
                                                }`}
                                            >
                                                <Icon size={24} />
                                                <span className="text-[10px] font-bold uppercase tracking-tighter">{icon}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-6">
                        <div className="flex items-center gap-2 px-1">
                            <div className="w-1 h-4 bg-[#E95D24] rounded-full"></div>
                            <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">Appearance</h2>
                        </div>
                        <div className="bg-slate-900 p-8 rounded-2xl text-white space-y-8 shadow-xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl transition-all group-hover:bg-white/10"></div>
                            
                            <div className="space-y-5 relative z-10">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] block ml-1">Text Color Class</label>
                                    <input 
                                        type="text" 
                                        value={formData.color}
                                        onChange={(e) => setFormData({...formData, color: e.target.value})}
                                        className="w-full px-5 py-4 bg-white/10 border border-white/10 rounded-xl text-xs font-mono focus:border-white/30 outline-none transition-all text-white placeholder:text-white/20"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] block ml-1">Background Class</label>
                                    <input 
                                        type="text" 
                                        value={formData.bg}
                                        onChange={(e) => setFormData({...formData, bg: e.target.value})}
                                        className="w-full px-5 py-4 bg-white/10 border border-white/10 rounded-xl text-xs font-mono focus:border-white/30 outline-none transition-all text-white placeholder:text-white/20"
                                    />
                                </div>
                            </div>

                            <div className="pt-6 border-t border-white/10 relative z-10">
                                <p className="text-[10px] text-slate-400 mb-6 font-black uppercase tracking-[0.2em]">Live Production Preview</p>
                                <div className={`w-full p-10 ${formData.bg} rounded-2xl border border-white/10 flex flex-col items-center justify-center gap-5 min-h-[180px] shadow-2xl`}>
                                    {(() => {
                                        const Icon = iconMap[formData.icon] || ShoppingBag;
                                        return <Icon className={`w-14 h-14 ${formData.color}`} />;
                                    })()}
                                    <div className={`text-lg font-black tracking-tight ${formData.color}`}>{formData.name || 'Ritual Name'}</div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
