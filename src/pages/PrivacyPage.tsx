import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <section className="border-b border-[var(--border-color)] bg-[var(--bg-card)]/50 pt-10 pb-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1 text-xs font-medium text-emerald-400 mb-4">
            <ShieldCheck className="h-4 w-4" />
            <span>গোপনীয়তা ও নিরাপত্তা নীতি</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            প্রাইভেসি পলিসি (Privacy Policy)
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[var(--text-muted)] max-w-2xl mx-auto">
            কুরআন অন্বেষা ব্যবহারকারীদের তথ্যের গোপনীয়তা ও সুরক্ষা নিশ্চিত করতে অঙ্গীকারাবদ্ধ।
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 pt-12 space-y-8 text-neutral-200 text-sm sm:text-base leading-relaxed">
        <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-white">তথ্য সংগ্রহ ও ব্যবহার</h2>
          <p>
            কুরআন অন্বেষা একটি সম্পূর্ণ উন্মুক্ত ও শিক্ষামূলক প্ল্যাটফর্ম। সাধারণ ব্যবহারের জন্য কোনো একাউন্ট তৈরি বা ব্যক্তিগত তথ্য প্রদানের বাধ্যবাধকতা নেই। আপনার সংরক্ষিত বুকমার্ক ও পড়ার পছন্দসমূহ সম্পূর্ণভাবে আপনার ব্রাউজারের লোকাল স্টোরেজে (Local Storage) সংরক্ষিত থাকে এবং আমাদের সার্ভারে পাঠানো হয় না।
          </p>
        </div>

        <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-white">কুকিজ ও লোকাল স্টোরেজ</h2>
          <p>
            আমরা শুধুমাত্র আপনার থিম মোড (ডার্ক/লাইট), ফন্ট সাইজ এবং বুকমার্ক সংরক্ষণ করতে ব্রাউজার লোকাল স্টোরেজ ব্যবহার করি। কোনো বাণিজ্যিক বিজ্ঞাপন বা ট্র্যাকিং কুকিজ ব্যবহার করা হয় না।
          </p>
        </div>
      </div>
    </div>
  );
};
