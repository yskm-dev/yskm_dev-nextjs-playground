'use client';

import { createContext, useContext } from 'react';

// スタイルボタンのコンテキストの型定義
interface StyleButtonContextValue {
  currentStyle: 'light' | 'dark' | null;
  setCurrentStyle: React.Dispatch<
    React.SetStateAction<'light' | 'dark' | null>
  >;
}

// スタイルボタンのコンテキストを作成
export const StyleButtonContext = createContext<StyleButtonContextValue | null>(
  null
);

// カスタムフックを用意
export function useStyleButtonContext() {
  const context = useContext(StyleButtonContext);
  if (!context) {
    throw new Error(
      'StyleButton components must be used within a StyleButtonRoot'
    );
  }
  return context;
}
