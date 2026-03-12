import React from 'react';
import { motion } from 'framer-motion';

const MediaControl = ({ isPlaying, togglePlay, progress, heroImage, icons }) => {
    const { SkipBack, SkipForward, Play, Pause } = icons;

    return (
        <div className="bg-slate-50/80 rounded-[40px] p-5 border border-white shadow-sm flex flex-col gap-5">
            <div className="w-full aspect-[4/3] bg-white rounded-3xl relative overflow-hidden flex items-center justify-center p-6 shadow-inner border border-slate-100">
                <motion.div
                    animate={isPlaying ? { rotate: 360 } : {}}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    className="w-24 h-24 rounded-full bg-slate-800 shadow-2xl relative flex items-center justify-center"
                >
                    <div className="absolute inset-[38%] bg-slate-600 rounded-full border-2 border-white/10"></div>
                </motion.div>
                <div className="absolute bottom-2 left-0 right-0 text-center">
                    <p className="text-[8px] font-black text-slate-300 uppercase tracking-tighter">Vinyl Audio System</p>
                </div>
            </div>

            <div className="flex flex-col gap-3 px-1">
                <div className="flex items-center justify-between group/seek cursor-pointer">
                    <div className="w-2 h-2 bg-slate-800 rounded-full"></div>
                    <div className="flex-1 h-1 bg-slate-200 mx-3 rounded-full relative overflow-hidden">
                        <motion.div animate={{ width: `${progress}%` }} className="absolute h-full bg-pink" />
                    </div>
                    <div className="w-2 h-2 bg-slate-200 rounded-full group-hover:bg-pink transition-colors"></div>
                </div>

                <div className="flex items-center justify-center gap-6 text-slate-800">
                    <button className="hover:text-pink transition-colors"><SkipBack fill="currentColor" size={20} /></button>
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={togglePlay}
                        className="bg-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg border border-slate-100"
                    >
                        {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
                    </motion.button>
                    <button className="hover:text-pink transition-colors"><SkipForward fill="currentColor" size={20} /></button>
                </div>
            </div>
        </div>
    );
};

export default MediaControl;
