import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { merge, mergeMap } from 'rxjs';
import { PurchaseEditorComponent } from 'src/app/modules/purchase/components/purchase-editor/purchase-editor.component';
import { PurchaseService } from 'src/app/modules/purchase/services/purchase.service';
import { SaleEvents } from '../../events/sale.events';
import { Sale } from '../../models/sale.model';
import { SaleService } from '../../services/sale.service';

@Component({
  selector: 'app-sale-table',
  templateUrl: './sale-table.component.html',
  styleUrls: ['./sale-table.component.scss']
})
export class SaleTableComponent implements OnInit {
  displayedColumns: string[] = ['productTitle', 'price', 'date', 'actions'];
  dataSource: Sale[] = [];
  _purchaseService: PurchaseService | null = null;

  constructor(
    public saleService: SaleService,
    private saleEvents: SaleEvents,
    purchaseService: PurchaseService,
    private matDialog: MatDialog
  ) {
    this._purchaseService = purchaseService;
  }

  ngOnInit(): void {
    this.saleService.getAll().subscribe({
      next: v => {
        this.dataSource = v;
      }
    });

    merge(
      this.saleEvents.added,
      this.saleEvents.updated,
      this.saleEvents.deleted
    )
      .pipe(mergeMap(() => this.saleService.getAll()))
      .subscribe({
        next: v => {
          this.dataSource = v;
        }
      });
  }

  saleDelete(sale: Sale) {
    this.saleService.delete(sale);
  }
}
