"use client";

import type { JobSummary } from "@/types/coople";
import type { Page } from "@/types/pagination";
import { InfiniteList } from "@/components/infinite-list/infinite-list.component";
import { useInfiniteJobs } from "../../hooks/use-infinite-jobs";
import { JobCard } from "../job-card/job-card.component";
import styles from "./job-list.module.css";

export function InfiniteJobList({ initialJobs }: { initialJobs: Page<JobSummary> }) {
  const { data, fetchNextPage, refetch, hasNextPage, isFetching, isError } = useInfiniteJobs(initialJobs);
  const { items: jobs, total } = data;

  return (
    <>
      {jobs.length > 0 && <p className={styles.summary}>{total} {total === 1 ? "job" : "jobs"}</p>}
      <InfiniteList
        items={jobs}
        getItemKey={(job) => job.id}
        renderItem={(job) => <JobCard job={job} />}
        onLoadMore={() => fetchNextPage({ cancelRefetch: false })}
        hasNextPage={hasNextPage}
        isFetching={isFetching}
        isError={isError}
        label="Jobs"
        emptyState={
          <section className={styles.state} aria-labelledby="empty-heading">
            <h2 id="empty-heading">No jobs found</h2>
            <p>There are no jobs available. Please check again later.</p>
            <button
              className={styles.refreshButton}
              disabled={isFetching}
              onClick={() => refetch({ cancelRefetch: false })}
            >
              {isFetching ? "Refreshing…" : "Refresh"}
            </button>
          </section>
        }
        messages={{
          loading: "Loading more jobs…",
          error: "Unable to load more jobs. Please try again.",
          end: "All available jobs have been loaded.",
        }}
      />
    </>
  );
}
