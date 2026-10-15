import styles from "@/features/job-list/components/job-list/job-list.module.css";

export default function Loading() {
  return (
    <main className={styles.page} aria-busy="true">
      <header className={styles.header}><h1>Jobs</h1></header>
      <p role="status">Loading jobs…</p>
    </main>
  );
}
