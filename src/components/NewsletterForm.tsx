import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Mail, User, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Loader2 } from 'lucide-react';

interface NewsletterFormProps {
  variant?: 'banner' | 'card' | 'compact';
  title?: string;
  subtitle?: string;
}

export const NewsletterForm: React.FC<NewsletterFormProps> = ({
  variant = 'banner',
  title = 'Join the Raj Vir AI Studio Weekly Digest',
  subtitle = 'Get hand-curated beginner AI tutorials, tested prompt templates, and new tool breakdowns delivered to your inbox every Thursday. Zero spam.',
}) => {
  const { subscribeNewsletter, subscribersCount } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(
    null
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    setLoading(true);

    setTimeout(() => {
      const result = subscribeNewsletter(name, email);
      if (result.success) {
        setFeedback({ type: 'success', message: result.message });
        setName('');
        setEmail('');
      } else {
        setFeedback({ type: 'error', message: result.message });
      }
      setLoading(false);
    }, 400);
  };

  if (variant === 'card') {
    return (
      <div
        id="newsletter-card-form"
        className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-4"
      >
        <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Stay Ahead in AI</span>
        </div>
        <h3 className="text-xl font-bold text-slate-900">{title}</h3>
        <p className="text-sm text-slate-600 leading-relaxed">{subtitle}</p>

        {feedback && (
          <div
            className={`p-3.5 rounded-xl text-xs font-medium flex items-start gap-2.5 ${
              feedback.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-rose-50 text-rose-800 border border-rose-200'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{feedback.message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3 pt-2">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Your Name</label>
            <div className="relative">
              <input
                id="newsletter-name-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Sarah Jenkins"
                className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 rounded-xl border border-slate-200 focus:border-indigo-500 focus:bg-white outline-none"
                required
              />
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <input
                id="newsletter-email-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="sarah@example.com"
                className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 rounded-xl border border-slate-200 focus:border-indigo-500 focus:bg-white outline-none"
                required
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            id="newsletter-submit-btn"
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-bold rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <span>Get Free AI Weekly Guides</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <p className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
            <span>No spam ever. Unsubscribe with 1-click anytime.</span>
          </p>
        </form>
      </div>
    );
  }

  // Default: Banner layout
  return (
    <section
      id="newsletter-banner-section"
      className="relative bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 overflow-hidden border border-indigo-500/20 shadow-xl"
    >
      {/* Decorative ambient background */}
      <div className="absolute -right-24 -top-24 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 w-72 h-72 bg-violet-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left side text */}
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Raj Vir AI Studio Newsletter</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
            {title}
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed">
            {subtitle}
          </p>

          <div className="flex items-center gap-4 pt-1 text-xs text-slate-300">
            <div className="flex -space-x-2 overflow-hidden">
              <span className="inline-block h-6 w-6 rounded-full ring-2 ring-slate-900 bg-indigo-500 text-[10px] font-bold text-center leading-6 text-white">
                JD
              </span>
              <span className="inline-block h-6 w-6 rounded-full ring-2 ring-slate-900 bg-violet-500 text-[10px] font-bold text-center leading-6 text-white">
                AK
              </span>
              <span className="inline-block h-6 w-6 rounded-full ring-2 ring-slate-900 bg-emerald-500 text-[10px] font-bold text-center leading-6 text-white">
                RV
              </span>
            </div>
            <span>
              Join <strong className="text-white font-bold">{subscribersCount.toLocaleString()}</strong> beginners & builders learning AI
            </span>
          </div>
        </div>

        {/* Right side form */}
        <div className="lg:col-span-5 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/15 space-y-4">
          {feedback && (
            <div
              className={`p-3 rounded-xl text-xs font-medium flex items-start gap-2 ${
                feedback.type === 'success'
                  ? 'bg-emerald-500/20 text-emerald-200 border border-emerald-400/40'
                  : 'bg-rose-500/20 text-rose-200 border border-rose-400/40'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{feedback.message}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-200 mb-1">Your Full Name</label>
              <div className="relative">
                <input
                  id="newsletter-banner-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Rivera"
                  className="w-full pl-9 pr-3 py-2 text-sm bg-slate-900/60 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 outline-none"
                  required
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-200 mb-1">Email Address</label>
              <div className="relative">
                <input
                  id="newsletter-banner-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@example.com"
                  className="w-full pl-9 pr-3 py-2 text-sm bg-slate-900/60 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 outline-none"
                  required
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              id="newsletter-banner-submit"
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 text-white text-sm font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <span>Subscribe for Free</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <p className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
              <span>Zero spam. No credit card required.</span>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};
