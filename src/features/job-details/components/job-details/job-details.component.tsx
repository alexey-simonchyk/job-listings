import Link from "next/link";
import type { JobDetails } from "@/types/coople";
import { JobDate } from "@/components/job-date/job-date.component";
import { formatLocation, formatMoney } from "@/utils/job-format";
import styles from "./job-details.module.css";

export function JobDetailsComponent({ job }: { job: JobDetails }) {
  return (
    <main className={styles.page}>
      <Link className={styles.backLink} href="/jobs">Back to jobs</Link>
      <article className={`${styles.panel} ${styles.details}`}>
        <h1>{job.title || "Untitled job"}</h1>
        <dl className={styles.facts}>
          <div><dt>Reference</dt><dd>{job.reference || "Not provided"}</dd></div>
          <div><dt>Location</dt><dd>{formatLocation(job.location)}</dd></div>
          <div><dt>Hourly pay</dt><dd>{formatMoney(job.hourlyWage)}</dd></div>
          <div><dt>Salary</dt><dd>{formatMoney(job.salary)}</dd></div>
          <div><dt>Starts</dt><dd><JobDate timestamp={job.startsAt} /></dd></div>
          <div><dt>Ends</dt><dd><JobDate timestamp={job.endsAt} /></dd></div>
          <div><dt>First shift ends</dt><dd><JobDate timestamp={job.firstShiftEndsAt} /></dd></div>
          <div><dt>Published</dt><dd><JobDate timestamp={job.publishedAt} /></dd></div>
          <div><dt>Number of shifts</dt><dd>{job.shiftsCount ?? "Not provided"}</dd></div>
        </dl>
        <section className={styles.section} aria-labelledby="requirements-heading">
          <h2 id="requirements-heading">Requirements</h2>
          <p className={styles.description}>{job.requirements || "Not provided"}</p>
        </section>
        <section className={styles.section} aria-labelledby="clothing-heading">
          <h2 id="clothing-heading">Clothing requirements</h2>
          <p className={styles.description}>{job.clothingRequirements || "Not provided"}</p>
        </section>
      </article>
    </main>
  );
}
