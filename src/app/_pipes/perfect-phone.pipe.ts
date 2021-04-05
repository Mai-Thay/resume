import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'perfectPhone'
})
export class PerfectPhonePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    const cleaned = ('' + value).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return '+7 (' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return null;
  }

}
