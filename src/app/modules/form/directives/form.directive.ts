import {
  AfterContentInit,
  ContentChildren,
  Directive,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  Renderer2
} from '@angular/core';
import { FormFieldDirective } from './form-field.directive';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[form]'
})
export class FormDirective {}
