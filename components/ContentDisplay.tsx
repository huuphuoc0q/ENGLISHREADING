import React, { MouseEvent } from 'react';
import { GeneratedContent } from '../types';

interface ContentDisplayProps {
  content: GeneratedContent;
  onTextSelect: (text: string, rect: DOMRect) => void;
}

const ContentDisplay: React.FC<ContentDisplayProps> = ({ content, onTextSelect }) => {
  const handleMouseUp = (e: MouseEvent<HTMLDivElement>) => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const selectedText = selection.toString().trim();

    if (selectedText) {
      // User dragged to select a phrase
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      onTextSelect(selectedText, rect);
    } else {
      // User clicked a single word
      const target = e.target as HTMLElement;
      if (target.tagName === 'SPAN' && target.dataset.word) {
        const word = target.innerText;
        const rect = target.getBoundingClientRect();
        onTextSelect(word, rect);
      }
    }
  };
  
  const renderEnglishText = () => {
    return content.english_text_segments.map((segment, segIndex) => (
      <span
        key={segIndex}
        className={segment.highlight ? 'bg-primary-light/10 dark:bg-primary-dark/20 rounded py-1' : ''}
      >
        {segment.text.split(/(\s+)/).map((word, wordIndex) => {
          if (word.trim() === '') {
            return <React.Fragment key={wordIndex}>{word}</React.Fragment>; // Render spaces/newlines
          }
          return (
            <span
              key={wordIndex}
              data-word="true"
              className="cursor-pointer hover:bg-primary-light/20 dark:hover:bg-primary-dark/30 rounded"
            >
              {word}
            </span>
          );
        })}
      </span>
    ));
  };

  return (
    <div className="bg-surface-light dark:bg-surface-dark p-6 md:p-8 rounded-lg shadow-md animate-fade-in space-y-8">
      <h2 className="text-2xl md:text-3xl font-bold text-primary-light dark:text-primary-dark border-b-2 border-primary-light/20 dark:border-primary-dark/30 pb-4">
        {content.title}
      </h2>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">English Text</h3>
        <div
          className="text-lg leading-relaxed text-text-light dark:text-text-dark selection:bg-primary-light/30 dark:selection:bg-primary-dark/40"
          onMouseUp={handleMouseUp}
        >
          {renderEnglishText()}
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-slate-700">
        <h3 className="text-xl font-semibold">Vietnamese Translation</h3>
        <p className="text-lg leading-relaxed text-subtle-light dark:text-subtle-dark">
          {content.vietnamese_text}
        </p>
      </div>
    </div>
  );
};

export default ContentDisplay;
