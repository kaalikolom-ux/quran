import React from 'react';
import { Link } from 'wouter';
import { Info, BookOpen, Compass, Sparkles, CheckCircle2, Heart } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <section className="border-b border-[var(--border-color)] bg-[var(--bg-card)]/50 pt-10 pb-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1 text-xs font-medium text-emerald-400 mb-4">
            <Info className="h-4 w-4" />
            <span>পরিচিতি ও লক্ষ্য</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            কুরআন অন্বেষা (Quran Explorer) সম্পর্কে
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[var(--text-muted)] max-w-2xl mx-auto">
            কুরআনকে কুরআনের ভাষায় — শব্দে শব্দে বাংলা অর্থ, ব্যাকরণগত ব্যুৎপত্তি ও আধুনিক বিজ্ঞানভিত্তিক গবেষণাসহ পবিত্র কুরআন অধ্যয়নের একটি অলাভজনক ও উন্মুক্ত প্ল্যাটফর্ম।
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 pt-12 space-y-8 text-neutral-200 text-sm sm:text-base leading-relaxed">
        <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-white">আমাদের উদ্দেশ্য ও দর্শন</h2>
          <p>
            কুরআন অন্বেষা একটি স্বাধীন, অলাভজনক এবং শিক্ষামূলক উদ্যোগ। এর মূল লক্ষ্য হলো আরবি না জানা সাধারণ বাংলাভাষী পাঠকদের কাছে কুরআনের প্রতিটি একক শব্দের মূল অর্থ, ব্যাকরণগত রূপ এবং সমগ্র আয়াতের ভাবানুবাদ অত্যন্ত সহজ, সাবলীল এবং নির্ভরযোগ্যভাবে উপস্থাপন করা।
          </p>
          <p>
            আমরা বিশ্বাস করি, কুরআন অধ্যয়নের ক্ষেত্রে কোনো ব্যক্তি বা দলের মতামত চূড়ান্ত নয়; বরং <b>কুরআন নিজেই কুরআনের মানদণ্ড</b>।
          </p>
        </div>

        <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-white">৪:৮২ লজিক্যাল ফ্রেমওয়ার্ক</h2>
          <div className="p-4 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] font-arabic text-emerald-400 text-lg text-right">
            أَفَلَا يَتَدَبَّرُونَ الْقُرْآنَ ۚ وَلَوْ كَانَ مِنْ عِندِ غَيْرِ اللَّهِ لَوَجَدُوا فِيهِ اخْتِلَافًا كَثِيرًا
          </div>
          <p className="italic text-xs sm:text-sm text-[var(--text-muted)]">
            “তারা কি কুরআন নিয়ে চিন্তা করে না? যদি এটা আল্লাহ ছাড়া অন্য কারও পক্ষ থেকে হতো, তবে এতে অনেক বৈপরীত্য থাকত।” — ৪:৮২
          </p>
          <p>
            আমাদের অনুবাদ ও শব্দ বিশ্লেষণের ভিত্তি হলো ৪:৮২ আয়াতের অভ্যন্তরীণ সামঞ্জস্য ও যৌক্তিক বৈপরীত্যহীনতা। যদি কোনো অনুবাদ কুরআনের সার্বিক বক্তব্যের সাথে বৈপরীত্য সৃষ্টি করে, তবে সেই অনুবাদ গ্রহণযোগ্য নয় বলে বিবেচিত হবে।
          </p>
        </div>

        <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-white">প্রধান বৈশিষ্ট্যসমূহ</h2>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
              <span><b>শব্দে শব্দে অর্থ:</b> কুরআনের প্রতিটি শব্দের বাংলা ও ইংরেজি অনুবাদ এবং ব্যুৎপত্তি।</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
              <span><b>কুরআনিক অভিধান:</b> ১,৬৪২টি মূলশব্দ (Roots), তাদের কুরআনিক ব্যবহার ও পরিসংখ্যান।</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
              <span><b>রিয়েল-টাইম অডিও সিঙ্ক:</b> অডিও তেলাওয়াতের সাথে শব্দের হাইলাইটিং।</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
              <span><b>গবেষণামূলক প্রবন্ধ:</b> সৃষ্টিতত্ত্ব, বিজ্ঞান ও শব্দতত্ত্ব সম্পর্কিত শত শত গবেষণা নিবন্ধ।</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
