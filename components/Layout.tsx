
import React from 'react';
import { Page, Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { Home, Utensils, Dumbbell, Wallet, User, Droplets } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: Page;
  onNavigate: (page: Page) => void;
  language: Language;
  toggleLanguage: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  currentPage, 
  onNavigate, 
  language,
  toggleLanguage 
}) => {
  const t = TRANSLATIONS[language];

  const navItems = [
    { page: Page.DASHBOARD, icon: Home, label: t.dashboard },
    { page: Page.DIET, icon: Utensils, label: t.diet },
    { page: Page.WATER, icon: Droplets, label: t.water },
    { page: Page.EXERCISE, icon: Dumbbell, label: t.exercise },
    { page: Page.FINANCE, icon: Wallet, label: t.finance },
    { page: Page.PROFILE, icon: User, label: t.profile },
  ];

  return (
    <div className="flex flex-col h-screen bg-soft overflow-hidden font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm px-4 py-3 flex justify-between items-center z-10">
        <div className="flex items-center space-x-2">
          <div className="bg-primary/10 p-2 rounded-full">
            <span className="text-xl font-bold text-primary">JD</span>
          </div>
          <h1 className="text-lg font-bold text-gray-800 hidden sm:block">Doctor JD Challenge</h1>
        </div>
        <button 
          onClick={toggleLanguage}
          className="px-3 py-1 bg-gray-100 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-200"
        >
          {language === Language.ENGLISH ? '🇺🇸 EN' : '🇪🇹 AM'}
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-24 relative">
        <div className="max-w-md mx-auto min-h-full">
           {children}
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 pb-safe pt-2 px-2 z-20">
        <div className="max-w-md mx-auto flex justify-between items-center">
          {navItems.map((item) => {
            const isActive = currentPage === item.page;
            return (
              <button
                key={item.page}
                onClick={() => onNavigate(item.page)}
                className={`flex flex-col items-center justify-center p-2 w-16 transition-colors duration-200 ${
                  isActive ? 'text-primary' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[10px] mt-1 font-medium truncate w-full text-center">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};