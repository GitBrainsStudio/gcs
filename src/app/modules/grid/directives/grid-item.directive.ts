import { Directive } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[grid-item]'
})
export class GridItemDirective {
  constructor() {}
}
