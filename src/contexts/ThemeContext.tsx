'use client';
import {
  createContext,
  memo,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

// テーマコンテキストの型定義
interface ThemeContextValue {
  theme: 'system' | 'light' | 'dark';
  handleChangeTheme: (value: 'system' | 'light' | 'dark') => void;
}

// テーマコンテキストを作成
export const ThemeContext = createContext<ThemeContextValue | null>(null);

// カスタムフックを用意
export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// テーマ初期設定を反映するためのスクリプトコンポーネント
const _ThemeScript = () => {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            var savedTheme = localStorage.getItem('theme');
            var theme = (savedTheme === 'dark' || savedTheme === 'light')
              ? savedTheme
              : 'system';
            document.documentElement.setAttribute('data-theme', theme);
          })();
        `,
      }}
      type="text/javascript"
    />
  );
};

// メモ化して再レンダリングを防止
const ThemeScript = memo(_ThemeScript, () => true);

// ThemeProviderコンポーネント
interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<'system' | 'light' | 'dark'>('system');

  // 初期テーマの設定
  useEffect(() => {
    const initTheme = localStorage.getItem('theme') as
      | 'system'
      | 'light'
      | 'dark'
      | null;
    const root = window.document.documentElement;
    root.setAttribute('data-theme', initTheme || 'system');
    setTheme(initTheme || 'system');
  }, []);

  // ユーザーの環境で内部的にダークモードに変更をした時の監視
  const handleMediaQuery = useCallback((e: MediaQueryListEvent) => {
    if (e.matches) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, []);

  useEffect(() => {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', handleMediaQuery);
    return () => {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', handleMediaQuery);
    };
  }, [handleMediaQuery]);

  // テーマ変更ハンドラー
  const handleChangeTheme = useCallback(
    (value: 'system' | 'light' | 'dark') => {
      const newTheme = value;
      const root = window.document.documentElement;

      root.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      setTheme(newTheme);

      document.dispatchEvent(new Event('themeChange'));
    },
    []
  );

  return (
    <ThemeContext value={{ theme, handleChangeTheme }}>
      <ThemeScript />
      {children}
    </ThemeContext>
  );
}
``;
