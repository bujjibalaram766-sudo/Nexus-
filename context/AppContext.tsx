import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppState, BlogPost, SiteConfig, ViewState } from '../types';
import { DEFAULT_CONFIG, INITIAL_POSTS } from '../constants';

interface AppContextType {
  state: AppState;
  currentView: ViewState;
  activePostId: string | null;
  setView: (view: ViewState) => void;
  viewPost: (id: string) => void;
  updateConfig: (config: SiteConfig) => void;
  addPost: (post: BlogPost) => void;
  updatePost: (post: BlogPost) => void;
  deletePost: (id: string) => void;
  login: () => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'amgochat_db_v1';

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize state from LocalStorage or Defaults
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      config: DEFAULT_CONFIG,
      posts: INITIAL_POSTS,
      isAuthenticated: false
    };
  });

  const [currentView, setView] = useState<ViewState>(ViewState.PUBLIC_HOME);
  const [activePostId, setActivePostId] = useState<string | null>(null);

  // Sync to LocalStorage whenever state changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    
    // Update CSS variables for dynamic theming
    const root = document.documentElement;
    root.style.setProperty('--primary-color', state.config.primaryColor);
    
    // Simple logic to darken the hover color slightly
    // In a real app we might use a color manipulation library
    root.style.setProperty('--primary-hover', state.config.primaryColor); 
    
    // Note: Document Title is now handled by the MetaHead component
  }, [state]);

  const updateConfig = (newConfig: SiteConfig) => {
    setState(prev => ({ ...prev, config: newConfig }));
  };

  const addPost = (post: BlogPost) => {
    setState(prev => ({ ...prev, posts: [post, ...prev.posts] }));
  };

  const updatePost = (updatedPost: BlogPost) => {
    setState(prev => ({
      ...prev,
      posts: prev.posts.map(p => p.id === updatedPost.id ? updatedPost : p)
    }));
  };

  const deletePost = (id: string) => {
    setState(prev => ({
      ...prev,
      posts: prev.posts.filter(p => p.id !== id)
    }));
  };

  const viewPost = (id: string) => {
    setActivePostId(id);
    setView(ViewState.PUBLIC_POST_DETAIL);
    window.scrollTo(0, 0);
  };

  const login = () => {
    setState(prev => ({ ...prev, isAuthenticated: true }));
    setView(ViewState.ADMIN_DASHBOARD);
  };

  const logout = () => {
    setState(prev => ({ ...prev, isAuthenticated: false }));
    setView(ViewState.LOGIN);
  };

  return (
    <AppContext.Provider value={{ 
      state, 
      currentView,
      activePostId,
      setView,
      viewPost,
      updateConfig, 
      addPost, 
      updatePost, 
      deletePost,
      login,
      logout
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};