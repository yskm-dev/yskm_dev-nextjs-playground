'use client';
import type { JSX } from 'react';
import { useEffect, useRef, useState } from 'react';
import styles from './MarginImage.module.scss';

export interface Props {
  size: 'xxl' | 'xl' | 'l' | 'm' | 's' | 'xs' | 'xxs';
  label: string;
  headingLevel?: 2 | 3 | 4 | 5 | 6;
}

export function MarginImage({ size, label, headingLevel = 3 }: Props) {
  const [sizeValue, setSizeValue] = useState('xxs');
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // サイズ値を更新する関数
    const updateSizeValue = () => {
      if (boxRef.current) {
        const height = Math.floor(
          parseFloat(getComputedStyle(boxRef.current).height)
        );
        setSizeValue(`${height}px`);
      }
    };
    updateSizeValue();

    // 初回実行のためのRAF
    const rafId = requestAnimationFrame(() => {
      updateSizeValue();
    });

    // テーマ変更イベントのリスナー
    const handleThemeChange = () => {
      updateSizeValue();
    };
    document?.addEventListener('themeChange', handleThemeChange);

    // リサイズイベントのリスナー（デバウンス付き）
    let resizeTimerId: ReturnType<typeof setTimeout> | null = null;
    const handleResize = () => {
      if (resizeTimerId !== null) {
        clearTimeout(resizeTimerId);
      }
      resizeTimerId = setTimeout(() => {
        updateSizeValue();
      }, 200);
    };
    window.addEventListener('resize', handleResize);

    // クリーンアップ
    return () => {
      document?.removeEventListener('themeChange', handleThemeChange);
      window.removeEventListener('resize', handleResize);
      if (resizeTimerId !== null) {
        clearTimeout(resizeTimerId);
      }
      cancelAnimationFrame(rafId);
    };
  }, [size]);

  const HeadingTag = `h${headingLevel}` as keyof JSX.IntrinsicElements;

  return (
    <>
      <HeadingTag className={styles.heading}>
        {size.toUpperCase()}:{' '}
        <span className={styles.sizeValue}>{sizeValue}</span>
      </HeadingTag>
      <div
        ref={boxRef}
        className={styles.box}
        data-size={size}
        role="figure"
        aria-label={label}
      ></div>
    </>
  );
}
