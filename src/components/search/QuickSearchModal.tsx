import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import { Search, X, BookOpen, FileText, ArrowRight, CornerDownLeft } from 'lucide-react';
import { toBengaliNumber, fromBengaliNumber } from '../../utils/bengaliNumerals';
import { SurahMeta, Article, LexiconEntry } from '../../types/quran';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  surahsMeta: Record<string, SurahMeta>;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({ isOpen, onClose, surahsMeta }) => {
  const [, setLocation] = useLocation();
  const [query, setQuery] = useState('');
  const [articles, setArticles] = useState<Article[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      // Load articles for search if not loaded
      if (articles.length === 0) {
        fetch('/data/articles.json')
          .then((res) => res.json())
          .then((data) => setArticles(data))
          .catch(() => {});
      }
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent handles toggle
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Search logic
  const normalized = fromBengaliNumber(query.trim().toLowerCase());
  
  // 1. Ayah Jump check (e.g. 33:40 or 33 40 or 33-40)
  const ayahMatch = normalized.match(/^(\d{1,3})[:\s\-\.]+(\d{1,3})$/);

  // 2. Surah matches
  const surahList = Object.values(surahsMeta);
  const matchedSurahs = query.trim()
    ? surahList.filter((s) => {
        const idStr = String(s.id);
        const bnIdStr = toBengaliNumber(s.id);
        return (
          idStr === normalized ||
          bnIdStr === query.trim() ||
          s.name_bn.toLowerCase().includes(query.toLowerCase()) ||
          s.name_en.toLowerCase().includes(normalized) ||
          s.conventional_bn.toLowerCase().includes(query.toLowerCase()) ||
          s.name_ar.includes(query.trim())
        );
      }).slice(0, 8)
    : surahList.slice(0, 6);

  // 3. Article matches
  const matchedArticles = query.trim()
    ? articles.filter((a) => {
        return (
          a.title_bn.toLowerCase().includes(query.toLowerCase()) ||
          a.title_en.toLowerCase().includes(normalized) ||
          a.excerpt_bn.toLowerCase().includes(query.toLowerCase()) ||
          (a.tags && a.tags.some((t) => t.toLowerCase().includes(query.toLowerCase())))
        );
      }).slice(0, 4)
    : [];

  const handleSelectSurah = (surahId: number, ayah?: number) => {
    onClose();
    if (ayah) {
      setLocation(`/surah/${surahId}#ayah-${ayah}`);
    } else {
      setLocation(`/surah/${surahId}`);
    }
  };

  const handleSelectArticle = (slug: string) => {
    onClose();
    setLocation(`/articles/${slug}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 border-b border-[var(--border-color)] bg-[var(--bg-main)]">
          <Search className="h-5 w-5 text-emerald-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                if (ayahMatch) {
                  const sId = parseInt(ayahMatch[1], 10);
                  const aId = parseInt(ayahMatch[2], 10);
                  if (sId >= 1 && sId <= 114) {
                    handleSelectSurah(sId, aId);
                  }
                } else if (matchedSurahs.length > 0) {
                  handleSelectSurah(matchedSurahs[0].id);
                }
              }
            }}
            placeholder="সুরা খুঁজুন (৩৩ বা Al-Ahzab), আয়াত (৩৩:৪০ বা 33:40), বা আর্টিকেল..."
            className="w-full bg-transparent px-3 py-4 text-white placeholder:text-neutral-500 text-sm sm:text-base focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[var(--text-muted)] hover:text-white rounded-md"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block ml-2 rounded bg-white/10 px-2 py-0.5 text-[10px] text-neutral-400">
            ESC
          </kbd>
        </div>

        {/* Search Results */}
        <div className="overflow-y-auto p-3 space-y-4 text-sm">
          {/* Direct Ayah Jump Banner */}
          {ayahMatch && (
            <div
              onClick={() => {
                const sId = parseInt(ayahMatch[1], 10);
                const aId = parseInt(ayahMatch[2], 10);
                if (sId >= 1 && sId <= 114) handleSelectSurah(sId, aId);
              }}
              className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-white cursor-pointer hover:bg-emerald-500/25 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500 text-white">
                  <CornerDownLeft className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-semibold text-emerald-300">
                    সরাসরি আয়াতে যান: সূরা {toBengaliNumber(ayahMatch[1])}, আয়াত {toBengaliNumber(ayahMatch[2])}
                  </div>
                  <div className="text-xs text-neutral-300">
                    ইন্টার চাপুন বা ক্লিক করুন
                  </div>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-emerald-400" />
            </div>
          )}

          {/* Surahs Section */}
          {matchedSurahs.length > 0 && (
            <div>
              <div className="px-2 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                সূরা সমূহ ({toBengaliNumber(matchedSurahs.length)})
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mt-1">
                {matchedSurahs.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => handleSelectSurah(s.id)}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 border border-transparent hover:border-[var(--border-color)] cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-xs font-medium text-emerald-400 group-hover:bg-emerald-500/20">
                        {toBengaliNumber(s.id)}
                      </div>
                      <div>
                        <div className="font-medium text-white group-hover:text-emerald-400 transition-colors">
                          {s.name_bn} ({s.name_en})
                        </div>
                        <div className="text-xs text-[var(--text-muted)]">
                          {s.conventional_bn}
                        </div>
                      </div>
                    </div>
                    <div className="font-arabic text-sm text-neutral-400 group-hover:text-white">
                      {s.name_ar}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Articles Section */}
          {matchedArticles.length > 0 && (
            <div>
              <div className="px-2 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                আর্টিকেল ({toBengaliNumber(matchedArticles.length)})
              </div>
              <div className="space-y-1.5 mt-1">
                {matchedArticles.map((a) => (
                  <div
                    key={a.id}
                    onClick={() => handleSelectArticle(a.slug)}
                    className="p-2.5 rounded-xl hover:bg-white/5 border border-transparent hover:border-[var(--border-color)] cursor-pointer transition-colors group"
                  >
                    <div className="font-medium text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
                      {a.title_bn}
                    </div>
                    <div className="text-xs text-[var(--text-muted)] line-clamp-1 mt-0.5">
                      {a.excerpt_bn}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {matchedSurahs.length === 0 && matchedArticles.length === 0 && !ayahMatch && (
            <div className="p-8 text-center text-sm text-[var(--text-muted)]">
              কোনো ফলাফল পাওয়া যায়নি। অনুগ্রহ করে সুরা নম্বর (যেমন: ৩৩), নাম, বা আয়াত (যেমন: ৩৩:৪০) লিখে খুঁজুন।
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 border-t border-[var(--border-color)] bg-[var(--bg-main)] text-[11px] text-[var(--text-muted)] flex items-center justify-between">
          <span>💡 উদাহরণ: <b>৩৩</b> (সুরা), <b>33:40</b> (আয়াত), <b>গাভী</b> (অনুবাদ)</span>
          <span className="hidden sm:inline">খুঁজতে ইন্টার চাপুন</span>
        </div>
      </div>
    </div>
  );
};
