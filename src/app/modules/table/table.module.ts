import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { TableCellDirective } from './directives/table.directive';
import { TableHasErrorsComponent } from './components/table-has-errors/table-has-errors.component';
import { WrapperModule } from '../wrapper/wrapper.module';
import { TableEmptyMessageComponent } from './components/table-empty-message/table-empty-message.component';

@NgModule({
  declarations: [
    TableCellDirective,
    TableHasErrorsComponent,
    TableEmptyMessageComponent
  ],
  imports: [CommonModule, MaterialModule, WrapperModule],
  exports: [
    TableCellDirective,
    TableHasErrorsComponent,
    TableEmptyMessageComponent
  ]
})
export class TableModule {}
