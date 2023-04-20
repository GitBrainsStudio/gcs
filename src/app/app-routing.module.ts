import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'purchases',
    loadChildren: () =>
      import('./modules/purchase/purchase.module').then(m => m.PurchaseModule)
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./modules/product/product.module').then(m => m.ProductModule)
  },
  {
    path: 'sales',
    loadChildren: () =>
      import('./modules/sale/sale.module').then(m => m.SaleModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
