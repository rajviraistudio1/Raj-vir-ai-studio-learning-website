import React, { createContext, useContext, useState, useEffect } from 'react';
import { AITool, LearningResource, NewsletterSubscriber, PageTab, ToastMessage } from '../types';
import { AI_TOOLS } from '../data/toolsData';
import { LEARNING_RESOURCES } from '../data/learnData';

interface AppContextType {
  currentTab: PageTab;
  setCurrentTab: (tab: PageTab) => void;
  savedToolIds: string[];
  savedResourceIds: string[];
  toggleSaveTool: (toolId: string) => void;
  toggleSaveResource: (resourceId: string) => void;
  isToolSaved: (toolId: string) => boolean;
  isResourceSaved: (resourceId: string) => boolean;
  savedTools: AITool[];
  savedResources: LearningResource[];
  globalSearch: string;
  setGlobalSearch: (query: string) => void;
  toasts: ToastMessage[];
  addToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
  activeToolModal: AITool | null;
  openToolModal: (tool: AITool) => void;
  closeToolModal: () => void;
  activeResourceModal: LearningResource | null;
  openResourceModal: (resource: LearningResource) => void;
  closeResourceModal: () => void;
  subscribeNewsletter: (name: string, email: string) => { success: boolean; message: string };
  subscribersCount: number;
  navigateTo: (tab: PageTab, options?: { search?: string; category?: string }) => void;
  initialToolCategory: string | null;
  initialLearnCategory: string | null;
  setInitialToolCategory: (cat: string | null) => void;
  setInitialLearnCategory: (cat: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_TOOLS_KEY = 'rajvir_ai_studio_saved_tools_v1';
const LOCAL_STORAGE_RESOURCES_KEY = 'rajvir_ai_studio_saved_resources_v1';
const LOCAL_STORAGE_SUBSCRIBERS_KEY = 'rajvir_ai_studio_subscribers_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTab, setCurrentTab] = useState<PageTab>('home');
  const [globalSearch, setGlobalSearch] = useState<string>('');
  const [initialToolCategory, setInitialToolCategory] = useState<string | null>(null);
  const [initialLearnCategory, setInitialLearnCategory] = useState<string | null>(null);

  // Initialize saved items with local storage or friendly starter defaults
  const [savedToolIds, setSavedToolIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_TOOLS_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return ['chatgpt', 'perplexity'];
  });

  const [savedResourceIds, setSavedResourceIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_RESOURCES_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return ['beginners-guide-chatgpt-2025'];
  });

  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_SUBSCRIBERS_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return [];
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [activeToolModal, setActiveToolModal] = useState<AITool | null>(null);
  const [activeResourceModal, setActiveResourceModal] = useState<LearningResource | null>(null);

  // Save to localStorage whenever bookmarks change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_TOOLS_KEY, JSON.stringify(savedToolIds));
    } catch (e) {
      console.error('Failed to persist saved tools', e);
    }
  }, [savedToolIds]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_RESOURCES_KEY, JSON.stringify(savedResourceIds));
    } catch (e) {
      console.error('Failed to persist saved resources', e);
    }
  }, [savedResourceIds]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_SUBSCRIBERS_KEY, JSON.stringify(subscribers));
    } catch (e) {
      console.error('Failed to persist subscribers', e);
    }
  }, [subscribers]);

  const addToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleSaveTool = (toolId: string) => {
    const tool = AI_TOOLS.find((t) => t.id === toolId);
    const toolName = tool ? tool.name : 'Tool';
    if (savedToolIds.includes(toolId)) {
      setSavedToolIds((prev) => prev.filter((id) => id !== toolId));
      addToast(`Removed "${toolName}" from your Library`, 'info');
    } else {
      setSavedToolIds((prev) => [...prev, toolId]);
      addToast(`Saved "${toolName}" to your Library!`, 'success');
    }
  };

  const toggleSaveResource = (resourceId: string) => {
    const res = LEARNING_RESOURCES.find((r) => r.id === resourceId);
    const resTitle = res ? res.title : 'Resource';
    if (savedResourceIds.includes(resourceId)) {
      setSavedResourceIds((prev) => prev.filter((id) => id !== resourceId));
      addToast(`Removed guide from your Library`, 'info');
    } else {
      setSavedResourceIds((prev) => [...prev, resourceId]);
      addToast(`Saved "${resTitle.slice(0, 32)}..." to your Library!`, 'success');
    }
  };

  const isToolSaved = (toolId: string) => savedToolIds.includes(toolId);
  const isResourceSaved = (resourceId: string) => savedResourceIds.includes(resourceId);

  const savedTools = AI_TOOLS.filter((t) => savedToolIds.includes(t.id));
  const savedResources = LEARNING_RESOURCES.filter((r) => savedResourceIds.includes(r.id));

  const subscribeNewsletter = (name: string, email: string): { success: boolean; message: string } => {
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName) {
      return { success: false, message: 'Please provide your name.' };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      return { success: false, message: 'Please enter a valid email address.' };
    }

    if (subscribers.some((s) => s.email === cleanEmail)) {
      return { success: true, message: `Welcome back, ${cleanName}! You're already on the Raj Vir AI Studio insider list.` };
    }

    const newSub: NewsletterSubscriber = {
      name: cleanName,
      email: cleanEmail,
      subscribedAt: new Date().toISOString(),
    };

    setSubscribers((prev) => [newSub, ...prev]);
    addToast(`Thank you, ${cleanName}! You're now subscribed to Raj Vir AI Studio.`, 'success');
    return { success: true, message: `Welcome to the community, ${cleanName}! Check your inbox soon for your starter guide.` };
  };

  const navigateTo = (tab: PageTab, options?: { search?: string; category?: string }) => {
    setCurrentTab(tab);
    if (options?.search !== undefined) {
      setGlobalSearch(options.search);
    }
    if (tab === 'tools' && options?.category) {
      setInitialToolCategory(options.category);
    }
    if (tab === 'learn' && options?.category) {
      setInitialLearnCategory(options.category);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AppContext.Provider
      value={{
        currentTab,
        setCurrentTab,
        savedToolIds,
        savedResourceIds,
        toggleSaveTool,
        toggleSaveResource,
        isToolSaved,
        isResourceSaved,
        savedTools,
        savedResources,
        globalSearch,
        setGlobalSearch,
        toasts,
        addToast,
        removeToast,
        activeToolModal,
        openToolModal: (tool) => setActiveToolModal(tool),
        closeToolModal: () => setActiveToolModal(null),
        activeResourceModal,
        openResourceModal: (res) => setActiveResourceModal(res),
        closeResourceModal: () => setActiveResourceModal(null),
        subscribeNewsletter,
        subscribersCount: subscribers.length + 1420, // realistic starter count
        navigateTo,
        initialToolCategory,
        initialLearnCategory,
        setInitialToolCategory,
        setInitialLearnCategory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
