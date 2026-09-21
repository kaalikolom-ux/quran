import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'wouter';
import { PreferencesProvider } from './context/PreferencesContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { QuickSearchModal } from './components/search/QuickSearchModal';
import { AudioPlayerBar } from './components/audio/AudioPlayerBar';
import { HomePage } from './pages/HomePage';
import { SurahPage } from './pages/SurahPage';
import { LexiconPage } from './pages/LexiconPage';
import { ArticlesPage } from './pages/ArticlesPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { AuthorsPage } from './pages/AuthorsPage';
import { BookmarksPage } from './pages/BookmarksPage';
import { SettingsPage } from './pages/SettingsPage';
import { DownloadPage } from './pages/DownloadPage';
import { AboutPage } from './pages/AboutPage';
import { ReadmePage } from './pages/ReadmePage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { SurahMeta } from './types/quran';

export const App: React.FC = () => {
  const [surahsMeta, setSurahsMeta] = useState<Record<string, SurahMeta>>({});
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    fetch('/data/quran/surahs_meta.json')
      .then((res) => res.json())
      .then((data) => setSurahsMeta(data))
      .catch((err) => console.error('Failed to load surahs metadata:', err));
  }, []);

  return (
    <PreferencesProvider>
      <div className="flex min-h-screen flex-col bg-[var(--bg-main)] text-[var(--text-main)] transition-colors">
        <Navbar onOpenSearch={() => setIsSearchOpen(true)} />

        <main className="flex-1">
          <Switch>
            <Route path="/">
              <HomePage surahsMeta={surahsMeta} />
            </Route>

            <Route path="/surah/:id">
              {(params) => (
                <SurahPage
                  surahId={parseInt(params.id || '1', 10)}
                  surahsMeta={surahsMeta}
                />
              )}
            </Route>

            <Route path="/lexicon">
              <LexiconPage />
            </Route>

            <Route path="/articles">
              <ArticlesPage />
            </Route>

            <Route path="/articles/:slug">
              {(params) => <ArticleDetailPage slug={params.slug || ''} />}
            </Route>

            <Route path="/authors">
              <AuthorsPage />
            </Route>

            <Route path="/bookmarks">
              <BookmarksPage />
            </Route>

            <Route path="/settings">
              <SettingsPage />
            </Route>

            <Route path="/download">
              <DownloadPage />
            </Route>

            <Route path="/about">
              <AboutPage />
            </Route>

            <Route path="/readme">
              <ReadmePage />
            </Route>

            <Route path="/contact">
              <ContactPage />
            </Route>

            <Route path="/privacy">
              <PrivacyPage />
            </Route>

            {/* Fallback 404 */}
            <Route>
              <div className="min-h-[60vh] flex items-center justify-center p-4">
                <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-8 text-center max-w-md">
                  <h2 className="text-xl font-bold text-white mb-2">পৃষ্ঠাটি খুঁজে পাওয়া যায়নি</h2>
                  <p className="text-xs text-[var(--text-muted)] mb-4">
                    আপনি যে পৃষ্ঠাটি খুঁজছেন তা বিদ্যমান নেই বা সরানো হয়েছে।
                  </p>
                  <a
                    href="/"
                    className="inline-flex rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-500"
                  >
                    হোম পেজে ফিরে যান
                  </a>
                </div>
              </div>
            </Route>
          </Switch>
        </main>

        <Footer />

        <QuickSearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          surahsMeta={surahsMeta}
        />

        <AudioPlayerBar surahsMeta={surahsMeta} />
      </div>
    </PreferencesProvider>
  );
};
