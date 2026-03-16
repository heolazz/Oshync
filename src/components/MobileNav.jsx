import React from 'react';
import { motion } from 'framer-motion';

const MobileNav = ({ activeTab, setActiveTab, profilePic, onProfilePicClick, icons, isCameraActive, setIsCameraActive }) => {
    const { Home, ImageIcon, ListMusic, User, Camera } = icons;

    const navItems = [
        { id: 'home', icon: Home, label: 'Home' },
        { id: 'gallery', icon: ImageIcon, label: 'Gallery' },
        { id: 'camera', icon: Camera, label: 'Camera', isAction: true },
        { id: 'playlist', icon: ListMusic, label: 'Music' },
    ];

    const handleClick = (item) => {
        if (item.isAction) {
            if (item.id === 'camera') {
                const newState = !isCameraActive;
                setIsCameraActive(newState);
                if (newState) setActiveTab('home');
            }
        } else {
            setActiveTab(item.id);
            // If explicit home button is clicked, ensure camera is off
            if (item.id === 'home') setIsCameraActive(false);
        }
    };

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-slate-100 px-4 py-3 pb-8 flex items-center justify-between z-40">
            {navItems.map((item) => {
                const isActive = item.isAction
                    ? (item.id === 'camera' && isCameraActive)
                    : activeTab === item.id;

                return (
                    <button
                        key={item.id}
                        onClick={() => handleClick(item)}
                        className={`flex flex-col items-center gap-1 transition-all ${isActive ? 'text-pink scale-110' : 'text-slate-400'}`}
                    >
                        <item.icon size={22} strokeWidth={isActive ? 1.8 : 1.5} />
                        <span className="text-[10px] font-bold uppercase tracking-tighter">{item.label}</span>
                        {isActive && (
                            <motion.div
                                layoutId="mobile-pill"
                                className="w-1 h-1 bg-pink rounded-full mt-0.5"
                            />
                        )}
                    </button>
                );
            })}

            <motion.div
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full border-2 border-white shadow-md overflow-hidden bg-slate-100 flex-shrink-0"
                onClick={onProfilePicClick}
            >
                <img src={profilePic} alt="Avatar" className="w-full h-full object-cover" />
            </motion.div>
        </nav>
    );
};

export default MobileNav;
