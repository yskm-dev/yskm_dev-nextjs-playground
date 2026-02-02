import { getMetaData } from '@/constants/sitemap';
import { getNotes, getNotesDetail, Tag } from '@/libs/microcms';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from './page.module.scss';

// ISR設定: 60秒ごとに再検証
export const revalidate = 60;

// 静的パラメータの生成
export async function generateStaticParams() {
  const { contents } = await getNotes({ fields: ['id'] });
  return contents.map((note) => ({
    id: note.id,
  }));
}

// 動的パラメータの型定義
type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ draftKey?: string }>;
};

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ draftKey?: string }>;
}) {
  // 動的パラメータの取得
  const { id } = await params;
  const { draftKey } = await searchParams;
  try {
    const data = await getNotesDetail(id, {
      draftKey,
      fields: ['title'],
    });
    const metaData = await getMetaData(`/notes`);
    const title = `${data.title} | ${metaData.title}`;
    metaData.title = metaData.openGraph.title = title;
    if (draftKey) {
      metaData.title = `[Draft] ${data.title} | ${metaData.title}`;
      metaData.robots = 'noindex,nofollow';
    }
    return metaData;
  } catch {
    return getMetaData(`/notes`);
  }
}

// ページコンポーネント
export default async function NotesDetail({ params, searchParams }: Props) {
  const { id } = await params;
  const { draftKey } = await searchParams;

  try {
    const note = await getNotesDetail(id, {
      draftKey,
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
                <time
                  className={styles.date}
                  dateTime={note.publishedAt ?? undefined}
                >
                  {note.publishedAt
                    ? new Date(note.publishedAt).toLocaleDateString('ja-JP', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                      })
                    : '未公開'}
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
          <Link className={styles.backLink} href="/notes">
            一覧へ戻る
          </Link>
        </article>
      </>
    );
  } catch {
    notFound();
  }
}
