'use client';
import {
  GlobalStyleContext,
  useGlobalStyle,
} from '@/contexts/StyleButtonContext';
import { useCallback, useState } from 'react';
import styles from './StyleButton.module.scss';

// 初期テーマを取得する関数
function getInitialTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';

  const savedTheme = localStorage.getItem('style');
  if (savedTheme === 'dark' || savedTheme === 'light') {
    return savedTheme;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

export function StyleButtonRoot({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark' | null>(
    () => {
      // 初期値でテーマを設定
      const theme = getInitialTheme();
      if (typeof window !== 'undefined') {
        document.documentElement.setAttribute('data-theme', theme);
      }
      return theme;
    }
  );

  // テーマを設定（data-theme属性を使用してSCSSで一括管理）
  const setTheme = useCallback((theme: 'light' | 'dark') => {
    setCurrentTheme(theme);
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('style', theme);
    document?.dispatchEvent(new Event('themeChange'));
  }, []);

  const contextValue = {
    currentTheme,
    setTheme,
  };

  return (
    <GlobalStyleContext value={contextValue}>{children}</GlobalStyleContext>
  );
}

export function StyleButton() {
  const { currentTheme, setTheme } = useGlobalStyle();

  const toggleTheme: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const target: HTMLButtonElement = e.currentTarget;
      if (!target || !currentTheme) return;

      target.classList.remove(styles.animating);
      const newTheme: 'light' | 'dark' =
        currentTheme === 'light' ? 'dark' : 'light';

      setTheme(newTheme);
      target.setAttribute('data-state', newTheme);

      requestAnimationFrame(() => {
        target.classList.add(styles.animating);
      });
    },
    [currentTheme, setTheme]
  );

  return (
    <button
      className={styles.styleButton}
      aria-label="見た目を切り替える"
      data-state={currentTheme}
      data-style-button
      onClick={toggleTheme}
    >
      <span className={[styles.switch, styles.light].join(' ')}>
        <span className={styles.icon} aria-hidden="true">
          ☀️
        </span>
      </span>
      <span className={[styles.switch, styles.dark].join(' ')}>
        <span className={styles.icon} aria-hidden="true">
          🌙
        </span>
      </span>
    </button>
  );
}
