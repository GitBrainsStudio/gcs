import { NgModule } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { LayoutModule } from '../layout/layout.module';
import { ProductModule } from '../product/product.module';
import { MaterialModule } from '../material/material.module';
import { HomeActionsGridComponent } from './components/home-actions-grid/home-actions-grid.component';

@NgModule({
  declarations: [
    HomeComponent,
    HomeActionsGridComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    LayoutModule,
    ProductModule
  ],
  providers: [],
  bootstrap: [HomeComponent]
})
export class HomeModule { }
