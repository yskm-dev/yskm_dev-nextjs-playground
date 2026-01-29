'use client';
import { DrawerContext, useDrawerContext } from '@/contexts/DrawerContext';
import IconArrow from '@/svg/icon_arrow.svg';
import IconGithub from '@/svg/icon_github.svg';
import IconX from '@/svg/icon_x.svg';
import { useCallback, useRef } from 'react';
import { StyleButton } from '../StyleButton';
import styles from './Drawer.module.scss';

// ドロワーメニューのルートコンポーネント
export function DrawerRoot({ children }: { children: React.ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const open = useCallback(() => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';
    document.body.style.top = `-${window.scrollY}px`;
    document.body.style.left = '0';
  }, []);

  const close = useCallback(() => {
    if (dialogRef.current) {
      dialogRef.current.close();
      document.body.style.overflow = ``;
      document.body.style.touchAction = ``;
      document.body.style.top = ``;
      document.body.style.left = ``;
    }
  }, []);

  const contextValue = {
    dialogRef: dialogRef,
    open: open,
    close: close,
  };

  // 子コンポーネントにコンテキストを提供
  // v18まではContext.Providerだったが、v19からはContext自体がProviderになる
  return <DrawerContext value={contextValue}>{children}</DrawerContext>;
}

// ドロワーメニュー本体
export function Drawer() {
  const { close, dialogRef } = useDrawerContext();
  return (
    <dialog ref={dialogRef} id="drawer" className={styles.drawer}>
      <div className={styles.header}>
        <p className={styles.logo}>
          <a href="/">yskm_dev</a>
        </p>
        <div className={styles.header__links}>
          <StyleButton />
        </div>
      </div>
      <nav className={styles.nav} aria-label="サイト内ナビゲーション">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/profile">Profile</a>
          </li>
          <li>
            <a href="/notes">Notes</a>
          </li>
          <li>
            <a href="/rules">Rules</a>
          </li>
          <li>
            <a href="/sketch">Sketch</a>
          </li>
        </ul>
      </nav>
      <div className={styles.stack}>
        <p className={styles.stack__title}>Built with:</p>
        <ul>
          <li>
            Framework:{' '}
            <a href="https://astro.build/" target="_blank">
              Astro
              <IconArrow aria-hidden="true" />
            </a>
          </li>
          <li>
            Programming Language:{' '}
            <a href="https://www.typescriptlang.org/" target="_blank">
              TypeScript
              <IconArrow aria-hidden="true" />
            </a>
          </li>
          <li>
            CMS:{' '}
            <a href="https://microcms.io/" target="_blank">
              MicroCMS
              <IconArrow aria-hidden="true" />
            </a>
          </li>
          <li>
            Hosting Platform:{' '}
            <a href="https://pages.cloudflare.com/" target="_blank">
              Cloudflare
              <IconArrow aria-hidden="true" />
            </a>
          </li>
        </ul>
      </div>
      <ul className={styles.social}>
        <li>
          <a
            href="https://github.com/yskm-dev"
            target="_blank"
            aria-label="GitHub"
          >
            <IconGithub />
          </a>
        </li>
        <li>
          <a href="https://twitter.com/yskm_dev" target="_blank" aria-label="X">
            <IconX />
          </a>
        </li>
      </ul>
      <button
        type="button"
        className={styles.close}
        aria-label="メニューを閉じる"
        aria-expanded={dialogRef.current?.open ? 'true' : 'false'}
        aria-controls="drawer"
        onClick={close}
      >
        <span></span>
        <span></span>
      </button>
    </dialog>
  );
}
