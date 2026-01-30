import { customTextShuffle } from '@/utils/customTextSuffle';
import { useEffect, useRef } from 'react';

import styles from './Nav.module.scss';

export function Nav({
  label = 'メインナビゲーション',
  isHeader = false,
}: {
  label?: string;
  isHeader?: boolean;
}) {
  const linkListRef = useRef<HTMLUListElement>(null);

  const handleMouseenter = (e: MouseEvent) => {
    const target = e.currentTarget as HTMLElement;
    const span: HTMLSpanElement | null = target.querySelector('span');
    const text = target.getAttribute('aria-label') || '';
    if (!text || !span) return;
    customTextShuffle(span, text);
  };

  useEffect(() => {
    const links = linkListRef.current?.querySelectorAll('a');
    Array.from(links || []).forEach((link) => {
      link.addEventListener('mouseenter', handleMouseenter);
    });
    return () => {
      Array.from(links || []).forEach((link) => {
        link.removeEventListener('mouseenter', handleMouseenter);
      });
    };
  }, []);

  return (
    <div className={styles.className}>
      <nav className={styles.nav} aria-label={label}>
        <ul className={styles.navList} ref={linkListRef}>
          {isHeader ? null : (
            <li>
              <a href="/" aria-label="Home">
                <span aria-hidden="true">Home</span>
              </a>
            </li>
          )}
          <li>
            <a href="/about" aria-label="About">
              <span aria-hidden="true">About</span>
            </a>
          </li>
          <li>
            <a href="/notes" aria-label="Notes">
              <span aria-hidden="true">Notes</span>
            </a>
          </li>
          <li>
            <a href="/rules" aria-label="Rules">
              <span aria-hidden="true">Rules</span>
            </a>
          </li>
          <li>
            <a href="/sketch" aria-label="Sketch">
              <span aria-hidden="true">Sketch</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
