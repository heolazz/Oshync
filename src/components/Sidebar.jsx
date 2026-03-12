import React from 'react';
import { motion } from 'framer-motion';

const Sidebar = ({ activeTab, setActiveTab, isCameraActive, setIsCameraActive, profilePic, onProfilePicClick, icons }) => {
    const { Home, ImageIcon, Camera, ListMusic, BarChart2, Grid, Layers } = icons;

    return (
        <aside className="flex flex-col items-center py-6 gap-6">
            <div className="text-2xl font-black italic tracking-tighter text-slate-800 mb-2">TR</div>

            <div className="flex flex-col items-center gap-4 bg-slate-50/50 p-2.5 rounded-[32px] border border-slate-100">
                <button onClick={() => setActiveTab('home')} className={`p-2.5 rounded-full transition-all relative ${activeTab === 'home' ? 'bg-white shadow-md text-pink' : 'text-slate-400 hover:text-slate-600'}`}>
                    <Home size={20} />
                    {activeTab === 'home' && <motion.div layoutId="pill" className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-4 bg-pink rounded-full" />}
                </button>
                <button onClick={() => setActiveTab('gallery')} className={`p-2.5 rounded-full transition-all relative ${activeTab === 'gallery' ? 'bg-white shadow-md text-pink' : 'text-slate-400 hover:text-slate-600'}`}>
                    <ImageIcon size={20} />
                    {activeTab === 'gallery' && <motion.div layoutId="pill" className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-4 bg-pink rounded-full" />}
                </button>
                <button onClick={() => setIsCameraActive(!isCameraActive)} className={`p-2.5 rounded-full transition-all ${isCameraActive ? 'bg-white shadow-md text-pink' : 'text-slate-400 hover:text-slate-600'}`}>
                    <Camera size={20} />
                </button>
                <button onClick={() => setActiveTab('playlist')} className={`p-2.5 rounded-full transition-all relative ${activeTab === 'playlist' ? 'bg-white shadow-md text-pink' : 'text-slate-400 hover:text-slate-600'}`}>
                    <ListMusic size={20} />
                    {activeTab === 'playlist' && <motion.div layoutId="pill" className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-4 bg-pink rounded-full" />}
                </button>
            </div>

            <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-14 h-14 rounded-full border-4 border-white shadow-md overflow-hidden cursor-pointer"
                onClick={onProfilePicClick}
            >
                <img src={profilePic} alt="Avatar" className="w-full h-full object-cover" />
            </motion.div>

            <div className="mt-auto flex flex-col items-center gap-4 mb-2">
                <button className="text-slate-200 hover:text-slate-400 transition-colors"><BarChart2 size={20} /></button>
                <div className="flex flex-col items-center gap-2.5 bg-slate-50/80 p-2 py-4 rounded-3xl border border-slate-100">
                    <button className="text-slate-400 hover:text-slate-600"><Grid size={18} /></button>
                    <button className="text-slate-400 hover:text-slate-600"><Layers size={18} /></button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
