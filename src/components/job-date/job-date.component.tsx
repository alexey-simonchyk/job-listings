import { formatDate } from "@/utils/job-format";

export function JobDate({ timestamp }: { timestamp: number | null }) {
  const date = formatDate(timestamp);

  return date ? <time dateTime={date.iso}>{date.label} (Europe/Warsaw)</time> : "Not provided";
}
