import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { ViewState } from './types';

// Components
import { Header } from './components/public/Header';
import { Footer } from './components/public/Footer';
import { Hero } from './components/public/Hero';
import { Services } from './components/public/Services';
import { BlogSection } from './components/public/BlogSection';
import { BlogPostDetail } from './components/public/BlogPostDetail';
import { Contact } from './components/public/Contact';
import { Login } from './components/admin/Login';
import { Dashboard } from './components/admin/Dashboard';
import { MetaHead } from './components/common/MetaHead';

const AppContent: React.FC = () => {
  const { currentView } = useApp();

  // Admin Routes (Full Page)
  if (currentView === ViewState.LOGIN) {
    return <Login />;
  }

  if (currentView === ViewState.ADMIN_DASHBOARD) {
    return <Dashboard />;
  }

  // Public Layout
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      
      <main className="flex-grow">
        {currentView === ViewState.PUBLIC_HOME && (
          <>
            <Hero />
            <Services />
            <BlogSection />
            <Contact />
          </>
        )}
        
        {currentView === ViewState.PUBLIC_BLOG && (
          <div className="pt-10">
            <BlogSection />
            <Contact />
          </div>
        )}

        {currentView === ViewState.PUBLIC_POST_DETAIL && (
           <div className="pt-0">
             <BlogPostDetail />
             <Contact />
           </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <MetaHead />
      <AppContent />
    </AppProvider>
  );
};

export default App;