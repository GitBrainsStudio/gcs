import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReplaySubject, takeUntil } from 'rxjs';
import { SaleAddButtonEvents } from '../../events/sale-add-button.events';
import { SaleEditorComponent } from '../sale-editor/sale-editor.component';

@Component({
  selector: 'app-sale-add-button',
  templateUrl: './sale-add-button.component.html',
  styleUrls: ['./sale-add-button.component.scss']
})
export class SaleAddButtonComponent implements OnDestroy {
  destroy: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  constructor(
    private matDialog: MatDialog,
    private saleAddButtonEvents: SaleAddButtonEvents
  ) {
    this.saleAddButtonEvents.clicked.pipe(takeUntil(this.destroy)).subscribe({
      next: (v: boolean) => {
        if (v) {
          this.openSaleEditorDialog();
        }
      }
    });
  }
  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.complete();
  }
  openSaleEditorDialog() {
    const dialogRef = this.matDialog.open(SaleEditorComponent, {
      width: '80vw',
      maxWidth: '80vw'
    });
  }
}
