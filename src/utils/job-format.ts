import type { JobLocation, JobMoney } from "@/types/coople";

const moneyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  currencyDisplay: "code",
});

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Europe/Warsaw",
});

export function formatMoney(money: JobMoney | null): string {
  return money?.amount != null && Number.isFinite(money.amount)
    ? moneyFormatter.format(money.amount)
    : "Not provided";
}

export function formatLocation(location: JobLocation | null): string {
  if (!location) return "Not provided";

  return [
    location.street,
    location.additionalAddress,
    [location.postalCode, location.city].filter(Boolean).join(" "),
    location.region,
  ].filter(Boolean).join(", ") || "Not provided";
}

export function formatDate(timestamp: number | null) {
  if (timestamp === null || !Number.isFinite(timestamp)) return null;
  const date = new Date(timestamp);
  if (!Number.isFinite(date.getTime())) return null;

  return { iso: date.toISOString(), label: dateFormatter.format(date) };
}
