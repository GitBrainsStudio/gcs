import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductEditorComponent } from '../product-editor/product-editor.component';

@Component({
  selector: 'app-product-add-button',
  templateUrl: './product-add-button.component.html',
  styleUrls: ['./product-add-button.component.scss']
})
export class ProductAddButtonComponent {
  constructor(public dialog: MatDialog)
  {

  }

  openProductEditorDialog()
  {
    const dialogRef = this.dialog.open(ProductEditorComponent);
  }
}
