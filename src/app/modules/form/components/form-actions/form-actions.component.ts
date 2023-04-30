import {
  AfterContentInit,
  Component,
  ContentChildren,
  ElementRef,
  QueryList,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import { FormActionDirective } from '../../directives/form-action.directive';

@Component({
  selector: 'app-form-actions',
  templateUrl: './form-actions.component.html',
  styleUrls: ['./form-actions.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormActionsComponent implements AfterContentInit {
  constructor(private renderer2: Renderer2) {}

  ngAfterContentInit(): void {
    this.items.map((item: ElementRef) => {
      this.renderer2.addClass(item.nativeElement, 'form__action');
    });
  }

  @ContentChildren(FormActionDirective, { read: ElementRef })
  items: QueryList<ElementRef> | [] = [];
}
