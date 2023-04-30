import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductTableComponent } from './components/product-table/product-table.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductRoutingModule } from './product-routing.module';
import { ProductsComponent } from './pages/products/products.component';
import { LayoutModule } from '../layout/layout.module';
import { WrapperModule } from '../wrapper/wrapper.module';
import { TableModule } from '../table/table.module';
import { ProductStatusComponent } from './components/product-status/product-status.component';
import { ProductStatusPipe } from './pipes/product-status.pipe';
import { ProductEditorComponent } from './components/product-editor/product-editor.component';
import { DialogModule } from '../dialog/dialog.module';
import { FormModule } from '../form/form.module';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductTableComponent,
    ProductStatusComponent,
    ProductStatusPipe,
    ProductEditorComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    WrapperModule,
    TableModule,
    DialogModule,
    FormModule
  ],
  exports: [ProductsComponent]
})
export class ProductModule {}
