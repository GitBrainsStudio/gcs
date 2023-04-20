import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './components/table/table.component';
import { MaterialModule } from '../material/material.module';
import { TableCellDirective } from './directives/table.directive';

@NgModule({
  declarations: [TableComponent, TableCellDirective],
  imports: [CommonModule, MaterialModule],
  exports: [TableComponent, TableCellDirective]
})
export class TableModule {}
