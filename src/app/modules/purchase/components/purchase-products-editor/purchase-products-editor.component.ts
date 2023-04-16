import { Component } from '@angular/core';
import { Product } from 'src/app/modules/product/models/product.model';

@Component({
  selector: 'app-purchase-products-editor',
  templateUrl: './purchase-products-editor.component.html',
  styleUrls: ['./purchase-products-editor.component.scss']
})
export class PurchaseProductsEditorComponent {
  displayedColumns: string[] = ['title', 'price', 'retailPrice', 'purchaseDate', 'isSolded', 'isDelivered', 'actions'];
  dataSource:Product[] = [];
}
