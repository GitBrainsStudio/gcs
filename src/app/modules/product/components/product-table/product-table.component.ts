import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize, merge, mergeMap } from 'rxjs';
import { Settings } from 'src/app/core/settings/models/settings';
import { PurchaseEditorComponent } from 'src/app/modules/purchase/components/purchase-editor/purchase-editor.component';
import { PurchaseEvents } from 'src/app/modules/purchase/events/purchase.events';
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
  @Input() isLoading: boolean = true;
  @Output() isLoadingChanged = new EventEmitter<boolean>();
  hasErrors: boolean = false;
  displayedColumns: string[] = [
    'title',
    'purchasePrice',
    'purchaseDate',
    'orderNumber',
    'status',
    'actions'
  ];
  dataSource: Product[] | null = null;

  constructor(
    public productService: ProductService,
    private productEvents: ProductEvents,
    private purchaseEvents: PurchaseEvents,
    private purchaseService: PurchaseService,
    private matSnackBar: MatSnackBar,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.productService
      .getAll()
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.isLoadingChanged.next(this.isLoading);
        })
      )
      .subscribe({
        next: v => {
          this.hasErrors = false;
          this.dataSource = v;
        },
        error: e => {
          this.hasErrors = true;
        }
      });

    merge(
      this.productEvents.added,
      this.productEvents.updated,
      this.productEvents.deleted,
      this.purchaseEvents.created,
      this.purchaseEvents.updated,
      this.purchaseEvents.deleted
    )
      .pipe(mergeMap(() => this.productService.getAll()))
      .subscribe({
        next: v => {
          this.dataSource = v;
        },
        error: e => {
          this.hasErrors = true;
        }
      });
  }

  openPurchaseEditorDialog(product: Product) {
    this.isLoading = true;
    this.isLoadingChanged.next(this.isLoading);

    this.purchaseService
      .getById(product.PurchaseBrief.Id)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.isLoadingChanged.next(this.isLoading);
        })
      )
      .subscribe({
        next: v => {
          const dialogRef = this.matDialog.open(PurchaseEditorComponent, {
            data: v,
            width: '80vw',
            maxWidth: '80vw'
          });
        },
        error: v => {
          this.matSnackBar.open(Settings.InternalErrorMessage, undefined, {
            verticalPosition: 'bottom',
            duration: 3000
          });
        }
      });
  }
}
