import React, { useState } from 'react';
import { Link } from 'wouter';
import { Mail, CheckCircle2, Heart, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail('');
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <footer className="w-full border-t border-[var(--border-color)] bg-[var(--bg-card)]/50 pt-12 pb-16 text-sm text-[var(--text-muted)] transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Section: Brand + Newsletter */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 pb-12 border-b border-[var(--border-color)]">
          <div className="lg:col-span-5 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white font-arabic font-bold text-lg">
                ق
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                শব্দে শব্দে কুরআন অন্বেষা
              </span>
            </Link>
            <p className="text-[var(--text-muted)] leading-relaxed max-w-md">
              কুরআনকে কুরআনের ভাষায় — অনুবাদ আমাদের প্রয়াস, কুরআনই আমাদের মানদণ্ড।
              কুরআনের প্রতিটি শব্দের ব্যাকরণগত ব্যুৎপত্তি, শাব্দিক ও ভাবানুবাদ একই পাতায়।
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-main)] p-6 shadow-sm">
              <h4 className="text-base font-semibold text-white mb-1">
                নিউজলেটার সাবস্ক্রাইব করুন
              </h4>
              <p className="text-xs text-[var(--text-muted)] mb-4">
                নতুন আর্টিকেল এবং বিজ্ঞানভিত্তিক অনুবাদের আপডেট সরাসরি ইমেইলে পান।
              </p>
              {submitted ? (
                <div className="flex items-center gap-2 text-sm text-emerald-400 font-medium py-2">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>ধন্যবাদ! আপনি সফলভাবে সাবস্ক্রাইব করেছেন।</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="আপনার ইমেইল এড্রেস লিখুন..."
                      required
                      className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] pl-10 pr-4 py-2 text-sm text-white placeholder:text-neutral-500 focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="rounded-lg bg-emerald-600 px-5 py-2 text-sm font-medium text-white hover:bg-emerald-500 transition-colors shadow-sm"
                  >
                    সাবস্ক্রাইব করুন
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 py-8">
          <div>
            <h5 className="font-semibold text-white mb-3 text-xs uppercase tracking-wider">কুরআন</h5>
            <ul className="space-y-2">
              <li><Link href="/surah/1" className="hover:text-emerald-400 transition-colors">কুরআন পড়ুন</Link></li>
              <li><Link href="/lexicon" className="hover:text-emerald-400 transition-colors">কুরআনিক অভিধান</Link></li>
              <li><Link href="/bookmarks" className="hover:text-emerald-400 transition-colors">সংরক্ষিত বুকমার্ক</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-white mb-3 text-xs uppercase tracking-wider">গবেষণা</h5>
            <ul className="space-y-2">
              <li><Link href="/articles" className="hover:text-emerald-400 transition-colors">সকল আর্টিকেল</Link></li>
              <li><Link href="/authors" className="hover:text-emerald-400 transition-colors">লেখকবৃন্দ</Link></li>
              <li><Link href="/readme" className="hover:text-emerald-400 transition-colors">অন্বেষা (Readme)</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-white mb-3 text-xs uppercase tracking-wider">প্ল্যাটফর্ম</h5>
            <ul className="space-y-2">
              <li><Link href="/download" className="hover:text-emerald-400 transition-colors">অ্যান্ড্রয়েড অ্যাপ (APK)</Link></li>
              <li><Link href="/settings" className="hover:text-emerald-400 transition-colors">সেটিংস ও পছন্দ</Link></li>
              <li><Link href="/about" className="hover:text-emerald-400 transition-colors">আমাদের সম্পর্কে</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-white mb-3 text-xs uppercase tracking-wider">যোগাযোগ ও আইনি</h5>
            <ul className="space-y-2">
              <li><Link href="/contact" className="hover:text-emerald-400 transition-colors">যোগাযোগ করুন</Link></li>
              <li><Link href="/privacy" className="hover:text-emerald-400 transition-colors">প্রাইভেসি পলিসি</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Designer Credit */}
        <div className="border-t border-[var(--border-color)] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2026 Qur'an Explorer — সর্বস্বত্ব সংরক্ষিত।</p>
          <div className="flex items-center gap-1.5 text-[var(--text-muted)]">
            <span>Designed by</span>
            <a
              href="https://www.upwork.com/freelancers/~01e6f18d96f1c7294f"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1"
            >
              Alam M
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
