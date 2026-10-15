"use client";

import { useTransition } from "react";
import styles from "@/features/job-list/components/job-list/job-list.module.css";

export default function Error({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  const [isPending, startTransition] = useTransition();

  return (
    <main className={styles.page}>
      <header className={styles.header}><h1>Jobs</h1></header>
      <section className={styles.state} aria-labelledby="error-heading">
        <h2 id="error-heading">Unable to load jobs</h2>
        <p>Please try loading the job list again.</p>
        <button className={styles.action} disabled={isPending} onClick={() => startTransition(() => retry())}>
          {isPending ? "Trying again…" : "Try again"}
        </button>
        <p role="status">{isPending ? "Loading jobs…" : ""}</p>
      </section>
    </main>
  );
}
