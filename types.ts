export interface GeneratedContent {
  title: string;
  english_text_segments: {
    text: string;
    highlight: boolean;
  }[];
  vietnamese_text: string;
}

export interface SavedWord {
  word: string;
  date: string;
}

export interface HistoryEntry {
  id: string;
  date: string;
  title: string;
  content: GeneratedContent;
  // Add generation parameters to history
  ieltsBand: string;
  wordCount: number;
  topic: string;
}