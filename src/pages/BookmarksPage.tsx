import React from 'react';
import { Link } from 'wouter';
import { Bookmark, Trash2, BookOpen, ArrowRight, ExternalLink } from 'lucide-react';
import { usePreferences } from '../context/PreferencesContext';
import { toBengaliNumber } from '../utils/bengaliNumerals';

export const BookmarksPage: React.FC = () => {
  const { bookmarks, removeBookmark } = usePreferences();

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <section className="border-b border-[var(--border-color)] bg-[var(--bg-card)]/50 pt-10 pb-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3.5 py-1 text-xs font-medium text-amber-400 mb-4">
            <Bookmark className="h-4 w-4" />
            <span>সংরক্ষিত আয়াতসমূহ</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            বুকমার্ক ও সংরক্ষিত আয়াত
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[var(--text-muted)] max-w-2xl mx-auto">
            আপনার পরবর্তীতে পড়ার জন্য পছন্দের আয়াতসমূহ এখানে সংরক্ষিত থাকে।
          </p>
        </div>
      </section>

      {/* Main List */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 pt-10">
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm text-[var(--text-muted)]">
            মোট সংরক্ষিত আয়াত: <b className="text-white">{toBengaliNumber(bookmarks.length)}</b> টি
          </div>
        </div>

        {bookmarks.length === 0 ? (
          <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] p-12 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400 mb-4">
              <Bookmark className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">এখনও কোনো আয়াত সংরক্ষিত করা হয়নি</h3>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-md mx-auto mb-6">
              যেকোনো সূরা পড়ার সময় আয়াতের পাশের বুকমার্ক আইকনটিতে ক্লিক করে প্রিয় আয়াতগুলো এখানে সংরক্ষণ করতে পারেন।
            </p>
            <Link
              href="/surah/1"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-emerald-500 transition-colors shadow-md"
            >
              <BookOpen className="h-4 w-4" />
              <span>কুরআন পড়া শুরু করুন</span>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {bookmarks.map((bm) => (
              <div
                key={bm.id}
                className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 hover:border-amber-500/40 transition-all shadow-sm flex flex-col justify-between group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="rounded-lg bg-emerald-500/15 text-emerald-400 px-2.5 py-0.5 text-xs font-bold">
                        {bm.surahNameBn}
                      </span>
                      <span className="text-xs text-[var(--text-muted)]">
                        আয়াত {toBengaliNumber(bm.ayah)}
                      </span>
                    </div>

                    <div className="font-arabic text-xl sm:text-2xl text-white my-3 leading-relaxed text-right">
                      {bm.textArabic}
                    </div>

                    <p className="text-sm text-neutral-200 leading-relaxed">
                      {bm.translationBn}
                    </p>
                  </div>

                  <button
                    onClick={() => removeBookmark(bm.id)}
                    className="p-2 rounded-lg text-[var(--text-muted)] hover:text-red-400 hover:bg-red-500/10 transition-colors"
                    title="বুকমার্ক মুছুন"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-4 pt-4 border-t border-[var(--border-color)]/50 flex items-center justify-between text-xs text-[var(--text-muted)]">
                  <span>সংরক্ষিত: {new Date(bm.createdAt).toLocaleDateString('bn-BD')}</span>
                  <Link
                    href={`/surah/${bm.surah}#ayah-${bm.ayah}`}
                    className="font-semibold text-emerald-400 group-hover:underline flex items-center gap-1"
                  >
                    আয়াতে যান
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
