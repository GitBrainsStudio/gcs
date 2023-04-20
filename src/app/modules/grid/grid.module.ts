import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from './components/grid/grid.component';
import { GridItemDirective } from './directives/grid-item.directive';

@NgModule({
  declarations: [GridComponent, GridItemDirective],
  imports: [CommonModule],
  exports: [GridComponent, GridItemDirective]
})
export class GridModule {}
