'use client';
import { useThemeContext } from '@/contexts/ThemeContext';
import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './StyleButton.module.scss';

export function StyleButton() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { theme, handleChangeTheme } = useThemeContext();
  const [buttonTheme, setButtonTheme] = useState(theme);

  useEffect(() => {
    if (theme === 'system') {
      setButtonTheme(
        window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
      );
    } else {
      setButtonTheme(theme);
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    handleChangeTheme(newTheme);
    setButtonTheme(newTheme);
    buttonRef.current?.classList.add(styles.animating);
    setTimeout(() => {
      buttonRef.current?.classList.remove(styles.animating);
    }, 300);
  }, [setButtonTheme, theme, handleChangeTheme]);

  return (
    <button
      className={styles.styleButton}
      aria-label="見た目を切り替える"
      data-style-button
      data-theme={buttonTheme}
      onClick={toggleTheme}
      ref={buttonRef}
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
