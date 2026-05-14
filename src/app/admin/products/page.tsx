'use client';

import { useEffect, useState } from 'react';
import { 
    Plus, Search, Edit2, Trash2, 
    ShoppingBag, Filter, X, Sparkles,
    Droplets, Flame, Zap, Gem
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import Link from 'next/link';

const iconMap: Record<string, any> = {
    Sparkles, Droplets, Flame, Zap, Gem, ShoppingBag
};

export default function ProductsAdminPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .order('created_at', { ascending: false });
            
            if (error) throw error;
            setProducts(data || []);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this product?')) return;
        
        try {
            const { error } = await supabase
                .from('products')
                .delete()
                .eq('id', id);
            
            if (error) throw error;
            fetchProducts();
        } catch (err) {
            alert('Failed to delete');
        }
    };

    const filteredProducts = products.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div className="flex-1">
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Sacred Store Products</h1>
                    <p className="text-sm md:text-base text-slate-500 mt-1">Manage items available in the Sacred Store.</p>
                </div>
                <Link 
                    href="/admin/products/new"
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-[#E95D24] text-white rounded-xl text-sm font-bold hover:bg-[#d14d1b] transition-all shadow-lg shadow-[#E95D24]/20 hover:scale-105 active:scale-95"
                >
                    <Plus size={18} /> Add Product
                </Link>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input 
                        type="text" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search products by name or category..."
                        className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm md:text-base focus:border-[#E95D24] focus:ring-4 focus:ring-[#E95D24]/5 transition-all outline-none placeholder:text-slate-400"
                    />
                </div>
            </div>

            {/* Table View */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden w-full">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-5 py-4 text-[11px] font-bold text-slate-600 uppercase tracking-widest border-r border-slate-200 w-[100px] text-center">Icon</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-600 uppercase tracking-widest border-r border-slate-200">Product Details</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-600 uppercase tracking-widest border-r border-slate-200">Category</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-600 uppercase tracking-widest border-r border-slate-200">Description</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-600 uppercase tracking-widest w-[140px] text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {isLoading ? (
                                Array.from({ length: 10 }).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td className="px-4 py-6 border-r border-slate-200">
                                            <div className="w-12 h-12 bg-slate-100 rounded-xl mx-auto"></div>
                                        </td>
                                        <td className="px-6 py-6 border-r border-slate-200">
                                            <div className="h-4 bg-slate-100 rounded w-1/2 mb-2"></div>
                                            <div className="h-3 bg-slate-100 rounded w-1/4"></div>
                                        </td>
                                        <td className="px-6 py-6 border-r border-slate-200">
                                            <div className="h-4 bg-slate-100 rounded w-20"></div>
                                        </td>
                                        <td className="px-6 py-6 border-r border-slate-200">
                                            <div className="h-4 bg-slate-100 rounded w-full"></div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className="h-8 bg-slate-100 rounded w-24 mx-auto"></div>
                                        </td>
                                    </tr>
                                ))
                            ) : filteredProducts.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-4 py-20 text-center">
                                        <p className="text-sm text-slate-500 font-medium tracking-tight">No products found matching your search.</p>
                                    </td>
                                </tr>
                            ) : filteredProducts.map((product) => {
                                const IconComp = iconMap[product.icon] || ShoppingBag;
                                return (
                                    <tr key={product.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-4 py-4 border-r border-slate-200">
                                            <div className={`w-14 h-14 ${product.bg} rounded-xl flex items-center justify-center border border-white shadow-sm mx-auto`}>
                                                <IconComp className={`w-7 h-7 ${product.color}`} />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 border-r border-slate-200">
                                            <div className="font-bold text-slate-900 text-sm mb-0.5 group-hover:text-[#E95D24] transition-colors">{product.name}</div>
                                            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-tighter">ID: {product.id}</div>
                                        </td>
                                        <td className="px-6 py-4 border-r border-slate-200">
                                            <span className="inline-block px-2 py-1 bg-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-widest rounded">
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 border-r border-slate-200">
                                            <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed font-medium">
                                                {product.description}
                                            </p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <Link 
                                                    href={`/admin/products/edit/${product.id}`}
                                                    className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all border border-transparent hover:border-blue-100"
                                                    title="Edit Product"
                                                >
                                                    <Edit2 size={18} />
                                                </Link>
                                                <button 
                                                    onClick={() => handleDelete(product.id)}
                                                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all border border-transparent hover:border-red-100"
                                                    title="Delete Product"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
