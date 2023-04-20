import { Component, Input } from '@angular/core';
import { Product } from 'src/app/modules/product/models/product.model';
import { PurchaseProduct } from 'src/app/modules/purchase/models/purchase-product.model';
import { Purchase } from 'src/app/modules/purchase/models/purchase.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() dataSource: (Product | Purchase | PurchaseProduct)[] = [];
}
