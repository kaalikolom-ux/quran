import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Search, BookOpen, Bookmark, FileText, Settings, Download, Info, Menu, X, Moon, Sun, Coffee, BookMarked, User } from 'lucide-react';
import { usePreferences } from '../../context/PreferencesContext';

interface NavbarProps {
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch }) => {
  const [location] = useLocation();
  const { prefs, updatePrefs } = usePreferences();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cycleTheme = () => {
    const themes: ('dark' | 'sepia' | 'slate' | 'light')[] = ['dark', 'sepia', 'slate', 'light'];
    const nextIndex = (themes.indexOf(prefs.themeMode) + 1) % themes.length;
    updatePrefs({ themeMode: themes[nextIndex] });
  };

  const navLinks = [
    { href: '/', label: 'হোম' },
    { href: '/surah/1', label: 'কুরআন' },
    { href: '/lexicon', label: 'অভিধান' },
    { href: '/articles', label: 'আর্টিকেল' },
    { href: '/authors', label: 'লেখকবৃন্দ' },
    { href: '/bookmarks', label: 'বুকমার্ক' },
    { href: '/download', label: 'অ্যাপ ডাউনলোড' },
    { href: '/about', label: 'পরিচিতি' },
    { href: '/readme', label: 'অন্বেষা' },
    { href: '/contact', label: 'যোগাযোগ' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--border-color)] bg-[var(--bg-main)]/90 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 shadow-md shadow-emerald-950/40 group-hover:scale-105 transition-transform">
              <span className="font-arabic text-xl font-bold text-white">ق</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                কুরআন অন্বেষা
              </span>
              <span className="text-[11px] font-medium text-emerald-400/90 -mt-1 tracking-wide">
                Word by Word Quran
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1 text-sm font-medium text-[var(--text-muted)]">
          {navLinks.map((link) => {
            const isActive = location === link.href || (link.href !== '/' && location.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-2.5 py-1.5 transition-colors hover:text-white hover:bg-white/5 ${
                  isActive ? 'text-emerald-400 font-semibold bg-emerald-500/10' : ''
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons: Search, Theme, Settings, Mobile Menu */}
        <div className="flex items-center gap-2">
          {/* Quick Search trigger */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] px-3 py-1.5 text-xs text-[var(--text-muted)] hover:border-emerald-500/50 hover:text-white transition-all shadow-sm"
            title="খুঁজুন (Ctrl+K)"
          >
            <Search className="h-4 w-4 text-emerald-400" />
            <span className="hidden sm:inline">খুঁজুন...</span>
            <kbd className="hidden rounded bg-white/10 px-1.5 py-0.5 text-[10px] text-neutral-400 sm:inline">
              Ctrl K
            </kbd>
          </button>

          {/* Theme Switcher */}
          <button
            onClick={cycleTheme}
            className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] p-2 text-[var(--text-muted)] hover:text-white hover:border-emerald-500/50 transition-colors"
            title={`বর্তমান থিম: ${prefs.themeMode} (ক্লিক করে পরিবর্তন করুন)`}
          >
            {prefs.themeMode === 'dark' && <Moon className="h-4 w-4 text-sky-400" />}
            {prefs.themeMode === 'sepia' && <Coffee className="h-4 w-4 text-amber-500" />}
            {prefs.themeMode === 'slate' && <Moon className="h-4 w-4 text-indigo-400" />}
            {prefs.themeMode === 'light' && <Sun className="h-4 w-4 text-amber-400" />}
          </button>

          {/* Settings Link */}
          <Link
            href="/settings"
            className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] p-2 text-[var(--text-muted)] hover:text-white hover:border-emerald-500/50 transition-colors"
            title="সেটিংস"
          >
            <Settings className="h-4 w-4" />
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] p-2 text-[var(--text-muted)] hover:text-white"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-b border-[var(--border-color)] bg-[var(--bg-card)] px-4 py-4">
          <div className="grid grid-cols-2 gap-2 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2 text-[var(--text-muted)] hover:bg-white/5 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
