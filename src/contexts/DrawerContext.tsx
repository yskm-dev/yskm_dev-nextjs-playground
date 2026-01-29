'use client';

import { createContext, useContext } from 'react';

// ドロワーメニューのコンテキストの型定義
interface DrawerContextValue {
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  open: () => void;
  close: () => void;
}

// ドロワーメニューのコンテキストを作成
export const DrawerContext = createContext<DrawerContextValue | null>(null);

// カスタムフックを用意
export function useDrawerContext() {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error('Drawer components must be used within a DrawerRoot');
  }
  return context;
}
