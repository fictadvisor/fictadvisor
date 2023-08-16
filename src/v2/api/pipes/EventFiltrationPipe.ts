import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class EventFiltrationPipe implements PipeTransform {
  transform (value: object) {
    for (const valueElement in value) {
      if (value[valueElement]) value[valueElement] = value[valueElement] === 'true';
    }
    return value;
  }
}
