import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'short'
})
export class ShortPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    if(value.length > 15)
    return value.substring(0,15) + "...";

    return value;
  }

}