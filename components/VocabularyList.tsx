import React from 'react';
import { SavedWord } from '../types';

interface VocabularyListProps {
  savedWords: SavedWord[];
  onDelete: (word: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const VocabularyList: React.FC<VocabularyListProps> = ({ savedWords, onDelete, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
     <>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-30 animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      ></div>
       <aside 
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-surface-light dark:bg-surface-dark shadow-2xl z-40 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="vocab-title"
      >
        <div className="p-6 flex justify-between items-center border-b border-gray-200 dark:border-slate-700">
          <h2 id="vocab-title" className="text-xl font-bold">Saved Vocabulary</h2>
           <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700"
            aria-label="Close vocabulary panel"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6 overflow-y-auto h-[calc(100%-73px)]">
          {savedWords.length === 0 ? (
            <p className="text-subtle-light dark:text-subtle-dark text-center mt-8">No words saved yet. Click on a word in the text to save it.</p>
          ) : (
            <ul className="space-y-3">
              {savedWords.map((item, index) => (
                <li key={index} className="flex justify-between items-center p-3 bg-background-light dark:bg-background-dark rounded-md border border-gray-200 dark:border-slate-700 group">
                  <div>
                    <span className="font-medium">{item.word}</span>
                    <span className="text-xs text-subtle-light dark:text-subtle-dark ml-2">({item.date})</span>
                  </div>
                  <button 
                    onClick={() => onDelete(item.word)} 
                    className="p-1 rounded-full text-subtle-light dark:text-subtle-dark hover:bg-red-100 dark:hover:bg-red-900/50 hover:text-red-600 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label={`Delete word: ${item.word}`}
                  >
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>
    </>
  );
};

export default VocabularyList;
