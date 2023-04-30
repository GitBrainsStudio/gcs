import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormFieldDirective } from './directives/form-field.directive';
import { FormComponent } from './components/form/form.component';
import { FormDirective } from './directives/form.directive';
import { FormActionsComponent } from './components/form-actions/form-actions.component';
import { FormActionDirective } from './directives/form-action.directive';

@NgModule({
  declarations: [
    FormFieldDirective,
    FormActionDirective,
    FormDirective,
    FormComponent,
    FormActionsComponent
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [
    FormFieldDirective,
    FormActionDirective,
    FormDirective,
    FormComponent,
    FormActionsComponent
  ]
})
export class FormModule {}
