'use client';
import { useEffect, useState } from 'react';
import styles from './Pallet.module.scss';

export function Pallet({ color }: { color: string }) {
  const [colorCode, setColorCode] = useState('');

  useEffect(() => {
    const updateColorCode = () => {
      const colorCode = getComputedStyle(
        document.documentElement
      ).getPropertyValue(`--color-${color}`);
      setColorCode(colorCode.trim());
    };

    // 初回実行のためのRAF
    const rafId = requestAnimationFrame(() => {
      updateColorCode();
    });

    // テーマ変更イベントのリスナー
    const handleThemeChange = () => {
      updateColorCode();
    };
    document?.addEventListener('themeChange', handleThemeChange);

    // リサイズイベントのリスナー（デバウンス付き）
    let resizeTimerId: ReturnType<typeof setTimeout> | null = null;
    const handleResize = () => {
      if (resizeTimerId !== null) {
        clearTimeout(resizeTimerId);
      }
      resizeTimerId = setTimeout(() => {
        updateColorCode();
      }, 200);
    };
    window.addEventListener('resize', handleResize);

    // クリーンアップ
    return () => {
      window.removeEventListener('resize', handleResize);
      document?.removeEventListener('themeChange', handleThemeChange);
      if (resizeTimerId !== null) {
        clearTimeout(resizeTimerId);
      }
      cancelAnimationFrame(rafId);
    };
  }, [color]);

  return (
    <div className={styles.pallet} data-color={color}>
      <p className={styles.colorName}>{color}</p>
      <p className={styles.colorCode}>{colorCode}</p>
    </div>
  );
}
