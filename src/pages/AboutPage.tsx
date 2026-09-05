import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { NewsletterForm } from '../components/NewsletterForm';
import {
  Sparkles,
  Heart,
  Target,
  Users,
  Compass,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  Layers,
  ShieldCheck,
  Zap,
  Globe,
  BookOpen,
  ArrowRight
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigateTo } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const roadmapStages = [
    {
      stage: 'Stage 1',
      title: 'Build with Google AI Studio',
      status: 'Current MVP',
      statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      description: 'Crafting the responsive frontend, modular components, sample data store, and local bookmark persistence.',
    },
    {
      stage: 'Stage 2',
      title: 'Connect to GitHub',
      status: 'Upcoming',
      statusColor: 'bg-slate-100 text-slate-700 border-slate-200',
      description: 'Setting up Git version control, branching strategies, and repository synchronization.',
    },
    {
      stage: 'Stage 3',
      title: 'Database with Supabase',
      status: 'Upcoming',
      statusColor: 'bg-slate-100 text-slate-700 border-slate-200',
      description: 'Storing user newsletter subscriptions, tool reviews, and personal libraries in a cloud PostgreSQL database.',
    },
    {
      stage: 'Stage 4',
      title: 'Alternative Backend with Firebase',
      status: 'Upcoming',
      statusColor: 'bg-slate-100 text-slate-700 border-slate-200',
      description: 'Demonstrating Firestore NoSQL document storage and real-time syncing patterns.',
    },
    {
      stage: 'Stage 5',
      title: 'Google Authentication',
      status: 'Upcoming',
      statusColor: 'bg-slate-100 text-slate-700 border-slate-200',
      description: 'One-click Google Sign-in to sync user libraries and preferences across mobile and desktop.',
    },
    {
      stage: 'Stage 6',
      title: 'Deploy to Netlify',
      status: 'Upcoming',
      statusColor: 'bg-slate-100 text-slate-700 border-slate-200',
      description: 'Configuring custom domains, automated CI/CD builds, and Netlify edge headers.',
    },
    {
      stage: 'Stage 7',
      title: 'Deploy to Vercel',
      status: 'Upcoming',
      statusColor: 'bg-slate-100 text-slate-700 border-slate-200',
      description: 'Production zero-config deployment on Vercel with global CDN caching and analytics.',
    },
  ];

  const faqs = [
    {
      q: 'Do I need a technical or coding background to use Raj Vir AI Studio?',
      a: 'Not at all! Raj Vir AI Studio was specifically designed for absolute beginners, office professionals, students, and curious learners. We explain AI concepts in plain English, with zero coding required for the vast majority of tools and guides.',
    },
    {
      q: 'Are the AI tools listed on this platform free to use?',
      a: 'Most tools featured in our directory offer generous free tiers (such as free daily queries on ChatGPT, Claude, Perplexity, and Canva Magic Studio) or free trials. We clearly tag the pricing model on each card so there are no surprises.',
    },
    {
      q: 'How does the bookmarking / My Library feature work?',
      a: 'In this Stage 1 release, bookmarks are instantly saved to your browser’s local storage. In Stage 5, we will connect Google Authentication and cloud databases so your saved library syncs across all your devices seamlessly.',
    },
    {
      q: 'Can I suggest a new AI tool or beginner tutorial topic?',
      a: 'Yes! You can join our free weekly newsletter to reply directly to our editorial team, or participate in the community roadmap discussions.',
    },
  ];

  return (
    <div id="about-page-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16 sm:space-y-24">
      
      {/* 1. HERO MISSION SECTION */}
      <section className="text-center max-w-3xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-xs sm:text-sm font-semibold border border-indigo-200 shadow-2xs">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <span>Our Vision & Mission</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Demystifying AI for Everyone. <br />
          <span className="text-indigo-600">Without the Technical Overwhelm.</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          <strong>Raj Vir AI Studio</strong> is an open AI Learning Hub built to help non-engineers, creators, students, and professionals navigate the fast-moving world of artificial intelligence with clarity and confidence.
        </p>
      </section>

      {/* 2. 4 CORE PILLARS / VALUES */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 bg-white rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Who It’s For</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Beginners, marketers, writers, managers, and educators who want to leverage AI in their daily routine without spending months learning to code.
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <Compass className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">What You Can Discover</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Vetted AI tools, practical prompting formulas (like the C.R.E.A.T.E. framework), and automated workflows that save real hours every week.
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Vetted Resources</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Every tool and tutorial in our library is thoroughly tested by human reviewers to ensure it offers real value, honest pricing, and beginner safety.
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
            <Heart className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Why We Built It</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Because AI shouldn't feel like an exclusive club. We believe anyone can master modern AI tools when given clear, relatable instruction.
          </p>
        </div>
      </section>

      {/* 3. TUTORIAL PROGRESSION & EXPANSION ROADMAP */}
      <section id="tutorial-series-roadmap" className="space-y-8 bg-slate-100/70 p-6 sm:p-10 rounded-3xl border border-slate-200">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider border border-indigo-200">
            <Layers className="w-3.5 h-3.5" />
            <span>Tutorial Series Architecture</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            How Raj Vir AI Studio Is Engineered for Future Growth
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            This application is deliberately structured as a living showcase for our upcoming 7-stage web engineering and AI development tutorial series.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {roadmapStages.map((stg) => (
            <div
              key={stg.stage}
              className={`p-5 rounded-2xl border transition-all ${
                stg.stage === 'Stage 1'
                  ? 'bg-white border-indigo-400/80 shadow-md ring-2 ring-indigo-500/10'
                  : 'bg-white/80 border-slate-200/80'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-indigo-600">{stg.stage}</span>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${stg.statusColor}`}>
                  {stg.status}
                </span>
              </div>
              <h4 className="font-bold text-slate-900 text-sm mb-1.5">{stg.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{stg.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. BEGINNER FAQ SECTION */}
      <section className="max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600">
            <HelpCircle className="w-4 h-4" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3 pt-2">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base hover:text-indigo-600 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform shrink-0 ${
                      isOpen ? 'rotate-180 text-indigo-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-in fade-in duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. NEWSLETTER SIGNUP */}
      <NewsletterForm
        title="Start Your AI Learning Journey Today"
        subtitle="Subscribe to get fresh tutorials, weekly prompt frameworks, and hand-picked tools delivered every Thursday."
      />

    </div>
  );
};
