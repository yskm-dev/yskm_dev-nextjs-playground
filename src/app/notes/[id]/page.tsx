import { getMetaData } from '@/constants/sitemap';
import { getNotes, getNotesDetail, Tag } from '@/libs/microcms';
import styles from './page.module.scss';

// 動的パラメータの型定義
type Props = {
  params: Promise<{ id: string }>;
};

// 静的パス生成
// App RouterではgetStaticPathsの代わりにgenerateStaticParamsを使用
// https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes#generatestaticparams
export async function generateStaticParams() {
  const data = await getNotes();
  return data.contents.map((content) => ({
    id: content.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // 動的パラメータの取得
  const { id } = await params;
  const data = await getNotesDetail(id, {
    fields: ['title'],
  });
  const metaData = await getMetaData(`/notes`);
  const title = `${data.title} | ${metaData.title}`;
  metaData.title = metaData.openGraph.title = title;
  return metaData;
}

// ページコンポーネント
export default async function NotesDetail({ params }: Props) {
  const { id } = await params;
  const note = await getNotesDetail(id, {
    fields: ['id', 'title', 'publishedAt', 'content', 'icon', 'tags'],
  });

  return (
    <>
      <article>
        <div className={styles.header}>
          <div className={styles.icon} aria-hidden="true">
            {note.icon}
          </div>
          <h1 className={styles.title}>{note.title}</h1>
          <div className={styles.info}>
            <div className={styles.column}>
              <p className={styles.columnTitle}>公開日:</p>
              <time className={styles.date} dateTime={note.publishedAt}>
                {note.publishedAt &&
                  new Date(note.publishedAt).toLocaleDateString('ja-JP', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  })}
              </time>
            </div>
            <div className={styles.column}>
              <p className={styles.columnTitle}>タグ:</p>
              <ul className={styles.columnTags}>
                {note.tags.map((tag: Tag) => (
                  <li key={tag.id}>#{tag.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: note.content }}
        ></div>
        <a className={styles.backLink} href="/notes">
          一覧へ戻る
        </a>
      </article>
    </>
  );
}
