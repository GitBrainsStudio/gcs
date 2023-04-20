import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[table-cell]'
})
export class TableCellDirective implements OnInit {
  constructor(private elementRef: ElementRef, private renderer2: Renderer2) {}
  ngOnInit(): void {
    this.renderer2.setStyle(
      this.elementRef.nativeElement,
      'white-space',
      'nowrap'
    );
  }
}
