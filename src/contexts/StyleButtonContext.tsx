'use client';

import { createContext, useContext } from 'react';

// グローバルテーマ管理のコンテキストの型定義
interface GlobalStyleContextValue {
  currentTheme: 'light' | 'dark' | null;
  setTheme: (theme: 'light' | 'dark') => void;
}

// グローバルテーマ管理のコンテキストを作成
export const GlobalStyleContext = createContext<GlobalStyleContextValue | null>(
  null
);

// カスタムフックを用意
export function useGlobalStyle() {
  const context = useContext(GlobalStyleContext);
  if (!context) {
    throw new Error(
      'Global style components must be used within a GlobalStyleProvider'
    );
  }
  return context;
}
