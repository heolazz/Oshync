import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const ProfileEditor = ({ profile, setProfile, onClose }) => {
    const [formData, setFormData] = useState({
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        realName: profile.realName || '',
        birthDay: profile.birthDay || '',
        birthMonth: profile.birthMonth || '',
        birthYear: profile.birthYear || '',
        hometown: profile.hometown || '',
        yearsActiveStart: profile.yearsActiveStart || '',
        yearsActiveEnd: profile.yearsActiveEnd || '',
        tags: profile.tags ? profile.tags.join(', ') : '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        const updatedProfile = {
            ...profile,
            ...formData,
            tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
        };
        setProfile(updatedProfile);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]"
            >
                <div className="p-6 px-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <h2 className="text-2xl font-bold text-slate-800">Edit Profile</h2>
                    <button onClick={onClose} className="p-2 bg-white rounded-full text-slate-400 hover:text-slate-700 shadow-sm border border-slate-200 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-8 overflow-y-auto no-scrollbar flex flex-col gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider pl-2">First Name</label>
                            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-pink/50 transition-all" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider pl-2">Last Name</label>
                            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-pink/50 transition-all" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider pl-2">Real Name</label>
                        <input type="text" name="realName" value={formData.realName} onChange={handleChange} className="bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-pink/50 transition-all" />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider pl-2">Birth Day</label>
                            <input type="text" name="birthDay" value={formData.birthDay} onChange={handleChange} className="bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-pink/50 transition-all" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider pl-2">Birth Month</label>
                            <input type="text" name="birthMonth" value={formData.birthMonth} onChange={handleChange} className="bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-pink/50 transition-all" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider pl-2">Birth Year</label>
                            <input type="text" name="birthYear" value={formData.birthYear} onChange={handleChange} className="bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-pink/50 transition-all" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider pl-2">Hometown</label>
                        <input type="text" name="hometown" value={formData.hometown} onChange={handleChange} className="bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-pink/50 transition-all" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider pl-2">Years Active (Start)</label>
                            <input type="text" name="yearsActiveStart" value={formData.yearsActiveStart} onChange={handleChange} className="bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-pink/50 transition-all" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider pl-2">Years Active (End)</label>
                            <input type="text" name="yearsActiveEnd" value={formData.yearsActiveEnd} onChange={handleChange} className="bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-pink/50 transition-all" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider pl-2">Tags (Comma Separated)</label>
                        <input type="text" name="tags" value={formData.tags} onChange={handleChange} placeholder="e.g. Singer, Idol, J-Pop" className="bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-pink/50 transition-all" />
                    </div>
                </div>

                <div className="p-6 bg-slate-50/80 border-t border-slate-100 flex justify-end gap-4">
                    <button onClick={onClose} className="px-8 py-3 rounded-full text-slate-500 font-bold hover:bg-slate-200 transition-colors">Cancel</button>
                    <button onClick={handleSave} className="px-8 py-3 bg-pink text-gray-600 rounded-full font-bold shadow-lg shadow-pink/30 hover:bg-pink/90 hover:scale-[1.02] transition-all">Save Changes</button>
                </div>
            </motion.div>
        </div>
    );
};

export default ProfileEditor;