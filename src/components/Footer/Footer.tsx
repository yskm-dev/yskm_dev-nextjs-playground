'use client';
import { Nav } from '@/components/Nav';
import { EXTERNAL_LINKS } from '@/constants/links';
import IconArrow from '@/svg/icon_arrow.svg';
import styles from './Footer.module.scss';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__inner}>
        <div className={styles.stack}>
          <h2 className={styles.stack__title}>Built with:</h2>
          <ul>
            <li>
              Framework:{' '}
              <a href={EXTERNAL_LINKS.nextjs} target="_blank">
                Next.js
                <IconArrow aria-hidden="true" />
              </a>
            </li>
            <li>
              Programming Language:{' '}
              <a href={EXTERNAL_LINKS.typescript} target="_blank">
                TypeScript
                <IconArrow aria-hidden="true" />
              </a>
            </li>
            <li>
              CMS:{' '}
              <a href={EXTERNAL_LINKS.microCMS} target="_blank">
                MicroCMS
                <IconArrow aria-hidden="true" />
              </a>
            </li>
            <li>
              Hosting Platform:{' '}
              <a href={EXTERNAL_LINKS.cloudflare} target="_blank">
                Cloudflare
                <IconArrow aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>
        <div className={styles.links}>
          <Nav label="フッターナビゲーション" isHeader={false} />
        </div>
      </div>
      <p className={styles.copyright}>© 2026 yskm_dev</p>
    </footer>
  );
}
