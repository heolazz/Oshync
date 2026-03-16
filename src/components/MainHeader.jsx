import React from 'react';
import { motion } from 'framer-motion';

const MainHeader = ({ icons }) => {
    const { SkipBack, Heart, Star, Bell, SkipForward } = icons;

    return (
        <header className="flex justify-between items-center p-4 md:p-5 md:px-8">
            <button className="hidden md:flex items-center gap-2 bg-white px-5 py-2 rounded-full text-[10px] font-black uppercase text-slate-800 shadow-sm border border-slate-100 hover:translate-y-[-2px] transition-all">
                <SkipBack className="rotate-180" size={12} fill="currentColor" /> Back to Home
            </button>

            <div className="bg-white/80 backdrop-blur-md px-5 py-2 rounded-full flex items-center gap-4 shadow-sm border border-slate-100 mx-auto md:mx-0">
                <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-400">
                    <span>4</span> <Heart size={14} className="text-slate-300" fill="currentColor" />
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-800">
                    <span>75</span> <Star size={14} className="text-pink" fill="currentColor" />
                </div>
                <div className="w-px h-3 bg-slate-200"></div>
                <Bell size={16} className="text-slate-400 cursor-pointer hover:text-slate-600" />
            </div>

            <button className="hidden md:flex items-center gap-2 bg-white px-5 py-2 rounded-full text-[10px] font-black uppercase text-slate-800 shadow-sm border border-slate-100 hover:translate-y-[-2px] transition-all">
                Next: The Null <SkipForward size={12} fill="currentColor" />
            </button>
        </header>
    );
};

export default MainHeader;
