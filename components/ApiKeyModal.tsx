import React, { useState, useEffect } from 'react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (apiKey: string) => void;
  currentApiKey: string | null;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose, onSave, currentApiKey }) => {
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    // Sync local state if the modal is opened with a pre-existing key
    if (isOpen) {
        setApiKey(currentApiKey || '');
    }
  }, [isOpen, currentApiKey]);


  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onSave(apiKey.trim());
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center animate-fade-in" onClick={onClose}>
      <div className="bg-surface-light dark:bg-surface-dark rounded-lg shadow-xl p-8 w-full max-w-md m-4" onClick={e => e.stopPropagation()}>
        <form onSubmit={handleSave}>
            <h2 className="text-2xl font-bold mb-4">Set API Key</h2>
            <p className="text-subtle-light dark:text-subtle-dark mb-6">
            Please enter your Google Gemini API key. Your key is stored securely in your browser's local storage.
            </p>
            <div className="space-y-4">
            <label htmlFor="api-key-input" className="block text-sm font-medium">
                Gemini API Key
            </label>
            <input
                id="api-key-input"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full p-3 bg-background-light dark:bg-background-dark border border-gray-300 dark:border-slate-600 rounded-md focus:ring-primary-light dark:focus:ring-primary-dark"
                placeholder="Enter your API key"
                autoFocus
            />
            </div>
            <div className="mt-8 flex justify-end space-x-4">
            <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 rounded-md text-text-light dark:text-text-dark bg-gray-200 dark:bg-slate-600 hover:bg-gray-300 dark:hover:bg-slate-500 transition-colors"
            >
                Cancel
            </button>
            <button
                type="submit"
                disabled={!apiKey.trim()}
                className="px-6 py-2 rounded-md bg-primary-light text-white font-bold hover:bg-blue-700 dark:bg-primary-dark dark:hover:bg-blue-500 transition-colors disabled:bg-gray-400 dark:disabled:bg-slate-500 disabled:cursor-not-allowed"
            >
                Save Key
            </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default ApiKeyModal;