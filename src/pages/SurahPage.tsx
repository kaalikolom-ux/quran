import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { 
  Play, Pause, Bookmark as BookmarkIcon, Copy, Check, Share2, 
  ChevronLeft, ChevronRight, BookOpen, Sparkles, ChevronDown, 
  ChevronUp, ExternalLink, Volume2, Settings2, Info
} from 'lucide-react';
import { usePreferences } from '../context/PreferencesContext';
import { toBengaliNumber } from '../utils/bengaliNumerals';
import { SurahData, SurahMeta, SurahConsistency, EnglishTranslations, Ayah } from '../types/quran';

interface SurahPageProps {
  surahId: number;
  surahsMeta: Record<string, SurahMeta>;
}

export const SurahPage: React.FC<SurahPageProps> = ({ surahId, surahsMeta }) => {
  const [, setLocation] = useLocation();
  const { prefs, updatePrefs, bookmarks, addBookmark, removeBookmark, isBookmarked, audio } = usePreferences();
  
  const [surahData, setSurahData] = useState<SurahData | null>(null);
  const [englishTrans, setEnglishTrans] = useState<EnglishTranslations | null>(null);
  const [consistency, setConsistency] = useState<SurahConsistency | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [showConsistencyCard, setShowConsistencyCard] = useState(false);
  const [copiedAyah, setCopiedAyah] = useState<number | null>(null);
  const [quickJumpAyah, setQuickJumpAyah] = useState<string>('');

  const currentMeta = surahsMeta[String(surahId)];

  // Scroll to hash ayah if present
  useEffect(() => {
    if (!loading && window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
      }
    }
  }, [loading, surahId]);

  // Load Surah data, English translations, and 4:82 consistency
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    Promise.all([
      fetch(`/data/quran/surahs/${surahId}.json`).then((r) => {
        if (!r.ok) throw new Error(`Surah ${surahId} not found`);
        return r.json();
      }),
      fetch(`/data/quran/english_translations/${surahId}.json`).then((r) => (r.ok ? r.json() : null)).catch(() => null),
      fetch('/data/quran/surah_consistency.json').then((r) => (r.ok ? r.json() : null)).catch(() => null),
    ])
      .then(([sData, enData, consData]) => {
        if (!isMounted) return;
        setSurahData(sData);
        setEnglishTrans(enData);
        if (consData && consData[surahId]) {
          setConsistency(consData[surahId]);
        }
        setLoading(false);
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err.message);
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [surahId]);

  const handleCopyAyah = (ayah: Ayah) => {
    const arabic = ayah.words.map((w) => w.text_uthmani).join(' ');
    const bn = ayah.translation_bn;
    const text = `${arabic}\n\n${bn}\n— সূরা ${currentMeta?.name_bn || surahId}, আয়াত ${toBengaliNumber(ayah.ayah)}`;
    navigator.clipboard.writeText(text);
    setCopiedAyah(ayah.ayah);
    setTimeout(() => setCopiedAyah(null), 2500);
  };

  const handleToggleBookmark = (ayah: Ayah) => {
    if (isBookmarked(surahId, ayah.ayah)) {
      const bm = bookmarks.find((b) => b.surah === surahId && b.ayah === ayah.ayah);
      if (bm) removeBookmark(bm.id);
    } else {
      addBookmark({
        surah: surahId,
        ayah: ayah.ayah,
        surahNameBn: currentMeta?.name_bn || `সূরা ${surahId}`,
        textArabic: ayah.words.map((w) => w.text_uthmani).join(' '),
        translationBn: ayah.translation_bn,
      });
    }
  };

  const handlePlayAyah = (ayahNum: number) => {
    if (audio.currentSurah === surahId && audio.currentAyah === ayahNum && audio.isPlaying) {
      audio.pauseAudio();
    } else {
      audio.playSurah(surahId, ayahNum);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
          <p className="text-sm text-[var(--text-muted)]">সূরা লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  if (error || !surahData) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-8 text-center max-w-md">
          <h2 className="text-xl font-bold text-red-400 mb-2">সূরা পাওয়া যায়নি</h2>
          <p className="text-sm text-[var(--text-muted)] mb-4">{error || 'কোন তথ্য পাওয়া যায়নি।'}</p>
          <Link href="/" className="inline-flex rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white">
            হোমে ফিরে যান
          </Link>
        </div>
      </div>
    );
  }

  const prevSurahId = surahId > 1 ? surahId - 1 : null;
  const nextSurahId = surahId < 114 ? surahId + 1 : null;

  return (
    <div className="min-h-screen pb-32">
      {/* Surah Header Banner */}
      <section className="border-b border-[var(--border-color)] bg-[var(--bg-card)]/60 pt-8 pb-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          {/* Top navigation: Prev / Next */}
          <div className="flex items-center justify-between gap-4 mb-6">
            {prevSurahId ? (
              <Link
                href={`/surah/${prevSurahId}`}
                className="flex items-center gap-1.5 text-xs font-medium text-[var(--text-muted)] hover:text-white transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden sm:inline">পূর্ববর্তী সূরা</span>
                <span>({toBengaliNumber(prevSurahId)}. {surahsMeta[String(prevSurahId)]?.name_bn})</span>
              </Link>
            ) : <div />}

            {/* Quick Ayah Jump Dropdown */}
            <div className="flex items-center gap-2">
              <select
                value={quickJumpAyah}
                onChange={(e) => {
                  const val = e.target.value;
                  setQuickJumpAyah(val);
                  if (val) {
                    const el = document.getElementById(`ayah-${val}`);
                    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }
                }}
                className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-main)] px-2.5 py-1 text-xs text-white focus:border-emerald-500 focus:outline-none"
              >
                <option value="">আয়াত নির্বাচন করুন</option>
                {surahData.ayahs.map((a) => (
                  <option key={a.ayah} value={a.ayah}>
                    আয়াত {toBengaliNumber(a.ayah)}
                  </option>
                ))}
              </select>
            </div>

            {nextSurahId ? (
              <Link
                href={`/surah/${nextSurahId}`}
                className="flex items-center gap-1.5 text-xs font-medium text-[var(--text-muted)] hover:text-white transition-colors"
              >
                <span className="hidden sm:inline">পরবর্তী সূরা</span>
                <span>({toBengaliNumber(nextSurahId)}. {surahsMeta[String(nextSurahId)]?.name_bn})</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            ) : <div />}
          </div>

          {/* Surah Title Details */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
              <span>{currentMeta?.revelation_place === 'madinah' ? 'মাদানী' : 'মাক্কী'}</span>
              <span>•</span>
              <span>{toBengaliNumber(surahData.ayahs.length)} আয়াত</span>
              <span>•</span>
              <span>{currentMeta?.conventional_bn}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight flex items-center justify-center gap-3">
              <span>সূরা {currentMeta?.name_bn || surahId}</span>
              <span className="font-arabic font-normal text-3xl sm:text-4xl text-emerald-400">
                {currentMeta?.name_ar}
              </span>
            </h1>

            {/* Scientific Conceptual Title */}
            {currentMeta?.scientific_bn && (
              <p className="text-sm sm:text-base text-emerald-400/90 font-medium max-w-2xl mx-auto">
                💡 {currentMeta.scientific_bn}
              </p>
            )}

            {/* Play Surah Button */}
            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  if (audio.currentSurah === surahId && audio.isPlaying) {
                    audio.pauseAudio();
                  } else {
                    audio.playSurah(surahId);
                  }
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-emerald-500 shadow-md transition-all"
              >
                {audio.currentSurah === surahId && audio.isPlaying ? (
                  <>
                    <Pause className="h-4 w-4 fill-current" />
                    <span>তেলাওয়াত থামান</span>
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 fill-current" />
                    <span>পূর্ণাঙ্গ সূরা শুনুন</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 4:82 Logical Consistency Card */}
          {consistency && prefs.showLogicalConsistency && (
            <div className="mt-8 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-5 shadow-sm">
              <button
                onClick={() => setShowConsistencyCard(!showConsistencyCard)}
                className="w-full flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white">
                      {consistency.title_bn}
                    </h3>
                    <p className="text-xs text-emerald-400/80">
                      সূরা আন-নিসা (৪:৮২) এর অভ্যন্তরীণ বৈপরীত্যহীনতা ও যৌক্তিক সামঞ্জস্যের মানদণ্ডে পর্যালোচনা
                    </p>
                  </div>
                </div>
                <div className="p-1 rounded-lg border border-[var(--border-color)] text-neutral-400">
                  {showConsistencyCard ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </div>
              </button>

              {showConsistencyCard && (
                <div className="mt-4 pt-4 border-t border-emerald-500/20 text-xs sm:text-sm text-neutral-200 whitespace-pre-line leading-relaxed">
                  {consistency.content_bn}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Bismillah Header (except Surah 9) */}
      {surahId !== 9 && (
        <div className="py-10 text-center">
          <div className="font-arabic text-3xl sm:text-4xl text-emerald-400">
            بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </div>
        </div>
      )}

      {/* Ayahs Stream */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 space-y-8">
        {surahData.ayahs.map((ayah) => {
          const isCurrentAyahActive = audio.currentSurah === surahId && audio.currentAyah === ayah.ayah;
          const bookmarked = isBookmarked(surahId, ayah.ayah);
          const englishAyah = englishTrans?.[String(ayah.ayah)];

          return (
            <div
              key={ayah.ayah}
              id={`ayah-${ayah.ayah}`}
              className={`rounded-2xl border p-6 transition-all duration-300 ${
                isCurrentAyahActive
                  ? 'ayah-active border-emerald-500/60 bg-emerald-500/5 shadow-lg'
                  : 'border-[var(--border-color)] bg-[var(--bg-card)]'
              }`}
            >
              {/* Ayah Header: Number & Action Icons */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--border-color)]/60">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-xs font-bold text-emerald-400">
                    {toBengaliNumber(ayah.ayah)}
                  </div>
                  <span className="text-xs text-[var(--text-muted)]">
                    {currentMeta?.name_bn} : {toBengaliNumber(ayah.ayah)}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  {/* Play audio for this ayah */}
                  <button
                    onClick={() => handlePlayAyah(ayah.ayah)}
                    className={`p-2 rounded-lg transition-colors ${
                      isCurrentAyahActive && audio.isPlaying
                        ? 'bg-emerald-500 text-white'
                        : 'text-[var(--text-muted)] hover:text-white hover:bg-white/5'
                    }`}
                    title="এই আয়াতের তেলাওয়াত শুনুন"
                  >
                    {isCurrentAyahActive && audio.isPlaying ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Volume2 className="h-4 w-4" />
                    )}
                  </button>

                  {/* Bookmark */}
                  <button
                    onClick={() => handleToggleBookmark(ayah)}
                    className={`p-2 rounded-lg transition-colors ${
                      bookmarked ? 'text-amber-400' : 'text-[var(--text-muted)] hover:text-white hover:bg-white/5'
                    }`}
                    title="বুকমার্ক করুন"
                  >
                    <BookmarkIcon className={`h-4 w-4 ${bookmarked ? 'fill-current' : ''}`} />
                  </button>

                  {/* Copy */}
                  <button
                    onClick={() => handleCopyAyah(ayah)}
                    className="p-2 rounded-lg text-[var(--text-muted)] hover:text-white hover:bg-white/5 transition-colors"
                    title="কপি করুন"
                  >
                    {copiedAyah === ayah.ayah ? (
                      <Check className="h-4 w-4 text-emerald-400" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Word-by-Word Breakdown */}
              {prefs.showWordByWord ? (
                <div className="flex flex-wrap flex-row-reverse justify-start gap-3 sm:gap-4 py-2">
                  {ayah.words.map((word) => {
                    const isWordActive = isCurrentAyahActive && audio.currentWordPos === word.position;

                    return (
                      <div
                        key={word.id}
                        className={`flex flex-col items-center justify-between p-2.5 sm:p-3 rounded-xl border border-[var(--border-color)]/60 bg-[var(--bg-main)]/50 transition-all ${
                          isWordActive ? 'word-active' : 'hover:border-emerald-500/40'
                        }`}
                      >
                        {/* Arabic text */}
                        <div
                          className="font-arabic font-bold text-white text-center leading-loose mb-1"
                          style={{ fontSize: `${prefs.arabicFontSize}px` }}
                        >
                          {word.text_uthmani}
                        </div>

                        {/* Transliteration */}
                        {prefs.showTransliteration && (
                          <div className="text-[11px] text-[var(--text-muted)] text-center italic mb-0.5">
                            {word.transliteration}
                          </div>
                        )}

                        {/* Bengali Meaning */}
                        <div
                          className="font-medium text-emerald-300 text-center leading-tight"
                          style={{ fontSize: `${prefs.banglaFontSize - 2}px` }}
                        >
                          {word.translation_bn}
                        </div>

                        {/* English Meaning */}
                        {prefs.showEnglishTranslation && word.translation_en && (
                          <div
                            className="text-[11px] text-neutral-400 text-center mt-0.5"
                            style={{ fontSize: `${prefs.englishFontSize - 4}px` }}
                          >
                            {word.translation_en}
                          </div>
                        )}

                        {/* Root link to Lexicon if available */}
                        {word.root && (
                          <Link
                            href={`/lexicon?root=${encodeURIComponent(word.root)}`}
                            className="mt-1 text-[10px] text-teal-400/80 hover:text-teal-300 font-mono hover:underline"
                            title="অভিধানে শব্দমূল দেখুন"
                          >
                            {word.root}
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* Arabic Full Sentence View */
                <div
                  className="font-arabic text-right leading-loose text-white py-4"
                  style={{ fontSize: `${prefs.arabicFontSize + 4}px` }}
                >
                  {ayah.words.map((w) => w.text_uthmani).join(' ')}
                </div>
              )}

              {/* Full Ayah Bengali Translation */}
              {prefs.showBanglaTranslation && (
                <div className="mt-5 pt-4 border-t border-[var(--border-color)]/50">
                  <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-1">
                    বাংলা ভাবানুবাদ
                  </div>
                  <p
                    className="text-white leading-relaxed"
                    style={{ fontSize: `${prefs.banglaFontSize}px` }}
                  >
                    {ayah.translation_bn}
                  </p>
                </div>
              )}

              {/* Full Ayah English Translation */}
              {prefs.showEnglishTranslation && englishAyah && (
                <div className="mt-3 pt-3 border-t border-[var(--border-color)]/30">
                  <div className="text-xs font-semibold uppercase tracking-wider text-sky-400 mb-1">
                    English (Sahih International)
                  </div>
                  <p
                    className="text-neutral-300 leading-relaxed italic"
                    style={{ fontSize: `${prefs.englishFontSize}px` }}
                  >
                    {englishAyah.sahih_international || englishAyah.pickthall || englishAyah.yusuf_ali}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Surah Pagination Navigation */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-12 flex items-center justify-between gap-4">
        {prevSurahId ? (
          <Link
            href={`/surah/${prevSurahId}`}
            className="flex items-center gap-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] px-4 py-2.5 text-xs sm:text-sm font-semibold text-white hover:border-emerald-500/50 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>পূর্ববর্তী সূরা: {surahsMeta[String(prevSurahId)]?.name_bn}</span>
          </Link>
        ) : <div />}

        {nextSurahId ? (
          <Link
            href={`/surah/${nextSurahId}`}
            className="flex items-center gap-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] px-4 py-2.5 text-xs sm:text-sm font-semibold text-white hover:border-emerald-500/50 transition-colors"
          >
            <span>পরবর্তী সূরা: {surahsMeta[String(nextSurahId)]?.name_bn}</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        ) : <div />}
      </div>
    </div>
  );
};
