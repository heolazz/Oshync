import React from 'react';
import { motion } from 'framer-motion';

const MediaControl = ({ isPlaying, togglePlay, progress, currentTime, duration, onSeek, onNext, onPrev, heroImage, icons }) => {
    const { SkipBack, SkipForward, Play, Pause } = icons;

    const formatTime = (time) => {
        if (isNaN(time)) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className="bg-slate-50/80 rounded-[40px] p-5 border border-white shadow-sm flex flex-col gap-5">
            <div className="w-full aspect-[4/3] bg-white rounded-3xl relative overflow-hidden flex items-center justify-center p-6 shadow-inner border border-slate-100">
                <motion.div
                    animate={isPlaying ? { rotate: 360 } : {}}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    className="w-24 h-24 rounded-full bg-slate-800 shadow-2xl relative flex items-center justify-center overflow-hidden"
                >
                    <img src={heroImage} className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay pointer-events-none" alt="" />
                    <div className="absolute inset-[30%] bg-slate-200 rounded-full border-4 border-slate-900 overflow-hidden">
                        <img src={heroImage} className="w-full h-full object-cover" alt="Cover" />
                    </div>
                </motion.div>
                <div className="absolute bottom-2 left-0 right-0 text-center">
                    <p className="text-[8px] font-black text-slate-300 uppercase tracking-tighter">Vinyl Audio System</p>
                </div>
            </div>

            <div className="flex flex-col gap-3 px-1">
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center px-0.5">
                        <span className="text-[10px] font-bold text-slate-400">{formatTime(currentTime)}</span>
                        <span className="text-[10px] font-bold text-slate-400">{formatTime(duration)}</span>
                    </div>
                    <div className="relative w-full h-1.5 bg-slate-200 rounded-full flex items-center group/seek mt-1">
                        {/* Track Fill */}
                        <div
                            style={{ width: `${progress || 0}%` }}
                            className="absolute left-0 top-0 h-full bg-pink rounded-full pointer-events-none"
                        />

                        {/* Thumb Indicator */}
                        <div
                            style={{ left: `${progress || 0}%` }}
                            className="absolute w-3.5 h-3.5 bg-white border-2 border-pink rounded-full -ml-[7px] shadow-md pointer-events-none z-10 transition-transform group-active/seek:scale-125"
                        />

                        {/* Native Range Input (Hidden but interactive) */}
                        <input
                            type="range"
                            min="0"
                            max="100"
                            step="0.01"
                            value={progress || 0}
                            onChange={(e) => onSeek(parseFloat(e.target.value))}
                            className="absolute left-0 top-0 w-full h-full opacity-0 cursor-pointer z-20 m-0"
                        />
                    </div>
                </div>

                <div className="flex items-center justify-center gap-6 text-slate-800 mt-1">
                    <button onClick={onPrev} className="hover:text-pink transition-colors"><SkipBack fill="currentColor" size={20} /></button>
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={togglePlay}
                        className="bg-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg border border-slate-100"
                    >
                        {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
                    </motion.button>
                    <button onClick={onNext} className="hover:text-pink transition-colors"><SkipForward fill="currentColor" size={20} /></button>
                </div>
            </div>
        </div>
    );
};

export default MediaControl;
