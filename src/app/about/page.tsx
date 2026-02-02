import { EXTERNAL_LINKS } from '@/constants/links';
import { getMetaData } from '@/constants/sitemap';
import Icon_Github from '@/svg/icon_github.svg';
import Icon_X from '@/svg/icon_x.svg';
import type { Metadata } from 'next';
import styles from './page.module.scss';

export const metadata: Metadata = getMetaData('/about');

export default async function About() {
  return (
    <>
      <h1 className={styles.h1}>About</h1>
      <section>
        <h2 className={styles.h2}>このサイトについて</h2>
        <p>
          主にフロントエンドの面で個人的に学んだことや、技術的な知見をアウトプットしていくためのサイトです。
        </p>
      </section>
      <section>
        <h2 className={styles.h2}>著者について</h2>
        <h3 className={styles.h3}>yskm</h3>
        <ul className={styles.social}>
          <li className={styles.socialItem}>
            <Icon_X aria-label="X" />:
            <a
              className={styles.socialLink}
              href={EXTERNAL_LINKS.x}
              target="_blank"
            >
              @_yskm_dev_
            </a>
          </li>
          <li className={styles.socialItem}>
            <Icon_Github aria-label="GitHub" />:
            <a
              className={styles.socialLink}
              href={EXTERNAL_LINKS.github}
              target="_blank"
            >
              yskm-dev
            </a>
          </li>
        </ul>
        <p>
          東京在住。
          <br />
          10年以上、フロントエンドエンジニアとしてWeb制作の現場に関わってきました。
          主にHTML/CSS/JavaScriptを用いたコーディングや、演出面での実装を得意としています。最近はAstroやNext.jsなどのモダンなフレームワークや、Webアクセシビリティを主に勉強中です。
        </p>
      </section>
    </>
  );
}
