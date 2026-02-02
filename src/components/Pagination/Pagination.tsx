import { NOTES } from '@/constants/notes';
import IconNext from '@/svg/icon_next.svg';
import IconPrev from '@/svg/icon_prev.svg';
import Link from 'next/link';
import styles from './Pagination.module.scss';

export function Pagination({
  currentPage,
  totalPages,
  path,
}: {
  currentPage: number;
  totalPages: number;
  path: string;
}) {
  const MAX_PAGE_LINKS = NOTES.maxPageLinks; // 最大表示ページ数
  const startPage = Math.max(1, currentPage - Math.floor(MAX_PAGE_LINKS / 2));
  const endPage = Math.min(totalPages, startPage + MAX_PAGE_LINKS - 1);
  const urlPrev = 1 < currentPage ? `${path}/${currentPage - 1}` : null;
  const urlNext =
    currentPage < totalPages ? `${path}/${currentPage + 1}` : null;
  const showFirstPage = startPage > 1;
  const showLastPage = endPage < totalPages;
  return (
    <nav className={styles.pagination} aria-label="ページネーション">
      {/* 前へを表示 */}
      {urlPrev && (
        <div className={styles.prev}>
          <Link href={urlPrev} aria-label="前のページへ">
            <IconPrev aria-hidden="true" />
          </Link>
        </div>
      )}
      <ul className={styles.countList}>
        {showFirstPage && (
          <>
            {/* 先頭のページを表示 */}
            <li
              className={`${styles.page} ${1 === currentPage ? styles.current : ''}`}
            >
              <Link className={styles.link} href={`${path}/1`}>
                1
              </Link>
            </li>
            <li className={styles.omission}>...</li>
            {/* 各ページを表示 */}
          </>
        )}
        {Array.from(
          { length: endPage - startPage + 1 },
          (_, i) => startPage + i
        ).map((pageCount) => (
          <li
            key={pageCount}
            className={`${styles.page} ${pageCount === currentPage ? styles.current : ''}`}
          >
            {pageCount === currentPage ? (
              <span aria-current="page">{pageCount}</span>
            ) : (
              <Link className={styles.link} href={`${path}/${pageCount}`}>
                {pageCount}
              </Link>
            )}
          </li>
        ))}
        {/* 最後のページを表示 */}
        {showLastPage && (
          <>
            <li className={styles.omission}>...</li>
            <li className={styles.page}>
              <Link className={styles.link} href={`${path}/${totalPages}`}>
                {totalPages}
              </Link>
            </li>
          </>
        )}
      </ul>
      {/* 次へを表示 */}
      {urlNext && (
        <div className={styles.next}>
          <Link
            className={styles.link}
            href={urlNext}
            aria-label="次のページへ"
          >
            <IconNext aria-hidden="true" />
          </Link>
        </div>
      )}
    </nav>
  );
}
