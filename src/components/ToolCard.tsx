import React from 'react';
import { AITool } from '../types';
import { useApp } from '../context/AppContext';
import {
  Bookmark,
  ExternalLink,
  Sparkles,
  ArrowRight,
  MessageSquare,
  Bot,
  Search,
  Image,
  Palette,
  FileText,
  Code,
  Layout,
  Mic,
  Video,
  Film,
  Edit3,
  BookOpen,
  Zap,
  Sparkle,
  CheckCircle2,
  Info
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  MessageSquare,
  Bot,
  Search,
  Image,
  Palette,
  FileText,
  Code,
  Layout,
  Mic,
  Video,
  Film,
  Edit3,
  BookOpen,
  Zap,
  Sparkle,
  Sparkles,
};

interface ToolCardProps {
  tool: AITool;
  compact?: boolean;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool, compact = false }) => {
  const { toggleSaveTool, isToolSaved, openToolModal } = useApp();
  const saved = isToolSaved(tool.id);

  const IconComponent = ICON_MAP[tool.iconName] || Sparkles;

  const difficultyColors: Record<string, string> = {
    'Beginner Friendly': 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    'No-Code': 'bg-blue-50 text-blue-700 border-blue-200/80',
    'Intermediate': 'bg-amber-50 text-amber-700 border-amber-200/80',
    'All Levels': 'bg-purple-50 text-purple-700 border-purple-200/80',
  };

  const pricingColors: Record<string, string> = {
    'Free': 'bg-teal-50 text-teal-700 border-teal-200',
    'Freemium': 'bg-indigo-50 text-indigo-700 border-indigo-200',
    'Free Trial': 'bg-orange-50 text-orange-700 border-orange-200',
    'Paid': 'bg-slate-100 text-slate-700 border-slate-200',
  };

  return (
    <div
      id={`tool-card-${tool.id}`}
      className="group bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-indigo-300/80 transition-all duration-200 flex flex-col justify-between overflow-hidden"
    >
      <div className="p-5 sm:p-6 space-y-4">
        {/* Header: Icon, Name, Category & Bookmark Button */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-slate-100/90 group-hover:bg-indigo-50 border border-slate-200/80 group-hover:border-indigo-200 flex items-center justify-center text-indigo-600 transition-colors shrink-0">
              <IconComponent className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-base sm:text-lg group-hover:text-indigo-600 transition-colors">
                  {tool.name}
                </h3>
                {tool.featured && (
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200/60">
                    Featured
                  </span>
                )}
              </div>
              <span className="inline-block text-xs font-semibold text-slate-500">
                {tool.category}
              </span>
            </div>
          </div>

          <button
            id={`bookmark-tool-${tool.id}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleSaveTool(tool.id);
            }}
            className={`p-2 rounded-xl transition-all border shrink-0 ${
              saved
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm shadow-indigo-600/20'
                : 'bg-slate-50 text-slate-400 hover:text-slate-700 hover:bg-slate-100 border-slate-200/80'
            }`}
            title={saved ? 'Remove from Saved Library' : 'Save to Library'}
            aria-label={saved ? 'Remove from Library' : 'Save to Library'}
          >
            <Bookmark className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Tagline / Description */}
        <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
          {tool.description}
        </p>

        {/* Primary Use Case */}
        {!compact && (
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600">
            <span className="font-bold text-slate-700 block mb-0.5">Primary Use Case:</span>
            <p className="text-slate-600 line-clamp-2">{tool.primaryUseCase}</p>
          </div>
        )}

        {/* Meta badges: Difficulty & Pricing */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span
            className={`text-xs px-2.5 py-1 rounded-lg font-semibold border ${
              difficultyColors[tool.difficulty] || 'bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            {tool.difficulty}
          </span>
          <span
            className={`text-xs px-2.5 py-1 rounded-lg font-semibold border ${
              pricingColors[tool.pricing] || 'bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            {tool.pricing}
          </span>
        </div>
      </div>

      {/* Footer Action Buttons */}
      <div className="px-5 py-3.5 sm:px-6 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between gap-3">
        <button
          id={`view-tool-guide-${tool.id}`}
          onClick={() => openToolModal(tool)}
          className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5 transition-colors"
        >
          <span>Starter Tips & Prompts</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>

        <a
          id={`visit-tool-${tool.id}`}
          href={tool.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-xs font-semibold text-slate-700 hover:text-slate-900 shadow-2xs hover:bg-slate-50 transition-all"
        >
          <span>Visit</span>
          <ExternalLink className="w-3 h-3 text-slate-400" />
        </a>
      </div>
    </div>
  );
};
