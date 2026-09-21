import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { User, FileText, ExternalLink, Award, BookOpen, Sparkles } from 'lucide-react';
import { toBengaliNumber } from '../utils/bengaliNumerals';
import { Article } from '../types/quran';

export const AuthorsPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetch('/data/articles.json')
      .then((res) => res.json())
      .then((data) => setArticles(data))
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <section className="border-b border-[var(--border-color)] bg-[var(--bg-card)]/50 pt-10 pb-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1 text-xs font-medium text-emerald-400 mb-4">
            <User className="h-4 w-4" />
            <span>লেখক ও গবেষকবৃন্দ</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            লেখক ও গবেষকবৃন্দ
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[var(--text-muted)] max-w-2xl mx-auto">
            কুরআন অন্বেষা প্ল্যাটফর্মের গবেষণা, অনুবাদ পর্যালোচনা ও প্রবন্ধ সংকলক পরিচিতি।
          </p>
        </div>
      </section>

      {/* Author Profile */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 pt-12">
        <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 sm:p-10 shadow-xl">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
            <div className="h-28 w-28 shrink-0 rounded-3xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-bold text-4xl shadow-2xl">
              আ
            </div>

            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">
                    আলম এম. (Alam M)
                  </h2>
                  <p className="text-xs text-emerald-400 font-medium mt-0.5">
                    কুরআন গবেষক, বিশ্লেষক ও ডিজাইনার
                  </p>
                </div>

                <a
                  href="https://www.upwork.com/freelancers/~01e6f18d96f1c7294f"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-500 transition-colors shadow-md"
                >
                  <span>Upwork প্রোফাইল</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>

              {/* Bio */}
              <div className="space-y-3 text-sm sm:text-base text-neutral-200 leading-relaxed">
                <p>
                  “কুরআনের শব্দ ও সংখ্যা গভীর চিন্তার আহ্বান জানায়। আমি সেই চিহ্নগুলো অনুসরণ করি। আমি আলম, পাঠ্যের কাছে নম্র, বিশ্লেষণে কঠোর। লিখি নিজের বোধ থেকে; চূড়ান্ত জ্ঞান একমাত্র আল্লাহর কাছে।”
                </p>
                <p className="text-xs text-[var(--text-muted)] italic">
                  “The Quran’s words and numbers invite deep thought. I trace those traces. I'm Alam, humble before the text, rigorous in analysis. I write from my understanding; only ALLAH knows best.”
                </p>
              </div>

              {/* Stats */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-[var(--border-color)]">
                <div className="rounded-2xl bg-[var(--bg-main)] p-4 text-center">
                  <div className="text-2xl font-bold text-emerald-400">
                    {toBengaliNumber(articles.length || 257)}
                  </div>
                  <div className="text-xs text-[var(--text-muted)] mt-1">গবেষণামূলক প্রবন্ধ</div>
                </div>
                <div className="rounded-2xl bg-[var(--bg-main)] p-4 text-center">
                  <div className="text-2xl font-bold text-teal-400">
                    {toBengaliNumber(114)}
                  </div>
                  <div className="text-xs text-[var(--text-muted)] mt-1">৪:৮২ লজিক্যাল ফ্রেমওয়ার্ক</div>
                </div>
                <div className="rounded-2xl bg-[var(--bg-main)] p-4 text-center col-span-2 sm:col-span-1">
                  <div className="text-2xl font-bold text-sky-400">
                    {toBengaliNumber(1642)}
                  </div>
                  <div className="text-xs text-[var(--text-muted)] mt-1">শব্দমূল বিশ্লেষণ</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Author Articles Preview */}
        {articles.length > 0 && (
          <div className="mt-12">
            <h3 className="text-xl font-bold text-white mb-6">
              লেখকের সাম্প্রতিক প্রবন্ধসমূহ
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {articles.slice(0, 6).map((a) => (
                <Link
                  key={a.id}
                  href={`/articles/${a.slug}`}
                  className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-5 hover:border-emerald-500/40 hover:bg-[var(--bg-card-hover)] transition-all flex flex-col justify-between group shadow-sm"
                >
                  <h4 className="font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-2 text-sm leading-snug">
                    {a.title_bn}
                  </h4>
                  <div className="mt-3 text-xs text-[var(--text-muted)] flex items-center justify-between">
                    <span>{new Date(a.published_at).toLocaleDateString('bn-BD')}</span>
                    <span className="text-emerald-400 font-semibold group-hover:underline">পড়ুন →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
