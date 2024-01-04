import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ConvertToBooleanPipe implements PipeTransform {
  transform (value: string) {
    if (!value) return;
    return value === 'true';
  }
}
