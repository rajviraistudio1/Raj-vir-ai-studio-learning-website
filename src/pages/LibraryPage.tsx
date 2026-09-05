import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ToolCard } from '../components/ToolCard';
import { ResourceCard } from '../components/ResourceCard';
import {
  Bookmark,
  Sparkles,
  Wrench,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Cloud,
  CheckCircle2,
  Trash2,
  Lock,
  Layers
} from 'lucide-react';

export const LibraryPage: React.FC = () => {
  const { savedTools, savedResources, navigateTo, addToast } = useApp();
  const [activeSubTab, setActiveSubTab] = useState<'all' | 'tools' | 'resources'>('all');
  const [showSignInModalNotice, setShowSignInModalNotice] = useState(false);

  const totalSavedCount = savedTools.length + savedResources.length;

  const handleGoogleSignInClick = () => {
    setShowSignInModalNotice(true);
    addToast('Google Auth integration will be connected in Stage 5!', 'info');
  };

  return (
    <div id="library-page-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      {/* Header Banner */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider border border-indigo-200">
          <Bookmark className="w-3.5 h-3.5" />
          <span>Personal AI Collection</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              My Saved Library
            </h1>
            <p className="text-sm sm:text-base text-slate-600 max-w-xl mt-1 leading-relaxed">
              Your personalized collection of bookmarked AI tools, prompt cheatsheets, and step-by-step guides.
            </p>
          </div>

          {/* Cloud Sync Readiness Badge */}
          <div className="p-3.5 bg-indigo-50/70 border border-indigo-200/80 rounded-2xl flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
              <Cloud className="w-4 h-4" />
            </div>
            <div className="text-xs">
              <span className="font-bold text-slate-800 block">Local Device Storage</span>
              <span className="text-slate-500">{totalSavedCount} saved items cached</span>
            </div>
          </div>
        </div>
      </div>

      {/* Google Sign-in Callout Box (Future Stage Preparation) */}
      <div
        id="google-signin-promo-card"
        className="bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 border border-indigo-500/20 shadow-md relative overflow-hidden"
      >
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-400/30">
              <Sparkles className="w-3 h-3 text-indigo-400" />
              <span>Multi-Device Sync Preview • Stage 5</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              Sync your library everywhere across devices
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              In upcoming releases, connect your Google account to save tools, store custom prompting recipes, and seamlessly access your AI library on phone, tablet, and desktop.
            </p>
          </div>

          <button
            id="google-signin-btn"
            onClick={handleGoogleSignInClick}
            className="inline-flex items-center justify-center gap-3 px-6 py-3 bg-white hover:bg-slate-100 active:bg-slate-200 text-slate-800 font-bold rounded-xl text-sm shadow-md transition-all shrink-0 cursor-pointer"
          >
            {/* Google G Logo SVG */}
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span>Sign in with Google</span>
          </button>
        </div>
      </div>

      {/* Main Content: Saved Grid or Empty State */}
      {totalSavedCount > 0 ? (
        <div className="space-y-6">
          {/* Subtabs Filter */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2">
              <button
                id="library-subtab-all"
                onClick={() => setActiveSubTab('all')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeSubTab === 'all'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All Saved ({totalSavedCount})
              </button>
              <button
                id="library-subtab-tools"
                onClick={() => setActiveSubTab('tools')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeSubTab === 'tools'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Saved Tools ({savedTools.length})
              </button>
              <button
                id="library-subtab-resources"
                onClick={() => setActiveSubTab('resources')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeSubTab === 'resources'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Saved Guides ({savedResources.length})
              </button>
            </div>

            <span className="hidden sm:inline-block text-xs text-slate-500">
              Click the bookmark icon on any item to remove it
            </span>
          </div>

          {/* Tools Grid if active */}
          {(activeSubTab === 'all' || activeSubTab === 'tools') && savedTools.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <Wrench className="w-4 h-4 text-indigo-600" />
                <span>Saved AI Tools ({savedTools.length})</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedTools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            </div>
          )}

          {/* Resources Grid if active */}
          {(activeSubTab === 'all' || activeSubTab === 'resources') && savedResources.length > 0 && (
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                <span>Saved Learning Resources & Tutorials ({savedResources.length})</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {savedResources.map((res) => (
                  <ResourceCard key={res.id} resource={res} />
                ))}
              </div>
            </div>
          )}

          {/* Subtab empty checks */}
          {activeSubTab === 'tools' && savedTools.length === 0 && (
            <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 space-y-3">
              <p className="text-sm text-slate-600">You haven't bookmarked any AI tools yet.</p>
              <button
                onClick={() => navigateTo('tools')}
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
              >
                Browse AI Tools Directory
              </button>
            </div>
          )}

          {activeSubTab === 'resources' && savedResources.length === 0 && (
            <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 space-y-3">
              <p className="text-sm text-slate-600">You haven't bookmarked any tutorials or guides yet.</p>
              <button
                onClick={() => navigateTo('learn')}
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
              >
                Explore Learning Guides
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Empty State */
        <div
          id="library-empty-state"
          className="bg-white rounded-3xl border border-dashed border-slate-300 p-10 sm:p-16 text-center space-y-6 max-w-xl mx-auto shadow-2xs"
        >
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center mx-auto shadow-xs">
            <Bookmark className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Build your personal AI library.
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
              Save your favorite AI tools, prompting formulas, and step-by-step guides here so you can quickly reference them anytime.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              id="empty-explore-tools-btn"
              onClick={() => navigateTo('tools')}
              className="w-full sm:w-auto px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>Browse AI Tools</span>
            </button>
            <button
              id="empty-explore-guides-btn"
              onClick={() => navigateTo('learn')}
              className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Explore Guides</span>
            </button>
          </div>
        </div>
      )}

      {/* Notice Modal / Dialog for Sign-in trigger */}
      {showSignInModalNotice && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowSignInModalNotice(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 border border-slate-200 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Google Authentication Preview</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Google Authentication and Supabase/Firebase cloud synchronization are scheduled for <strong>Stage 5</strong> of the tutorial series. For now, all your bookmarks are safely saved in your browser’s local storage!
            </p>
            <button
              onClick={() => setShowSignInModalNotice(false)}
              className="w-full py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold"
            >
              Got it, continue exploring
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
