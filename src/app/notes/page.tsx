import { NoteLink } from '@/components/NoteLink';
import { Pagination } from '@/components/Pagination';
import { getMetaData } from '@/constants/sitemap';
import { getNotes } from '@/libs/microcms';
import { Metadata } from 'next';
import styles from './page.module.scss';

export const metadata: Metadata = getMetaData('/notes');

export default async function Notes() {
  const { contents } = await getNotes({ limit: 5 });
  return (
    <>
      <h1 className={styles.title}>Notes</h1>
      <ul className={styles.notesList}>
        {contents.map((note, index) => (
          <li key={index}>
            <NoteLink note={note} headingLevel={3} />
          </li>
        ))}
      </ul>
      <Pagination
        currentPage={1}
        totalPages={contents.length}
        path="/notes/page"
      />
    </>
  );
}
