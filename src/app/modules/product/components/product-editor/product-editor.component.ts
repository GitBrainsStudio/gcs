import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-editor',
  templateUrl: './product-editor.component.html',
  styleUrls: ['./product-editor.component.scss']
})
export class ProductEditorComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<ProductEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public product: Product
  ) {}

  ngOnInit(): void {
    if (this.product) {
      this.form.patchValue(this.product);
    }
  }

  form = this.formBuilder.group({
    Title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    PurchasePrice: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern('^[0-9]*$')]
    })
  });
  formLoading: boolean = false;

  formSubmit() {
    if (this.form.invalid) {
      return;
    }

    const purchaseProduct = this.form.value as Product;
    purchaseProduct.Id = this.product?.Id ?? '';

    this.matDialogRef.close(purchaseProduct);
  }

  closeDialog() {
    this.matDialogRef.close();
  }
}
