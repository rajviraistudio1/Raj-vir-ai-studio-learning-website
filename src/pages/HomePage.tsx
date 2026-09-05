import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AI_TOOLS } from '../data/toolsData';
import { LEARNING_RESOURCES, LEARNING_PATHS } from '../data/learnData';
import { ToolCard } from '../components/ToolCard';
import { ResourceCard } from '../components/ResourceCard';
import { NewsletterForm } from '../components/NewsletterForm';
import {
  Sparkles,
  Search,
  ArrowRight,
  Compass,
  CheckCircle2,
  Zap,
  BookOpen,
  Wrench,
  GraduationCap,
  TrendingUp,
  Layers,
  ArrowUpRight,
  Clock,
  Award
} from 'lucide-react';
import { PageTab } from '../types';

export const HomePage: React.FC = () => {
  const { navigateTo, openResourceModal } = useApp();
  const [heroSearch, setHeroSearch] = useState('');

  const featuredTools = AI_TOOLS.filter((t) => t.featured).slice(0, 6);
  const popularResources = LEARNING_RESOURCES.filter((r) => r.popular || r.featured).slice(0, 4);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      navigateTo('tools', { search: heroSearch.trim() });
    }
  };

  return (
    <div id="home-page-container" className="space-y-16 sm:space-y-24 pb-16">
      
      {/* 1. HERO SECTION */}
      <section
        id="hero-section"
        className="relative pt-8 sm:pt-14 pb-10 sm:pb-16 overflow-hidden"
      >
        {/* Subtle decorative background glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-80 bg-gradient-to-tr from-indigo-200/40 via-violet-200/30 to-sky-200/40 blur-3xl rounded-full pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto text-center space-y-6 px-4">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs sm:text-sm font-semibold shadow-2xs animate-in fade-in slide-in-from-bottom-2 duration-300">
            <Sparkles className="w-4 h-4 text-indigo-600 animate-pulse" />
            <span>The Beginner-Friendly AI Learning Hub</span>
          </div>

          {/* Main Headline */}
          <h1
            id="hero-main-heading"
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] sm:leading-[1.15]"
          >
            Learn AI. Discover Better Tools. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-600">
              Build Smarter.
            </span>
          </h1>

          {/* Concise supporting description */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
            Welcome to <strong className="text-slate-900 font-bold">Raj Vir AI Studio</strong> — your clear, no-fluff guide to understanding artificial intelligence, mastering everyday prompts, and discovering the best AI tools without tech jargon.
          </p>

          {/* Prominent Search Bar */}
          <div className="max-w-2xl mx-auto pt-2">
            <form onSubmit={handleSearchSubmit} className="relative group">
              <input
                id="hero-search-input"
                type="text"
                value={heroSearch}
                onChange={(e) => setHeroSearch(e.target.value)}
                placeholder="Search AI tools (ChatGPT, Midjourney) or guides (prompting, workflows)..."
                className="w-full pl-12 pr-28 py-3.5 sm:py-4 rounded-2xl bg-white border border-slate-300/80 shadow-md shadow-slate-200/50 text-slate-800 text-sm sm:text-base placeholder-slate-400 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-500/15 outline-none transition-all"
              />
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-indigo-600 transition-colors" />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 sm:py-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer"
              >
                Search
              </button>
            </form>

            {/* Quick Filter Tag Suggestions */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap pt-3 text-xs text-slate-500">
              <span className="font-medium">Try exploring:</span>
              <button
                onClick={() => navigateTo('tools', { category: 'Chatbots' })}
                className="px-2.5 py-1 rounded-full bg-white border border-slate-200 hover:border-indigo-400 hover:text-indigo-600 transition-all font-medium"
              >
                Chatbots
              </button>
              <button
                onClick={() => navigateTo('learn', { category: 'Prompting' })}
                className="px-2.5 py-1 rounded-full bg-white border border-slate-200 hover:border-indigo-400 hover:text-indigo-600 transition-all font-medium"
              >
                Prompting 101
              </button>
              <button
                onClick={() => navigateTo('tools', { category: 'Coding' })}
                className="px-2.5 py-1 rounded-full bg-white border border-slate-200 hover:border-indigo-400 hover:text-indigo-600 transition-all font-medium"
              >
                Coding IDEs
              </button>
              <button
                onClick={() => navigateTo('learn', { category: 'Automation' })}
                className="px-2.5 py-1 rounded-full bg-white border border-slate-200 hover:border-indigo-400 hover:text-indigo-600 transition-all font-medium"
              >
                Automation
              </button>
            </div>
          </div>

          {/* Primary & Secondary Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
            <button
              id="hero-primary-cta"
              onClick={() => navigateTo('learn')}
              className="w-full sm:w-auto px-7 py-3.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold rounded-xl shadow-md shadow-indigo-600/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explore AI Resources</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              id="hero-secondary-cta"
              onClick={() => navigateTo('tools')}
              className="w-full sm:w-auto px-7 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-bold rounded-xl border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-all flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer"
            >
              <Wrench className="w-4 h-4 text-indigo-600" />
              <span>Browse AI Tools</span>
            </button>
          </div>

        </div>

        {/* Feature Value Highlights Row */}
        <div className="max-w-5xl mx-auto px-4 mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white/80 border border-slate-200/80 text-center space-y-1">
            <div className="font-extrabold text-slate-900 text-xl sm:text-2xl">16+</div>
            <p className="text-xs text-slate-500 font-medium">Curated AI Tools</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/80 border border-slate-200/80 text-center space-y-1">
            <div className="font-extrabold text-indigo-600 text-xl sm:text-2xl">Step-by-Step</div>
            <p className="text-xs text-slate-500 font-medium">Beginner Tutorials</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/80 border border-slate-200/80 text-center space-y-1">
            <div className="font-extrabold text-slate-900 text-xl sm:text-2xl">4 Paths</div>
            <p className="text-xs text-slate-500 font-medium">Guided Learning Tracks</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/80 border border-slate-200/80 text-center space-y-1">
            <div className="font-extrabold text-emerald-600 text-xl sm:text-2xl">100% Free</div>
            <p className="text-xs text-slate-500 font-medium">Open Knowledge Hub</p>
          </div>
        </div>
      </section>

      {/* 2. FEATURED AI TOOLS SECTION */}
      <section id="featured-tools-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider">
              <Wrench className="w-4 h-4" />
              <span>Hand-Picked Collection</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Featured AI Tools
            </h2>
            <p className="text-sm text-slate-500 max-w-xl">
              Vetted, reliable artificial intelligence tools across chatbots, visual design, coding, and productivity.
            </p>
          </div>

          <button
            onClick={() => navigateTo('tools')}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors self-start sm:self-auto cursor-pointer"
          >
            <span>View all 16+ tools</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* 3. BEGINNER-FRIENDLY LEARNING PATHS SECTION */}
      <section id="learning-paths-section" className="bg-slate-100/70 border-y border-slate-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider border border-indigo-200">
              <GraduationCap className="w-4 h-4" />
              <span>Structured Roadmaps</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Beginner-Friendly Learning Paths
            </h2>
            <p className="text-sm text-slate-600">
              Follow curated, step-by-step paths designed to take you from total novice to confident AI practitioner.
            </p>
          </div>

          {/* Learning Paths Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {LEARNING_PATHS.map((path, idx) => (
              <div
                key={path.id}
                className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-xs hover:shadow-md hover:border-indigo-300 transition-all flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                      Track 0{idx + 1}
                    </span>
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {path.duration}
                      </span>
                      <span>•</span>
                      <span>{path.stepsCount} Modules</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                      {path.title}
                    </h3>
                    <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                      {path.description}
                    </p>
                  </div>

                  {/* Modules Checklist */}
                  <div className="space-y-2 pt-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      What is included:
                    </span>
                    <div className="space-y-1.5 text-xs text-slate-700">
                      {path.modules.map((mod, mIdx) => (
                        <div key={mIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                          <span>{mod}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-xs text-slate-500">
                    <span className="font-semibold text-slate-700">Target Outcome:</span>{' '}
                    <span className="text-slate-600 line-clamp-1">{path.targetOutcome}</span>
                  </div>
                  <button
                    onClick={() => navigateTo('learn')}
                    className="shrink-0 ml-3 inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
                  >
                    <span>Start Track</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. POPULAR LEARNING RESOURCES SECTION */}
      <section id="popular-resources-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider">
              <BookOpen className="w-4 h-4" />
              <span>Step-by-Step Guides</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Popular Learning Resources
            </h2>
            <p className="text-sm text-slate-500 max-w-xl">
              Practical guides, prompt cheatsheets, and real-world workflows you can apply right away.
            </p>
          </div>

          <button
            onClick={() => navigateTo('learn')}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors self-start sm:self-auto cursor-pointer"
          >
            <span>View all tutorials & guides</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {popularResources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </section>

      {/* 5. NEWSLETTER SIGNUP SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <NewsletterForm
          title="Supercharge Your AI Knowledge Every Week"
          subtitle="Get practical beginner AI tutorials, tested prompt templates, and new tool breakdowns sent directly to your inbox. Free forever."
        />
      </div>

    </div>
  );
};
