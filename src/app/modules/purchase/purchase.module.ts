import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PurchaseTableComponent } from './components/purchase-table/purchase-table.component';
import { PurchaseRoutingModule } from './purchase-routing.module';
import { PurchasesComponent } from './pages/purchases/purchases.component';
import { LayoutModule } from '../layout/layout.module';
import { PurchaseAddButtonComponent } from './components/purchase-add-button/purchase-add-button.component';
import { PurchaseEditorComponent } from './components/purchase-editor/purchase-editor.component';
import { PurchaseProductsEditorComponent } from './components/purchase-products-editor/purchase-products-editor.component';
import { ProductModule } from '../product/product.module';
import { PurchaseProductTableComponent } from './components/purchase-product-table/purchase-product-table.component';
import { PurchaseStatusComponent } from './components/purchase-status/purchase-status.component';
import { PurchaseStatusPipe } from './pipes/purchase-status.pipe';
import { PurchaseProductEditorComponent } from './components/purchase-product-editor/purchase-product-editor.component';

@NgModule({
  declarations: [
    PurchaseTableComponent,
    PurchasesComponent,
    PurchaseAddButtonComponent,
    PurchaseEditorComponent,
    PurchaseProductsEditorComponent,
    PurchaseProductTableComponent,
    PurchaseStatusComponent,
    PurchaseStatusPipe,
    PurchaseProductEditorComponent
  ],
  imports: [
    CommonModule,
    PurchaseRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    ProductModule
  ],
  exports: [PurchaseTableComponent, PurchasesComponent]
})
export class PurchaseModule {}
