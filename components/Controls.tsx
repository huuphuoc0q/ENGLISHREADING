import React from 'react';

interface ControlsProps {
  onGenerate: () => void;
  loading: boolean;
  disabled: boolean;
  ieltsBand: string;
  setIeltsBand: (value: string) => void;
  wordCount: number;
  setWordCount: (value: number) => void;
  topic: string;
  setTopic: (value: string) => void;
}

const Controls: React.FC<ControlsProps> = ({ 
  onGenerate, 
  loading, 
  disabled,
  ieltsBand,
  setIeltsBand,
  wordCount,
  setWordCount,
  topic,
  setTopic
}) => {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate();
  };

  return (
    <div className={`bg-surface-light dark:bg-surface-dark p-6 rounded-lg shadow-md transition-opacity ${disabled ? 'opacity-60' : ''}`}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <fieldset disabled={disabled} className="space-y-6">
          <div>
            <label htmlFor="ielts-band" className="block text-sm font-medium text-subtle-light dark:text-subtle-dark mb-2">
              IELTS Band
            </label>
            <select
              id="ielts-band"
              value={ieltsBand}
              onChange={(e) => setIeltsBand(e.target.value)}
              className="w-full p-3 bg-background-light dark:bg-background-dark border border-gray-300 dark:border-slate-600 rounded-md focus:ring-primary-light dark:focus:ring-primary-dark focus:border-primary-light dark:focus:border-primary-dark"
            >
              <option>5.0 - 5.5</option>
              <option>6.0 - 6.5</option>
              <option>6.5 - 7.0</option>
              <option>7.5 - 8.0</option>
              <option>8.0+</option>
            </select>
          </div>

          <div>
            <label htmlFor="word-count" className="block text-sm font-medium text-subtle-light dark:text-subtle-dark mb-2">
              Word Count (~{wordCount} words)
            </label>
            <input
              type="range"
              id="word-count"
              min="50"
              max="300"
              step="25"
              value={wordCount}
              onChange={(e) => setWordCount(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary-light dark:accent-primary-dark"
            />
          </div>

          <div>
            <label htmlFor="topic" className="block text-sm font-medium text-subtle-light dark:text-subtle-dark mb-2">
              Topic
            </label>
            <input
              type="text"
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Environmental issues"
              className="w-full p-3 bg-background-light dark:bg-background-dark border border-gray-300 dark:border-slate-600 rounded-md focus:ring-primary-light dark:focus:ring-primary-dark focus:border-primary-light dark:focus:border-primary-dark"
            />
          </div>
        </fieldset>
        <button
          type="submit"
          disabled={loading || disabled}
          className="w-full flex justify-center items-center gap-2 p-3 bg-primary-light text-white font-bold rounded-md hover:bg-blue-700 dark:bg-primary-dark dark:hover:bg-blue-500 transition-colors duration-300 disabled:bg-gray-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed"
        >
          {loading ? (
             <>
                <div className="border-2 border-white border-t-transparent rounded-full w-5 h-5 animate-spin"></div>
                Generating...
             </>
          ) : 'Generate Text'}
        </button>
      </form>
    </div>
  );
};

export default Controls;