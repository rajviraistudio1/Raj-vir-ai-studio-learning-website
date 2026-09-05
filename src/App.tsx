import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/Toast';
import { ToolModal } from './components/ToolModal';
import { ResourceModal } from './components/ResourceModal';
import { HomePage } from './pages/HomePage';
import { ToolsPage } from './pages/ToolsPage';
import { LearnPage } from './pages/LearnPage';
import { LibraryPage } from './pages/LibraryPage';
import { AboutPage } from './pages/AboutPage';

const AppContent: React.FC = () => {
  const { currentTab } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <Navbar />

      <main className="flex-1">
        {currentTab === 'home' && <HomePage />}
        {currentTab === 'tools' && <ToolsPage />}
        {currentTab === 'learn' && <LearnPage />}
        {currentTab === 'library' && <LibraryPage />}
        {currentTab === 'about' && <AboutPage />}
      </main>

      <Footer />

      {/* Modals & Global Notifications */}
      <ToolModal />
      <ResourceModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
