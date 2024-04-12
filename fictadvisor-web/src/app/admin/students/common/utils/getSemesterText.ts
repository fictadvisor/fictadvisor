export function getSemesterText(selective: { semester: 1 | 2; year: number }) {
  const semester = selective.semester === 1 ? 'I' : 'II';
  return `${semester} семестр ${selective.year}`;
}
