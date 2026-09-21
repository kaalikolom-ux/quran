import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { ThemeMode, UserPreferences, Bookmark, SurahTimings } from '../types/quran';

const DEFAULT_PREFS: UserPreferences = {
  themeMode: 'dark',
  arabicFontSize: 28,
  banglaFontSize: 17,
  englishFontSize: 15,
  arabicFontFamily: 'Amiri',
  showWordByWord: true,
  showTransliteration: true,
  showBanglaTranslation: true,
  showEnglishTranslation: true,
  englishTranslator: 'sahih_international',
  showLogicalConsistency: true,
  showSurahScientificMeaning: true,
  audioReciter: 'ar.alafasy',
  audioAutoScroll: true,
};

interface AudioContextState {
  isPlaying: boolean;
  currentSurah: number | null;
  currentAyah: number | null;
  currentWordPos: number | null;
  currentTime: number;
  duration: number;
  playbackRate: number;
  playSurah: (surahId: number, startAyah?: number) => Promise<void>;
  pauseAudio: () => void;
  resumeAudio: () => void;
  seekAyah: (ayah: number) => void;
  setPlaybackRate: (rate: number) => void;
  stopAudio: () => void;
}

interface PreferencesContextType {
  prefs: UserPreferences;
  updatePrefs: (newPrefs: Partial<UserPreferences>) => void;
  bookmarks: Bookmark[];
  addBookmark: (b: Omit<Bookmark, 'id' | 'createdAt'>) => void;
  removeBookmark: (id: string) => void;
  isBookmarked: (surah: number, ayah: number) => boolean;
  audio: AudioContextState;
}

const PreferencesContext = createContext<PreferencesContextType | null>(null);

export const PreferencesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Preferences
  const [prefs, setPrefs] = useState<UserPreferences>(() => {
    try {
      const saved = localStorage.getItem('quran_explorer_unified_prefs_v1');
      if (saved) return { ...DEFAULT_PREFS, ...JSON.parse(saved) };
    } catch (e) {}
    return DEFAULT_PREFS;
  });

  const updatePrefs = (newPrefs: Partial<UserPreferences>) => {
    setPrefs((prev) => {
      const updated = { ...prev, ...newPrefs };
      localStorage.setItem('quran_explorer_unified_prefs_v1', JSON.stringify(updated));
      return updated;
    });
  };

  // Sync theme class to document
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'theme-sepia', 'theme-slate', 'theme-light');
    if (prefs.themeMode === 'dark') root.classList.add('dark');
    else if (prefs.themeMode === 'sepia') root.classList.add('theme-sepia');
    else if (prefs.themeMode === 'slate') root.classList.add('theme-slate');
    else if (prefs.themeMode === 'light') root.classList.add('theme-light');
  }, [prefs.themeMode]);

  // 2. Bookmarks
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => {
    try {
      const saved = localStorage.getItem('quran_explorer_bookmarks');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [];
  });

  const addBookmark = (b: Omit<Bookmark, 'id' | 'createdAt'>) => {
    const newBm: Bookmark = {
      ...b,
      id: `${b.surah}:${b.ayah}-${Date.now()}`,
      createdAt: Date.now(),
    };
    setBookmarks((prev) => {
      const updated = [newBm, ...prev.filter((item) => !(item.surah === b.surah && item.ayah === b.ayah))];
      localStorage.setItem('quran_explorer_bookmarks', JSON.stringify(updated));
      return updated;
    });
  };

  const removeBookmark = (id: string) => {
    setBookmarks((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      localStorage.setItem('quran_explorer_bookmarks', JSON.stringify(updated));
      return updated;
    });
  };

  const isBookmarked = (surah: number, ayah: number) => {
    return bookmarks.some((b) => b.surah === surah && b.ayah === ayah);
  };

  // 3. Audio Player Engine
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSurah, setCurrentSurah] = useState<number | null>(null);
  const [currentAyah, setCurrentAyah] = useState<number | null>(null);
  const [currentWordPos, setCurrentWordPos] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRateState] = useState(1);
  const timingsRef = useRef<SurahTimings | null>(null);

  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    const handleTimeUpdate = () => {
      const timeMs = audio.currentTime * 1000;
      setCurrentTime(audio.currentTime);

      if (timingsRef.current && timingsRef.current.timestamps) {
        // Find current ayah
        const currentTimestamp = timingsRef.current.timestamps.find(
          (t) => timeMs >= t.start && timeMs < t.end
        );

        if (currentTimestamp) {
          setCurrentAyah(currentTimestamp.ayah);
          // Find current word
          if (currentTimestamp.words && currentTimestamp.words.length > 0) {
            const currentWord = currentTimestamp.words.find(
              (w) => timeMs >= w.start && timeMs < w.end
            );
            setCurrentWordPos(currentWord ? currentWord.pos : null);
          } else {
            setCurrentWordPos(null);
          }
        }
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentAyah(null);
      setCurrentWordPos(null);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const playSurah = async (surahId: number, startAyah?: number) => {
    if (!audioRef.current) return;

    // Load timings
    try {
      const res = await fetch(`/data/quran/timings/${surahId}.json`);
      if (res.ok) {
        timingsRef.current = await res.json();
      }
    } catch (e) {
      console.error('Failed to load timings:', e);
    }

    const paddedSurah = String(surahId).padStart(3, '0');
    // High quality audio recitation from Everyayah / QuranCDN
    const audioUrl = `https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/${surahId}.mp3`;
    
    if (audioRef.current.src !== audioUrl) {
      audioRef.current.src = audioUrl;
      audioRef.current.playbackRate = playbackRate;
    }

    setCurrentSurah(surahId);

    if (startAyah && timingsRef.current?.timestamps) {
      const targetAyah = timingsRef.current.timestamps.find((t) => t.ayah === startAyah);
      if (targetAyah) {
        audioRef.current.currentTime = targetAyah.start / 1000;
        setCurrentAyah(startAyah);
      }
    }

    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (e) {
      console.error('Audio play error:', e);
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const resumeAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setCurrentAyah(null);
      setCurrentWordPos(null);
    }
  };

  const seekAyah = (ayah: number) => {
    if (!audioRef.current || !timingsRef.current?.timestamps) return;
    const target = timingsRef.current.timestamps.find((t) => t.ayah === ayah);
    if (target) {
      audioRef.current.currentTime = target.start / 1000;
      setCurrentAyah(ayah);
      if (!isPlaying) {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const setPlaybackRate = (rate: number) => {
    setPlaybackRateState(rate);
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
  };

  return (
    <PreferencesContext.Provider
      value={{
        prefs,
        updatePrefs,
        bookmarks,
        addBookmark,
        removeBookmark,
        isBookmarked,
        audio: {
          isPlaying,
          currentSurah,
          currentAyah,
          currentWordPos,
          currentTime,
          duration,
          playbackRate,
          playSurah,
          pauseAudio,
          resumeAudio,
          seekAyah,
          setPlaybackRate,
          stopAudio,
        },
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
};

export const usePreferences = () => {
  const context = useContext(PreferencesContext);
  if (!context) throw new Error('usePreferences must be used within PreferencesProvider');
  return context;
};
