"use client";

import { ErrorState } from "@/components/error-state/error-state.component";

export default function Error({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <ErrorState
      title="Unable to load jobs"
      description="Please try loading the job list again."
      pendingMessage="Loading jobs…"
      retry={retry}
    />
  );
}
