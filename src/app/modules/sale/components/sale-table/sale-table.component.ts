import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize, merge, mergeMap, tap } from 'rxjs';
import { Settings } from 'src/app/core/settings/models/settings';
import { SaleAddButtonEvents } from '../../events/sale-add-button.events';
import { SaleEvents } from '../../events/sale.events';
import { Sale } from '../../models/sale.model';
import { SaleService } from '../../services/sale.service';
import { SaleEditorComponent } from '../sale-editor/sale-editor.component';

@Component({
  selector: 'app-sale-table',
  templateUrl: './sale-table.component.html',
  styleUrls: ['./sale-table.component.scss']
})
export class SaleTableComponent implements OnInit {
  @Input() isLoading: boolean = true;
  @Output() isLoadingChanged = new EventEmitter<boolean>();
  hasErrors: boolean = false;
  displayedColumns: string[] = [
    'productTitle',
    'purchasePrice',
    'price',
    'profit',
    'date',
    'actions'
  ];
  dataSource: Sale[] | null = null;

  constructor(
    public saleService: SaleService,
    private saleEvents: SaleEvents,
    private saleAddButtonEvents: SaleAddButtonEvents,
    private matDialog: MatDialog,
    private matSnackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.saleService
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
      this.saleEvents.created,
      this.saleEvents.updated,
      this.saleEvents.deleted
    )
      .pipe(mergeMap(() => this.saleService.getAll()))
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

  openSaleEditorDialog(sale: Sale) {
    this.matDialog.open(SaleEditorComponent, {
      data: sale,
      width: '80vw',
      maxWidth: '80vw'
    });
  }

  saleDelete(sale: Sale) {
    this.isLoading = true;
    this.isLoadingChanged.next(this.isLoading);

    this.saleService
      .delete(sale)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.isLoadingChanged.next(this.isLoading);
        })
      )
      .subscribe({
        next: v => {
          this.matSnackBar.open(
            Settings.SaleDeleteSuccessSnackbarMessage,
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

  saleAddButtonClicked() {
    this.saleAddButtonEvents.clicked.next(true);
  }
}
