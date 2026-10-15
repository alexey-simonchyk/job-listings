"use client";

import { ErrorState } from "@/components/error-state/error-state.component";

export default function JobDetailsError({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <ErrorState
      title="Unable to load job details"
      description="Please try loading this job again."
      pendingMessage="Loading job details…"
      retry={retry}
      backLink={{ href: "/jobs", label: "Back to jobs" }}
    />
  );
}
