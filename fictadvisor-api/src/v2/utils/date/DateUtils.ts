import { Injectable } from '@nestjs/common';

@Injectable()
export class DateUtils {
  
  getCeiledDifference (startDate: Date, endDate: Date, unit: number) {
    return Math.ceil(Math.abs(endDate.getTime() - startDate.getTime()) / unit);
  }
}