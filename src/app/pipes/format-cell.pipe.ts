import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatCell',
})
export class FormatCellPipe implements PipeTransform {
  transform(value: number, length = 2): string {
    return value < 0 ? '  ' : value.toString().padStart(length, ' ');
  }
}
