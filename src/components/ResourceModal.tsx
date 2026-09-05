import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Bookmark,
  Clock,
  BookOpen,
  CheckCircle2,
  Copy,
  Check,
  Sparkles,
  Share2,
  Calendar,
  User,
  ArrowRight
} from 'lucide-react';

export const ResourceModal: React.FC = () => {
  const { activeResourceModal, closeResourceModal, toggleSaveResource, isResourceSaved, addToast } = useApp();
  const [copiedPromptIndex, setCopiedPromptIndex] = useState<number | null>(null);

  if (!activeResourceModal) return null;

  const resource = activeResourceModal;
  const saved = isResourceSaved(resource.id);

  const handleCopyPrompt = (promptText: string, index: number) => {
    navigator.clipboard.writeText(promptText);
    setCopiedPromptIndex(index);
    addToast('Prompt template copied to clipboard!', 'success');
    setTimeout(() => setCopiedPromptIndex(null), 3000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: resource.title,
          text: resource.shortDescription,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      addToast('Resource link copied to clipboard!', 'info');
    }
  };

  return (
    <div
      id="resource-reader-modal-backdrop"
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={closeResourceModal}
    >
      <div
        id="resource-reader-modal-content"
        className="bg-white rounded-2xl max-w-3xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8 max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-start justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 flex-wrap text-xs">
              <span className="px-2.5 py-0.5 rounded-full font-bold bg-indigo-100 text-indigo-700">
                {resource.format}
              </span>
              <span className="px-2.5 py-0.5 rounded-full font-medium bg-slate-200/80 text-slate-700">
                {resource.category}
              </span>
              <span className="flex items-center gap-1 text-slate-500 font-medium">
                <Clock className="w-3.5 h-3.5" />
                {resource.readTime}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                {resource.difficulty} Level
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
              {resource.title}
            </h2>
            <div className="flex items-center gap-3 text-xs text-slate-500 pt-1">
              <span className="flex items-center gap-1 font-medium">
                <User className="w-3.5 h-3.5 text-slate-400" />
                {resource.author}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                Updated {resource.updatedDate}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              id="modal-share-resource"
              onClick={handleShare}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              title="Share Resource"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              id="modal-bookmark-resource"
              onClick={() => toggleSaveResource(resource.id)}
              className={`p-2 rounded-xl border transition-all ${
                saved
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                  : 'bg-white text-slate-400 hover:text-slate-800 border-slate-200 hover:bg-slate-50'
              }`}
              title={saved ? 'Remove from Saved' : 'Save to Library'}
            >
              <Bookmark className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
            </button>
            <button
              id="modal-close-resource-btn"
              onClick={closeResourceModal}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 text-slate-800 leading-relaxed">
          {/* Summary Quote */}
          <div className="p-4 bg-indigo-50/70 border-l-4 border-indigo-600 rounded-r-xl text-sm font-medium text-indigo-950">
            {resource.shortDescription}
          </div>

          {/* Key Takeaways */}
          {resource.takeaways && resource.takeaways.length > 0 && (
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>What You Will Learn (Key Takeaways)</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700">
                {resource.takeaways.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-1.5 shrink-0" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step-by-Step Sections */}
          <div className="space-y-6">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-2 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span>Step-by-Step Tutorial & Breakdown</span>
            </h3>

            {resource.steps.map((step) => (
              <div
                key={step.stepNumber}
                className="p-5 rounded-2xl border border-slate-200/80 bg-white space-y-3 shadow-2xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                    {step.stepNumber}
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                    {step.title}
                  </h4>
                </div>

                <p className="text-sm text-slate-600 pl-10 leading-relaxed">
                  {step.content}
                </p>

                {/* Optional Prompt Example in Step */}
                {step.promptExample && (
                  <div className="ml-10 p-3.5 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono space-y-2 border border-slate-800">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-sans font-medium">
                      <span>Example Prompt Template</span>
                      <button
                        onClick={() => handleCopyPrompt(step.promptExample!, step.stepNumber + 100)}
                        className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-semibold"
                      >
                        {copiedPromptIndex === step.stepNumber + 100 ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <p className="whitespace-pre-wrap leading-relaxed select-all">
                      {step.promptExample}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Recommended Prompts Section */}
          {resource.recommendedPrompts && resource.recommendedPrompts.length > 0 && (
            <div className="space-y-4 pt-2">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Recommended Copy-and-Paste Prompts</span>
              </h3>

              <div className="space-y-4">
                {resource.recommendedPrompts.map((p, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-slate-900 text-sm">{p.title}</h4>
                      <button
                        onClick={() => handleCopyPrompt(p.prompt, idx)}
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-indigo-600 hover:bg-indigo-50 transition-colors shadow-2xs"
                      >
                        {copiedPromptIndex === idx ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-600">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Prompt</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="p-3.5 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs whitespace-pre-wrap leading-relaxed select-all border border-slate-800">
                      {p.prompt}
                    </div>

                    <p className="text-xs text-slate-500 italic">
                      <strong className="text-slate-700 not-italic">Why it works: </strong>
                      {p.whyItWorks}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="flex items-center gap-2 flex-wrap pt-4 border-t border-slate-100 text-xs">
            <span className="font-bold text-slate-400 uppercase tracking-wider">Tags:</span>
            {resource.tags.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 font-medium"
              >
                #{t}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t border-slate-100 bg-slate-50/70 flex items-center justify-between gap-4">
          <button
            onClick={closeResourceModal}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-xl transition-colors"
          >
            Finished Reading
          </button>
          <button
            onClick={() => toggleSaveResource(resource.id)}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
              saved
                ? 'bg-slate-200 text-slate-800 hover:bg-slate-300'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${saved ? 'fill-current' : ''}`} />
            <span>{saved ? 'Saved in Your Library' : 'Save Guide to Library'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
