import { getJobs } from "@/lib/api/coople/server-client";
import { JobList } from "@/features/job-list/components/job-list/job-list.component";
import { JOBS_PAGE_SIZE } from "@/features/job-list/utils/pagination";

export default async function JobsPage() {
  const jobs = await getJobs({ pageNum: 0, pageSize: JOBS_PAGE_SIZE });

  return <JobList jobs={jobs} />;
}
