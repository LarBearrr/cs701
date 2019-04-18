import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tokenizer'
})
export class TokenizerPipe implements PipeTransform {

  transform(value: string, delimeter: any): any {
    if (value.toString()) {
        let splitString = value.split("");
        return splitString.join(delimeter || ',');
    } else {
        return value;
    }
  }

}
