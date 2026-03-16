import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Trash } from 'lucide-react';

const PlaylistContent = ({ heroImage, icons, onUploadAudio, playlist, setPlaylist, onPlay }) => {
    const { ListMusic, Play, MoreVertical, Upload } = icons;
    const [openMenuId, setOpenMenuId] = useState(null);

    const handleDelete = (id, e) => {
        if (e) e.stopPropagation();
        setPlaylist(prev => prev.filter(song => song.id !== id));
        setOpenMenuId(null);
    };

    const handleClearAll = () => {
        setPlaylist([]);
    };

    const toggleMenu = (id, e) => {
        e.stopPropagation();
        setOpenMenuId(openMenuId === id ? null : id);
    };

    // Close menu on click outside
    React.useEffect(() => {
        const closeMenu = () => setOpenMenuId(null);
        window.addEventListener('click', closeMenu);
        return () => window.removeEventListener('click', closeMenu);
    }, []);

    return (
        <motion.div
            key="playlist"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute inset-0 w-full h-full bg-white p-4 md:p-8 overflow-y-auto no-scrollbar pointer-events-auto flex flex-col font-quicksand"
        >
            <div className="flex items-center justify-between mb-4 md:mb-8 pb-6 border-b border-slate-100">
                <h2 className="text-xl md:text-2xl font-black text-slate-800 flex items-center gap-3 font-syne"><ListMusic size={24} className="text-pink" /> Local Playlist</h2>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleClearAll}
                        className="text-[10px] font-black text-slate-400 hover:text-red-500 px-4 py-2 rounded-full hover:bg-red-50 transition-all uppercase tracking-widest border border-slate-100"
                    >
                        Clear All
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-2 flex-1">
                <AnimatePresence>
                    {playlist.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center text-slate-400 py-12"
                        >
                            <ListMusic size={48} className="mb-4 opacity-50" />
                            <p className="font-bold">Your playlist is empty.</p>
                            <p className="text-xs">Upload some songs to get started!</p>
                        </motion.div>
                    ) : (
                        playlist.map((song, idx) => (
                            <motion.div
                                key={song.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                onClick={() => onPlay(song)}
                                className={`flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-2xl transition-colors cursor-pointer group relative ${song.active ? 'bg-pink/5 border border-pink/20' : 'hover:bg-slate-50 border border-transparent'}`}
                            >
                                <div className="text-[11px] font-black text-slate-400 w-5 text-center">{song.active ? <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-2 bg-pink rounded-full mx-auto" /> : idx + 1}</div>
                                <div className="w-12 h-12 rounded-xl bg-slate-200 overflow-hidden shadow-sm flex-shrink-0">
                                    <img src={song.cover || (song.active ? heroImage : `https://loremflickr.com/100/100/cat?random=${song.id}`)} className="w-full h-full object-cover" alt="Cover" />
                                </div>
                                <div className="flex-1 flex flex-col min-w-0">
                                    <span className={`text-[13px] font-black ${song.active ? 'text-pink' : 'text-slate-800'} line-clamp-1 truncate uppercase tracking-tight`}>{song.title}</span>
                                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{song.artist}</span>
                                </div>
                                <span className="text-[10px] font-black text-slate-400 mr-1">{song.duration}</span>

                                {/* More menu */}
                                <div className="relative">
                                    <button
                                        onClick={(e) => toggleMenu(song.id, e)}
                                        className="text-slate-300 hover:text-slate-700 p-2 rounded-full hover:bg-white/50 transition-colors"
                                    >
                                        <MoreVertical size={18} />
                                    </button>

                                    <AnimatePresence>
                                        {openMenuId === song.id && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                                className="absolute right-0 top-full mt-2 w-36 bg-white rounded-2xl shadow-xl border border-slate-100 z-30 overflow-hidden"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <button
                                                    onClick={(e) => handleDelete(song.id, e)}
                                                    className="w-full flex items-center justify-between px-4 py-3 text-[10px] font-black text-red-500 hover:bg-red-50 transition-colors uppercase tracking-widest"
                                                >
                                                    Remove <Trash2 size={14} />
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>

            <div
                className="mt-6 md:mt-8 border-2 border-dashed border-slate-200 rounded-[32px] p-6 md:p-8 flex flex-col items-center justify-center text-center gap-3 bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer group"
                onClick={onUploadAudio}
            >
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                    <Upload size={24} className="text-[#ec4899]" />
                </div>
                <div>
                    <p className="text-[13px] font-black text-slate-800 uppercase tracking-tight">Scan Device Storage</p>
                    <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-widest">Tap to import custom soundtracks</p>
                </div>
            </div>
        </motion.div>
    );
};

export default PlaylistContent;
