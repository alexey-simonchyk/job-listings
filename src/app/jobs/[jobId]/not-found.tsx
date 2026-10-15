import Link from "next/link";
import styles from "@/features/job-details/components/job-details/job-details.module.css";

export default function JobNotFound() {
  return (
    <main className={styles.page}>
      <section className={styles.panel} aria-labelledby="not-found-heading">
        <h1 id="not-found-heading">404 — Job not found</h1>
        <p>This job is no longer available or the link is incorrect.</p>
        <Link className={styles.backLink} href="/jobs">Back to jobs</Link>
      </section>
    </main>
  );
}
