export const toDateTimeString = (date: Date) => {
  const parts = new Intl.DateTimeFormat('ua', { year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts();
  const p = parts.reduce((ca, it) => ({ ...ca, [it.type]: it.value }), {}) as any;

  return `${p.day}.${p.month}.${p.year}`;
};