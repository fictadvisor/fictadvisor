import {
  RemainingSelectivesResponse,
  SelectiveDisciplinesWithAmountResponse,
} from '@fictadvisor/utils/responses';

export function getSemesterText(
  selectives:
    | RemainingSelectivesResponse
    | SelectiveDisciplinesWithAmountResponse,
) {
  const semester = selectives.semester === 1 ? 'I' : 'II';
  return `${semester} семестр ${selectives.year}`;
}
