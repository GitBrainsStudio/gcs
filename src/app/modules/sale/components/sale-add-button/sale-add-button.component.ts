import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SaleService } from '../../services/sale.service';
import { SaleEditorComponent } from '../sale-editor/sale-editor.component';

@Component({
  selector: 'app-sale-add-button',
  templateUrl: './sale-add-button.component.html',
  styleUrls: ['./sale-add-button.component.scss']
})
export class SaleAddButtonComponent {
  constructor(private matDialog: MatDialog, private saleService: SaleService) {}
  openSaleEditorDialog() {
    const dialogRef = this.matDialog.open(SaleEditorComponent);
    dialogRef.afterClosed().subscribe(sale => {
      if (sale) {
        this.saleService.add(sale);
      }
    });
  }
}
