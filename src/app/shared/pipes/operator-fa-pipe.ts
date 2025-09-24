import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'operatorFa',
  standalone: true
})
export class OperatorFaPipe implements PipeTransform {
  private readonly mapping: { [key: string]: string } = {
    'irancell': 'ایرانسل',
    'mci': 'همراه اول',
    'shatelmobile': 'شاتل موبایل',
    'rightel': 'رایتل',
    'irancell_tdlte': 'مودم خانگی TDLTE'
  };

  transform(value: string | undefined): string {
    if (!value) {
      return '';
    }
    return this.mapping[value.toLowerCase()] || value;
  }
}
