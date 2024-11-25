import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceDT',
  standalone: true
})
export class PriceDTPipe implements PipeTransform {

  transform(price: number): string {
    return price +"DT";
  }

}
