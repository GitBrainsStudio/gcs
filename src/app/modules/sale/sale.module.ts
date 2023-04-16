import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SaleEditorComponent } from './components/sale-editor/sale-editor.component';



@NgModule({
  declarations: [SaleEditorComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [SaleEditorComponent]
})
export class SaleModule { }
