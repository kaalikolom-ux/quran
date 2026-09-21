import React from 'react';
import { Download, Smartphone, Globe, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export const DownloadPage: React.FC = () => {
  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <section className="border-b border-[var(--border-color)] bg-[var(--bg-card)]/50 pt-10 pb-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1 text-xs font-medium text-emerald-400 mb-4">
            <Smartphone className="h-4 w-4" />
            <span>অ্যান্ড্রয়েড অ্যাপ ও অফলাইন সংস্করণ</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            অ্যাপ ডাউনলোড ও অফলাইন ব্যবহার
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[var(--text-muted)] max-w-2xl mx-auto">
            কুরআন অন্বেষা সবসময় সাথে রাখুন। সরাসরি অ্যান্ড্রয়েড APK ডাউনলোড করুন অথবা PWA হিসেবে যেকোনো ডিভাইসে ইনস্টল করুন।
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 pt-12 space-y-8">
        {/* Android APK Card */}
        <div className="rounded-3xl border border-emerald-500/30 bg-[var(--bg-card)] p-8 shadow-xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="h-20 w-20 shrink-0 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Smartphone className="h-10 w-10" />
            </div>

            <div className="flex-1 text-center sm:text-left space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h2 className="text-2xl font-bold text-white">
                  কুরআন অন্বেষা — Android APK
                </h2>
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
                  Version 3.0.1
                </span>
              </div>

              <p className="text-sm text-[var(--text-muted)]">
                অফলাইন শব্দে শব্দে অর্থ, সম্পূর্ণ কুরআন ও অডিও প্লেয়ার সুবিধা সংবলিত অফিসিয়াল অ্যান্ড্রয়েড অ্যাপ্লিকেশন।
              </p>

              <div className="pt-2">
                <a
                  href="/download"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('APK ডাউনলোড প্রক্রিয়া সম্পন্ন হচ্ছে। শীঘ্রই প্লে-স্টোরে পাওয়া যাবে।');
                  }}
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-950/40"
                >
                  <Download className="h-4 w-4" />
                  <span>সরাসরি APK ডাউনলোড করুন</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* PWA Install Guide */}
        <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-teal-500/10 text-teal-400">
              <Globe className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">PWA হিসেবে ব্যবহার করুন (সকল ডিভাইসে)</h3>
              <p className="text-xs text-[var(--text-muted)]">Chrome, Safari বা Edge ব্রাউজার থেকে সরাসরি ইনস্টল করুন</p>
            </div>
          </div>

          <div className="space-y-2 text-sm text-neutral-300 pt-2">
            <p>১. আপনার ব্রাউজারের থ্রি-ডট (⋮) বা শেয়ার মেনুতে ক্লিক করুন।</p>
            <p>২. <b>"Add to Home screen"</b> বা <b>"Install App"</b> অপশন নির্বাচন করুন।</p>
            <p>৩. এরপর ইন্টারনেট ছাড়াও সরাসরি অ্যাপের মতো ব্যবহার করতে পারবেন।</p>
          </div>
        </div>
      </div>
    </div>
  );
};
