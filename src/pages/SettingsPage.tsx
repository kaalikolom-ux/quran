import React from 'react';
import { Settings, Moon, Sun, Coffee, Eye, Type, Volume2, RotateCcw } from 'lucide-react';
import { usePreferences } from '../context/PreferencesContext';
import { toBengaliNumber } from '../utils/bengaliNumerals';
import { ThemeMode } from '../types/quran';

export const SettingsPage: React.FC = () => {
  const { prefs, updatePrefs } = usePreferences();

  const themes: { id: ThemeMode; label: string; icon: any; color: string }[] = [
    { id: 'dark', label: 'ডার্ক (Dark)', icon: Moon, color: 'bg-[#061317] text-sky-400' },
    { id: 'sepia', label: 'সেপিয়া (Sepia)', icon: Coffee, color: 'bg-[#231d16] text-amber-500' },
    { id: 'slate', label: 'স্লেট (Slate)', icon: Moon, color: 'bg-[#0f172a] text-indigo-400' },
    { id: 'light', label: 'লাইট (Light)', icon: Sun, color: 'bg-[#f8fafc] text-amber-400' },
  ];

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <section className="border-b border-[var(--border-color)] bg-[var(--bg-card)]/50 pt-10 pb-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3.5 py-1 text-xs font-medium text-amber-400 mb-4">
            <Settings className="h-4 w-4" />
            <span>অ্যাপ্লিকেশন সেটিংস ও পাঠক পছন্দ</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            সেটিংস ও পছন্দসমূহ
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[var(--text-muted)] max-w-2xl mx-auto">
            আপনার সুবিধা অনুযায়ী থিম, ফন্ট সাইজ, অনুবাদ ও রিডিং মোড কাস্টমাইজ করুন।
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 pt-10 space-y-8">
        {/* 1. Theme Mode */}
        <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 shadow-sm">
          <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
            <Moon className="h-4 w-4 text-emerald-400" />
            থিম নির্বাচন করুন
          </h3>
          <p className="text-xs text-[var(--text-muted)] mb-4">
            আপনার চোখের আরাম অনুযায়ী পছন্দের রিডিং থিম বেছে নিন।
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {themes.map((t) => {
              const Icon = t.icon;
              const isSelected = prefs.themeMode === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => updatePrefs({ themeMode: t.id })}
                  className={`flex flex-col items-center gap-2.5 p-4 rounded-2xl border transition-all ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-500/10 ring-2 ring-emerald-500/30'
                      : 'border-[var(--border-color)] bg-[var(--bg-main)] hover:border-emerald-500/40'
                  }`}
                >
                  <div className={`p-3 rounded-xl ${t.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-semibold text-white">{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Font Size Customization */}
        <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 shadow-sm space-y-6">
          <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
            <Type className="h-4 w-4 text-teal-400" />
            ফন্ট সাইজ কাস্টমাইজেশন
          </h3>

          {/* Arabic font size */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-white">আরবি ফন্ট সাইজ</span>
              <span className="text-emerald-400 font-mono font-bold">
                {toBengaliNumber(prefs.arabicFontSize)} px
              </span>
            </div>
            <input
              type="range"
              min={20}
              max={44}
              value={prefs.arabicFontSize}
              onChange={(e) => updatePrefs({ arabicFontSize: parseInt(e.target.value, 10) })}
              className="w-full accent-emerald-500 h-1.5 bg-[var(--border-color)] rounded-lg cursor-pointer"
            />
            <div className="p-3 rounded-xl bg-[var(--bg-main)] text-right font-arabic text-white" style={{ fontSize: `${prefs.arabicFontSize}px` }}>
              بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
            </div>
          </div>

          {/* Bangla font size */}
          <div className="space-y-2 pt-2 border-t border-[var(--border-color)]/50">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-white">বাংলা ফন্ট সাইজ</span>
              <span className="text-teal-400 font-mono font-bold">
                {toBengaliNumber(prefs.banglaFontSize)} px
              </span>
            </div>
            <input
              type="range"
              min={14}
              max={26}
              value={prefs.banglaFontSize}
              onChange={(e) => updatePrefs({ banglaFontSize: parseInt(e.target.value, 10) })}
              className="w-full accent-teal-500 h-1.5 bg-[var(--border-color)] rounded-lg cursor-pointer"
            />
            <div className="p-3 rounded-xl bg-[var(--bg-main)] text-white" style={{ fontSize: `${prefs.banglaFontSize}px` }}>
              (আরম্ভ করছি) পরম করুণাময় অসীম দয়াময় আল্লাহর নামে।
            </div>
          </div>

          {/* English font size */}
          <div className="space-y-2 pt-2 border-t border-[var(--border-color)]/50">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-white">ইংরেজি ফন্ট সাইজ</span>
              <span className="text-sky-400 font-mono font-bold">
                {toBengaliNumber(prefs.englishFontSize)} px
              </span>
            </div>
            <input
              type="range"
              min={12}
              max={22}
              value={prefs.englishFontSize}
              onChange={(e) => updatePrefs({ englishFontSize: parseInt(e.target.value, 10) })}
              className="w-full accent-sky-500 h-1.5 bg-[var(--border-color)] rounded-lg cursor-pointer"
            />
            <div className="p-3 rounded-xl bg-[var(--bg-main)] text-neutral-300 italic" style={{ fontSize: `${prefs.englishFontSize}px` }}>
              In the name of Allah, the Entirely Merciful, the Especially Merciful.
            </div>
          </div>
        </div>

        {/* 3. Display Toggles */}
        <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
            <Eye className="h-4 w-4 text-sky-400" />
            ডিসপ্লে ও রিডিং অপশন
          </h3>

          <div className="space-y-3 divide-y divide-[var(--border-color)]/50">
            <label className="flex items-center justify-between pt-3 cursor-pointer">
              <div>
                <div className="text-sm font-semibold text-white">শব্দে শব্দে অর্থ (Word by Word)</div>
                <div className="text-xs text-[var(--text-muted)]">প্রতিটি শব্দের অর্থ ও ব্যাকরণ আলাদাভাবে প্রদর্শন</div>
              </div>
              <input
                type="checkbox"
                checked={prefs.showWordByWord}
                onChange={(e) => updatePrefs({ showWordByWord: e.target.checked })}
                className="h-5 w-5 rounded accent-emerald-500 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between pt-3 cursor-pointer">
              <div>
                <div className="text-sm font-semibold text-white">উচ্চারণ (Transliteration)</div>
                <div className="text-xs text-[var(--text-muted)]">শব্দের ইংরেজি লিপ্যন্তর প্রদর্শন</div>
              </div>
              <input
                type="checkbox"
                checked={prefs.showTransliteration}
                onChange={(e) => updatePrefs({ showTransliteration: e.target.checked })}
                className="h-5 w-5 rounded accent-emerald-500 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between pt-3 cursor-pointer">
              <div>
                <div className="text-sm font-semibold text-white">বাংলা অনুবাদ</div>
                <div className="text-xs text-[var(--text-muted)]">আয়াতের পূর্ণাঙ্গ বাংলা ভাবানুবাদ প্রদর্শন</div>
              </div>
              <input
                type="checkbox"
                checked={prefs.showBanglaTranslation}
                onChange={(e) => updatePrefs({ showBanglaTranslation: e.target.checked })}
                className="h-5 w-5 rounded accent-emerald-500 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between pt-3 cursor-pointer">
              <div>
                <div className="text-sm font-semibold text-white">ইংরেজি অনুবাদ</div>
                <div className="text-xs text-[var(--text-muted)]">Sahih International অনুবাদ প্রদর্শন</div>
              </div>
              <input
                type="checkbox"
                checked={prefs.showEnglishTranslation}
                onChange={(e) => updatePrefs({ showEnglishTranslation: e.target.checked })}
                className="h-5 w-5 rounded accent-emerald-500 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between pt-3 cursor-pointer">
              <div>
                <div className="text-sm font-semibold text-white">৪:৮২ যৌক্তিক সামঞ্জস্য পর্যালোচনা</div>
                <div className="text-xs text-[var(--text-muted)]">সূরার শুরুতে সিস্টেমিক ও লজিক্যাল কনসিস্টেন্সি ফ্রেমওয়ার্ক প্রদর্শন</div>
              </div>
              <input
                type="checkbox"
                checked={prefs.showLogicalConsistency}
                onChange={(e) => updatePrefs({ showLogicalConsistency: e.target.checked })}
                className="h-5 w-5 rounded accent-emerald-500 cursor-pointer"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
