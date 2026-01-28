import { JSX } from 'react';
import styles from './NoteLink.module.scss';

type Note = {
  id: string;
  title: string;
  icon: string;
  publishedAt?: string;
  tags?: { 
    name: string,
    slug: string
  }[];
};

type Props = {
  note: Note;
  headingLevel?: 2 | 3 | 4 | 5 | 6;
}

export function NoteLink({note, headingLevel = 3}: Props) {
  const HeadingTag = `h${headingLevel}` as keyof JSX.IntrinsicElements;
  return (
    <a href={`/notes/${note.id}`} className={styles.link}>
      <span className={styles.icon} aria-hidden="true">{note.icon}</span>
      <div className={styles.container}>
        <div>
          <time className={styles.date} dateTime={note.publishedAt}>
            {  note.publishedAt &&
                new Date(note.publishedAt).toLocaleDateString("ja-JP", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })
            }
          </time>
        </div>
        <HeadingTag className={styles.title}>{note.title}</HeadingTag>
        {
          note.tags && note.tags.length > 0 && (
            <div className={styles.tagWrapper}>
              <p className={styles.tagHeader}>タグ:</p>

              <ul className={styles.tagList}>
                {note.tags.map((tag) => (
                  <li key={tag.slug}>{`#${tag.name}`}</li>
                ))}
              </ul>
            </div>
          )
        }
      </div>
    </a>
  )
}
