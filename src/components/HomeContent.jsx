import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const HomeContent = ({ isCameraActive, heroImage, profile, incrementStat, stats, onUploadClick, onEditProfile, icons }) => {
    const { Upload, Heart, Star, Bookmark, Edit3, MapPin, Clock } = icons;

    // Referensi untuk elemen video
    const videoRef = useRef(null);

    // Effect untuk mengatur stream kamera saat isCameraActive berubah
    useEffect(() => {
        let mediaStream = null;

        const startCamera = async () => {
            if (isCameraActive) {
                try {
                    // Meminta akses video ke perangkat
                    mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
                    if (videoRef.current) {
                        videoRef.current.srcObject = mediaStream;
                    }
                } catch (err) {
                    console.error("Gagal mengakses kamera:", err);
                    alert("Tidak dapat mengakses kamera. Pastikan izin telah diberikan.");
                }
            }
        };

        startCamera();

        // Cleanup function untuk mematikan kamera saat komponen unmount atau isCameraActive false
        return () => {
            if (mediaStream) {
                mediaStream.getTracks().forEach(track => track.stop());
            }
        };
    }, [isCameraActive]);

    return (
        <motion.div
            key="home"
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            className="absolute inset-0 w-full h-full overflow-y-auto no-scrollbar pointer-events-auto"
        >
            {/* Hero Section */}
            <div className="relative w-full h-[500px] md:h-full flex-shrink-0">
                {isCameraActive ? (
                    <div className="w-full h-full bg-slate-900 flex items-center justify-center overflow-hidden">
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            className="w-full h-full object-cover"
                        />
                    </div>
                ) : (
                    <img src={heroImage} alt="Profile" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                )}

                {/* Edit Profile Button */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onEditProfile}
                    className="absolute top-6 right-6 bg-white/80 backdrop-blur text-slate-800 p-3 rounded-full shadow-sm hover:shadow-md border border-white/50 transition-all z-20 pointer-events-auto"
                >
                    <Edit3 size={18} />
                </motion.button>

                {/* Overlays */}
                <div className="absolute top-8 left-6 md:top-10 md:left-10 flex flex-col gap-6">
                    <div className="flex flex-col bg-white/80 backdrop-blur p-2 px-4 rounded-xl border border-white/50 w-fit shadow-sm">
                        <span className="text-[8px] font-extrabold text-slate-500 uppercase border-b border-slate-200 mb-1 pb-1 font-syne">Real Name</span>
                        <span className="text-[10px] font-bold text-slate-800">{profile.realName}</span>
                    </div>
                </div>

                <div className="absolute bottom-8 left-6 md:bottom-10 md:left-10 flex flex-col pointer-events-none z-10">
                    <span className="text-[10px] font-extrabold text-white/80 uppercase mb-1 drop-shadow-md font-syne">Birthday</span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-5xl md:text-6xl font-extrabold text-white tracking-tighter leading-none drop-shadow-xl font-syne">{profile.birthDay}</span>
                        <div className="flex flex-col leading-none">
                            <span className="text-xs md:text-sm font-extrabold text-white/90 uppercase tracking-tight drop-shadow-md font-syne">{profile.birthMonth}</span>
                            <span className="text-[9px] md:text-[10px] font-bold text-white/70 drop-shadow-md">{profile.birthYear}</span>
                        </div>
                    </div>
                </div>

                <motion.button
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onUploadClick}
                    className="absolute bottom-10 left-[40%] md:bottom-12 md:left-[35%] w-12 h-12 bg-pink text-white rounded-[20px] flex items-center justify-center shadow-lg shadow-pink/30 z-20 border-2 border-white/40 pointer-events-auto"
                >
                    <Upload size={20} />
                </motion.button>

                {/* Right Side Stats Card */}
                <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 max-w-[180px] md:max-w-[220px] pointer-events-auto z-10 px-2 md:px-0">
                    <div className="bg-white/40 backdrop-blur-xl p-4 md:p-6 rounded-[32px] md:rounded-[40px] border border-white/40 shadow-xl overflow-hidden relative group/card">
                        <h2 className="text-3xl md:text-4xl font-extrabold italic text-white mb-4 md:mb-5 uppercase tracking-tighter leading-[0.8] drop-shadow-lg font-syne">
                            {profile.firstName}<br /><span className="text-pink">X</span>{profile.lastName}
                        </h2>

                        <div className="flex items-center justify-between bg-white/90 p-2 rounded-2xl shadow-sm gap-1">
                            <div className="flex flex-col items-center flex-1 cursor-pointer hover:bg-slate-100 rounded-lg py-1 transition-colors" onClick={() => incrementStat('likes')}>
                                <Heart size={10} fill="#999" className="text-slate-400" />
                                <span className="text-[8px] font-extrabold text-slate-600 mt-0.5">{stats.likes}</span>
                            </div>
                            <div className="w-px h-3 bg-slate-200"></div>
                            <div className="flex flex-col items-center flex-1 cursor-pointer hover:bg-slate-100 rounded-lg py-1 transition-colors" onClick={() => incrementStat('stars')}>
                                <Star size={10} fill="#ec4899" strokeWidth={0} className="text-pink" />
                                <span className="text-[8px] font-extrabold text-pink mt-0.5">{stats.stars}</span>
                            </div>
                            <div className="w-px h-3 bg-slate-200"></div>
                            <div className="flex flex-col items-center flex-1 cursor-pointer hover:bg-slate-100 rounded-lg py-1 transition-colors" onClick={() => incrementStat('bookmarks')}>
                                <Bookmark size={10} fill="#999" className="text-slate-400" />
                                <span className="text-[8px] font-extrabold text-slate-600 mt-0.5">{stats.bookmarks}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile-Only Info Section */}
            <div className="md:hidden p-6 bg-white flex flex-col gap-8 pb-32">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest font-syne">Hometown</h3>
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                            <MapPin size={14} className="text-pink" /> {profile.hometown}
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {profile.tags.map((tag, idx) => (
                            <span key={idx} className="text-[10px] font-black px-4 py-2 bg-slate-100 rounded-full text-slate-600 border border-slate-200 shadow-sm uppercase tracking-tighter">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest font-syne">Years Active</span>
                    <div className="bg-slate-50 flex items-center justify-between p-4 px-6 rounded-[28px] border border-slate-100 shadow-inner">
                        <div className="flex items-center gap-3">
                            <span className="text-3xl font-black text-slate-800 tracking-tighter font-syne">{profile.yearsActiveStart}</span>
                            <span className="text-slate-400 font-bold text-lg">- {profile.yearsActiveEnd}</span>
                        </div>
                        <div className="w-10 h-10 bg-pink text-white rounded-2xl flex items-center justify-center shadow-lg shadow-pink/20">
                            <Clock size={20} />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default HomeContent;