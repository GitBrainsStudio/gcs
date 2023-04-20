import {
  AfterContentInit,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  QueryList,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import { GridItemDirective } from 'src/app/modules/grid/directives/grid-item.directive';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GridComponent implements AfterContentInit {
  constructor(private renderer2: Renderer2) {}

  ngAfterContentInit(): void {
    this.items.map((item: ElementRef) => {
      this.renderer2.addClass(item.nativeElement, `grid__item-${this.desktop}`);
      this.renderer2.addClass(
        item.nativeElement,
        `grid__item-sm-${this.mobile}`
      );
    });
  }

  @Input() desktop: number = 12;
  @Input() mobile: number = 12;
  @ContentChildren(GridItemDirective, { read: ElementRef })
  items: QueryList<ElementRef> | [] = [];
}
