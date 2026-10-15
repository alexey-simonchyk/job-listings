
import type { JobSummary } from "@/types/coople";
import type { Page } from "@/types/pagination";
import { InfiniteJobList } from "./infinite-job-list.component";
import styles from "./job-list.module.css";

export function JobList({ jobs }: { jobs: Page<JobSummary> }) {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Coople public jobs</p>
        <h1>Jobs</h1>
        <p>Browse public job opportunities.</p>
      </header>

      <InfiniteJobList initialJobs={jobs} />
    </main>
  );
}
