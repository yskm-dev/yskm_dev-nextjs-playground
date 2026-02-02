import { NoteLink } from '@/components/NoteLink';
import { Pagination } from '@/components/Pagination';
import { NOTES } from '@/constants/notes';
import { getMetaData, SITE_NAME } from '@/constants/sitemap';
import { getNotes } from '@/libs/microcms';
import styles from './page.module.scss';

// ページあたりの表示件
const ITEMS_PER_PAGE = NOTES.limit;

// 静的パス生成
// App RouterではgetStaticPathsの代わりにgenerateStaticParamsを使用
// https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes#generatestaticparams
export async function generateStaticParams() {
  // 総件数の取得
  const data = await getNotes();
  const totalCount = data.totalCount;
  // 総ページ数の計算
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  // 各ページのパスを生成して返す
  return Array.from({ length: totalPages }, (_, i) => ({
    page: String(i + 1),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  // 動的パラメータの取得
  const { page } = await params;
  const data = getMetaData(`/notes`);
  const title = `Notes Page${page} | ${SITE_NAME}`;
  data.title = data.openGraph.title = title;
  return data;
}

export default async function Notes({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  // 動的パラメータの取得
  const { page } = await params;

  // 現在のページ番号を数値に変換
  const pageNumber = parseInt(page, 10);

  // オフセットの計算とデータの取得
  const offset = (pageNumber - 1) * ITEMS_PER_PAGE;

  // データの取得
  const { contents, totalCount } = await getNotes({
    limit: ITEMS_PER_PAGE,
    offset: offset,
  });

  // 総ページ数の計算
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const firsPage = 1;
  const lastPage = totalPages;

  return (
    <>
      <h1 className={styles.title}>Notes Page{pageNumber}</h1>
      <ul className={styles.notesList}>
        {contents.map((note, index) => (
          <li key={index}>
            <NoteLink note={note} headingLevel={3} />
          </li>
        ))}
      </ul>
      <Pagination
        currentPage={pageNumber}
        totalPages={totalPages}
        path="/notes/page"
      />
    </>
  );
}
