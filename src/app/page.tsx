import { NoteLink } from "@/components/NoteLink";
import { getNotes } from "@/libs/microcms";
import styles from "./page.module.scss";

export default async function Home() {
  const {contents} = await getNotes({ limit: 5 });
  return (
    <>
      <p className={styles.description}>
        主にフロントエンドの技術、Webアクセシビリティについて学んだことを発信していきます。
      </p>
      <h2 className={styles.title}>最近の投稿</h2>
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
