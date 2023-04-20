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
import { FormGroup } from '@angular/forms';
import { FormFieldDirective } from '../../directives/form-field.directive';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormComponent implements AfterContentInit {
  ngAfterContentInit(): void {
    this.items.map((item: ElementRef) => {
      this.renderer2.addClass(item.nativeElement, 'form__field');
    });
  }

  @Input() formGroup: FormGroup | null = null;
  @ContentChildren(FormFieldDirective, { read: ElementRef })
  items: QueryList<ElementRef> | [] = [];

  constructor(private renderer2: Renderer2) {}
}
