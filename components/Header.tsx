import React from 'react';

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  onApiKeyClick: () => void;
  onHistoryClick: () => void;
  onVocabClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme, onApiKeyClick, onHistoryClick, onVocabClick }) => {
  return (
    <header className="bg-surface-light dark:bg-surface-dark shadow-md sticky top-0 z-20">
      <div className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold text-primary-light dark:text-primary-dark">
          IELTS Bilingual Paragraph Generator
        </h1>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button
            onClick={onHistoryClick}
            aria-label="View history"
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-subtle-light dark:text-subtle-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          <button
            onClick={onVocabClick}
            aria-label="View saved words"
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
          >
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-subtle-light dark:text-subtle-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
           <button
            onClick={onApiKeyClick}
            aria-label="Set API Key"
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-subtle-light dark:text-subtle-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7h2a2 2 0 012 2v6a2 2 0 01-2 2h-2m-6 0H7a2 2 0 01-2-2V9a2 2 0 012-2h2m-4 6h.01M12 6h.01M12 12h.01M12 18h.01M17 6h.01M17 12h.01" />
            </svg>
          </button>
          
          {/* Theme Toggle */}
          <button onClick={toggleTheme} className="relative inline-flex items-center h-6 rounded-full w-11 transition-colors bg-gray-200 dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light dark:focus:ring-primary-dark">
            <span className="sr-only">Toggle theme</span>
            <span className={`${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full transition-transform`} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
