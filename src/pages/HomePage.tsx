import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Search, Sparkles, BookOpen, Compass, FileText, ArrowRight, Layers, Orbit, Dna, Mountain, Waves, BookMarked, Settings } from 'lucide-react';
import { toBengaliNumber, fromBengaliNumber } from '../utils/bengaliNumerals';
import { SurahMeta, Article } from '../types/quran';

interface HomePageProps {
  surahsMeta: Record<string, SurahMeta>;
}

export const HomePage: React.FC<HomePageProps> = ({ surahsMeta }) => {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeWordIdx, setActiveWordIdx] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;

  const rotatingWords = ['শব্দমূল', 'ব্যাকরণ', 'শাব্দিক অর্থ', 'ভাবানুবাদ', 'কুরআন অন্বেষা'];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setActiveWordIdx((prev) => (prev + 1) % rotatingWords.length);
        setIsFading(false);
      }, 400);
    }, 2800);
    return () => clearInterval(interval);
  }, [rotatingWords.length]);

  // Load articles
  useEffect(() => {
    fetch('/data/articles.json')
      .then((res) => res.json())
      .then((data) => setArticles(data))
      .catch(() => {});
  }, []);

  const surahList = Object.values(surahsMeta);

  // Filter surahs
  const filteredSurahs = surahList.filter((s) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.trim().toLowerCase();
    const normalizedQ = fromBengaliNumber(q);
    return (
      String(s.id) === normalizedQ ||
      toBengaliNumber(s.id) === q ||
      s.name_bn.toLowerCase().includes(q) ||
      s.name_en.toLowerCase().includes(normalizedQ) ||
      s.conventional_bn.toLowerCase().includes(q) ||
      s.scientific_bn.toLowerCase().includes(q) ||
      s.name_ar.includes(q)
    );
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const normalized = fromBengaliNumber(searchQuery.trim().toLowerCase());
    const ayahMatch = normalized.match(/^(\d{1,3})[:\s\-\.]+(\d{1,3})$/);
    if (ayahMatch) {
      const sId = parseInt(ayahMatch[1], 10);
      const aId = parseInt(ayahMatch[2], 10);
      if (sId >= 1 && sId <= 114) {
        setLocation(`/surah/${sId}#ayah-${aId}`);
        return;
      }
    }
    if (filteredSurahs.length > 0) {
      setLocation(`/surah/${filteredSurahs[0].id}`);
    }
  };

  const totalPages = Math.ceil(articles.length / articlesPerPage);
  const currentArticles = articles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );

  const topics = [
    {
      title: 'মহাবিশ্ব সম্প্রসারণ (Expanding Universe)',
      desc: 'মহাবিশ্ব যে প্রতিনিয়ত সম্প্রসারিত হচ্ছে সে সম্পর্কে কুরআনের বৈজ্ঞানিক নিদর্শন।',
      surah: 51,
      ayah: 47,
      icon: Orbit,
    },
    {
      title: 'বিগ ব্যাং ও সৃষ্টিতত্ত্ব (Big Bang & Origins)',
      desc: 'আসমান ও জমিনের একত্রিত অবস্থা থেকে বিস্ফোরণ এবং পানি থেকে সমস্ত প্রাণের সৃষ্টি।',
      surah: 21,
      ayah: 30,
      icon: Sparkles,
    },
    {
      title: 'ভ্রূণতত্ত্ব ও মানব সৃষ্টি (Embryology)',
      desc: 'মায়ের গর্ভে পর্যায়ক্রমে মানব ভ্রূণ বিকাশের নিখুঁত বিবরণ।',
      surah: 23,
      ayah: 12,
      icon: Dna,
    },
    {
      title: 'পর্বতের ভূমিকা ও ভূতত্ত্ব (Mountains as Pegs)',
      desc: 'পৃথিবীর ভূত্বককে স্থিতিশীল রাখতে পেরেকের মতো পর্বতের গভীর শিকড় ও ভূমিকা।',
      surah: 78,
      ayah: 6,
      icon: Mountain,
    },
    {
      title: 'সমুদ্রের অদৃশ্য প্রাচীর (Barrier between Oceans)',
      desc: 'মিষ্টি ও নোনা পানির এবং দুই সমুদ্রের মিলনস্থলে অদৃশ্য ঘনত্বের প্রাচীর।',
      surah: 55,
      ayah: 19,
      icon: Waves,
    },
    {
      title: 'লোহার উৎপত্তি ও মহাজাগতিক অবতরণ (Iron Origin)',
      desc: 'লোহা পৃথিবীতে তৈরি হয়নি বরং মহাকাশ থেকে সুপারনোভার মাধ্যমে নাযিল বা প্রেরিত হয়েছে।',
      surah: 57,
      ayah: 25,
      icon: Layers,
    },
  ];

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-[var(--border-color)]">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />

        <div className="mx-auto max-w-5xl px-4 sm:px-6 text-center">
          {/* Animated badge */}
          <div className="relative inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium text-emerald-300 shadow-sm mb-6">
            <span className="animate-star-fly-1 text-[var(--sparkle-star1)]">✦</span>
            <span>শব্দমূল • ব্যাকরণ • শাব্দিক অর্থ • ভাবানুবাদ • কুরআন অন্বেষা</span>
            <span className="animate-star-fly-2 text-[var(--sparkle-star2)]">★</span>
          </div>

          {/* Main Title with rotating word */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            শব্দে শব্দে{' '}
            <span
              className={`inline-block text-emerald-400 transition-all duration-400 transform ${
                isFading ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'
              }`}
            >
              {rotatingWords[activeWordIdx]}
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-[var(--text-muted)] max-w-2xl mx-auto leading-relaxed">
            কুরআনের প্রতিটি শব্দের ব্যাকরণগত ব্যুৎপত্তি, শাব্দিক ও ভাবানুবাদ একই পাতায়।
            “তারা কি কুরআন নিয়ে চিন্তা করে না? এতে কোনো বৈপরীত্য থাকত না।” — ৪:৮২
          </p>

          {/* Search Box */}
          <div className="mt-8 max-w-xl mx-auto">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <Search className="absolute left-4 h-5 w-5 text-emerald-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="সুরা খুঁজতে নাম বা নম্বর (৩৩ বা 33), আয়াত (৩৩:৪০ বা 33:40)..."
                className="w-full rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] pl-12 pr-28 py-3.5 text-sm text-white placeholder:text-neutral-500 focus:border-emerald-500 focus:outline-none shadow-lg transition-all"
              />
              <button
                type="submit"
                className="absolute right-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-500 transition-colors shadow-sm"
              >
                খুঁজুন
              </button>
            </form>
            <div className="mt-2 text-xs text-[var(--text-muted)] text-left px-2 flex items-center gap-1.5">
              <span>💡</span>
              <span>সুরা খুঁজতে নাম বা নম্বর (৩৩ বা 33) লিখুন। আয়াত খুঁজতে ৩৩ঃ৪০ বা 33:40 লিখে ইন্টার চাপুন।</span>
            </div>
          </div>

          {/* Quick links buttons */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs font-medium">
            <Link
              href="/surah/1"
              className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] px-4 py-2 text-white hover:border-emerald-500/50 hover:text-emerald-400 transition-all flex items-center gap-1.5"
            >
              <BookOpen className="h-3.5 w-3.5 text-emerald-400" />
              কুরআন
            </Link>
            <Link
              href="/lexicon"
              className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] px-4 py-2 text-white hover:border-emerald-500/50 hover:text-emerald-400 transition-all flex items-center gap-1.5"
            >
              <Compass className="h-3.5 w-3.5 text-teal-400" />
              অভিধান
            </Link>
            <Link
              href="/articles"
              className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] px-4 py-2 text-white hover:border-emerald-500/50 hover:text-emerald-400 transition-all flex items-center gap-1.5"
            >
              <FileText className="h-3.5 w-3.5 text-sky-400" />
              আর্টিকেল
            </Link>
            <Link
              href="/settings"
              className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] px-4 py-2 text-white hover:border-emerald-500/50 hover:text-emerald-400 transition-all flex items-center gap-1.5"
            >
              <Settings className="h-3.5 w-3.5 text-amber-400" />
              সেটিংস
            </Link>
          </div>
        </div>
      </section>

      {/* Surahs Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              সুরাসমূহ ({toBengaliNumber(filteredSurahs.length)})
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
              পবিত্র কুরআনের ১১৪টি সূরার শাব্দিক ও ভাবানুবাদসহ পূর্ণাঙ্গ তালিকা
            </p>
          </div>
        </div>

        {/* 114 Surahs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredSurahs.map((s) => (
            <Link
              key={s.id}
              href={`/surah/${s.id}`}
              className="group relative rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-4 hover:border-emerald-500/40 hover:bg-[var(--bg-card-hover)] transition-all duration-200 shadow-sm flex flex-col justify-between"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold group-hover:bg-emerald-500 group-hover:text-white transition-all">
                    {toBengaliNumber(s.id)}
                  </div>
                  <div>
                    <h3 className="font-bold text-white group-hover:text-emerald-400 transition-colors flex items-center gap-1.5 text-base">
                      <span>{s.name_bn}</span>
                      <span className="text-xs font-normal text-[var(--text-muted)]">({s.name_en})</span>
                    </h3>
                    <div className="text-xs text-[var(--text-muted)] mt-0.5">
                      {s.conventional_bn}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-arabic text-xl font-bold text-neutral-300 group-hover:text-emerald-400 transition-colors">
                    {s.name_ar}
                  </div>
                </div>
              </div>

              {/* Scientific Conceptual Title */}
              {s.scientific_bn && (
                <div className="mt-3 pt-2.5 border-t border-[var(--border-color)]/60 text-[11px] text-emerald-400/80 font-medium line-clamp-1">
                  💡 {s.scientific_bn}
                </div>
              )}
            </Link>
          ))}
        </div>
      </section>

      {/* Thematic Knowledge Base Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            কুরআনের বিষয়ভিত্তিক জ্ঞানভাণ্ডার
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
            বিজ্ঞান, সৃষ্টিতত্ত্ব, পারিবারিক অধিকার, অর্থনীতি, আত্মশুদ্ধি ও বৈজ্ঞানিক নিদর্শন সম্পর্কিত আয়াতসমূহ সরাসরি অনুসন্ধান করুন।
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {topics.map((t, idx) => {
            const Icon = t.icon;
            return (
              <Link
                key={idx}
                href={`/surah/${t.surah}#ayah-${t.ayah}`}
                className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-5 hover:border-emerald-500/40 hover:bg-[var(--bg-card-hover)] transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-white group-hover:text-emerald-400 transition-colors text-sm">
                      {t.title}
                    </h3>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                    {t.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[var(--border-color)]/50 flex items-center justify-between text-xs text-emerald-400 font-medium">
                  <span>সূরা {toBengaliNumber(t.surah)} : {toBengaliNumber(t.ayah)}</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Research Articles Section */}
      {articles.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                কুরআনের গবেষণা ও তাদাব্বুর প্রবন্ধসমূহ
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
                পবিত্র কুরআনের শব্দতত্ত্ব, রূপতত্ত্ব ও বিজ্ঞানভিত্তিক বিশ্লেষণভিত্তিক আর্টিকেলসমূহ
              </p>
            </div>
            <Link
              href="/articles"
              className="text-xs sm:text-sm font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              সকল আর্টিকেল
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {currentArticles.map((a) => (
              <Link
                key={a.id}
                href={`/articles/${a.slug}`}
                className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-5 hover:border-emerald-500/40 hover:bg-[var(--bg-card-hover)] transition-all flex flex-col justify-between group shadow-sm"
              >
                <div>
                  <div className="text-[11px] font-medium text-emerald-400 mb-2">
                    {a.category?.name_bn || 'কুরআনিক'} • {new Date(a.published_at).toLocaleDateString('bn-BD')}
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">
                    {a.title_bn}
                  </h3>
                  <p className="mt-2 text-xs text-[var(--text-muted)] line-clamp-3 leading-relaxed">
                    {a.excerpt_bn}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-[var(--border-color)]/50 flex items-center justify-between text-xs text-[var(--text-muted)]">
                  <span>{a.author?.name_bn || 'আলম এম.'}</span>
                  <span className="font-semibold text-emerald-400 group-hover:underline flex items-center gap-1">
                    বিস্তারিত পড়ুন
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2 text-xs">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] px-3 py-1.5 text-[var(--text-muted)] disabled:opacity-40"
              >
                পূর্ববর্তী
              </button>
              <span className="text-[var(--text-muted)] px-2">
                পৃষ্ঠা {toBengaliNumber(currentPage)} / {toBengaliNumber(totalPages)}
              </span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] px-3 py-1.5 text-[var(--text-muted)] disabled:opacity-40"
              >
                পরবর্তী
              </button>
            </div>
          )}
        </section>
      )}
    </div>
  );
};
