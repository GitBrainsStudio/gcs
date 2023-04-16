import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductTableComponent } from './components/product-table/product-table.component';
import { MaterialModule } from '../material/material.module';
import { ProductEditorComponent } from './components/product-editor/product-editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductRoutingModule } from './product-routing.module';
import { ProductsComponent } from './pages/products/products.component';
import { LayoutModule } from '../layout/layout.module';
import { ProductAddButtonComponent } from './components/product-add-button/product-add-button.component';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductTableComponent,
    ProductEditorComponent,
    ProductAddButtonComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule
  ],
  exports: [ProductsComponent, ProductAddButtonComponent]
})
export class ProductModule {}
