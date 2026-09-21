import React from 'react';
import { BookOpen, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';

export const ReadmePage: React.FC = () => {
  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <section className="border-b border-[var(--border-color)] bg-[var(--bg-card)]/50 pt-10 pb-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1 text-xs font-medium text-emerald-400 mb-4">
            <BookOpen className="h-4 w-4" />
            <span>অন্বেষা নীতি ও ম্যানিফেস্টো</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            অন্বেষা (Readme) — অনুবাদ ও গবেষণা নীতি
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[var(--text-muted)] max-w-2xl mx-auto">
            কুরআন অন্বেষার অনুবাদ পদ্ধতি, গবেষণা নীতি এবং ৪:৮২ আয়াতের যৌক্তিক রূপরেখা।
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 pt-12 space-y-8 text-neutral-200 text-sm sm:text-base leading-relaxed">
        <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-white">১. অনুবাদ আমাদের প্রয়াস, কুরআনই আমাদের মানদণ্ড</h2>
          <p>
            যেকোনো অনুবাদ মানবীয় প্রচেষ্টার ফল এবং তা কখনোই নির্ভুলতার দাবি করতে পারে না। মূল আরবি পাঠ্যই একমাত্র ঐশী ও অপরিবর্তনীয় মানদণ্ড। আমরা প্রচলিত অনুবাদগুলোকে অন্ধভাবে অনুসরণ করার বদলে মূল শব্দতত্ত্ব (Lexicography) ও প্রসঙ্গভিত্তিক অর্থকে প্রাধান্য দিয়েছি।
          </p>
        </div>

        <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-white">২. অভ্যন্তরীণ সামঞ্জস্য (Internal Consistency)</h2>
          <p>
            কুরআনের যেকোনো আয়াতের অর্থ নির্ধারণে আমরা সূরা আন-নিসা (৪:৮২) এর মূলভাবকে মূল চালিকাশক্তি হিসেবে গ্রহণ করি। যদি কোনো ব্যাখ্যার ফলে কুরআনের এক আয়াতের সাথে অন্য আয়াতের সংঘর্ষ বা বৈপরীত্য সৃষ্টি হয়, তবে বুঝতে হবে আমাদের বোঝার মধ্যে ত্রুটি রয়েছে।
          </p>
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-emerald-300 text-xs">
            💡 “যদি কোনো অনুবাদ কুরআনের ৪:৮২ আয়াতের মূলভাবের সঙ্গে সাংঘর্ষিক হয়, তাহলে সেই অনুবাদ গ্রহণযোগ্য বলে বিবেচিত হবে না।”
          </div>
        </div>

        <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-white">৩. উন্মুক্ত ও চলমান সংশোধন প্রক্রিয়া</h2>
          <p>
            আধুনিক ও বিজ্ঞানভিত্তিক এই অনুবাদগুলোর কাজ এখনও চলমান। পরিমার্জন, সংশোধন ও উন্নতির এই প্রক্রিয়া ভবিষ্যতেও অব্যাহত থাকবে। জ্ঞানভিত্তিক, যুক্তিগ্রাহ্য ও চিন্তাশীল যেকোনো পরামর্শ আমরা সবসময়ই সাদরে গ্রহণ করি।
          </p>
        </div>
      </div>
    </div>
  );
};
