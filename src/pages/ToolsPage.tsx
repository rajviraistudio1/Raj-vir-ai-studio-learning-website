import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { AI_TOOLS, TOOL_CATEGORIES } from '../data/toolsData';
import { ToolCard } from '../components/ToolCard';
import { ToolCategory, AudienceLevel } from '../types';
import {
  Search,
  Filter,
  Wrench,
  Sparkles,
  SlidersHorizontal,
  X,
  RefreshCw,
  Check
} from 'lucide-react';

export const ToolsPage: React.FC = () => {
  const { globalSearch, setGlobalSearch, initialToolCategory, setInitialToolCategory } = useApp();
  
  const [selectedCategory, setSelectedCategory] = useState<string>(initialToolCategory || 'All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedPricing, setSelectedPricing] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'name' | 'category'>('featured');

  // Handle external category deep link
  useEffect(() => {
    if (initialToolCategory) {
      setSelectedCategory(initialToolCategory);
      setInitialToolCategory(null);
    }
  }, [initialToolCategory, setInitialToolCategory]);

  const filteredTools = useMemo(() => {
    return AI_TOOLS.filter((tool) => {
      // Category filter
      if (selectedCategory !== 'All' && tool.category !== selectedCategory) {
        return false;
      }
      // Difficulty filter
      if (selectedDifficulty !== 'All' && tool.difficulty !== selectedDifficulty) {
        return false;
      }
      // Pricing filter
      if (selectedPricing !== 'All' && tool.pricing !== selectedPricing) {
        return false;
      }
      // Search query
      if (globalSearch.trim()) {
        const query = globalSearch.toLowerCase();
        const matchName = tool.name.toLowerCase().includes(query);
        const matchDesc = tool.description.toLowerCase().includes(query);
        const matchCat = tool.category.toLowerCase().includes(query);
        const matchUseCase = tool.primaryUseCase.toLowerCase().includes(query);
        const matchTagline = tool.tagline.toLowerCase().includes(query);
        return matchName || matchDesc || matchCat || matchUseCase || matchTagline;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'featured') {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return a.name.localeCompare(b.name);
      }
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === 'category') {
        return a.category.localeCompare(b.category);
      }
      return 0;
    });
  }, [selectedCategory, selectedDifficulty, selectedPricing, globalSearch, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedDifficulty('All');
    setSelectedPricing('All');
    setGlobalSearch('');
    setSortBy('featured');
  };

  const hasActiveFilters =
    selectedCategory !== 'All' ||
    selectedDifficulty !== 'All' ||
    selectedPricing !== 'All' ||
    globalSearch.trim() !== '';

  return (
    <div id="tools-page-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Header Banner */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider border border-indigo-200">
          <Wrench className="w-3.5 h-3.5" />
          <span>Curated AI Directory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Discover the Best AI Tools
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
          Explore our vetted directory of beginner-friendly AI applications. Filter by category, use case, or difficulty level to find the exact tool for your needs.
        </p>
      </div>

      {/* Search & Main Controls Bar */}
      <div className="p-4 sm:p-5 bg-white rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <input
              id="tools-search-input"
              type="text"
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              placeholder="Search tools by name, keyword, or use case (e.g., 'transcription', 'ChatGPT', 'video')..."
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

          {/* Secondary Filters: Difficulty & Sort */}
          <div className="flex items-center gap-2.5 overflow-x-auto pb-1 md:pb-0">
            <select
              id="tools-difficulty-filter"
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 outline-none focus:border-indigo-500"
            >
              <option value="All">All Audiences / Levels</option>
              <option value="Beginner Friendly">Beginner Friendly</option>
              <option value="No-Code">No-Code</option>
              <option value="Intermediate">Intermediate</option>
            </select>

            <select
              id="tools-pricing-filter"
              value={selectedPricing}
              onChange={(e) => setSelectedPricing(e.target.value)}
              className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 outline-none focus:border-indigo-500"
            >
              <option value="All">All Pricing</option>
              <option value="Free">Free</option>
              <option value="Freemium">Freemium</option>
              <option value="Free Trial">Free Trial</option>
              <option value="Paid">Paid</option>
            </select>

            <select
              id="tools-sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'featured' | 'name' | 'category')}
              className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 outline-none focus:border-indigo-500"
            >
              <option value="featured">Sort: Featured First</option>
              <option value="name">Sort: Name (A-Z)</option>
              <option value="category">Sort: Category</option>
            </select>
          </div>
        </div>

        {/* Category Pills Slider */}
        <div className="pt-2 border-t border-slate-100 flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          <button
            id="category-pill-all"
            onClick={() => setSelectedCategory('All')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === 'All'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Categories ({AI_TOOLS.length})
          </button>

          {TOOL_CATEGORIES.map((cat) => {
            const count = AI_TOOLS.filter((t) => t.category === cat).length;
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                id={`category-pill-${cat.toLowerCase().replace(/\s+/g, '-')}`}
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

      {/* Active Filter Indicators & Results Count */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <div>
          Showing <strong className="text-slate-800 font-bold">{filteredTools.length}</strong> of{' '}
          <strong className="text-slate-800 font-bold">{AI_TOOLS.length}</strong> vetted AI tools
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
            <span>Reset All Filters</span>
          </button>
        )}
      </div>

      {/* Tools Grid */}
      {filteredTools.length > 0 ? (
        <div id="tools-grid-results" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div
          id="tools-empty-state"
          className="bg-white rounded-3xl border border-dashed border-slate-300 p-12 text-center space-y-4 max-w-lg mx-auto"
        >
          <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Search className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">No AI Tools Match Your Filters</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            We couldn't find any tools matching "{globalSearch || selectedCategory}". Try clearing your search term or selecting a different category.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-xs hover:bg-indigo-700 transition-colors"
          >
            Clear All Filters & Show All Tools
          </button>
        </div>
      )}

    </div>
  );
};
