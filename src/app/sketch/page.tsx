import { getMetaData } from '@/constants/sitemap';
import { Metadata } from 'next';
import styles from './page.module.scss';

export const metadata: Metadata = getMetaData('/sketch');

export default async function Sketch() {
  return (
    <>
      <h1 className={styles.title}>Sketch</h1>
      <p className={styles.text}>
        <span aria-hidden="true">🚧</span>準備中
        <span aria-hidden="true">🚧</span>
      </p>
    </>
  );
}
