import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, User, ExternalLink } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <section className="border-b border-[var(--border-color)] bg-[var(--bg-card)]/50 pt-10 pb-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1 text-xs font-medium text-emerald-400 mb-4">
            <Mail className="h-4 w-4" />
            <span>মতামত ও পরামর্শ</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            যোগাযোগ ও পরামর্শ
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[var(--text-muted)] max-w-2xl mx-auto">
            কুরআন অন্বেষা প্রকল্পের উন্নয়ন, অনুবাদের ত্রুটি সংশোধন বা যেকোনো জ্ঞানভিত্তিক পরামর্শ আমাদের জানাতে পারেন।
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-2xl px-4 sm:px-6 pt-12">
        <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 sm:p-10 shadow-xl">
          {submitted ? (
            <div className="py-12 text-center space-y-3">
              <div className="mx-auto h-12 w-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white">ধন্যবাদ!</h3>
              <p className="text-sm text-[var(--text-muted)] max-w-sm mx-auto">
                আপনার বার্তাটি সফলভাবে পাঠানো হয়েছে। আমরা গুরুত্বের সাথে এটি পর্যালোচনা করব।
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-white mb-1.5">আপনার নাম</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="যেমন: মুহাম্মদ আব্দুল্লাহ"
                  className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-main)] px-4 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white mb-1.5">ইমেইল এড্রেস</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@domain.com"
                  className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-main)] px-4 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white mb-1.5">বার্তা / পরামর্শ</label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="আপনার মতামত, পরামর্শ বা ত্রুটি নির্দেশ বিস্তারিত লিখুন..."
                  className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-main)] px-4 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-emerald-500 focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-500 transition-colors shadow-md"
              >
                <Send className="h-4 w-4" />
                <span>বার্তা পাঠান</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
