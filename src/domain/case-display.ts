import type {
  Assessment,
  ImageQuality,
  ImpressionCategory,
  LogbookCase,
  ManagementImpact,
} from "./logbook";

export const ASSESSMENT_LABELS: Record<Assessment, string> = {
  not_assessed: "Not assessed",
  yes: "Yes",
  no: "No",
  unable: "Unable to assess",
};

export const ASSESSMENT_OPTIONS = [
  { value: "yes", label: ASSESSMENT_LABELS.yes },
  { value: "no", label: ASSESSMENT_LABELS.no },
  { value: "unable", label: ASSESSMENT_LABELS.unable },
  { value: "not_assessed", label: ASSESSMENT_LABELS.not_assessed },
] as const;

export function formatCaseDate(
  date: string,
  locale?: string,
  options?: Intl.DateTimeFormatOptions,
) {
  return new Date(`${date}T12:00:00`).toLocaleDateString(
    locale,
    options,
  );
}

/** Keeps case numbers and list order aligned, even after an older case is edited. */
export function compareCasesBySequence(first: LogbookCase, second: LogbookCase) {
  return (
    first.date.localeCompare(second.date) ||
    first.createdAt.localeCompare(second.createdAt) ||
    first.id.localeCompare(second.id)
  );
}

export function sortCasesBySequence(cases: LogbookCase[]) {
  return cases.slice().sort(compareCasesBySequence);
}

/** Numbers cases by pathway and scan date; IDs stay stable for storage and imports. */
export function getCaseSequenceNumbers(cases: LogbookCase[]) {
  const byPathway = new Map<string, LogbookCase[]>();
  for (const entry of cases) {
    const pathwayCases = byPathway.get(entry.pathway) ?? [];
    pathwayCases.push(entry);
    byPathway.set(entry.pathway, pathwayCases);
  }

  const sequenceNumbers = new Map<string, number>();
  for (const pathwayCases of byPathway.values()) {
    sortCasesBySequence(pathwayCases)
      .forEach((entry, index) => sequenceNumbers.set(entry.id, index + 1));
  }
  return sequenceNumbers;
}

export function formatImpression(value: ImpressionCategory) {
  if (value === "not_recorded") return "Not recorded";
  if (value === "abnormal") return "Abnormal / pathology";
  return value[0].toUpperCase() + value.slice(1);
}

export function formatManagementImpact(value: ManagementImpact) {
  if (value === "not_recorded") return "Not recorded";
  return value === "changed" ? "Changed" : "Unchanged";
}

export function formatImageQuality(value: ImageQuality) {
  if (value === "not_recorded") return "Not recorded";
  return value[0].toUpperCase() + value.slice(1);
}

export function formatSupervision(entry: LogbookCase) {
  if (!entry.supervised) return "Not directly supervised";
  return `Directly supervised${entry.supervisorName.trim() ? ` · ${entry.supervisorName.trim()}` : ""}`;
}
