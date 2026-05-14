'use client';

import { useEffect, useState } from 'react';
import { 
    Plus, Search, Edit2, Trash2, 
    Flame, Filter, X, Sparkles,
    Activity, Coins, Heart, Users, Flower2
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';

const iconMap: Record<string, any> = {
    Flame, Sparkles, Activity, Coins, Heart, Users, Flower2
};

export default function PujasAdminPage() {
    const [pujas, setPujas] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPuja, setEditingPuja] = useState<any>(null);
    
    // Form State
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        deity: '',
        short_description: '',
        full_description: '',
        benefits: [] as string[],
        duration: '',
        icon: 'Sparkles',
        image: '',
        video_url: '',
        is_bookable: true
    });

    const [benefitInput, setBenefitInput] = useState('');

    const fetchPujas = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('pujas')
                .select('*')
                .order('created_at', { ascending: false });
            
            if (error) throw error;
            setPujas(data || []);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPujas();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this puja?')) return;
        
        try {
            const { error } = await supabase
                .from('pujas')
                .delete()
                .eq('id', id);
            
            if (error) throw error;
            fetchPujas();
        } catch (err) {
            alert('Failed to delete');
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingPuja) {
                const { error } = await supabase
                    .from('pujas')
                    .update(formData)
                    .eq('id', editingPuja.id);
                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('pujas')
                    .insert([formData]);
                if (error) throw error;
            }
            setIsModalOpen(false);
            setEditingPuja(null);
            fetchPujas();
        } catch (err) {
            alert('Failed to save');
            console.error(err);
        }
    };

    const addBenefit = () => {
        if (benefitInput.trim()) {
            setFormData({...formData, benefits: [...formData.benefits, benefitInput.trim()]});
            setBenefitInput('');
        }
    };

    const removeBenefit = (index: number) => {
        setFormData({
            ...formData, 
            benefits: formData.benefits.filter((_, i) => i !== index)
        });
    };

    const openModal = (puja: any = null) => {
        if (puja) {
            setEditingPuja(puja);
            setFormData({
                id: puja.id,
                name: puja.name,
                deity: puja.deity,
                short_description: puja.short_description,
                full_description: puja.full_description,
                benefits: puja.benefits || [],
                duration: puja.duration,
                icon: puja.icon,
                image: puja.image,
                video_url: puja.video_url,
                is_bookable: puja.is_bookable
            });
        } else {
            setEditingPuja(null);
            setFormData({
                id: '',
                name: '',
                deity: '',
                short_description: '',
                full_description: '',
                benefits: [],
                duration: '',
                icon: 'Sparkles',
                image: '',
                video_url: '',
                is_bookable: true
            });
        }
        setIsModalOpen(true);
    };

    const filteredPujas = pujas.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.deity.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div className="flex-1">
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Puja Rituals</h1>
                    <p className="text-sm md:text-base text-slate-500 mt-1">Manage sacred rituals available for booking.</p>
                </div>
                <button 
                    onClick={() => openModal()}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-[#E95D24] text-white rounded-xl text-sm font-bold hover:bg-[#d14d1b] transition-all shadow-lg shadow-[#E95D24]/20 hover:scale-105 active:scale-95"
                >
                    <Plus size={18} /> Add Puja
                </button>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input 
                        type="text" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search pujas by name or deity..."
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
                                <th className="px-5 py-4 text-[11px] font-bold text-slate-600 uppercase tracking-widest border-r border-slate-200 w-[120px] text-center">Ritual Image</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-600 uppercase tracking-widest border-r border-slate-200">Name & Deity</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-600 uppercase tracking-widest border-r border-slate-200">Duration</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-600 uppercase tracking-widest border-r border-slate-200 text-center">Status</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-600 uppercase tracking-widest w-[140px] text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {isLoading ? (
                                Array.from({ length: 10 }).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td className="px-4 py-6 border-r border-slate-200">
                                            <div className="w-16 h-16 bg-slate-100 rounded-xl mx-auto"></div>
                                        </td>
                                        <td className="px-6 py-6 border-r border-slate-200">
                                            <div className="h-4 bg-slate-100 rounded w-1/2 mb-2"></div>
                                            <div className="h-3 bg-slate-100 rounded w-1/4"></div>
                                        </td>
                                        <td className="px-6 py-6 border-r border-slate-200">
                                            <div className="h-4 bg-slate-100 rounded w-20"></div>
                                        </td>
                                        <td className="px-6 py-6 border-r border-slate-200 text-center">
                                            <div className="h-6 bg-slate-100 rounded w-16 mx-auto"></div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className="h-8 bg-slate-100 rounded w-24 mx-auto"></div>
                                        </td>
                                    </tr>
                                ))
                            ) : filteredPujas.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-4 py-20 text-center">
                                        <p className="text-sm text-slate-500 font-medium tracking-tight">No pujas found matching your search.</p>
                                    </td>
                                </tr>
                            ) : filteredPujas.map((puja) => {
                                return (
                                    <tr key={puja.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-4 py-4 border-r border-slate-200">
                                            <div className="w-16 h-16 bg-slate-100 rounded-xl overflow-hidden border border-slate-200 shadow-sm mx-auto">
                                                {puja.image ? (
                                                    <img src={puja.image} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-400 font-bold uppercase">No Image</div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 border-r border-slate-200">
                                            <div className="font-bold text-slate-900 text-sm mb-1 group-hover:text-[#E95D24] transition-colors">{puja.name}</div>
                                            <div className="inline-block px-2 py-0.5 bg-saffron/10 text-[10px] font-bold text-saffron uppercase tracking-widest rounded">
                                                {puja.deity}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 border-r border-slate-200">
                                            <span className="text-sm text-slate-600 font-medium flex items-center gap-2">
                                                <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                                                {puja.duration}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 border-r border-slate-200 text-center">
                                            <span className={`inline-block px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest border ${puja.is_bookable ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                                                {puja.is_bookable ? 'Active' : 'Paused'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <button 
                                                    onClick={() => openModal(puja)}
                                                    className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all border border-transparent hover:border-blue-100"
                                                    title="Edit Ritual"
                                                >
                                                    <Edit2 size={18} />
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(puja.id)}
                                                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all border border-transparent hover:border-red-100"
                                                    title="Delete Ritual"
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

            {/* Modal */}
            {isModalOpen ? (
                <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 md:p-6 bg-slate-900/60 backdrop-blur-xl overflow-y-auto">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="bg-white rounded-[2rem] lg:rounded-[3rem] shadow-2xl w-full max-w-3xl lg:max-w-5xl xl:max-w-7xl my-auto overflow-hidden max-h-[98vh] flex flex-col border border-white/20"
                    >
                        <div className="px-8 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                            <div>
                                <h2 className="text-xl font-bold text-slate-900">{editingPuja ? 'Edit Puja Ritual' : 'New Puja Ritual'}</h2>
                                <p className="text-xs text-slate-500 font-medium">Configure ritual details and benefits</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleSave} className="p-6 lg:p-10 overflow-y-auto custom-scrollbar space-y-6 lg:space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] lg:text-xs font-bold text-slate-500 uppercase tracking-wider block ml-1">Puja ID (Slug)</label>
                                        <input 
                                            required
                                            type="text" 
                                            disabled={!!editingPuja}
                                            value={formData.id}
                                            onChange={(e) => setFormData({...formData, id: e.target.value})}
                                            placeholder="e.g. grah-dosh"
                                            className="w-full px-4 py-2.5 lg:py-3 border border-slate-200 rounded-xl text-sm font-medium focus:border-[#E95D24] focus:ring-4 focus:ring-[#E95D24]/5 outline-none transition-all disabled:bg-slate-50 disabled:text-slate-400"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] lg:text-xs font-bold text-slate-500 uppercase tracking-wider block ml-1">Puja Name</label>
                                        <input 
                                            required
                                            type="text" 
                                            value={formData.name}
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                            placeholder="e.g. Grah Dosh Nivaran"
                                            className="w-full px-4 py-2.5 lg:py-3 border border-slate-200 rounded-xl text-sm font-bold focus:border-[#E95D24] focus:ring-4 focus:ring-[#E95D24]/5 outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] lg:text-xs font-bold text-slate-500 uppercase tracking-wider block ml-1">Main Deity</label>
                                        <input 
                                            required
                                            type="text" 
                                            value={formData.deity}
                                            onChange={(e) => setFormData({...formData, deity: e.target.value})}
                                            placeholder="e.g. Navagraha"
                                            className="w-full px-4 py-2.5 lg:py-3 border border-slate-200 rounded-xl text-sm font-medium focus:border-[#E95D24] focus:ring-4 focus:ring-[#E95D24]/5 outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] lg:text-xs font-bold text-slate-500 uppercase tracking-wider block ml-1">Duration</label>
                                        <input 
                                            required
                                            type="text" 
                                            value={formData.duration}
                                            onChange={(e) => setFormData({...formData, duration: e.target.value})}
                                            placeholder="e.g. 1 day"
                                            className="w-full px-4 py-2.5 lg:py-3 border border-slate-200 rounded-xl text-sm font-medium focus:border-[#E95D24] focus:ring-4 focus:ring-[#E95D24]/5 outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] lg:text-xs font-bold text-slate-500 uppercase tracking-wider block ml-1">Icon</label>
                                        <select 
                                            value={formData.icon}
                                            onChange={(e) => setFormData({...formData, icon: e.target.value})}
                                            className="w-full px-4 py-2.5 lg:py-3 border border-slate-200 rounded-xl text-sm font-medium focus:border-[#E95D24] focus:ring-4 focus:ring-[#E95D24]/5 outline-none transition-all bg-white"
                                        >
                                            {Object.keys(iconMap).map(icon => (
                                                <option key={icon} value={icon}>{icon}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="flex items-center gap-3 pt-4">
                                        <input 
                                            type="checkbox"
                                            id="is_bookable"
                                            checked={formData.is_bookable}
                                            onChange={(e) => setFormData({...formData, is_bookable: e.target.checked})}
                                            className="w-5 h-5 accent-[#E95D24] rounded-md"
                                        />
                                        <label htmlFor="is_bookable" className="text-sm font-bold text-slate-700 cursor-pointer">Available for Booking</label>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block ml-1">Image URL</label>
                                    <input 
                                        type="text" 
                                        value={formData.image}
                                        onChange={(e) => setFormData({...formData, image: e.target.value})}
                                        placeholder="e.g. /images/pujas/1.jpeg"
                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl text-xs font-mono focus:border-[#E95D24] focus:ring-4 focus:ring-[#E95D24]/5 outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block ml-1">Video URL (YouTube Embed)</label>
                                    <input 
                                        type="text" 
                                        value={formData.video_url}
                                        onChange={(e) => setFormData({...formData, video_url: e.target.value})}
                                        placeholder="e.g. https://www.youtube.com/embed/..."
                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl text-xs font-mono focus:border-[#E95D24] focus:ring-4 focus:ring-[#E95D24]/5 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] lg:text-xs font-bold text-slate-500 uppercase tracking-wider block ml-1">Short Description</label>
                                    <textarea 
                                        rows={2}
                                        value={formData.short_description}
                                        onChange={(e) => setFormData({...formData, short_description: e.target.value})}
                                        placeholder="Catchy one-liner for the list..."
                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-medium focus:border-[#E95D24] focus:ring-4 focus:ring-[#E95D24]/5 outline-none transition-all resize-none"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] lg:text-xs font-bold text-slate-500 uppercase tracking-wider block ml-1">Full Description</label>
                                    <textarea 
                                        rows={4}
                                        value={formData.full_description}
                                        onChange={(e) => setFormData({...formData, full_description: e.target.value})}
                                        placeholder="Detailed explanation..."
                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-medium focus:border-[#E95D24] focus:ring-4 focus:ring-[#E95D24]/5 outline-none transition-all resize-none"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4 bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block ml-1">Ritual Benefits</label>
                                <div className="flex gap-3">
                                    <input 
                                        type="text" 
                                        value={benefitInput}
                                        onChange={(e) => setBenefitInput(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addBenefit())}
                                        placeholder="Add a benefit (e.g. Removes obstacles)"
                                        className="flex-1 px-4 py-3 border border-slate-200 rounded-xl text-sm font-medium focus:border-[#E95D24] outline-none transition-all"
                                    />
                                    <button 
                                        type="button"
                                        onClick={addBenefit}
                                        className="px-6 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all shadow-sm"
                                    >
                                        Add
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {formData.benefits.map((benefit, index) => (
                                        <div key={index} className="flex items-center gap-2 px-4 py-2 bg-[#E95D24]/5 text-[#E95D24] border border-[#E95D24]/10 rounded-full text-xs font-bold group">
                                            {benefit}
                                            <button type="button" onClick={() => removeBenefit(index)} className="hover:text-red-600 transition-colors">
                                                <X size={14} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-6 border-t border-slate-100 flex gap-4">
                                <button 
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 py-4 border border-slate-200 text-slate-600 rounded-2xl text-sm font-bold hover:bg-slate-50 transition-all"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    className="flex-1 py-4 bg-[#E95D24] text-white rounded-2xl text-sm font-bold hover:bg-[#d14d1b] transition-all shadow-lg shadow-[#E95D24]/20 hover:scale-[1.01] active:scale-[0.99]"
                                >
                                    {editingPuja ? 'Save Ritual' : 'Create Ritual'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            ) : null}
        </div>
    );
}
