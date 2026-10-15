import type {
  JobDetailsDto,
  JobLocationDto,
  JobSkillDto,
  JobSummaryDto,
  JobsPageDto,
  MoneyDto,
} from "./dto";
import type {
  JobDetails,
  JobLocation,
  JobMoney,
  JobSkill,
  JobSummary,
} from "@/types/coople";
import type { Page } from "@/types/pagination";

function text(value: string | null | undefined): string | null {
  return value?.trim() ? value : null;
}

function mapMoney(dto: MoneyDto | null | undefined): JobMoney | null {
  return dto == null
    ? null
    : { amount: dto.amount ?? null, currencyId: dto.currencyId ?? null };
}

function mapLocation(dto: JobLocationDto | null | undefined): JobLocation | null {
  return dto == null
    ? null
    : {
        street: text(dto.addressStreet),
        additionalAddress: text(dto.extraAddress),
        postalCode: text(dto.zip),
        city: text(dto.city),
        region: text(dto.state),
        countryId: dto.countryId ?? null,
      };
}

function mapSkill(dto: JobSkillDto | null | undefined): JobSkill | null {
  return dto == null
    ? null
    : {
        profileId: dto.jobProfileId ?? null,
        educationLevelId: dto.educationalLevelId ?? null,
      };
}

export function mapJobSummary(dto: JobSummaryDto): JobSummary {
  return {
    id: dto.workAssignmentId,
    title: text(dto.workAssignmentName),
    reference: text(dto.waReadableId),
    location: mapLocation(dto.jobLocation),
    hourlyWage: mapMoney(dto.hourlyWage),
    salary: mapMoney(dto.salary),
    skill: mapSkill(dto.jobSkill),
    startsAt: dto.periodFrom ?? null,
    publishedAt: dto.datePublished ?? null,
    applicationUrl: text(dto.branchLink),
  };
}

export function mapJobDetails(dto: JobDetailsDto): JobDetails {
  return {
    ...mapJobSummary(dto),
    requirements: text(dto.requirements),
    clothingRequirements: text(dto.clothingRequirements),
    endsAt: dto.periodTo ?? null,
    firstShiftEndsAt: dto.firstShiftTo ?? null,
    shiftsCount: dto.shiftsCount ?? null,
    workDuration: dto.workDuration ?? null,
  };
}

export function mapJobsPage(dto: JobsPageDto): Page<JobSummary> {
  return { items: dto.items.map(mapJobSummary), total: dto.total };
}
