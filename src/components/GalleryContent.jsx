import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Send, Bookmark, ChevronLeft, ChevronRight, Trash2 } from 'lucide-react';

const BENTO_PATTERNS = [
    "col-span-2 row-span-2",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
    "col-span-2 row-span-1",
    "col-span-1 row-span-2",
    "col-span-2 row-span-1",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1"
];

const GalleryContent = ({ icons, gallery = [], setGallery, onReset, profile }) => {
    const { ImageIcon, Eye, Upload, X } = icons;
    const [activeIndex, setActiveIndex] = useState(null);
    const [isLiked, setIsLiked] = useState(false);
    const [direction, setDirection] = useState(0);
    const fileInputRef = useRef(null);

    const handleNext = (e) => {
        if (e) e.stopPropagation();
        if (gallery.length === 0) return;
        setDirection(1);
        setActiveIndex((prev) => (prev + 1) % gallery.length);
        setIsLiked(false);
    };

    const handlePrev = (e) => {
        if (e) e.stopPropagation();
        if (gallery.length === 0) return;
        setDirection(-1);
        setActiveIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
        setIsLiked(false);
    };

    // Keyboard support
    React.useEffect(() => {
        const handleKeyDown = (e) => {
            if (activeIndex === null) return;
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'ArrowLeft') handlePrev();
            if (e.key === 'Escape') setActiveIndex(null);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activeIndex, gallery.length]);

    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        const newItems = await Promise.all(
            files.map(file => {
                return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        resolve({
                            id: Date.now() + Math.random(),
                            img: reader.result
                        });
                    };
                    reader.readAsDataURL(file);
                });
            })
        );

        setGallery(prev => [...newItems, ...prev]);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleDeletePhoto = (id, e) => {
        e.stopPropagation();
        setGallery(prev => prev.filter(item => item.id !== id));
        if (activeIndex !== null) {
            setActiveIndex(null); // Close modal when deleted
        }
    };

    const handleClearAll = () => {
        setGallery([]);
        setActiveIndex(null);
    };

    const activeItem = activeIndex !== null && activeIndex < gallery.length ? gallery[activeIndex] : null;

    return (
        <motion.div
            key="gallery"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute inset-0 w-full h-full bg-white p-6 overflow-y-auto no-scrollbar pointer-events-auto font-quicksand"
        >
            <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
            />

            <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-100">
                <h2 className="text-2xl font-extrabold text-slate-800 flex items-center gap-3 font-syne">
                    <ImageIcon className="text-pink" /> Photo Gallery
                </h2>
                <div className="flex items-center gap-2">
                    <button
                        onClick={onReset}
                        className="text-xs font-extrabold text-slate-400 hover:text-slate-700 px-4 py-2 rounded-full hover:bg-slate-100 transition-all uppercase tracking-widest border border-slate-100"
                    >
                        Reset
                    </button>
                    <button
                        onClick={handleClearAll}
                        className="text-xs font-extrabold text-slate-400 hover:text-red-500 px-4 py-2 rounded-full hover:bg-red-50 transition-all uppercase tracking-widest border border-slate-100"
                    >
                        Clear All
                    </button>
                </div>
            </div>

            {gallery.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-slate-400 py-12">
                    <ImageIcon size={48} className="mb-4 opacity-50" />
                    <p>Your gallery is empty.</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[140px] gap-4 grid-flow-row-dense">
                    <AnimatePresence>
                        {gallery.map((item, index) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                key={item.id}
                                className={`relative group/item rounded-3xl overflow-hidden shadow-sm border border-slate-100 cursor-pointer ${BENTO_PATTERNS[index % BENTO_PATTERNS.length]}`}
                                onClick={() => {
                                    setActiveIndex(index);
                                    setIsLiked(false);
                                }}
                            >
                                <img
                                    src={item.img}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-105"
                                    alt={`Gallery item ${item.id}`}
                                />
                                <div className="absolute inset-0 bg-slate-900/0 group-hover/item:bg-slate-900/30 transition-colors flex items-center justify-center gap-4">
                                    <Eye size={24} className="text-white opacity-0 group-hover/item:opacity-100 transition-opacity drop-shadow-md hover:scale-110" />
                                </div>
                                <button
                                    onClick={(e) => handleDeletePhoto(item.id, e)}
                                    className="absolute top-3 right-3 bg-white/20 hover:bg-red-500 text-white p-2 rounded-full backdrop-blur-md opacity-0 group-hover/item:opacity-100 transition-all z-10"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}

            <div className="mt-8 flex justify-center pb-4">
                <button
                    onClick={handleUploadClick}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs py-3 px-8 rounded-full transition-colors flex items-center gap-2"
                >
                    <Upload size={14} /> Add New Photos
                </button>
            </div>

            <AnimatePresence initial={false}>
                {activeItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 p-4 backdrop-blur-sm"
                        onClick={() => setActiveIndex(null)}
                    >
                        {/* Navigation Buttons */}
                        <button
                            onClick={handlePrev}
                            className="absolute left-4 md:left-8 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-md border border-white/10 active:scale-95"
                        >
                            <ChevronLeft size={28} />
                        </button>

                        <button
                            onClick={handleNext}
                            className="absolute right-4 md:right-8 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-md border border-white/10 active:scale-95"
                        >
                            <ChevronRight size={28} />
                        </button>

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
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#ec4899] to-[#f472b6] p-[2px]">
                                        <div className="w-full h-full rounded-full border-2 border-white overflow-hidden">
                                            <img src={profile.profilePic} alt="Profile" className="w-full h-full object-cover" />
                                        </div>
                                    </div>
                                    <span className="font-extrabold text-xs text-slate-800 uppercase tracking-tighter">
                                        {profile.firstName.toLowerCase()}_{profile.lastName.toLowerCase()}
                                    </span>
                                </div>
                                <button onClick={() => setActiveIndex(null)} className="text-slate-400 hover:text-slate-600 transition-colors">
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Image content with slide animation */}
                            <div className="w-full bg-slate-50 relative flex items-center justify-center border-y border-slate-100 h-[45vh] md:h-[60vh] overflow-hidden select-none">
                                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                                    <motion.img
                                        key={activeItem.id}
                                        custom={direction}
                                        variants={{
                                            enter: (d) => ({
                                                x: d > 0 ? '100%' : '-100%',
                                                opacity: 0,
                                                scale: 0.95
                                            }),
                                            center: {
                                                x: 0,
                                                opacity: 1,
                                                scale: 1,
                                                zIndex: 1
                                            },
                                            exit: (d) => ({
                                                x: d < 0 ? '100%' : '-100%',
                                                opacity: 0,
                                                scale: 0.95,
                                                zIndex: 0
                                            })
                                        }}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        transition={{
                                            x: { type: "spring", stiffness: 300, damping: 35 },
                                            opacity: { duration: 0.4 },
                                            scale: { duration: 0.4 }
                                        }}
                                        drag="x"
                                        dragConstraints={{ left: 0, right: 0 }}
                                        dragElastic={1}
                                        onDragEnd={(e, { offset, velocity }) => {
                                            const swipe = Math.abs(offset.x) > 50 || Math.abs(velocity.x) > 500;
                                            if (swipe && offset.x > 0) handlePrev();
                                            else if (swipe && offset.x < 0) handleNext();
                                        }}
                                        src={activeItem.img}
                                        alt="Highlighted"
                                        className="absolute w-full h-full object-contain cursor-grab active:cursor-grabbing"
                                    />
                                </AnimatePresence>
                            </div>

                            {/* Instagram-like footer actions */}
                            <div className="p-5">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-5">
                                        <button
                                            onClick={() => setIsLiked(!isLiked)}
                                            className="transition-transform active:scale-95"
                                        >
                                            <Heart size={24} className={`${isLiked ? 'fill-[#ec4899] text-[#ec4899]' : 'text-slate-800 hover:text-pink transition-colors'}`} />
                                        </button>
                                        <button className="text-slate-800 hover:text-pink transition-colors hover:scale-105 active:scale-95">
                                            <MessageCircle size={24} />
                                        </button>
                                        <button className="text-slate-800 hover:text-pink transition-colors hover:scale-105 active:scale-95">
                                            <Send size={24} />
                                        </button>
                                    </div>
                                    <button className="text-slate-800 hover:text-pink transition-colors hover:scale-105 active:scale-95">
                                        <Bookmark size={24} />
                                    </button>
                                </div>

                                <p className="font-black text-xs text-slate-800 mb-2 uppercase tracking-tighter">{isLiked ? '1,338' : '1,337'} likes</p>

                                <p className="text-xs text-slate-800 leading-relaxed">
                                    <span className="font-black mr-2 uppercase tracking-tighter">{profile.firstName.toLowerCase()}_{profile.lastName.toLowerCase()}</span>
                                    Captured a beautiful moment. #vibe #lifestyle #retro
                                </p>

                                <p className="text-[9px] font-bold text-slate-400 mt-3 uppercase tracking-widest">Just now</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default GalleryContent;
