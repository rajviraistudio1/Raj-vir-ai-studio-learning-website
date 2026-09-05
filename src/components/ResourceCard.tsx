import React from 'react';
import { LearningResource } from '../types';
import { useApp } from '../context/AppContext';
import {
  Bookmark,
  Clock,
  BookOpen,
  ArrowRight,
  Sparkles,
  Flame,
  CheckCircle2,
  FileText
} from 'lucide-react';

interface ResourceCardProps {
  resource: LearningResource;
  compact?: boolean;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({ resource, compact = false }) => {
  const { toggleSaveResource, isResourceSaved, openResourceModal } = useApp();
  const saved = isResourceSaved(resource.id);

  const formatColors: Record<string, string> = {
    'Guide': 'bg-sky-50 text-sky-700 border-sky-200/80',
    'Tutorial': 'bg-indigo-50 text-indigo-700 border-indigo-200/80',
    'Cheatsheet': 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    'Workflow': 'bg-purple-50 text-purple-700 border-purple-200/80',
    'Walkthrough': 'bg-amber-50 text-amber-700 border-amber-200/80',
  };

  return (
    <div
      id={`resource-card-${resource.id}`}
      className="group bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-indigo-300/80 transition-all duration-200 flex flex-col justify-between overflow-hidden"
    >
      <div className="p-5 sm:p-6 space-y-3.5">
        {/* Top Badges & Bookmark */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${
                formatColors[resource.format] || 'bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              {resource.format}
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full font-medium bg-slate-100 text-slate-600 border border-slate-200/70">
              {resource.category}
            </span>
            {resource.popular && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 border border-orange-200">
                <Flame className="w-3 h-3 text-orange-500" />
                Popular
              </span>
            )}
          </div>

          <button
            id={`bookmark-resource-${resource.id}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleSaveResource(resource.id);
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

        {/* Title */}
        <h3
          onClick={() => openResourceModal(resource)}
          className="font-bold text-slate-900 text-base sm:text-lg leading-snug group-hover:text-indigo-600 transition-colors cursor-pointer"
        >
          {resource.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
          {resource.shortDescription}
        </p>

        {/* Key Takeaways preview if not compact */}
        {!compact && resource.takeaways && resource.takeaways.length > 0 && (
          <div className="space-y-1.5 pt-1">
            <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400">
              Key Lesson:
            </span>
            <div className="text-xs text-slate-600 flex items-start gap-1.5 line-clamp-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
              <span className="truncate">{resource.takeaways[0]}</span>
            </div>
          </div>
        )}
      </div>

      {/* Footer Info & Read Trigger */}
      <div className="px-5 py-3.5 sm:px-6 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between gap-3 text-xs text-slate-500">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 font-medium text-slate-600">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            {resource.readTime}
          </span>
          <span>•</span>
          <span
            className={`font-semibold ${
              resource.difficulty === 'Beginner' ? 'text-emerald-600' : 'text-amber-600'
            }`}
          >
            {resource.difficulty}
          </span>
        </div>

        <button
          id={`read-resource-${resource.id}`}
          onClick={() => openResourceModal(resource)}
          className="inline-flex items-center gap-1 font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          <span>Read Guide</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};
