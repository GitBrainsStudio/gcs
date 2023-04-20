import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[form-field]'
})
export class FormFieldDirective {}
