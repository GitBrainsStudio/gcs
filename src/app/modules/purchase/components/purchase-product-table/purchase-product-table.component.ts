import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductEditorComponent } from 'src/app/modules/product/components/product-editor/product-editor.component';
import { ProductStatus } from 'src/app/modules/product/enums/purchase-status.enum';
import { Product } from 'src/app/modules/product/models/product.model';

@Component({
  selector: 'app-purchase-product-table',
  templateUrl: './purchase-product-table.component.html',
  styleUrls: ['./purchase-product-table.component.scss']
})
export class PurchaseProductTableComponent {
  @Input() dataSource: Product[] = [];
  @Output() updated = new EventEmitter<Product[]>();
  displayedColumns: string[] = ['title', 'purchasePrice', 'actions'];
  productStatus = ProductStatus;

  constructor(private matDialog: MatDialog) {}

  productDelete(purchaseProduct: Product) {
    this.dataSource = this.dataSource.filter(x => x.Id != purchaseProduct.Id);
    this.updated.next(this.dataSource);
  }

  openProductEditorDialog(product: Product) {
    const dialogRef = this.matDialog.open(ProductEditorComponent, {
      data: product,
      width: '60vw',
      maxWidth: '60vw'
    });
    dialogRef.afterClosed().subscribe((product: Product) => {
      if (product) {
        this.dataSource = this.dataSource.filter(x => x.Id != product.Id);
        this.dataSource.push(product);
        this.updated.next(this.dataSource);
      }
    });
  }
}
