import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { merge, mergeMap, switchMap } from 'rxjs';
import { PurchaseEditorComponent } from 'src/app/modules/purchase/components/purchase-editor/purchase-editor.component';
import { PurchaseService } from 'src/app/modules/purchase/services/purchase.service';
import { ProductEvents } from '../../events/product.events';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent implements OnInit {
  displayedColumns: string[] = [
    'title',
    'purchasePrice',
    'purchaseDate',
    'orderNumber',
    'actions'
  ];
  dataSource: Product[] = [];
  _purchaseService: PurchaseService | null = null;

  constructor(
    public productService: ProductService,
    private productEvents: ProductEvents,
    purchaseService: PurchaseService,
    private matDialog: MatDialog
  ) {
    this._purchaseService = purchaseService;
  }

  ngOnInit(): void {
    this.productService.getAll().subscribe({
      next: v => {
        this.dataSource = v;
      }
    });

    merge(
      this.productEvents.added,
      this.productEvents.updated,
      this.productEvents.deleted
    )
      .pipe(mergeMap(() => this.productService.getAll()))
      .subscribe({
        next: v => {
          this.dataSource = v;
        }
      });
  }

  productDelete(product: Product) {
    this.productService.delete(product);
  }

  openPurchaseEditorDialog(product: Product) {
    this._purchaseService?.getById(product.PurchaseBrief.Id).subscribe({
      next: v => {
        const dialogRef = this.matDialog.open(PurchaseEditorComponent, {
          data: v
        });
      }
    });
  }
}
