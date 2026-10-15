export interface JobMoney {
  amount: number | null;
  currencyId: number | null;
}

export interface JobLocation {
  street: string | null;
  additionalAddress: string | null;
  postalCode: string | null;
  city: string | null;
  region: string | null;
  countryId: number | null;
}

export interface JobSkill {
  profileId: number | null;
  educationLevelId: number | null;
}

export interface JobSummary {
  id: string;
  title: string | null;
  reference: string | null;
  location: JobLocation | null;
  hourlyWage: JobMoney | null;
  salary: JobMoney | null;
  skill: JobSkill | null;
  startsAt: number | null;
  publishedAt: number | null;
  applicationUrl: string | null;
}

export interface JobDetails extends JobSummary {
  requirements: string | null;
  clothingRequirements: string | null;
  endsAt: number | null;
  firstShiftEndsAt: number | null;
  shiftsCount: number | null;
  /** Raw API value; its unit has not been confirmed. */
  workDuration: number | null;
}

