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
import { ProductModule } from '../product/product.module';
import { PurchaseProductTableComponent } from './components/purchase-product-table/purchase-product-table.component';
import { PurchaseStatusComponent } from './components/purchase-status/purchase-status.component';
import { PurchaseStatusPipe } from './pipes/purchase-status.pipe';
import { DialogModule } from '../dialog/dialog.module';
import { FormModule } from '../form/form.module';
import { WrapperModule } from '../wrapper/wrapper.module';
import { TableModule } from '../table/table.module';
import { LoaderModule } from '../loader/loader.module';

@NgModule({
  declarations: [
    PurchaseTableComponent,
    PurchasesComponent,
    PurchaseAddButtonComponent,
    PurchaseEditorComponent,
    PurchaseProductTableComponent,
    PurchaseStatusComponent,
    PurchaseStatusPipe
  ],
  imports: [
    CommonModule,
    PurchaseRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    ProductModule,
    DialogModule,
    FormModule,
    WrapperModule,
    TableModule,
    LoaderModule
  ],
  exports: [PurchaseTableComponent, PurchasesComponent]
})
export class PurchaseModule {}
