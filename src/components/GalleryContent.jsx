import React from 'react';
import { motion } from 'framer-motion';

const GalleryContent = ({ icons }) => {
    const { ImageIcon, Eye, Upload } = icons;

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
                    { id: 1, c: "col-span-2 row-span-2", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80" },
                    { id: 2, c: "col-span-1 row-span-1", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80" },
                    { id: 3, c: "col-span-1 row-span-1", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80" },
                    { id: 4, c: "col-span-2 row-span-1", img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80" },
                    { id: 5, c: "col-span-1 row-span-2", img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80" },
                    { id: 6, c: "col-span-2 row-span-1", img: "https://images.unsplash.com/photo-1506744626753-1fa44df31c78?auto=format&fit=crop&w=800&q=80" },
                    { id: 7, c: "col-span-1 row-span-1", img: "https://images.unsplash.com/photo-1618641986557-1ecd230959aa?auto=format&fit=crop&w=400&q=80" },
                    { id: 8, c: "col-span-1 row-span-1", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80" },
                    { id: 9, c: "col-span-1 row-span-1", img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80" },
                    { id: 10, c: "col-span-1 row-span-1", img: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=400&q=80" },
                ].map((item) => (
                    <div key={item.id} className={`relative group rounded-3xl overflow-hidden shadow-sm border border-slate-100 cursor-pointer ${item.c}`}>
                        <img
                            src={item.img}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            alt={`Gallery item ${item.id}`}
                        />
                        <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-colors flex items-center justify-center">
                            <Eye size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md" />
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-8 flex justify-center pb-4">
                <button className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs py-3 px-8 rounded-full transition-colors flex items-center gap-2">
                    <Upload size={14} /> Add New Photos
                </button>
            </div>
        </motion.div>
    );
};

export default GalleryContent;
