import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Search, FileText, Calendar, Tag, ArrowRight, User } from 'lucide-react';
import { toBengaliNumber } from '../utils/bengaliNumerals';
import { Article } from '../types/quran';

export const ArticlesPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 9;

  useEffect(() => {
    fetch('/data/articles.json')
      .then((res) => res.json())
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load articles:', err);
        setLoading(false);
      });
  }, []);

  // Collect all unique tags
  const allTags = ['all', ...new Set(articles.flatMap((a) => a.tags || []))].slice(0, 15);

  const filteredArticles = articles.filter((a) => {
    if (selectedTag !== 'all' && (!a.tags || !a.tags.includes(selectedTag))) {
      return false;
    }
    if (!searchQuery.trim()) return true;
    const q = searchQuery.trim().toLowerCase();
    return (
      a.title_bn.toLowerCase().includes(q) ||
      a.title_en.toLowerCase().includes(q) ||
      a.excerpt_bn.toLowerCase().includes(q) ||
      (a.tags && a.tags.some((t) => t.toLowerCase().includes(q)))
    );
  });

  const totalPages = Math.ceil(filteredArticles.length / perPage);
  const currentArticles = filteredArticles.slice((currentPage - 1) * perPage, currentPage * perPage);

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <section className="border-b border-[var(--border-color)] bg-[var(--bg-card)]/50 pt-10 pb-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-3.5 py-1 text-xs font-medium text-sky-400 mb-4">
            <FileText className="h-4 w-4" />
            <span>কুরআন গবেষণা ও তাদাব্বুর প্রবন্ধ</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            কুরআনিক প্রবন্ধ ও গবেষণা
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[var(--text-muted)] max-w-2xl mx-auto">
            পবিত্র কুরআনের আয়াতসমূহের গভীর তাদাব্বুর, ভাষাতাত্ত্বিক পুনঃপাঠ ও বিজ্ঞানভিত্তিক চিন্তার সমন্বয়ে রচিত গবেষণামূলক প্রবন্ধসমূহ।
          </p>

          {/* Search Box */}
          <div className="mt-8 max-w-xl mx-auto">
            <div className="relative flex items-center">
              <Search className="absolute left-4 h-5 w-5 text-sky-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="প্রবন্ধ খুঁজুন (শিরোনাম, বিষয় বা ট্যাগ)..."
                className="w-full rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] pl-12 pr-4 py-3.5 text-sm text-white placeholder:text-neutral-500 focus:border-sky-500 focus:outline-none shadow-lg transition-all"
              />
            </div>
          </div>

          {/* Tags Bar */}
          {allTags.length > 1 && (
            <div className="mt-6 flex flex-wrap items-center justify-center gap-1.5 text-xs">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    setSelectedTag(tag);
                    setCurrentPage(1);
                  }}
                  className={`rounded-lg px-3 py-1 transition-colors ${
                    selectedTag === tag
                      ? 'bg-sky-600 text-white font-semibold shadow-sm'
                      : 'border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-muted)] hover:text-white hover:border-sky-500/40'
                  }`}
                >
                  {tag === 'all' ? 'সকল বিষয়' : `#${tag}`}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Main Articles List */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10">
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm text-[var(--text-muted)]">
            মোট প্রবন্ধ: <b className="text-white">{toBengaliNumber(filteredArticles.length)}</b> টি
          </div>
        </div>

        {loading ? (
          <div className="py-20 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-sky-500 border-t-transparent" />
            <p className="mt-2 text-xs text-[var(--text-muted)]">প্রবন্ধ লোড হচ্ছে...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentArticles.map((article) => (
              <Link
                key={article.id}
                href={`/articles/${article.slug}`}
                className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 hover:border-sky-500/40 hover:bg-[var(--bg-card-hover)] transition-all flex flex-col justify-between group shadow-sm"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs font-medium text-sky-400 mb-3">
                    <span className="rounded-md bg-sky-500/10 px-2 py-0.5 border border-sky-500/20">
                      {article.category?.name_bn || 'কুরআনিক'}
                    </span>
                    <span>•</span>
                    <span className="text-[var(--text-muted)] flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(article.published_at).toLocaleDateString('bn-BD')}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-sky-400 transition-colors line-clamp-2 leading-snug">
                    {article.title_bn}
                  </h3>

                  <p className="mt-2.5 text-xs text-[var(--text-muted)] line-clamp-3 leading-relaxed">
                    {article.excerpt_bn}
                  </p>

                  {article.tags && article.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1">
                      {article.tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="text-[10px] text-neutral-400 bg-white/5 px-2 py-0.5 rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-5 pt-4 border-t border-[var(--border-color)]/50 flex items-center justify-between text-xs text-[var(--text-muted)]">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-[10px] font-bold text-emerald-400">
                      আ
                    </div>
                    <span>{article.author?.name_bn || 'আলম এম.'}</span>
                  </div>

                  <span className="font-semibold text-sky-400 group-hover:underline flex items-center gap-1">
                    সম্পূর্ণ পড়ুন
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2 text-xs">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] px-3 py-1.5 text-[var(--text-muted)] disabled:opacity-40"
            >
              পূর্ববর্তী
            </button>
            <span className="text-[var(--text-muted)] px-3">
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
      </div>
    </div>
  );
};
