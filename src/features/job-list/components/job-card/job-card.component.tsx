import Link from "next/link";
import type { JobSummary } from "@/types/coople";
import { formatDate, formatLocation, formatMoney } from "../../utils/format";
import styles from "./job-card.module.css";

function JobDate({ timestamp }: { timestamp: number | null }) {
  const date = formatDate(timestamp);
  return date ? <time dateTime={date.iso}>{date.label} (Europe/Warsaw)</time> : "Not provided";
}

export function JobCard({ job }: { job: JobSummary }) {
  return (
    <article className={styles.card}>
      <h2>
        <Link className={styles.title} href={`/job/${encodeURIComponent(job.id)}`}>
          {job.title || "Untitled job"}
        </Link>
      </h2>
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
