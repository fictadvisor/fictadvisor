export class DateUtil {
  static toDateTimeString(date: Date) {
    if (date == null) {
      return 'null';
    }
    const parts = new Intl.DateTimeFormat('ua', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).formatToParts(date);
    const p = parts.reduce(
      (ca, it) => ({ ...ca, [it.type]: it.value }),
      {},
    ) as any;
    return `${p.day}.${p.month}.${p.year}`;
  }
}
