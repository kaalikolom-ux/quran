import React from 'react';
import { Play, Pause, Square, Volume2, FastForward, SkipForward, SkipBack, X } from 'lucide-react';
import { usePreferences } from '../../context/PreferencesContext';
import { toBengaliNumber } from '../../utils/bengaliNumerals';
import { SurahMeta } from '../../types/quran';

interface AudioPlayerBarProps {
  surahsMeta: Record<string, SurahMeta>;
}

export const AudioPlayerBar: React.FC<AudioPlayerBarProps> = ({ surahsMeta }) => {
  const { audio } = usePreferences();

  if (!audio.currentSurah) return null;

  const currentMeta = surahsMeta[String(audio.currentSurah)];
  const surahName = currentMeta?.name_bn || `সূরা ${toBengaliNumber(audio.currentSurah)}`;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const rates = [0.75, 1, 1.25, 1.5];

  const cyclePlaybackRate = () => {
    const nextIdx = (rates.indexOf(audio.playbackRate) + 1) % rates.length;
    audio.setPlaybackRate(rates[nextIdx]);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-[var(--border-color)] bg-[var(--bg-card)]/95 backdrop-blur-md px-4 py-3 shadow-2xl transition-all">
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Left: Surah & Ayah details */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
            <Volume2 className="h-5 w-5 animate-pulse" />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-semibold text-white truncate">
              {surahName} {currentMeta?.name_ar && <span className="font-arabic text-xs text-neutral-400 mr-1">{currentMeta.name_ar}</span>}
            </div>
            <div className="text-xs text-[var(--text-muted)]">
              {audio.currentAyah ? `আয়াত ${toBengaliNumber(audio.currentAyah)}` : 'তেলাওয়াত শুনছেন...'} (মিশারী রাশিদ আল-আফাসী)
            </div>
          </div>
          {/* Mobile stop button */}
          <button
            onClick={audio.stopAudio}
            className="sm:hidden p-1.5 text-[var(--text-muted)] hover:text-white rounded-lg"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Center: Playback Controls */}
        <div className="flex items-center gap-4 w-full sm:w-auto justify-center">
          {audio.isPlaying ? (
            <button
              onClick={audio.pauseAudio}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg hover:bg-emerald-400 hover:scale-105 transition-all"
              title="বিরতি"
            >
              <Pause className="h-5 w-5 fill-current" />
            </button>
          ) : (
            <button
              onClick={audio.resumeAudio}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg hover:bg-emerald-400 hover:scale-105 transition-all"
              title="চালু করুন"
            >
              <Play className="h-5 w-5 fill-current ml-0.5" />
            </button>
          )}

          <div className="text-xs text-[var(--text-muted)] tabular-nums">
            {formatTime(audio.currentTime)} / {formatTime(audio.duration)}
          </div>
        </div>

        {/* Right: Speed & Stop */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={cyclePlaybackRate}
            className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-main)] px-2.5 py-1 text-xs font-medium text-[var(--text-muted)] hover:text-white transition-colors"
            title="গতি পরিবর্তন করুন"
          >
            {audio.playbackRate}x
          </button>
          <button
            onClick={audio.stopAudio}
            className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-main)] p-2 text-[var(--text-muted)] hover:text-red-400 transition-colors"
            title="বন্ধ করুন"
          >
            <Square className="h-3.5 w-3.5 fill-current" />
          </button>
        </div>
      </div>
    </div>
  );
};
