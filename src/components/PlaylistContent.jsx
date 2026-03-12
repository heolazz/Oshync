import React from 'react';
import { motion } from 'framer-motion';

const PlaylistContent = ({ songTitle, profile, heroImage, icons }) => {
    const { ListMusic, Play, MoreVertical, Upload } = icons;

    return (
        <motion.div
            key="playlist"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute inset-0 w-full h-full bg-white p-8 overflow-y-auto no-scrollbar pointer-events-auto"
        >
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
                <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3"><ListMusic className="text-pink" /> Local Playlist</h2>
                <button className="bg-pink text-white p-3 rounded-full hover:bg-pink/90 transition-colors shadow-md shadow-pink/30">
                    <Play size={18} fill="currentColor" className="ml-0.5" />
                </button>
            </div>

            <div className="flex flex-col gap-2">
                {[
                    { title: songTitle, artist: profile.realName, duration: "3:45", active: true },
                    { title: "Sweet Melodies", artist: profile.realName, duration: "4:20", active: false },
                    { title: "Neon Nights", artist: profile.realName, duration: "2:55", active: false },
                    { title: "Acoustic Session", artist: profile.realName, duration: "5:10", active: false },
                    { title: "Midnight Drive", artist: profile.realName, duration: "3:30", active: false },
                ].map((song, idx) => (
                    <div key={idx} className={`flex items-center gap-4 p-4 rounded-2xl transition-colors cursor-pointer ${song.active ? 'bg-pink/5 border border-pink/20' : 'hover:bg-slate-50 border border-transparent'}`}>
                        <div className="text-sm font-bold text-slate-400 w-6 text-center">{song.active ? <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-2 bg-pink rounded-full mx-auto" /> : idx + 1}</div>
                        <div className="w-10 h-10 rounded-lg bg-slate-200 overflow-hidden shadow-sm">
                            <img src={heroImage} className="w-full h-full object-cover opacity-80" />
                        </div>
                        <div className="flex-1 flex flex-col">
                            <span className={`text-sm font-bold ${song.active ? 'text-pink' : 'text-slate-800'}`}>{song.title}</span>
                            <span className="text-xs text-slate-500 font-medium">{song.artist}</span>
                        </div>
                        <span className="text-xs font-bold text-slate-400">{song.duration}</span>
                        <button className="text-slate-300 hover:text-slate-700 transition-colors hidden sm:block"><MoreVertical size={16} /></button>
                    </div>
                ))}
            </div>

            <div className="mt-8 border-2 border-dashed border-slate-200 rounded-3xl p-8 flex flex-col items-center justify-center text-center gap-3 bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer">
                <Upload size={24} className="text-slate-400" />
                <div>
                    <p className="text-sm font-bold text-slate-700">Scan Device Audio Files</p>
                    <p className="text-xs text-slate-500 mt-1">Tap to browse your local storage</p>
                </div>
            </div>
        </motion.div>
    );
};

export default PlaylistContent;
