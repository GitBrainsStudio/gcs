import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize, merge, mergeMap, delay } from 'rxjs';
import { Settings } from 'src/app/core/settings/models/settings';
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
  @Input() isLoading: boolean = true;
  @Output() isLoadingChanged = new EventEmitter<boolean>();
  hasErrors: boolean = false;
  displayedColumns: string[] = [
    'title',
    'date',
    'orderNumber',
    'totalAmount',
    'status',
    'actions'
  ];
  dataSource: Purchase[] | null = null;
  status = PurchaseStatus;

  constructor(
    public purchaseService: PurchaseService,
    private purchaseEvents: PurchaseEvents,
    private purchaseAddButtonEvents: PurchaseAddButtonEvents,
    private matDialog: MatDialog,
    private matSnackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.purchaseService
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
      this.purchaseEvents.created,
      this.purchaseEvents.updated,
      this.purchaseEvents.deleted
    )
      .pipe(mergeMap(() => this.purchaseService.getAll()))
      .subscribe({
        next: v => {
          this.hasErrors = false;
          this.dataSource = v;
        },
        error: e => {
          this.hasErrors = true;
        }
      });
  }

  purchaseDelete(purchase: Purchase) {
    this.isLoading = true;
    this.isLoadingChanged.next(this.isLoading);

    this.purchaseService
      .delete(purchase)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.isLoadingChanged.next(this.isLoading);
        })
      )
      .subscribe({
        next: v => {
          this.matSnackBar.open(
            Settings.PurchaseDeleteSuccessSnackbarMessage,
            undefined,
            {
              verticalPosition: 'bottom',
              duration: 3000
            }
          );
        },
        error: e => {
          this.matSnackBar.open(
            e?.error?.message ? e.error.message : Settings.InternalErrorMessage,
            undefined,
            {
              verticalPosition: 'bottom',
              duration: 3000
            }
          );
        }
      });
  }

  openPurchaseEditorDialog(purchase: Purchase) {
    const dialogRef = this.matDialog.open(PurchaseEditorComponent, {
      data: purchase,
      width: '80vw',
      maxWidth: '80vw'
    });
  }

  updatePurchaseStatus(purchase: Purchase, status: PurchaseStatus) {
    this.isLoading = true;
    this.isLoadingChanged.next(this.isLoading);

    purchase.Status = status;

    this.purchaseService
      .update(purchase)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.isLoadingChanged.next(this.isLoading);
        })
      )
      .subscribe({
        next: v => {
          this.matSnackBar.open(
            Settings.PurchaseUpdateSuccessSnackbarMessage,
            undefined,
            {
              verticalPosition: 'bottom',
              duration: 3000
            }
          );
        },
        error: e => {
          this.matSnackBar.open(Settings.InternalErrorMessage, undefined, {
            verticalPosition: 'bottom',
            duration: 3000
          });
        }
      });
  }

  purchaseAddButtonClicked() {
    this.purchaseAddButtonEvents.clicked.next(true);
  }
}
