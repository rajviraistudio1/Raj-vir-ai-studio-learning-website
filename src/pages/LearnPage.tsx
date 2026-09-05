import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { LEARNING_RESOURCES, LEARNING_PATHS, RESOURCE_CATEGORIES } from '../data/learnData';
import { ResourceCard } from '../components/ResourceCard';
import { DifficultyLevel, ResourceCategory } from '../types';
import {
  GraduationCap,
  Search,
  BookOpen,
  Sparkles,
  Compass,
  CheckCircle2,
  Clock,
  ArrowRight,
  Filter,
  RefreshCw,
  X
} from 'lucide-react';

export const LearnPage: React.FC = () => {
  const { globalSearch, setGlobalSearch, initialLearnCategory, setInitialLearnCategory } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>(initialLearnCategory || 'All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedFormat, setSelectedFormat] = useState<string>('All');

  // Handle external category deep link
  useEffect(() => {
    if (initialLearnCategory) {
      setSelectedCategory(initialLearnCategory);
      setInitialLearnCategory(null);
    }
  }, [initialLearnCategory, setInitialLearnCategory]);

  const filteredResources = useMemo(() => {
    return LEARNING_RESOURCES.filter((res) => {
      // Category filter
      if (selectedCategory !== 'All' && res.category !== selectedCategory) {
        return false;
      }
      // Difficulty filter
      if (selectedDifficulty !== 'All' && res.difficulty !== selectedDifficulty) {
        return false;
      }
      // Format filter
      if (selectedFormat !== 'All' && res.format !== selectedFormat) {
        return false;
      }
      // Search query
      if (globalSearch.trim()) {
        const query = globalSearch.toLowerCase();
        const matchTitle = res.title.toLowerCase().includes(query);
        const matchDesc = res.shortDescription.toLowerCase().includes(query);
        const matchCat = res.category.toLowerCase().includes(query);
        const matchTags = res.tags.some((t) => t.toLowerCase().includes(query));
        return matchTitle || matchDesc || matchCat || matchTags;
      }
      return true;
    });
  }, [selectedCategory, selectedDifficulty, selectedFormat, globalSearch]);

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedDifficulty('All');
    setSelectedFormat('All');
    setGlobalSearch('');
  };

  const hasActiveFilters =
    selectedCategory !== 'All' ||
    selectedDifficulty !== 'All' ||
    selectedFormat !== 'All' ||
    globalSearch.trim() !== '';

  return (
    <div id="learn-page-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      
      {/* Header Banner */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider border border-indigo-200">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>AI Knowledge Base & Tutorials</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Learn AI Step-by-Step
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
          Beginner-friendly tutorials, prompt engineering formulas, and real-world workflows. Master AI without feeling overwhelmed by technical jargon.
        </p>
      </div>

      {/* Featured Learning Paths Showcase */}
      <section id="learn-paths-showcase" className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
            <Compass className="w-5 h-5 text-indigo-600" />
            <span>Structured Beginner Paths</span>
          </div>
          <span className="text-xs text-slate-500 font-medium">4 Core Tracks</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {LEARNING_PATHS.map((path, idx) => (
            <div
              key={path.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs hover:shadow-md hover:border-indigo-300 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-indigo-600">Track 0{idx + 1}</span>
                  <span className="flex items-center gap-1 text-slate-500 font-medium">
                    <Clock className="w-3 h-3" />
                    {path.duration}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm leading-snug">
                  {path.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {path.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  {path.level}
                </span>
                <span className="text-slate-500 font-medium">{path.stepsCount} Modules</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Search & Filter Controls */}
      <div className="p-4 sm:p-5 bg-white rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <input
              id="learn-search-input"
              type="text"
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              placeholder="Search tutorials, prompting frameworks, or topics (e.g. 'C.R.E.A.T.E.', 'Zapier', 'email')..."
              className="w-full pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:border-indigo-500 outline-none transition-all"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            {globalSearch && (
              <button
                onClick={() => setGlobalSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Difficulty & Format Selectors */}
          <div className="flex items-center gap-2.5 overflow-x-auto">
            <select
              id="learn-difficulty-filter"
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 outline-none focus:border-indigo-500"
            >
              <option value="All">All Difficulties</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
            </select>

            <select
              id="learn-format-filter"
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 outline-none focus:border-indigo-500"
            >
              <option value="All">All Formats</option>
              <option value="Guide">Guide</option>
              <option value="Tutorial">Tutorial</option>
              <option value="Cheatsheet">Cheatsheet</option>
              <option value="Workflow">Workflow</option>
            </select>
          </div>
        </div>

        {/* Category Pills Slider */}
        <div className="pt-2 border-t border-slate-100 flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          <button
            id="learn-pill-all"
            onClick={() => setSelectedCategory('All')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === 'All'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Topics ({LEARNING_RESOURCES.length})
          </button>

          {RESOURCE_CATEGORIES.map((cat) => {
            const count = LEARNING_RESOURCES.filter((r) => r.category === cat).length;
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                id={`learn-pill-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-indigo-800 text-indigo-100' : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <div>
          Showing <strong className="text-slate-800 font-bold">{filteredResources.length}</strong> learning resources
          {selectedCategory !== 'All' && (
            <span> in <span className="text-indigo-600 font-semibold">{selectedCategory}</span></span>
          )}
        </div>

        {hasActiveFilters && (
          <button
            onClick={handleResetFilters}
            className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-semibold"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset Filters</span>
          </button>
        )}
      </div>

      {/* Resource Cards Grid */}
      {filteredResources.length > 0 ? (
        <div id="learn-grid-results" className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredResources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div
          id="learn-empty-state"
          className="bg-white rounded-3xl border border-dashed border-slate-300 p-12 text-center space-y-4 max-w-lg mx-auto"
        >
          <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <BookOpen className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">No Learning Resources Match</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            We couldn't find any tutorials matching your current filter criteria. Try resetting your search filters.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-xs hover:bg-indigo-700 transition-colors"
          >
            Clear Filters & View All
          </button>
        </div>
      )}

    </div>
  );
};
