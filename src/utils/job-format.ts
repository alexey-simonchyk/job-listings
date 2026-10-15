import type { JobLocation, JobMoney } from "@/types/coople";

const defaultMoneyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  currencyDisplay: "code",
});

const moneyFormattersMap = new Map([
  [1, defaultMoneyFormatter],
]);

function resolveMoneyFormatter(currency: number | null) {
  if (currency === null) {
    return defaultMoneyFormatter;
  }

  return moneyFormattersMap.get(currency) ?? defaultMoneyFormatter;
}

export function formatMoney(money: JobMoney | null): string {
  if (!money?.amount) {
    return "Not provided";
  }

  const moneyFormatter = resolveMoneyFormatter(money.currencyId);

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

export function formatDate(timestamp: number | null, locale?: string) {
  if (timestamp === null || !Number.isFinite(timestamp)) return null;
  const date = new Date(timestamp);
  if (!Number.isFinite(date.getTime())) return null;

  const dateFormatter = new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return { iso: date.toISOString(), label: dateFormatter.format(date) };
}
