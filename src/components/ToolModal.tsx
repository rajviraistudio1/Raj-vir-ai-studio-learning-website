import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  ExternalLink,
  Bookmark,
  Check,
  Copy,
  Sparkles,
  Lightbulb,
  CheckCircle2,
  HelpCircle,
  Layers
} from 'lucide-react';

export const ToolModal: React.FC = () => {
  const { activeToolModal, closeToolModal, toggleSaveTool, isToolSaved, addToast } = useApp();
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  if (!activeToolModal) return null;

  const tool = activeToolModal;
  const saved = isToolSaved(tool.id);

  const handleCopyPrompt = () => {
    if (tool.samplePrompt) {
      navigator.clipboard.writeText(tool.samplePrompt);
      setCopiedPrompt(true);
      addToast('Prompt copied to clipboard!', 'success');
      setTimeout(() => setCopiedPrompt(false), 3000);
    }
  };

  return (
    <div
      id="tool-details-modal-backdrop"
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={closeToolModal}
    >
      <div
        id="tool-details-modal-content"
        className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between gap-4 bg-slate-50/50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-lg">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900">{tool.name}</h2>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700">
                  {tool.category}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">{tool.tagline}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="modal-bookmark-tool"
              onClick={() => toggleSaveTool(tool.id)}
              className={`p-2 rounded-xl border transition-all ${
                saved
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white text-slate-500 hover:text-slate-900 border-slate-200 hover:bg-slate-50'
              }`}
              title={saved ? 'Remove from saved' : 'Save to library'}
            >
              <Bookmark className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
            </button>
            <button
              id="modal-close-btn"
              onClick={closeToolModal}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700">
          {/* Overview */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              About This Tool
            </h4>
            <p className="text-slate-700 leading-relaxed">{tool.description}</p>
          </div>

          {/* Key Features */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
              Standout Features for Beginners
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {tool.keyFeatures.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs font-medium text-slate-800"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Beginner Tips */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span>Beginner Tips & Best Practices</span>
            </h4>
            <ul className="space-y-2 bg-amber-50/50 border border-amber-200/60 rounded-xl p-4 text-xs text-slate-700">
              {tool.beginnerTips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2 leading-relaxed">
                  <span className="font-bold text-amber-700 shrink-0">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sample Starter Prompt */}
          {tool.samplePrompt && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-indigo-500" />
                  <span>Ready-to-Use Starter Prompt</span>
                </h4>
                <button
                  id="copy-modal-sample-prompt"
                  onClick={handleCopyPrompt}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  {copiedPrompt ? (
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
              <div className="p-3.5 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs leading-relaxed border border-slate-800 relative select-all">
                {tool.samplePrompt}
              </div>
            </div>
          )}

          {/* Pricing Details */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-slate-800 block">Pricing Model</span>
              <span className="text-slate-600">{tool.pricingNote || tool.pricing}</span>
            </div>
            <span className="px-2.5 py-1 rounded-md font-semibold bg-white border border-slate-200 text-slate-700">
              {tool.difficulty}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t border-slate-100 bg-slate-50/70 flex items-center justify-between gap-4">
          <button
            onClick={closeToolModal}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-xl transition-colors"
          >
            Close
          </button>
          <a
            id="modal-visit-official-site"
            href={tool.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all"
          >
            <span>Open {tool.name} Official Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
