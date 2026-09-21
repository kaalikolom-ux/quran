import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Search, Compass, BookOpen, Layers, ArrowRight, ExternalLink } from 'lucide-react';
import { toBengaliNumber } from '../utils/bengaliNumerals';
import { LexiconEntry } from '../types/quran';

export const LexiconPage: React.FC = () => {
  const [lexicon, setLexicon] = useState<LexiconEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLetter, setSelectedLetter] = useState<string>('all');
  const [selectedRoot, setSelectedRoot] = useState<LexiconEntry | null>(null);

  const arabicAlphabet = [
    'all', 'ا', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'س', 'ش',
    'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ك', 'ل', 'م', 'ن', 'ه', 'و', 'ي'
  ];

  useEffect(() => {
    // Check url search params for initial root
    const urlParams = new URLSearchParams(window.location.search);
    const rootParam = urlParams.get('root');

    fetch('/data/quran/lexicon.json')
      .then((res) => res.json())
      .then((data) => {
        setLexicon(data);
        setLoading(false);
        if (rootParam) {
          const found = data.find((item: LexiconEntry) => item.root === rootParam);
          if (found) {
            setSelectedRoot(found);
            setSearchQuery(rootParam);
          }
        }
      })
      .catch((err) => {
        console.error('Failed to load lexicon:', err);
        setLoading(false);
      });
  }, []);

  const filteredLexicon = lexicon.filter((item) => {
    // Letter filter
    if (selectedLetter !== 'all') {
      const firstChar = item.root.charAt(0);
      if (firstChar !== selectedLetter) return false;
    }

    // Query filter
    if (!searchQuery.trim()) return true;
    const q = searchQuery.trim().toLowerCase();
    return (
      item.root.includes(searchQuery.trim()) ||
      item.transliteration.toLowerCase().includes(q) ||
      item.meaning_bn.toLowerCase().includes(q) ||
      item.meaning_en.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <section className="border-b border-[var(--border-color)] bg-[var(--bg-card)]/50 pt-10 pb-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/20 bg-teal-500/10 px-3.5 py-1 text-xs font-medium text-teal-400 mb-4">
            <Compass className="h-4 w-4" />
            <span>কুরআনিক শব্দমূল ও ব্যাকরণ অভিধান</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            কুরআনিক অভিধান (Lexicon)
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[var(--text-muted)] max-w-2xl mx-auto">
            পবিত্র কুরআনে ব্যবহৃত ১,৬৪২টি অনন্য শব্দমূল (Root Words), তাদের ব্যুৎপত্তি, শাব্দিক অর্থ ও আয়াতের পরিসংখ্যান।
          </p>

          {/* Search Box */}
          <div className="mt-8 max-w-xl mx-auto">
            <div className="relative flex items-center">
              <Search className="absolute left-4 h-5 w-5 text-teal-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="শব্দমূল খুঁজুন (যেমন: سلم, كتب, علم বা shalam)..."
                className="w-full rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] pl-12 pr-4 py-3.5 text-sm text-white placeholder:text-neutral-500 focus:border-teal-500 focus:outline-none shadow-lg transition-all"
              />
            </div>
          </div>

          {/* Arabic Alphabet Filter Bar */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-1.5 text-xs">
            {arabicAlphabet.map((letter) => (
              <button
                key={letter}
                onClick={() => setSelectedLetter(letter)}
                className={`rounded-lg px-2.5 py-1 font-arabic transition-colors ${
                  selectedLetter === letter
                    ? 'bg-teal-600 text-white font-bold shadow-sm'
                    : 'border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-muted)] hover:text-white hover:border-teal-500/40'
                }`}
              >
                {letter === 'all' ? 'সকল' : letter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10">
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm text-[var(--text-muted)]">
            মোট শব্দমূল পাওয়া গেছে: <b className="text-white">{toBengaliNumber(filteredLexicon.length)}</b> টি
          </div>
        </div>

        {loading ? (
          <div className="py-20 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-teal-500 border-t-transparent" />
            <p className="mt-2 text-xs text-[var(--text-muted)]">অভিধান লোড হচ্ছে...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredLexicon.map((entry) => (
              <div
                key={entry.id || entry.root}
                onClick={() => setSelectedRoot(entry)}
                className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-5 hover:border-teal-500/40 hover:bg-[var(--bg-card-hover)] cursor-pointer transition-all shadow-sm flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <div className="font-arabic text-2xl font-bold text-teal-400 group-hover:scale-105 transition-transform inline-block">
                        {entry.root}
                      </div>
                      <div className="text-xs text-[var(--text-muted)] font-mono">
                        {entry.transliteration}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="rounded-full bg-teal-500/10 border border-teal-500/20 px-2.5 py-0.5 text-[11px] font-semibold text-teal-300">
                        {toBengaliNumber(entry.occurrences)} বার
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 space-y-1">
                    <div className="text-sm font-semibold text-white">
                      {entry.meaning_bn}
                    </div>
                    <div className="text-xs text-neutral-400 italic">
                      {entry.meaning_en}
                    </div>
                  </div>

                  {entry.scientific_notes_bn && (
                    <div className="mt-3 pt-2.5 border-t border-[var(--border-color)]/50 text-xs text-teal-300/90 leading-relaxed">
                      💡 {entry.scientific_notes_bn}
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-[var(--border-color)]/40 flex items-center justify-between text-xs text-[var(--text-muted)] group-hover:text-teal-400">
                  <span>বিস্তারিত ও আয়াতসমূহ</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Root Details Modal */}
      {selectedRoot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-xl rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="flex items-start justify-between pb-4 border-b border-[var(--border-color)]">
              <div>
                <div className="font-arabic text-3xl font-bold text-teal-400">
                  {selectedRoot.root}
                </div>
                <div className="text-xs text-[var(--text-muted)] font-mono mt-0.5">
                  উচ্চারণ: {selectedRoot.transliteration}
                </div>
              </div>
              <button
                onClick={() => setSelectedRoot(null)}
                className="rounded-lg border border-[var(--border-color)] p-1.5 text-[var(--text-muted)] hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="overflow-y-auto py-4 space-y-4 text-sm">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1">
                  বাংলা শাব্দিক অর্থ
                </h4>
                <p className="text-white text-base font-medium">{selectedRoot.meaning_bn}</p>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1">
                  English Meaning
                </h4>
                <p className="text-neutral-300 italic">{selectedRoot.meaning_en}</p>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1">
                  কুরআনে পুনরাবৃত্তি (Occurrences)
                </h4>
                <p className="text-white">মোট {toBengaliNumber(selectedRoot.occurrences)} বার ব্যবহৃত হয়েছে।</p>
              </div>

              {selectedRoot.scientific_notes_bn && (
                <div className="p-3.5 rounded-xl bg-teal-950/30 border border-teal-500/20 text-teal-200 text-xs leading-relaxed">
                  <span className="font-bold">বিজ্ঞান ও চিন্তাশীল নোট:</span> {selectedRoot.scientific_notes_bn}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-[var(--border-color)] flex justify-end">
              <button
                onClick={() => setSelectedRoot(null)}
                className="rounded-xl bg-teal-600 px-4 py-2 text-xs font-semibold text-white hover:bg-teal-500 transition-colors"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
