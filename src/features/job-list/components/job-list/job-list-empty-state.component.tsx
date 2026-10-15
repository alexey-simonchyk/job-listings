"use client";

import styles from "./job-list.module.css";

type JobListEmptyStateProps = {
  isFetching: boolean;
  isError: boolean;
  onRefresh: () => void;
};

export function JobListEmptyState({ isFetching, isError, onRefresh }: JobListEmptyStateProps) {
  return (
    <section className={styles.state} aria-labelledby="empty-heading" aria-busy={isFetching}>
      <h2 id="empty-heading">{isError ? "Unable to refresh jobs" : "No jobs found"}</h2>
      {isError ? (
        <p role="alert">Unable to refresh the job list. Please try again.</p>
      ) : (
        <p>There are no jobs available. Please check again later.</p>
      )}
      <button
        className={styles.refreshButton}
        disabled={isFetching}
        onClick={onRefresh}
      >
        {isFetching ? "Refreshing…" : isError ? "Try again" : "Refresh"}
      </button>
    </section>
  );
}
