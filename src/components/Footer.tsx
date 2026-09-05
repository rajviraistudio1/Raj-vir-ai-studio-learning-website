import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Heart, ArrowUpRight, Compass, ShieldCheck, Layers } from 'lucide-react';
import { PageTab } from '../types';

export const Footer: React.FC = () => {
  const { navigateTo } = useApp();

  const quickLinks: { label: string; tab: PageTab }[] = [
    { label: 'Home Overview', tab: 'home' },
    { label: 'AI Tools Directory', tab: 'tools' },
    { label: 'Learning Resources & Guides', tab: 'learn' },
    { label: 'My Personal Library', tab: 'library' },
    { label: 'About Raj Vir AI Studio', tab: 'about' },
  ];

  const popularTopics = [
    { label: 'Conversational Chatbots', tab: 'tools' as PageTab, category: 'Chatbots' },
    { label: 'Everyday Prompting', tab: 'learn' as PageTab, category: 'Prompting' },
    { label: 'No-Code AI Automation', tab: 'learn' as PageTab, category: 'Automation' },
    { label: 'AI Coding & IDEs', tab: 'tools' as PageTab, category: 'Coding' },
    { label: 'Productivity & Office', tab: 'tools' as PageTab, category: 'Productivity' },
    { label: 'Image & Video Creation', tab: 'tools' as PageTab, category: 'Image Generation' },
  ];

  return (
    <footer id="main-footer" className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          
          {/* Col 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <button
              id="footer-brand-btn"
              onClick={() => navigateTo('home')}
              className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-white text-lg tracking-tight">
                  Raj Vir <span className="text-indigo-400">AI Studio</span>
                </span>
                <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                  AI Learning Hub
                </p>
              </div>
            </button>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              <strong className="text-slate-200">“Learn AI. Discover Better Tools. Build Smarter.”</strong>
              <br />
              A welcoming, beginner-friendly hub designed to help everyday people, creators, and professionals discover vetted AI tools and practical workflows without overwhelm.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-slate-400">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-indigo-300 font-medium">
                <Layers className="w-3.5 h-3.5 text-indigo-400" /> Stage 1: Frontend MVP
              </span>
              <span>• Ready for expansion</span>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => navigateTo(link.tab)}
                    className="text-slate-400 hover:text-indigo-400 transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Popular Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100">
              Explore Topics
            </h4>
            <ul className="space-y-2 text-sm">
              {popularTopics.map((topic) => (
                <li key={topic.label}>
                  <button
                    onClick={() => navigateTo(topic.tab, { category: topic.category })}
                    className="text-slate-400 hover:text-indigo-400 transition-colors text-left"
                  >
                    {topic.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Expansion Roadmap Note */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100">
              Tutorial Roadmap
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Designed as a live modular blueprint for upcoming video tutorials covering GitHub sync, Supabase, Firebase, Google Auth, and Vercel/Netlify deployment.
            </p>
            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60 text-xs text-slate-300 space-y-1.5">
              <div className="flex items-center justify-between text-indigo-300 font-semibold">
                <span>Architecture</span>
                <span className="text-[10px] bg-indigo-900/60 text-indigo-300 px-1.5 py-0.5 rounded">Modular</span>
              </div>
              <p className="text-slate-400 text-[11px]">
                Built with clean TypeScript, structured sample stores, and local bookmark persistence.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Raj Vir AI Studio. Crafted for beginner learners and builders.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => navigateTo('about')} className="hover:text-slate-300 transition-colors">
              About the Project
            </button>
            <span>•</span>
            <button onClick={() => navigateTo('learn')} className="hover:text-slate-300 transition-colors">
              Beginner Guides
            </button>
            <span>•</span>
            <button onClick={() => navigateTo('library')} className="hover:text-slate-300 transition-colors">
              My Saved Library
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
