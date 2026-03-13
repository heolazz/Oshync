import React, { useState, useRef } from 'react';
import localforage from 'localforage';
import jsmediatags from 'jsmediatags/dist/jsmediatags.min.js';
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
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const [profile, setProfile] = useState({
    firstName: "YOUR",
    lastName: "NAME",
    realName: "Your Full Identity",
    birthDay: "01",
    birthMonth: "January",
    birthYear: "2000",
    hometown: "Your City, Country",
    yearsActiveStart: "20XX",
    yearsActiveEnd: "Present",
    tags: ["Creative", "Designer", "Explorer"],
    profilePic: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100"
  });

  const [heroImage, setHeroImage] = useState("https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=1200");
  const [audioSource, setAudioSource] = useState("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3");
  const [songTitle, setSongTitle] = useState("SoundHelix-Song-1");
  const [audioCover, setAudioCover] = useState(null);
  const [playlist, setPlaylist] = useState([
    { id: 1, title: "SoundHelix-Song-1", artist: profile.realName, duration: "6:12", source: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", active: true, cover: null },
    { id: 2, title: "SoundHelix-Song-2", artist: profile.realName, duration: "7:05", source: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", active: false, cover: null },
    { id: 3, title: "SoundHelix-Song-3", artist: profile.realName, duration: "5:44", source: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", active: false, cover: null },
  ]);
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
    audioCover, setAudioCover,
    playlist, setPlaylist,
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
      const cur = audioRef.current.currentTime;
      const dur = audioRef.current.duration;
      setCurrentTime(cur);
      setDuration(dur);
      setProgress((cur / dur) * 100);
    }
  };

  const handleSeek = (percentage) => {
    if (audioRef.current && audioRef.current.duration) {
      const seekTime = (percentage / 100) * audioRef.current.duration;
      audioRef.current.currentTime = seekTime;
      setProgress(percentage);
    }
  };

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
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

  const playTrack = (song) => {
    if (!song.source) return;
    setAudioSource(song.source);
    setSongTitle(song.title);
    setAudioCover(song.cover || null);
    setPlaylist(prev => prev.map(t => ({ ...t, active: t.id === song.id })));
    setProgress(0);
    setCurrentTime(0);
    setIsPlaying(true);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().catch(e => console.log("Playback error:", e));
      }
    }, 50);
  };

  const handleNextTrack = () => {
    const activeIdx = playlist.findIndex(s => s.active);
    if (activeIdx !== -1 && activeIdx < playlist.length - 1) {
      playTrack(playlist[activeIdx + 1]);
    } else if (playlist.length > 0) {
      playTrack(playlist[0]);
    }
  };

  const handlePrevTrack = () => {
    const activeIdx = playlist.findIndex(s => s.active);
    if (activeIdx > 0) {
      playTrack(playlist[activeIdx - 1]);
    } else if (playlist.length > 0) {
      playTrack(playlist[playlist.length - 1]);
    }
  };

  const handleAudioAdded = (newTrack) => {
    setPlaylist(prev => {
      const nextPlaylist = prev.map(t => ({ ...t, active: false }));
      return [...nextPlaylist, { ...newTrack, active: true, artist: profile.realName }];
    });
  };

  const handleAudioChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const sourceUrl = URL.createObjectURL(file);
      const title = file.name.replace(/\.[^/.]+$/, "");

      const audioObj = new Audio(sourceUrl);
      audioObj.onloadedmetadata = () => {
        const minutes = Math.floor(audioObj.duration / 60);
        const seconds = Math.floor(audioObj.duration % 60);
        const durationStr = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        jsmediatags.read(file, {
          onSuccess: function (tag) {
            let extractedCover = null;
            const picture = tag.tags?.picture;
            if (picture) {
              let base64String = "";
              for (let i = 0; i < picture.data.length; i++) {
                base64String += String.fromCharCode(picture.data[i]);
              }
              extractedCover = "data:" + picture.format + ";base64," + window.btoa(base64String);
            }

            const newTrack = { id: Date.now(), title, source: sourceUrl, cover: extractedCover, duration: durationStr };
            handleAudioAdded(newTrack);
            playTrack(newTrack);
          },
          onError: function (error) {
            console.log('Error reading metadata:', error.info);
            const newTrack = { id: Date.now(), title, source: sourceUrl, cover: null, duration: durationStr };
            handleAudioAdded(newTrack);
            playTrack(newTrack);
          }
        });
      };

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
    <div className="w-screen h-screen flex items-center justify-center bg-cover bg-center p-4 selection:bg-pink/30 overflow-hidden font-quicksand" style={{ backgroundImage: `url(${heroImage})` }}>
      <div className="absolute inset-0 bg-white/20 backdrop-blur-2xl"></div>

      <input type="file" accept="image/*" className="hidden" ref={imageInputRef} onChange={handleImageChange} />
      <input type="file" accept="audio/*" className="hidden" ref={audioInputRef} onChange={handleAudioChange} />
      <input type="file" accept="image/*" className="hidden" ref={profilePicInputRef} onChange={handleProfilePicChange} />

      <audio
        ref={audioRef}
        src={audioSource}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={handleNextTrack}
      />

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
                  heroImage={audioCover || heroImage}
                  icons={sharedIcons}
                  onUploadAudio={() => audioInputRef.current.click()}
                  playlist={playlist}
                  setPlaylist={setPlaylist}
                  onPlay={(song) => playTrack(song)}
                />
              )}
            </AnimatePresence>
          </div>
        </main>

        <aside className="p-6 flex flex-col gap-5 overflow-y-auto no-scrollbar">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h3 className="text-[11px] font-extrabold text-slate-800 uppercase tracking-widest pl-1 font-syne">Hometown</h3>
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500">
                <MapPin size={12} className="text-slate-400" /> {profile.hometown}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pr-2">
              {profile.tags.map((tag, idx) => (
                <span key={idx} className="text-[9px] font-bold px-3.5 py-1 bg-slate-100 rounded-full text-slate-600 border border-slate-200 whitespace-nowrap shadow-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <MediaControl
            isPlaying={isPlaying}
            togglePlay={togglePlay}
            progress={progress}
            currentTime={currentTime}
            duration={duration}
            onSeek={handleSeek}
            onNext={handleNextTrack}
            onPrev={handlePrevTrack}
            heroImage={audioCover || heroImage}
            icons={sharedIcons}
          />

          <div className="flex flex-col gap-2 group/years">
            <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest pl-1 font-syne">Years Active</span>
            <div className="bg-slate-50 flex items-center justify-between p-3 px-5 rounded-[24px] transition-colors group-hover/years:bg-slate-100/80">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-extrabold text-slate-800 tracking-tighter font-syne">{profile.yearsActiveStart}</span>
                <span className="text-slate-400 font-bold text-sm">- {profile.yearsActiveEnd}</span>
              </div>
              <div className="w-9 h-9 bg-[#ec4899] text-white rounded-xl flex items-center justify-center transition-transform group-hover/years:scale-110">
                <Clock size={18} />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 mt-auto mb-2">
            <div className="flex items-center justify-between pl-1">
              <h3 className="text-[11px] font-extrabold text-slate-800 uppercase tracking-widest font-syne">Media</h3>
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
