import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "pricecalculation",
})
export class PricecalculationPipe implements PipeTransform {
  transform(price: number, quantity: number): unknown {
    console.log(price, quantity);
    return price * quantity;
  }
}
