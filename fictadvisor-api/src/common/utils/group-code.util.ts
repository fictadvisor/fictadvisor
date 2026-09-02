// A graduated group's code carries its admission year outright (ІМ-31-2023) so
// that the bare code is free for the cohort ten years later.
const GRADUATED_CODE = /-(\d{4})$/;

// <спеціальність>-<форма><рік><номер><рівень>, e.g. ІП-31, ІА-з51мп, ІТ-в61ф.
// The first digit is the last digit of the admission year, the second is the
// group's number within its cohort. Verified against every code in the database
// and every live ФІОТ group in the campus API.
const GROUP_CODE =
  /^(?<speciality>[А-ЯІЇЄҐ]{2})-(?<form>[звпо]*)(?<year>\d)(?<number>\d)(?<level>мп|мн|ф|і)?$/;

export interface ParsedGroupCode {
  speciality: string;
  /** '' денна · з заочна · в вечірня · п прискорена · о (нова з 2025, значення невідоме) */
  form: string;
  /** Last digit of the admission year. */
  year: string;
  /** The group's number within its cohort. */
  number: string;
  /** '' бакалавр · мп магістр ОПП · мн магістр ОНП · ф аспіранти · і */
  level: string;
}

// How many academic years each level studies, counted from the admission year.
// Derived from the campus API's live group list, which drops a group once it has
// graduated: bachelors run four consecutive cohorts, both master's levels two.
// The form of study makes no difference — заочні bachelors run four cohorts too.
export const STUDY_YEARS_BY_LEVEL: Record<string, number> = {
  '': 4,
  'і': 4,
  'мп': 2,
  'мн': 2,
};

/** Аспіранти: they never graduate as far as this service is concerned. */
export const POSTGRADUATE_LEVEL = 'ф';

// Every level that shows up as a marker in the code — bachelors carry none. The
// markers are lowercase and the rest of a code is not, so a marker never occurs
// by accident: verified against all 388 codes in the database. Matching them with
// `contains` rather than `endsWith` keeps working after the -YYYY rename suffix.
export const LEVEL_MARKERS = [
  ...Object.keys(STUDY_YEARS_BY_LEVEL).filter(Boolean),
  POSTGRADUATE_LEVEL,
];

export function isGraduatedCode (code: string): boolean {
  return GRADUATED_CODE.test(code);
}

export function toGraduatedCode (code: string, admissionYear: number): string {
  return isGraduatedCode(code) ? code : `${code}-${admissionYear}`;
}

export function parseGroupCode (code: string): ParsedGroupCode | undefined {
  const groups = GROUP_CODE.exec(code.replace(GRADUATED_CODE, ''))?.groups;

  return groups && { ...groups, form: groups.form ?? '', level: groups.level ?? '' } as ParsedGroupCode;
}

/**
 * How long this group studies, or undefined when it must be left alone —
 * аспіранти (ф), who never graduate as far as this service is concerned, and
 * codes the grammar does not recognise. Both callers treat undefined as
 * "not graduated", so an unknown code is never renamed or unlocked by mistake.
 */
export function getStudyYears (code: string): number | undefined {
  const parsed = parseGroupCode(code);
  if (!parsed) return undefined;

  // A прискорена (п) program is shorter than a full one, but it was only
  // introduced in 2026 and no cohort has finished yet, so there is nothing to
  // measure. Treating it as a full bachelor graduates it late rather than early.
  return STUDY_YEARS_BY_LEVEL[parsed.level];
}

// KPI group codes carry the cohort's admission year in the first digit of their
// numeric part: ІА-11 was admitted in 2021, ІА-з61 in 2026. Only the last digit
// is encoded, so it is read against the current decade and pulled back one when
// that would place the group in the future.
export function getAdmissionYearFromCode (code: string, now = new Date()): number | undefined {
  // A graduated code states the year outright — and its leading digit would be
  // read as the wrong decade once that code comes round again.
  const graduated = code.match(GRADUATED_CODE);
  if (graduated) return Number(graduated[1]);

  const digit = code.match(/\d/)?.[0];
  if (!digit) return undefined;

  const currentYear = now.getFullYear();
  const year = Math.floor(currentYear / 10) * 10 + Number(digit);

  return year > currentYear ? year - 10 : year;
}
