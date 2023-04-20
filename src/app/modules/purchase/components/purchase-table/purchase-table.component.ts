import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { merge, mergeMap, retry } from 'rxjs';
import { PurchaseStatus } from '../../enums/purchase-status.enum';
import { PurchaseAddButtonEvents } from '../../events/purchase-add-button.events';
import { PurchaseEvents } from '../../events/purchase.events';
import { Purchase } from '../../models/purchase.model';
import { PurchaseService } from '../../services/purchase.service';
import { PurchaseEditorComponent } from '../purchase-editor/purchase-editor.component';

@Component({
  selector: 'app-purchase-table',
  templateUrl: './purchase-table.component.html',
  styleUrls: ['./purchase-table.component.scss']
})
export class PurchaseTableComponent implements OnInit {
  displayedColumns: string[] = [
    'title',
    'date',
    'orderNumber',
    'status',
    'productsCount',
    'actions'
  ];
  dataSource: Purchase[] = [];
  status = PurchaseStatus;

  constructor(
    public purchaseService: PurchaseService,
    private purchaseEvents: PurchaseEvents,
    private purchaseAddButtonEvents: PurchaseAddButtonEvents,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.purchaseService.getAll().subscribe({
      next: v => {
        this.dataSource = v;
      }
    });

    merge(
      this.purchaseEvents.added,
      this.purchaseEvents.updated,
      this.purchaseEvents.deleted
    )
      .pipe(mergeMap(() => this.purchaseService.getAll()))
      .subscribe({
        next: v => {
          this.dataSource = v;
        }
      });
  }

  purchaseDelete(purchase: Purchase) {
    this.purchaseService.delete(purchase);
  }

  openPurchaseEditorDialog(purchase: Purchase) {
    const dialogRef = this.matDialog.open(PurchaseEditorComponent, {
      data: purchase
    });
    dialogRef.afterClosed().subscribe(purchase => {
      if (purchase) {
        this.purchaseService.update(purchase);
      }
    });
  }

  getProductsCount(purchase: Purchase) {
    let sum = 0;
    purchase.Products.forEach(element => {
      sum = sum + element.Count;
    });
    return sum;
  }

  updatePurchaseStatus(purchase: Purchase, status: PurchaseStatus) {
    purchase.Status = status;
    this.purchaseService.update(purchase);
  }

  purchaseAddButtonClicked() {
    this.purchaseAddButtonEvents.clicked.next(true);
  }
}
