import { Component, OnInit } from '@angular/core';
import { merge, mergeMap } from 'rxjs';
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
    purchaseService: PurchaseService
  ) {
    this._purchaseService = purchaseService;
  }

  ngOnInit(): void {
    this.productService.getAll().subscribe({
      next: v => {
        this.dataSource = v;
        /* v.forEach(element => {
            this.productService.delete(element)
          }); */
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

  productRemove(product: Product) {
    this.productService.delete(product);
    this.productEvents.deleted.next(product);
  }
}
