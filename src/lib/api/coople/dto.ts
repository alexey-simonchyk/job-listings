import type { Page } from "@/types/pagination";

export interface JobsQueryDto {
  pageNum: number;
  pageSize: number;
}

export interface CoopleResponseDto<T> {
  status: number;
  data?: T | null;
  errorCode: string;
  errorDetails: unknown;
  errorId: number;
  error: boolean;
}

export interface MoneyDto {
  amount?: number | null;
  currencyId?: number | null;
}

export interface JobLocationDto {
  addressStreet?: string | null;
  extraAddress?: string | null;
  zip?: string | null;
  city?: string | null;
  state?: string | null;
  countryId?: number | null;
}

export interface JobSkillDto {
  jobProfileId?: number | null;
  educationalLevelId?: number | null;
}

export interface JobSummaryDto {
  workAssignmentId: string;
  workAssignmentName?: string | null;
  waReadableId?: string | null;
  hourlyWage?: MoneyDto | null;
  salary?: MoneyDto | null;
  jobSkill?: JobSkillDto | null;
  jobLocation?: JobLocationDto | null;
  periodFrom?: number | null;
  datePublished?: number | null;
  branchLink?: string | null;
}

export interface JobDetailsDto extends JobSummaryDto {
  requirements?: string | null;
  clothingRequirements?: string | null;
  periodTo?: number | null;
  firstShiftTo?: number | null;
  shiftsCount?: number | null;
  workDuration?: number | null;
}

export type JobsPageDto = Page<JobSummaryDto>;
