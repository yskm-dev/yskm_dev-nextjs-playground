import { NoteLink } from '@/components/NoteLink';
import { getNotes } from '@/libs/microcms';
import styles from './page.module.scss';

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
    </>
  );
}
