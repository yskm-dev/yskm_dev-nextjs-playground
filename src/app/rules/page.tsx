import { MarginImage } from '@/components/MarginImage';
import { Pallet } from '@/components/Pallet';
import { getMetaData } from '@/constants/sitemap';
import IconArrow from '@/svg/icon_arrow.svg';
import { Metadata } from 'next';
import styles from './page.module.scss';

export const metadata: Metadata = getMetaData('/rules');

export default async function Rules() {
  return (
    <>
      <h1 className={styles.h1}>Rules</h1>
      <p className={styles.description}>
        このページでは、当サイトで使用しているデザインルールをまとめています。
      </p>
      <section className={styles.section}>
        <h2 className={`${styles.h2} ${styles['border-bottom']}`}>
          フォントファミリー
        </h2>
        <p className={styles.p}>
          英語:{' '}
          <a
            className={styles.link}
            href="https://fonts.google.com/specimen/Inter+Tight"
            target="_blank"
          >
            Inter
            <IconArrow />
          </a>
          <br />
          日本語: ヒラギノ角ゴ
        </p>
      </section>
      <section className={styles.section}>
        <h2 className={`${styles.h2} ${styles['border-bottom']}`}>
          フォントスタイル
        </h2>
        <p className={styles.h1}>見出し1（h1）</p>
        <p className={`${styles.h2} ${styles['border-bottom']}`}>
          見出し2（h2）
        </p>
        <p className={styles.h3}>見出し3（h3）</p>
        <p className={styles.h4}>見出し4（h4）</p>
        <p className={styles.h3}>段落 大（p-large）</p>
        <p className={styles['p-large']}>
          吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつか
          ぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶
          している。吾輩はここで始めて人間というものを見た。しかもあとで聞くと
          それは書生という人間中で一番獰悪な種族であったそうだ。この書生とい
          うのは時々我々を捕えて煮て食うという話である。しかしその当時は何という
          考もなかったから別段恐しいとも思わなかった。ただ彼の掌に載せられてスー
          と持ち上げられた時何となく嬉しかったばかりである。
        </p>
        <p className={styles.h3}>段落 基本サイズ（p）</p>
        <p className={styles.p}>
          吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつか
          ぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶
          している。吾輩はここで始めて人間というものを見た。しかもあとで聞くと
          それは書生という人間中で一番獰悪な種族であったそうだ。この書生とい
          うのは時々我々を捕えて煮て食うという話である。しかしその当時は何という
          考もなかったから別段恐しいとも思わなかった。ただ彼の掌に載せられてスー
          と持ち上げられた時何となく嬉しかったばかりである。
        </p>

        <div>
          <p className={styles.h3}>段落 小（p-small）</p>
          <p className={styles['p-small']}>
            吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつか
            ぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶
            している。吾輩はここで始めて人間というものを見た。しかもあとで聞くと
            それは書生という人間中で一番獰悪な種族であったそうだ。この書生とい
            うのは時々我々を捕えて煮て食うという話である。しかしその当時は何という
            考もなかったから別段恐しいとも思わなかった。ただ彼の掌に載せられてスー
            と持ち上げられた時何となく嬉しかったばかりである。
          </p>
        </div>
      </section>
      <section className={styles.section}>
        <h2 className={`${styles.h2} ${styles['border-bottom']}`}>
          マージンサイズ
        </h2>
        <MarginImage size="xxl" label="XXLサイズの幅" headingLevel={3} />
        <MarginImage size="xl" label="XLサイズの幅" headingLevel={3} />
        <MarginImage size="l" label="Lサイズの幅" headingLevel={3} />
        <MarginImage size="m" label="Mサイズの幅" headingLevel={3} />
        <MarginImage size="s" label="Sサイズの幅" headingLevel={3} />
        <MarginImage size="xs" label="XSサイズの幅" headingLevel={3} />
        <MarginImage size="xxs" label="XXSサイズの幅" headingLevel={3} />
      </section>
      <section className={styles.section}>
        <h2 className={`${styles.h2} ${styles['border-bottom']}`}>カラー</h2>
        <ul className={styles.palletList}>
          <li>
            <Pallet color="background" />
          </li>
          <li>
            <Pallet color="text" />
          </li>
          <li>
            <Pallet color="border" />
          </li>
          <li>
            <Pallet color="primary" />
          </li>
          <li>
            <Pallet color="secondary" />
          </li>
        </ul>
      </section>
    </>
  );
}
