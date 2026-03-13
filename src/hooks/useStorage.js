import localforage from 'localforage';
import React from 'react';

export const useStorage = (isReady, setIsReady, setStateMap) => {
    // Load state from IndexedDB on mount
    React.useEffect(() => {
        const hydrateState = async () => {
            try {
                const keys = [
                    'playground_active_tab',
                    'playground_profile',
                    'playground_hero_image',
                    'playground_stats',
                    'playground_song_title',
                    'playground_audio_blob',
                    'playground_playlist',
                    'playground_gallery'
                ];

                const results = await Promise.all(keys.map(key => localforage.getItem(key)));
                const [savedTab, savedProfile, savedHero, savedStats, savedAudioTitle, savedAudioBlob, savedPlaylist, savedGallery] = results;

                if (savedTab) setStateMap.setActiveTab(savedTab);
                if (savedProfile) setStateMap.setProfile(savedProfile);
                if (savedHero) setStateMap.setHeroImage(savedHero);
                if (savedStats) setStateMap.setStats(savedStats);
                if (savedAudioTitle) setStateMap.setSongTitle(savedAudioTitle);
                if (savedPlaylist) setStateMap.setPlaylist(savedPlaylist);
                if (savedGallery) setStateMap.setGallery(savedGallery);

                if (savedAudioBlob) {
                    const url = URL.createObjectURL(savedAudioBlob);
                    setStateMap.setAudioSource(url);
                }
            } catch (err) {
                console.error("Failed to load state from localforage:", err);
            } finally {
                setIsReady(true);
            }
        };

        hydrateState();
    }, []);

    // Persistence effect for all states
    React.useEffect(() => {
        if (!isReady) return;

        const persist = async () => {
            await Promise.all([
                localforage.setItem('playground_active_tab', setStateMap.activeTab),
                localforage.setItem('playground_profile', setStateMap.profile),
                localforage.setItem('playground_hero_image', setStateMap.heroImage),
                localforage.setItem('playground_stats', setStateMap.stats),
                localforage.setItem('playground_song_title', setStateMap.songTitle),
                localforage.setItem('playground_playlist', setStateMap.playlist),
                localforage.setItem('playground_gallery', setStateMap.gallery),
            ]);
        };

        persist();
    }, [
        setStateMap.activeTab,
        setStateMap.profile,
        setStateMap.heroImage,
        setStateMap.stats,
        setStateMap.songTitle,
        setStateMap.playlist,
        setStateMap.gallery,
        isReady
    ]);
};
