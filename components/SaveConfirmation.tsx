import React, { useEffect, useRef } from 'react';

interface SaveConfirmationProps {
  text: string;
  position: { top: number; left: number };
  onConfirm: (text: string) => void;
  onCancel: () => void;
}

const SaveConfirmation: React.FC<SaveConfirmationProps> = ({ text, position, onConfirm, onCancel }) => {
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        onCancel();
      }
    };
    // Add event listener after a delay to prevent it from capturing the same click that opened it
    setTimeout(() => document.addEventListener('mousedown', handleClickOutside), 0);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onCancel]);

  return (
    <div
      ref={popoverRef}
      className="absolute z-50 bg-surface-light dark:bg-surface-dark rounded-lg shadow-xl p-4 animate-fade-in border border-gray-200 dark:border-slate-600"
      style={{ top: position.top, left: position.left, maxWidth: '300px' }}
    >
      <p className="text-sm mb-3">
        Save "<strong>{text}</strong>" to vocabulary?
      </p>
      <div className="flex justify-end space-x-2">
        <button
          onClick={onCancel}
          className="px-3 py-1 text-xs rounded-md text-text-light dark:text-text-dark bg-gray-200 dark:bg-slate-600 hover:bg-gray-300 dark:hover:bg-slate-500 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={() => onConfirm(text)}
          className="px-3 py-1 text-xs rounded-md bg-primary-light text-white font-semibold hover:bg-blue-700 dark:bg-primary-dark dark:hover:bg-blue-500 transition-colors"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default SaveConfirmation;
