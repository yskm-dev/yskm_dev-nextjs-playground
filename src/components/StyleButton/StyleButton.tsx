
'use client';
import { useCallback, useEffect, useState } from 'react';
import styles from './StyleButton.module.scss';

export function StyleButton() {
  const [currentStyle, setCurrentStyle] = useState<'light' | 'dark' | null>(null);

  useEffect(() => {
    const defaultStyle: 'light' | 'dark' | null = localStorage.getItem('style') ? window.localStorage.getItem('style') === 'dark' ? 'dark' : 'light' : window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    setCurrentStyle(defaultStyle);
    localStorage.setItem('style', defaultStyle);
    document.documentElement.setAttribute('data-theme', defaultStyle);
  }, [setCurrentStyle]);

  const toggleStyle: React.MouseEventHandler<HTMLButtonElement> = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const target: HTMLButtonElement = e.currentTarget;
    if(!target) return;
    target.classList.remove(styles.animating);
    const newStyle: 'light' | 'dark' = currentStyle === 'light' ? 'dark' : 'light';
    setCurrentStyle(newStyle);
    localStorage.setItem('style', newStyle);
    document.documentElement.setAttribute('data-theme', newStyle);
    target.setAttribute('data-state', newStyle);
    requestAnimationFrame(() => {
      target.classList.add(styles.animating);
    });
  }, [currentStyle]);

  return (
    <button
      className={styles.styleButton}
      aria-label="見た目を切り替える"
      data-state={currentStyle}
      data-style-button
      onClick={toggleStyle}
    >
      <span className={[styles.switch, styles.light].join(' ')}>
        <span className={styles.icon} aria-hidden="true">☀️</span>
      </span>
      <span className={[styles.switch, styles.dark].join(' ')}>
        <span className={styles.icon} aria-hidden="true">🌙</span>
      </span>
    </button>
  )
}
