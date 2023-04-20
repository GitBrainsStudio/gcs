import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SaleEditorComponent } from './components/sale-editor/sale-editor.component';
import { SaleTableComponent } from './components/sale-table/sale-table.component';
import { SaleRoutingModule } from './sale-routing.module';
import { SalesComponent } from './pages/sales/sales.component';
import { LayoutModule } from '../layout/layout.module';
import { SaleAddButtonComponent } from './components/sale-add-button/sale-add-button.component';

@NgModule({
  declarations: [
    SaleEditorComponent,
    SaleTableComponent,
    SalesComponent,
    SaleAddButtonComponent
  ],
  imports: [
    CommonModule,
    SaleRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule
  ],
  exports: [SalesComponent]
})
export class SaleModule {}
