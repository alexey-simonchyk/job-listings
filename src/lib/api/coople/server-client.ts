import "server-only";

import { notFound } from "next/navigation";
import type { JobDetails, JobSummary } from "@/types/coople";
import type { Page } from "@/types/pagination";
import type { CoopleResponseDto, JobDetailsDto, JobsPageDto, JobsQueryDto } from "./dto";
import { mapJobDetails, mapJobsPage } from "./mappers";
import { CoopleApiError, request } from "./request";

const BASE_URL = "https://www.coople.com/ch/resources/api/work-assignments/public-jobs";

export async function getJobs({ pageNum, pageSize }: JobsQueryDto): Promise<Page<JobSummary>> {
  const query = new URLSearchParams({ pageNum: String(pageNum), pageSize: String(pageSize) });
  const payload = await request<CoopleResponseDto<JobsPageDto>>(`${BASE_URL}/list?${query}`);
  return mapJobsPage(payload.data!);
}

export async function getJob(id: string): Promise<JobDetails> {
  try {
    const payload = await request<CoopleResponseDto<JobDetailsDto>>(
      `${BASE_URL}/${encodeURIComponent(id)}`,
    );
    return mapJobDetails(payload.data!);
  } catch (error) {
    if (error instanceof CoopleApiError && error.httpStatus === 404) {
      notFound();
    }
    throw error;
  }
}
