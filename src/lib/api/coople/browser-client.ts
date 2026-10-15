import "client-only";

import type { JobSummary } from "@/types/coople";
import type { Page } from "@/types/pagination";
import type { JobsQueryDto } from "./dto";
import { request } from "./request";

export function getJobs({ pageNum, pageSize }: JobsQueryDto): Promise<Page<JobSummary>> {
  const query = new URLSearchParams({ pageNum: String(pageNum), pageSize: String(pageSize) });
  return request<Page<JobSummary>>(`/api/coople/jobs?${query}`);
}
