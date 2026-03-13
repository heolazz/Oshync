import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Trash } from 'lucide-react';

const PlaylistContent = ({ heroImage, icons, onUploadAudio, playlist, setPlaylist, onPlay }) => {
    const { ListMusic, Play, MoreVertical, Upload } = icons;

    const handleDelete = (id, e) => {
        e.stopPropagation();
        setPlaylist(prev => prev.filter(song => song.id !== id));
    };

    const handleClearAll = () => {
        setPlaylist([]);
    };

    return (
        <motion.div
            key="playlist"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute inset-0 w-full h-full bg-white p-8 overflow-y-auto no-scrollbar pointer-events-auto flex flex-col"
        >
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
                <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3"><ListMusic className="text-pink" /> Local Playlist</h2>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleClearAll}
                        className="text-slate-400 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-colors"
                        title="Clear Playlist"
                    >
                        <Trash size={18} />
                    </button>
                    <button className="bg-pink text-white p-3 rounded-full hover:bg-pink/90 transition-colors shadow-md shadow-pink/30">
                        <Play size={18} fill="currentColor" className="ml-0.5" />
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
                            <p>Your playlist is empty.</p>
                            <p className="text-sm">Upload some songs to get started!</p>
                        </motion.div>
                    ) : (
                        playlist.map((song, idx) => (
                            <motion.div
                                key={song.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                onClick={() => onPlay(song)}
                                className={`flex items-center gap-4 p-4 rounded-2xl transition-colors cursor-pointer group ${song.active ? 'bg-pink/5 border border-pink/20' : 'hover:bg-slate-50 border border-transparent'}`}
                            >
                                <div className="text-sm font-bold text-slate-400 w-6 text-center">{song.active ? <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-2 bg-pink rounded-full mx-auto" /> : idx + 1}</div>
                                <div className="w-10 h-10 rounded-lg bg-slate-200 overflow-hidden shadow-sm">
                                    <img src={song.cover || (song.active ? heroImage : "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=100&q=80")} className="w-full h-full object-cover opacity-80" alt="Cover" />
                                </div>
                                <div className="flex-1 flex flex-col">
                                    <span className={`text-sm font-bold ${song.active ? 'text-pink' : 'text-slate-800'} line-clamp-1`}>{song.title}</span>
                                    <span className="text-xs text-slate-500 font-medium">{song.artist}</span>
                                </div>
                                <span className="text-xs font-bold text-slate-400 mr-2">{song.duration}</span>

                                {/* Hover actions */}
                                <div className="hidden sm:flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={(e) => handleDelete(song.id, e)}
                                        className="text-slate-300 hover:text-red-500 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                    <button onClick={(e) => e.stopPropagation()} className="text-slate-300 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition-colors">
                                        <MoreVertical size={16} />
                                    </button>
                                </div>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>

            <div
                className="mt-8 border-2 border-dashed border-slate-200 rounded-3xl p-8 flex flex-col items-center justify-center text-center gap-3 bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer"
                onClick={onUploadAudio}
            >
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
