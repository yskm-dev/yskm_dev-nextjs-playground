'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react';

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
    throw new Error('Drawer components must be used within a DrawerProvider');
  }
  return context;
}

// ドロワーメニューのルートコンポーネント
export function DrawerProvider({ children }: { children: React.ReactNode }) {
  // ドロワーメニューのdialog要素の参照を保持
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  // ドロワーメニューを開く
  const open = useCallback(() => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
    const _scrollbarWidth = window.innerWidth - document.body.clientWidth;

    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';
    document.body.style.top = `-${window.scrollY}px`;
    document.body.style.left = '0';

    document.documentElement.style.setProperty(
      '--scrollbar-width',
      `${_scrollbarWidth}px`
    );
    if (_scrollbarWidth > 0) {
      dialogRef.current?.style.setProperty('scrollbar-gutter', `stable`);
    }
  }, []);

  // ドロワーメニューを閉じる
  const close = useCallback(() => {
    if (dialogRef.current) {
      dialogRef.current.close();
      document.body.style.overflow = ``;
      document.body.style.touchAction = ``;
      document.body.style.top = ``;
      document.body.style.left = ``;

      document.documentElement.style.setProperty('--scrollbar-width', `0px`);
      dialogRef.current?.style.setProperty('scrollbar-gutter', `auto`);
    }
  }, []);

  const handleMatchMediaChange = useCallback(
    (e: MediaQueryListEvent) => {
      if (e.matches) {
        close();
      }
    },
    [close]
  );

  useEffect(() => {
    const mq = window.matchMedia('(min-width: max(575px, 35.9375rem))');
    mq.addEventListener('change', handleMatchMediaChange);
  }, [handleMatchMediaChange]);

  // コンテキストの値を準備
  const contextValue = {
    dialogRef: dialogRef,
    open: open,
    close: close,
  };

  // 子コンポーネントにコンテキストを提供
  // v18まではContext.Providerだったが、v19からはContext自体がProviderになる
  return <DrawerContext value={contextValue}>{children}</DrawerContext>;
}
