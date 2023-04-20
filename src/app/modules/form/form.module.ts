import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormFieldDirective } from './directives/form-field.directive';
import { FormComponent } from './components/form/form.component';
import { FormDirective } from './directives/form.directive';

@NgModule({
  declarations: [FormFieldDirective, FormDirective, FormComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [FormFieldDirective, FormDirective, FormComponent]
})
export class FormModule {}
