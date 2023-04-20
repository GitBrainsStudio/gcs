import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './components/dialog/dialog.component';
import { MaterialModule } from '../material/material.module';
import { DialogBodyComponent } from './components/dialog-body/dialog-body.component';
import { DialogActionsComponent } from './components/dialog-actions/dialog-actions.component';
import { DialogActionDirective } from './directives/dialog-action.directive';

@NgModule({
  declarations: [
    DialogComponent,
    DialogBodyComponent,
    DialogActionsComponent,
    DialogActionDirective
  ],
  imports: [CommonModule, MaterialModule],
  exports: [
    DialogComponent,
    DialogBodyComponent,
    DialogActionsComponent,
    DialogActionDirective
  ]
})
export class DialogModule {}
