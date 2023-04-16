import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PurchaseService } from '../../services/purchase.service';
import { PurchaseEditorComponent } from '../purchase-editor/purchase-editor.component';

@Component({
  selector: 'app-purchase-add-button',
  templateUrl: './purchase-add-button.component.html',
  styleUrls: ['./purchase-add-button.component.scss']
})
export class PurchaseAddButtonComponent {
  constructor(public dialog: MatDialog, private purchaseService:PurchaseService)
  {

  }

  openPurchaseEditorDialog()
  {
    const dialogRef = this.dialog.open(PurchaseEditorComponent);
    dialogRef.afterClosed().subscribe(purchase => 
      {
        if (purchase)
        {
          this.purchaseService.add(purchase);
        }
      })
  }
}
