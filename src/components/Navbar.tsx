import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PageTab } from '../types';
import {
  Sparkles,
  Compass,
  Wrench,
  GraduationCap,
  Bookmark,
  Info,
  Menu,
  X,
  Search,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentTab, navigateTo, savedToolIds, savedResourceIds, globalSearch, setGlobalSearch } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const totalSaved = savedToolIds.length + savedResourceIds.length;

  const navItems: { tab: PageTab; label: string; icon: React.ElementType }[] = [
    { tab: 'home', label: 'Home', icon: Compass },
    { tab: 'tools', label: 'AI Tools', icon: Wrench },
    { tab: 'learn', label: 'Learn', icon: GraduationCap },
    { tab: 'library', label: 'My Library', icon: Bookmark },
    { tab: 'about', label: 'About', icon: Info },
  ];

  const handleNavClick = (tab: PageTab) => {
    navigateTo(tab);
    setMobileMenuOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (globalSearch.trim()) {
      if (currentTab !== 'tools' && currentTab !== 'learn') {
        navigateTo('tools', { search: globalSearch });
      }
    }
  };

  return (
    <header
      id="main-navbar"
      className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Brand Logo & Name */}
          <button
            id="brand-logo-btn"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 group text-left shrink-0 cursor-pointer focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-sm shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-slate-900 text-lg tracking-tight group-hover:text-indigo-600 transition-colors">
                  Raj Vir
                </span>
                <span className="font-semibold text-indigo-600 text-lg tracking-tight">
                  AI Studio
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 -mt-1 tracking-wider uppercase">
                AI Learning Hub
              </p>
            </div>
          </button>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xs lg:max-w-md mx-4">
            <form onSubmit={handleSearchSubmit} className="w-full relative">
              <input
                id="navbar-search-input"
                type="text"
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                placeholder="Search tools, guides, prompting..."
                className={`w-full pl-9 pr-8 py-2 bg-slate-100/90 hover:bg-slate-100 focus:bg-white text-sm text-slate-800 placeholder-slate-400 rounded-full border transition-all outline-none ${
                  searchFocused
                    ? 'border-indigo-500 ring-2 ring-indigo-500/15 shadow-sm'
                    : 'border-slate-200/80'
                }`}
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              {globalSearch && (
                <button
                  type="button"
                  onClick={() => setGlobalSearch('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-full"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </form>
          </div>

          {/* Desktop Navigation Links */}
          <nav id="desktop-nav-links" className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const isActive = currentTab === item.tab;
              const Icon = item.icon;
              return (
                <button
                  key={item.tab}
                  id={`nav-link-${item.tab}`}
                  onClick={() => handleNavClick(item.tab)}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'text-indigo-600 bg-indigo-50/80 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.tab === 'library' && totalSaved > 0 && (
                    <span
                      id="nav-library-count-badge"
                      className="ml-0.5 px-1.5 py-0.2 text-[11px] font-bold rounded-full bg-indigo-600 text-white min-w-4 text-center"
                    >
                      {totalSaved}
                    </span>
                  )}
                  {isActive && (
                    <div className="absolute bottom-0 left-3 right-3 h-0.5 bg-indigo-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              id="mobile-search-toggle"
              onClick={() => handleNavClick('tools')}
              className="p-2 text-slate-600 hover:text-indigo-600 rounded-lg hover:bg-slate-100"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              id="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-drawer"
          className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top-2 duration-200"
        >
          {/* Mobile Search input */}
          <form onSubmit={handleSearchSubmit} className="relative mb-2">
            <input
              id="mobile-search-input"
              type="text"
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              placeholder="Search tools, guides, prompting..."
              className="w-full pl-9 pr-8 py-2.5 bg-slate-100 rounded-xl text-sm border border-slate-200 focus:border-indigo-500 focus:bg-white outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </form>

          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => {
              const isActive = currentTab === item.tab;
              const Icon = item.icon;
              return (
                <button
                  key={item.tab}
                  id={`mobile-nav-${item.tab}`}
                  onClick={() => handleNavClick(item.tab)}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.tab === 'library' && totalSaved > 0 && (
                      <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-indigo-600 text-white">
                        {totalSaved}
                      </span>
                    )}
                    <ChevronRight className="w-4 h-4 text-slate-300" />
                  </div>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Raj Vir AI Studio • MVP</span>
            <span className="text-indigo-600 font-medium">Stage 1 Active</span>
          </div>
        </div>
      )}
    </header>
  );
};
