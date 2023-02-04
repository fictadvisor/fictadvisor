export class ColumnFloatTransformer {
  to (data: any): number {
    return typeof data === 'number' ? data : parseFloat(data);
  }

  from (data: any): number {
    return parseFloat(data);
  }
}

export const FLOAT_TRANSFORMER = new ColumnFloatTransformer();
