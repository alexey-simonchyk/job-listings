import { getJob } from "@/lib/api/coople/server-client";
import { JobDetailsComponent } from "@/features/job-details/components/job-details/job-details.component";

export default async function JobDetailsPage({ params }: PageProps<"/jobs/[jobId]">) {
  const { jobId } = await params;
  const job = await getJob(jobId);

  return <JobDetailsComponent job={job} />;
}
