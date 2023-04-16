import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductTableComponent } from './components/product-table/product-table.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductRoutingModule } from './product-routing.module';
import { ProductsComponent } from './pages/products/products.component';
import { LayoutModule } from '../layout/layout.module';

@NgModule({
  declarations: [ProductsComponent, ProductTableComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule
  ],
  exports: [ProductsComponent]
})
export class ProductModule {}
