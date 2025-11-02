import React, { useState, useEffect } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { generateBilingualText } from './services/geminiService';
import { GeneratedContent, SavedWord, HistoryEntry } from './types';
import Header from './components/Header';
import Controls from './components/Controls';
import ContentDisplay from './components/ContentDisplay';
import HistoryPanel from './components/HistoryPanel';
import VocabularyList from './components/VocabularyList';
import ApiKeyModal from './components/ApiKeyModal';
import SaveConfirmation from './components/SaveConfirmation';

const App: React.FC = () => {
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light');
  const [apiKey, setApiKey] = useLocalStorage<string | null>('gemini-api-key', null);
  const [isApiKeyModalOpen, setApiKeyModalOpen] = useState<boolean>(false);

  // Lift state up from Controls component
  const [ieltsBand, setIeltsBand] = useState('6.5 - 7.0');
  const [wordCount, setWordCount] = useState(100);
  const [topic, setTopic] = useState('Technology and its impact on society');

  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const [history, setHistory] = useLocalStorage<HistoryEntry[]>('generation-history', []);
  const [savedWords, setSavedWords] = useLocalStorage<SavedWord[]>('saved-words', []);

  const [isHistoryPanelOpen, setHistoryPanelOpen] = useState(false);
  const [isVocabPanelOpen, setVocabPanelOpen] = useState(false);
  
  const [savePopover, setSavePopover] = useState<{
    visible: boolean;
    text: string;
    top: number;
    left: number;
  }>({ visible: false, text: '', top: 0, left: 0 });


  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    if (!apiKey) {
      setApiKeyModalOpen(true);
    }
  }, [apiKey]);
  
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handleGenerate = async () => {
    if (!apiKey) {
      setError("API Key is not set. Please set it first.");
      setApiKeyModalOpen(true);
      return;
    }
    setLoading(true);
    setError(null);
    setGeneratedContent(null);
    try {
      const content = await generateBilingualText(ieltsBand, wordCount, topic, apiKey);
      setGeneratedContent(content);
      const newEntry: HistoryEntry = {
        id: new Date().toISOString(),
        date: new Date().toLocaleDateString(),
        title: content.title,
        content: content,
        // Save generation parameters with the history entry
        ieltsBand,
        wordCount,
        topic,
      };
      setHistory(prevHistory => [newEntry, ...prevHistory]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      setError(errorMessage);
      setApiKey(null);
      setApiKeyModalOpen(true);
    } finally {
      setLoading(false);
    }
  };
  
  const handleTextSelect = (text: string, rect: DOMRect) => {
    const cleanText = text.trim();
    if (!cleanText) return;

    setSavePopover({
        visible: true,
        text: cleanText,
        top: rect.bottom + window.scrollY + 5,
        left: rect.left + window.scrollX,
    });
  };

  const handleConfirmSave = (wordToSave: string) => {
    if (wordToSave && !savedWords.some(w => w.word === wordToSave)) {
      setSavedWords(prev => [...prev, { word: wordToSave, date: new Date().toLocaleDateString() }]);
    }
    setSavePopover({ visible: false, text: '', top: 0, left: 0 });
  };

  const handleCancelSave = () => {
    setSavePopover({ visible: false, text: '', top: 0, left: 0 });
  };
  
  const handleSelectHistory = (entry: HistoryEntry) => {
    // Restore both content and the controls' state
    setGeneratedContent(entry.content);
    setIeltsBand(entry.ieltsBand);
    setWordCount(entry.wordCount);
    setTopic(entry.topic);
    setError(null); // Clear any previous errors
    setHistoryPanelOpen(false);
  };
  
  const handleDeleteHistory = (id: string) => {
    setHistory(prev => prev.filter(entry => entry.id !== id));
  };
  
  const handleDeleteWord = (word: string) => {
    setSavedWords(prev => prev.filter(w => w.word !== word));
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 bg-background-light dark:bg-background-dark`}>
      <Header 
        theme={theme}
        toggleTheme={toggleTheme}
        onApiKeyClick={() => setApiKeyModalOpen(true)}
        onHistoryClick={() => setHistoryPanelOpen(true)}
        onVocabClick={() => setVocabPanelOpen(true)}
      />

      <main className="container mx-auto p-4 md:p-8">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-1 gap-8 items-start">
          
          <div className="w-full space-y-8">
            <Controls 
              onGenerate={handleGenerate} 
              loading={loading} 
              disabled={!apiKey}
              ieltsBand={ieltsBand}
              setIeltsBand={setIeltsBand}
              wordCount={wordCount}
              setWordCount={setWordCount}
              topic={topic}
              setTopic={setTopic}
            />
            
            {error && <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded-md animate-fade-in" role="alert">{error}</div>}
            
            {loading && (
              <div className="flex flex-col items-center justify-center p-8 bg-surface-light dark:bg-surface-dark rounded-lg shadow-md min-h-[200px]">
                <div className="border-4 border-primary-light dark:border-primary-dark border-t-transparent rounded-full w-12 h-12 animate-spin"></div>
                <p className="mt-4 text-subtle-light dark:text-subtle-dark">Generating your text...</p>
              </div>
            )}
            
            {generatedContent && !loading && !error && (
              <ContentDisplay
                content={generatedContent}
                onTextSelect={handleTextSelect}
              />
            )}
          </div>

        </div>
      </main>

      <HistoryPanel
        isOpen={isHistoryPanelOpen}
        onClose={() => setHistoryPanelOpen(false)}
        history={history}
        onSelect={handleSelectHistory}
        onDelete={handleDeleteHistory}
      />

      <VocabularyList
        isOpen={isVocabPanelOpen}
        onClose={() => setVocabPanelOpen(false)}
        savedWords={savedWords}
        onDelete={handleDeleteWord}
      />
      
      {savePopover.visible && (
        <SaveConfirmation
            text={savePopover.text}
            position={{ top: savePopover.top, left: savePopover.left }}
            onConfirm={handleConfirmSave}
            onCancel={handleCancelSave}
        />
      )}

      <ApiKeyModal 
        isOpen={isApiKeyModalOpen}
        onClose={() => setApiKeyModalOpen(false)}
        onSave={(key) => {
            setApiKey(key);
            setError(null); // Clear error when new key is saved
        }}
        currentApiKey={apiKey}
      />

    </div>
  );
};

export default App;