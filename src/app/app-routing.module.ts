import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './core/guards/authentication.guards';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/home/home.module').then(m => m.HomeModule),
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'authorize',
    loadChildren: () =>
      import('./modules/authorize/authorize.module').then(
        m => m.AuthorizeModule
      )
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./modules/profile/profile.module').then(m => m.ProfileModule),
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'purchases',
    loadChildren: () =>
      import('./modules/purchase/purchase.module').then(m => m.PurchaseModule),
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./modules/product/product.module').then(m => m.ProductModule),
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'sales',
    loadChildren: () =>
      import('./modules/sale/sale.module').then(m => m.SaleModule),
    canActivate: [AuthenticationGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
