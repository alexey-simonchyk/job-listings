import styles from "@/features/job-details/components/job-details/job-details.module.css";

export default function JobDetailsLoading() {
  return (
    <main className={styles.page} aria-busy="true">
      <h1>Job details</h1>
      <p role="status">Loading job details…</p>
    </main>
  );
}
