import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Send, Bookmark } from 'lucide-react';

const GalleryContent = ({ icons }) => {
    const { ImageIcon, Eye, Upload, X } = icons;
    const [selectedImage, setSelectedImage] = useState(null);
    const [isLiked, setIsLiked] = useState(false);

    return (
        <motion.div
            key="gallery"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute inset-0 w-full h-full bg-white p-6 overflow-y-auto no-scrollbar pointer-events-auto"
        >
            <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3"><ImageIcon className="text-pink" /> Photo Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[140px] gap-4">
                {[
                    { id: 1, c: "col-span-2 row-span-2", img: "https://loremflickr.com/800/800/cat?random=1" },
                    { id: 2, c: "col-span-1 row-span-1", img: "https://loremflickr.com/400/400/cat?random=2" },
                    { id: 3, c: "col-span-1 row-span-1", img: "https://loremflickr.com/400/400/cat?random=3" },
                    { id: 4, c: "col-span-2 row-span-1", img: "https://loremflickr.com/800/400/cat?random=4" },
                    { id: 5, c: "col-span-1 row-span-2", img: "https://loremflickr.com/400/800/cat?random=5" },
                    { id: 6, c: "col-span-2 row-span-1", img: "https://loremflickr.com/800/400/cat?random=6" },
                    { id: 7, c: "col-span-1 row-span-1", img: "https://loremflickr.com/400/400/cat?random=7" },
                    { id: 8, c: "col-span-1 row-span-1", img: "https://loremflickr.com/400/400/cat?random=8" },
                    { id: 9, c: "col-span-1 row-span-1", img: "https://loremflickr.com/400/400/cat?random=9" },
                    { id: 10, c: "col-span-1 row-span-1", img: "https://loremflickr.com/400/400/cat?random=10" },
                ].map((item) => (
                    <div
                        key={item.id}
                        className={`relative group/item rounded-3xl overflow-hidden shadow-sm border border-slate-100 cursor-pointer ${item.c}`}
                        onClick={() => {
                            setSelectedImage(item.img);
                            setIsLiked(false);
                        }}
                    >
                        <img
                            src={item.img}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-105"
                            alt={`Gallery item ${item.id}`}
                        />
                        <div className="absolute inset-0 bg-slate-900/0 group-hover/item:bg-slate-900/20 transition-colors flex items-center justify-center">
                            <Eye size={24} className="text-white opacity-0 group-hover/item:opacity-100 transition-opacity drop-shadow-md" />
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-8 flex justify-center pb-4">
                <button className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs py-3 px-8 rounded-full transition-colors flex items-center gap-2">
                    <Upload size={14} /> Add New Photos
                </button>
            </div>

            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 p-4 backdrop-blur-sm"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, rotate: -2 }}
                            animate={{ scale: 1, opacity: 1, rotate: 0 }}
                            exit={{ scale: 0.9, opacity: 0, rotate: 2 }}
                            className="relative bg-white p-0 rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.4)] border border-slate-100 max-w-lg w-full overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Instagram-like header */}
                            <div className="flex items-center justify-between p-4 border-b border-slate-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-fuchsia-600 p-[2px]">
                                        <div className="w-full h-full rounded-full border-2 border-white overflow-hidden">
                                            <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Profile" className="w-full h-full object-cover" />
                                        </div>
                                    </div>
                                    <span className="font-semibold text-sm text-slate-800">cat_lover_99</span>
                                </div>
                                <button onClick={() => setSelectedImage(null)} className="text-slate-400 hover:text-slate-600 transition-colors">
                                    {X ? <X size={20} /> : <span className="text-xl font-bold leading-none">&times;</span>}
                                </button>
                            </div>

                            {/* Image content */}
                            <div className="w-full bg-slate-50 relative flex items-center justify-center border-y border-slate-100 max-h-[60vh]">
                                <img
                                    src={selectedImage}
                                    alt="Highlighted"
                                    className="w-full h-auto max-h-[60vh] object-contain"
                                />
                            </div>

                            {/* Instagram-like footer actions */}
                            <div className="p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => setIsLiked(!isLiked)}
                                            className="transition-transform active:scale-95"
                                        >
                                            <Heart size={24} className={`${isLiked ? 'fill-red-500 text-red-500' : 'text-slate-800 hover:text-slate-500 transition-colors'}`} />
                                        </button>
                                        <button className="text-slate-800 hover:text-slate-500 transition-colors hover:scale-105 active:scale-95">
                                            <MessageCircle size={24} />
                                        </button>
                                        <button className="text-slate-800 hover:text-slate-500 transition-colors hover:scale-105 active:scale-95">
                                            <Send size={24} />
                                        </button>
                                    </div>
                                    <button className="text-slate-800 hover:text-slate-500 transition-colors hover:scale-105 active:scale-95">
                                        <Bookmark size={24} />
                                    </button>
                                </div>

                                <p className="font-semibold text-sm text-slate-800 mb-1">{isLiked ? '1,338' : '1,337'} likes</p>

                                <p className="text-sm text-slate-800">
                                    <span className="font-semibold mr-2">cat_lover_99</span>
                                    Feeling cute today! 🐾✨ Can't wait for dinner time. #catsofinstagram #cute
                                </p>

                                <p className="text-xs text-slate-400 mt-2 uppercase tracking-wide">2 HOURS AGO</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default GalleryContent;
