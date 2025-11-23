import React, { useState } from 'react';
import { Menu, X, LogIn } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ViewState } from '../../types';
import { Button } from '../ui/Button';

export const Header: React.FC = () => {
  const { state, setView, currentView } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', view: ViewState.PUBLIC_HOME },
    { label: 'Blog', view: ViewState.PUBLIC_BLOG },
  ];

  const handleNavClick = (view: ViewState) => {
    setView(view);
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => handleNavClick(ViewState.PUBLIC_HOME)}
        >
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-xl">A</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">{state.config.siteName}</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.view)}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                currentView === item.view ? 'text-primary' : 'text-slate-600'
              }`}
            >
              {item.label}
            </button>
          ))}
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setView(state.isAuthenticated ? ViewState.ADMIN_DASHBOARD : ViewState.LOGIN)}
          >
            {state.isAuthenticated ? 'Dashboard' : 'Login'}
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-slate-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.view)}
                className="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-slate-600 hover:bg-slate-50 hover:text-primary"
              >
                {item.label}
              </button>
            ))}
            <div className="pt-4">
              <Button 
                fullWidth 
                variant="outline" 
                onClick={() => {
                  setView(state.isAuthenticated ? ViewState.ADMIN_DASHBOARD : ViewState.LOGIN);
                  setIsMobileMenuOpen(false);
                }}
              >
                <LogIn className="mr-2 h-4 w-4" />
                {state.isAuthenticated ? 'Go to Dashboard' : 'Owner Login'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};