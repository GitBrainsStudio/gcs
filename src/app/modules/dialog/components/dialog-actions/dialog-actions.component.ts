import {
  AfterContentInit,
  Component,
  ContentChildren,
  ElementRef,
  QueryList,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import { DialogActionDirective } from '../../directives/dialog-action.directive';

@Component({
  selector: 'app-dialog-actions',
  templateUrl: './dialog-actions.component.html',
  styleUrls: ['./dialog-actions.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DialogActionsComponent implements AfterContentInit {
  constructor(private renderer2: Renderer2) {}

  ngAfterContentInit(): void {
    this.items.map((item: ElementRef) => {
      this.renderer2.addClass(item.nativeElement, 'dialog__action');
    });
  }

  @ContentChildren(DialogActionDirective, { read: ElementRef })
  items: QueryList<ElementRef> | [] = [];
}
