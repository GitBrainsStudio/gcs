import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReplaySubject, takeUntil } from 'rxjs';
import { PurchaseAddButtonEvents } from '../../events/purchase-add-button.events';
import { PurchaseEditorComponent } from '../purchase-editor/purchase-editor.component';

@Component({
  selector: 'app-purchase-add-button',
  templateUrl: './purchase-add-button.component.html',
  styleUrls: ['./purchase-add-button.component.scss']
})
export class PurchaseAddButtonComponent implements OnDestroy {
  destroy: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  constructor(
    public dialog: MatDialog,
    private purchaseAddButtonEvents: PurchaseAddButtonEvents
  ) {
    this.purchaseAddButtonEvents.clicked
      .pipe(takeUntil(this.destroy))
      .subscribe({
        next: (v: boolean) => {
          if (v) {
            this.openPurchaseEditorDialog();
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.complete();
  }

  openPurchaseEditorDialog() {
    this.dialog.open(PurchaseEditorComponent, {
      width: '98vw',
      maxWidth: '98vw'
    });
  }
}
