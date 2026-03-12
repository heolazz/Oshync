import React, { useState, useRef } from 'react';
import localforage from 'localforage';
import {
  Home, Star, Camera, Briefcase, BarChart2, Grid, Layers, MoreVertical,
  Heart, Bookmark, Play, SkipBack, SkipForward, MapPin, Info, ArrowLeft, Clock, Upload, Bell, Pause,
  Image as ImageIcon, ListMusic, Disc, Eye, Edit3, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Refactored Components
import Sidebar from './components/Sidebar';
import MediaControl from './components/MediaControl';
import MainHeader from './components/MainHeader';
import HomeContent from './components/HomeContent';
import GalleryContent from './components/GalleryContent';
import PlaylistContent from './components/PlaylistContent';
import ProfileEditor from './components/ProfileEditor';

// Hooks
import { useStorage } from './hooks/useStorage';

function App() {
  // State Definitions
  const [activeTab, setActiveTab] = useState('home');
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const [profile, setProfile] = useState({
    firstName: "JAZZLYN",
    lastName: "TRISHA",
    realName: "Jazzlyn Agatha Trisha",
    birthDay: "16",
    birthMonth: "February",
    birthYear: "2011",
    hometown: "Jakarta, Indonesia",
    yearsActiveStart: "2023",
    yearsActiveEnd: "Present",
    tags: ["Singer", "Idol", "J-Pop"],
    profilePic: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100"
  });

  const [heroImage, setHeroImage] = useState("https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=1200");
  const [audioSource, setAudioSource] = useState("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3");
  const [songTitle, setSongTitle] = useState("SoundHelix-Song-1");
  const [stats, setStats] = useState({ likes: 1877, stars: 7523, bookmarks: 3644 });

  // Refs
  const audioRef = useRef(null);
  const imageInputRef = useRef(null);
  const audioInputRef = useRef(null);
  const profilePicInputRef = useRef(null);

  // Persistence Hook
  useStorage(isReady, setIsReady, {
    activeTab, setActiveTab,
    profile, setProfile,
    heroImage, setHeroImage,
    stats, setStats,
    songTitle, setSongTitle,
    setAudioSource
  });

  // Handlers
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfile(prev => ({ ...prev, profilePic: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.pause() : audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const onTimeUpdate = () => {
    if (audioRef.current && audioRef.current.duration) {
      setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setHeroImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAudioChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAudioSource(URL.createObjectURL(file));
      setSongTitle(file.name.replace(/\.[^/.]+$/, ""));
      setIsPlaying(false);
      localforage.setItem('playground_audio_blob', file).catch(err => {
        console.error("Failed to save audio to IndexedDB:", err);
      });
    }
  };

  const incrementStat = (type) => {
    setStats(prev => ({ ...prev, [type]: prev[type] + 1 }));
  };

  const sharedIcons = {
    Home, Star, Camera, Briefcase, BarChart2, Grid, Layers, MoreVertical,
    Heart, Bookmark, Play, SkipBack, SkipForward, MapPin, Info, ArrowLeft, Clock, Upload, Bell, Pause,
    ImageIcon, ListMusic, Disc, Eye, Edit3, X
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-cover bg-center p-4 selection:bg-pink/30 overflow-hidden font-outfit" style={{ backgroundImage: `url(${heroImage})` }}>
      <div className="absolute inset-0 bg-white/20 backdrop-blur-2xl"></div>

      <input type="file" accept="image/*" className="hidden" ref={imageInputRef} onChange={handleImageChange} />
      <input type="file" accept="audio/*" className="hidden" ref={audioInputRef} onChange={handleAudioChange} />
      <input type="file" accept="image/*" className="hidden" ref={profilePicInputRef} onChange={handleProfilePicChange} />

      <audio ref={audioRef} src={audioSource} onTimeUpdate={onTimeUpdate} onEnded={() => setIsPlaying(false)} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-[1150px] h-[92vh] max-h-[740px] bg-white rounded-[64px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] grid grid-cols-[90px_1fr_310px] overflow-hidden p-2 border-4 border-white/50"
      >
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isCameraActive={isCameraActive}
          setIsCameraActive={setIsCameraActive}
          profilePic={profile.profilePic}
          onProfilePicClick={() => profilePicInputRef.current.click()}
          icons={sharedIcons}
        />

        <main className="flex flex-col bg-slate-50/50 rounded-[48px] m-1 overflow-hidden border border-slate-100">
          <MainHeader icons={sharedIcons} />

          <div className="flex-1 relative mx-6 mb-6 rounded-[40px] overflow-hidden group shadow-2xl bg-slate-100/50">
            <AnimatePresence mode="wait">
              {activeTab === 'home' && (
                <HomeContent
                  isCameraActive={isCameraActive}
                  heroImage={heroImage}
                  profile={profile}
                  incrementStat={incrementStat}
                  stats={stats}
                  onUploadClick={() => imageInputRef.current.click()}
                  onEditProfile={() => setIsEditingProfile(true)}
                  icons={sharedIcons}
                />
              )}
              {activeTab === 'gallery' && <GalleryContent icons={sharedIcons} />}
              {activeTab === 'playlist' && (
                <PlaylistContent
                  songTitle={songTitle}
                  profile={profile}
                  heroImage={heroImage}
                  icons={sharedIcons}
                />
              )}
            </AnimatePresence>
          </div>
        </main>

        <aside className="p-6 flex flex-col gap-5 overflow-y-auto no-scrollbar">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h3 className="text-[11px] font-black text-slate-800 uppercase tracking-widest pl-1">Hometown</h3>
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500">
                <MapPin size={12} className="text-slate-400" /> {profile.hometown}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pr-2">
              {profile.tags.map((tag, idx) => (
                <span key={idx} className="text-[9px] font-black px-3.5 py-1 bg-slate-100 rounded-full text-slate-600 border border-slate-200 whitespace-nowrap shadow-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <MediaControl
            isPlaying={isPlaying}
            togglePlay={togglePlay}
            progress={progress}
            heroImage={heroImage}
            icons={sharedIcons}
          />

          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1">Years Active</span>
            <div className="bg-white flex items-center justify-between p-3.5 px-6 rounded-[28px] border border-slate-100 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-slate-800 tracking-tighter">{profile.yearsActiveStart}</span>
                <span className="text-slate-300 font-bold text-sm">- {profile.yearsActiveEnd}</span>
              </div>
              <div className="w-10 h-10 bg-pink text-white rounded-2xl flex items-center justify-center shadow-lg shadow-pink/20">
                <Clock size={20} />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 mt-auto mb-2">
            <div className="flex items-center justify-between pl-1">
              <h3 className="text-[11px] font-black text-slate-800 uppercase tracking-widest">Media</h3>
              <div className="flex gap-2">
                <SkipBack size={12} className="text-slate-300 cursor-pointer hover:text-slate-500" />
                <SkipForward size={12} className="text-slate-800 cursor-pointer hover:text-slate-500" />
              </div>
            </div>
            <div className="w-full h-24 rounded-[32px] overflow-hidden border-4 border-white shadow-md relative group">
              <img src={heroImage} alt="Media" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
              <div className="absolute inset-0 bg-slate-900/10"></div>
            </div>
          </div>
        </aside>
      </motion.div>

      <AnimatePresence>
        {isEditingProfile && (
          <ProfileEditor
            profile={profile}
            setProfile={setProfile}
            onClose={() => setIsEditingProfile(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
