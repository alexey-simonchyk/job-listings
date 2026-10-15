"use client";

import { useEffect, useState } from "react";
import { formatDate } from "@/utils/job-format";

export function JobDate({ timestamp }: { timestamp: number | null }) {
  const [locale, setLocale] = useState("en-GB");

  useEffect(() => {
    // Read the browser locale after hydration to keep the initial markup consistent.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLocale(navigator.language);
  }, []);

  const date = formatDate(timestamp, locale);

  return date ? <time dateTime={date.iso}>{date.label}</time> : "Not provided";
}
