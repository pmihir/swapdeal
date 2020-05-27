import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'range'
})
export class RangePipe implements PipeTransform {

  transform(length : number): number[] {
    const array = [];
    for(let n=0; n < length; ++n){
      array.push(n);
    }
    return array;
  }

}
