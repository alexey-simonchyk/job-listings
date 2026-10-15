import Link from "next/link";
import type { JobSummary } from "@/types/coople";
import { JobDate } from "@/components/job-date/job-date.component";
import { FavoriteButton } from "@/features/favorites/components/favorite-button/favorite-button.component";
import { formatLocation, formatMoney } from "@/utils/job-format";
import styles from "./job-card.module.css";

export function JobCard({ job }: { job: JobSummary }) {
  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <h2>
          <Link className={styles.title} href={`/jobs/${encodeURIComponent(job.id)}`}>
            {job.title || "Untitled job"}
          </Link>
        </h2>
        <FavoriteButton jobId={job.id} jobTitle={job.title} />
      </header>
      <dl className={styles.details}>
        <div><dt>Location</dt><dd>{formatLocation(job.location)}</dd></div>
        <div><dt>Hourly pay</dt><dd>{formatMoney(job.hourlyWage)}</dd></div>
        <div><dt>Salary</dt><dd>{formatMoney(job.salary)}</dd></div>
        <div><dt>Starts</dt><dd><JobDate timestamp={job.startsAt} /></dd></div>
        <div><dt>Published</dt><dd><JobDate timestamp={job.publishedAt} /></dd></div>
      </dl>
    </article>
  );
}
