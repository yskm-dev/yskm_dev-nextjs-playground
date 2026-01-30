'use client';
import { Nav } from '@/components/Nav';
import { useDrawerContext } from '@/contexts/DrawerContext';
import { customTextShuffle } from '@/utils/customTextSuffle';
import { useEffect, useRef } from 'react';
import { StyleButton } from '../StyleButton';
import styles from './Header.module.scss';

export function Header() {
  // ドロワーメニューの開閉関数と参照を取得
  const { open, dialogRef } = useDrawerContext();

  // ヘッダーのタイトル要素の参照を保持
  const headerRef = useRef<HTMLAnchorElement | null>(null);

  const handleMouseenter = () => {
    const span: HTMLSpanElement | null | undefined =
      headerRef.current?.querySelector('span');
    const text = headerRef.current?.getAttribute('aria-label') || '';
    if (!span || !text) return;
    customTextShuffle(span, text);
  };

  useEffect(() => {
    const headerElement = headerRef.current;
    if (!headerElement) return;
    headerElement.addEventListener('mouseenter', handleMouseenter);
    return () => {
      headerElement.removeEventListener('mouseenter', handleMouseenter);
    };
  }, []);

  return (
    <div className={styles.header}>
      <header className={styles.header__inner}>
        <h1 className={styles.name}>
          <a href="/" aria-label="yskm_dev" ref={headerRef}>
            <span aria-hidden="true">yskm_dev</span>
          </a>
        </h1>
        <div className={styles.header__links}>
          <div className={styles.links}>
            <Nav isHeader={true} />
          </div>
          <StyleButton />

          <button
            type="button"
            className={styles.menuButton}
            aria-label="メニューを開く"
            aria-expanded={dialogRef.current?.open ? 'true' : 'false'} // ダイアログが開いているかどうかを示す
            aria-controls="drawer"
            onClick={open} // DrawerContextのopen関数を呼び出してドロワーメニューを開く
          >
            <span></span>
            <span></span>
          </button>
        </div>
      </header>
    </div>
  );
}
