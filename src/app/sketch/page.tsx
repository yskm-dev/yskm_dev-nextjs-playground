import styles from './page.module.scss';

export default async function About() {
  return (
    <>
      <h1 className={styles.title}>Sketch</h1>
      <p className={styles.text}>
        <span aria-hidden="true">🚧</span>準備中
        <span aria-hidden="true">🚧</span>
      </p>
    </>
  );
}
