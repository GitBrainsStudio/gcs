import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderSpinnerComponent } from './components/loader-spinner/loader-spinner.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [LoaderSpinnerComponent],
  imports: [CommonModule, MaterialModule],
  exports: [LoaderSpinnerComponent]
})
export class LoaderModule {}
