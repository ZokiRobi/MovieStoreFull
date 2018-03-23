import { DomSanitizer } from '@angular/platform-browser';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'safe'
})
export class SafePipePipe implements PipeTransform {
  constructor(private sanitazer: DomSanitizer){}
  transform(value) {
      return this.sanitazer.bypassSecurityTrustResourceUrl(value);
  }

}