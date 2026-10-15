"use client";

import Link from "next/link";
import { useTransition } from "react";
import styles from "./error-state.module.css";

type ErrorStateProps = {
  title: string;
  description: string;
  pendingMessage: string;
  retry: () => void;
  backLink?: { href: string; label: string };
};

export function ErrorState({ title, description, pendingMessage, retry, backLink }: ErrorStateProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <main className={styles.page}>
      <div className={styles.panel}>
        <h1>{title}</h1>
        <p>{description}</p>
        <div className={styles.actions}>
          <button className={styles.button} disabled={isPending} onClick={() => startTransition(() => retry())}>
            {isPending ? "Trying again…" : "Try again"}
          </button>
          {backLink && <Link className={styles.backLink} href={backLink.href}>{backLink.label}</Link>}
        </div>
        <p role="status">{isPending ? pendingMessage : ""}</p>
      </div>
    </main>
  );
}
