import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { ArrowLeft, Calendar, Tag, Share2, Check, ExternalLink, User } from 'lucide-react';
import { toBengaliNumber } from '../utils/bengaliNumerals';
import { Article } from '../types/quran';

interface ArticleDetailPageProps {
  slug: string;
}

export const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({ slug }) => {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch('/data/articles.json')
      .then((res) => res.json())
      .then((data: Article[]) => {
        const found = data.find((a) => a.slug === slug);
        setArticle(found || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-sky-500 border-t-transparent" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-8 text-center max-w-md">
          <h2 className="text-xl font-bold text-white mb-2">আর্টিকেল পাওয়া যায়নি</h2>
          <p className="text-xs text-[var(--text-muted)] mb-4">অনুগ্রহ করে আর্টিকেলের লিঙ্কটি পুনরায় যাচাই করুন।</p>
          <Link href="/articles" className="inline-flex rounded-lg bg-sky-600 px-4 py-2 text-xs font-semibold text-white">
            সকল আর্টিকেলে ফিরে যান
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24">
      {/* Back button bar */}
      <div className="border-b border-[var(--border-color)] bg-[var(--bg-card)]/40 py-3">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <Link
            href="/articles"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--text-muted)] hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>সকল আর্টিকেলে ফিরে যান</span>
          </Link>
        </div>
      </div>

      <article className="mx-auto max-w-4xl px-4 sm:px-6 pt-10">
        {/* Article Header */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-sky-400">
            <span className="rounded-md bg-sky-500/10 px-2.5 py-0.5 border border-sky-500/20">
              {article.category?.name_bn || 'কুরআনিক'}
            </span>
            <span>•</span>
            <span className="text-[var(--text-muted)] flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {new Date(article.published_at).toLocaleDateString('bn-BD', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
            {article.title_bn}
          </h1>

          {article.title_en && (
            <h2 className="text-base sm:text-lg text-neutral-400 italic">
              {article.title_en}
            </h2>
          )}

          {/* Excerpt callout */}
          <div className="p-4 sm:p-5 rounded-2xl bg-sky-950/20 border border-sky-500/20 text-sky-200 text-sm leading-relaxed">
            <span className="font-bold">সারসংক্ষেপ: </span>
            {article.excerpt_bn}
          </div>

          {/* Share & Actions */}
          <div className="flex items-center justify-between py-3 border-y border-[var(--border-color)]">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs font-bold text-emerald-400">
                আ
              </div>
              <div>
                <div className="text-xs font-semibold text-white">{article.author?.name_bn || 'আলম এম.'}</div>
                <div className="text-[10px] text-[var(--text-muted)]">গবেষক ও বিশ্লেষক</div>
              </div>
            </div>

            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] px-3 py-1.5 text-xs text-white hover:border-sky-500/50 transition-colors"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Share2 className="h-3.5 w-3.5" />}
              <span>{copied ? 'লিঙ্ক কপি হয়েছে' : 'শেয়ার করুন'}</span>
            </button>
          </div>
        </div>

        {/* Article Body */}
        <div className="mt-8 text-neutral-200 text-sm sm:text-base leading-relaxed space-y-6">
          <p className="leading-loose whitespace-pre-line">
            {article.content_bn || article.excerpt_bn}
          </p>

          <div className="p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] mt-8">
            <div className="font-arabic text-xl text-emerald-400 mb-2 text-right">
              أَفَلَا يَتَدَبَّرُونَ الْقُرْآنَ ۚ وَلَوْ كَانَ مِنْ عِندِ غَيْرِ اللَّهِ لَوَجَدُوا فِيهِ اخْتِلَافًا كَثِيرًا
            </div>
            <p className="text-xs sm:text-sm text-neutral-300 italic">
              “তারা কি কুরআন নিয়ে গভীর চিন্তা (তাদাব্বুর) করে না? যদি এটা আল্লাহ ছাড়া অন্য কারও পক্ষ থেকে হতো, তবে তারা এতে অনেক বৈপরীত্য পেত।” — সূরা আন-নিসা, ৪:৮২
            </p>
          </div>
        </div>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="mt-10 pt-6 border-t border-[var(--border-color)]">
            <div className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-3">
              ট্যাগসমূহ
            </div>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, i) => (
                <span key={i} className="rounded-lg bg-white/5 border border-[var(--border-color)] px-3 py-1 text-xs text-neutral-300">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Author Bio Card */}
        <div className="mt-12 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <div className="h-16 w-16 shrink-0 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
            আ
          </div>
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <h3 className="text-lg font-bold text-white">
                {article.author?.name_bn || 'আলম এম.'} ({article.author?.name_en || 'Alam M'})
              </h3>
              <a
                href="https://www.upwork.com/freelancers/~01e6f18d96f1c7294f"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-emerald-400 hover:underline mx-auto sm:mx-0"
              >
                Upwork প্রোফাইল
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
              {article.author?.bio_bn || 'কুরআনের শব্দ ও সংখ্যা গভীর চিন্তার আহ্বান জানায়। আমি সেই চিহ্নগুলো অনুসরণ করি। আমি আলম, পাঠ্যের কাছে নম্র, বিশ্লেষণে কঠোর। লিখি নিজের বোধ থেকে; চূড়ান্ত জ্ঞান একমাত্র আল্লাহর কাছে।'}
            </p>
          </div>
        </div>
      </article>
    </div>
  );
};
