import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PurchaseProduct } from '../../models/purchase-product.model';
import { PurchaseProductEditorComponent } from '../purchase-product-editor/purchase-product-editor.component';

@Component({
  selector: 'app-purchase-product-table',
  templateUrl: './purchase-product-table.component.html',
  styleUrls: ['./purchase-product-table.component.scss']
})
export class PurchaseProductTableComponent {
  displayedColumns: string[] = ['title', 'purchasePrice', 'count', 'actions'];
  @Input() dataSource:PurchaseProduct[] = [];
  @Output() updated = new EventEmitter<PurchaseProduct[]>;

  constructor(private matDialog:MatDialog)
  {
    
  }

  purchaseProductDelete(purchaseProduct:PurchaseProduct)
  {
    this.dataSource = this.dataSource.filter(x => x.Product.Id != purchaseProduct.Product.Id);
    this.updated.next(this.dataSource);
  }

  openPurchaseProductEditorDialog(purchaseProduct:PurchaseProduct)
  {
    const dialogRef = this.matDialog.open(PurchaseProductEditorComponent, { data: purchaseProduct });
    dialogRef.afterClosed().subscribe((purchaseProduct:PurchaseProduct) => {
      if (purchaseProduct)
      {
        this.dataSource = this.dataSource.filter(x => x.Product.Id != purchaseProduct.Product.Id);
        this.dataSource.push(purchaseProduct);
        this.updated.next(this.dataSource);
      }
    });
  }
}
