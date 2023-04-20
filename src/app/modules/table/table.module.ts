import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { TableCellDirective } from './directives/table.directive';

@NgModule({
  declarations: [TableCellDirective],
  imports: [CommonModule, MaterialModule],
  exports: [TableCellDirective]
})
export class TableModule {}
