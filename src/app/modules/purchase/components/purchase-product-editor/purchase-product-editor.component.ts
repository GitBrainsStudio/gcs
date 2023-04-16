import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GuidService } from 'src/app/shared/services/guid.service';
import { PurchaseProduct } from '../../models/purchase-product.model';

@Component({
  selector: 'app-purchase-product-editor',
  templateUrl: './purchase-product-editor.component.html',
  styleUrls: ['./purchase-product-editor.component.scss']
})
export class PurchaseProductEditorComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<PurchaseProductEditorComponent>,
    private guidService: GuidService,
    @Inject(MAT_DIALOG_DATA) public purchaseProduct: PurchaseProduct
  ) {}

  ngOnInit(): void {
    if (this.purchaseProduct) {
      this.form.patchValue({
        Title: this.purchaseProduct.Product.Title,
        PurchasePrice: this.purchaseProduct.Product.PurchasePrice,
        Count: this.purchaseProduct.Count
      });
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
    }),
    Count: new FormControl(1, {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern('^[0-9]*$')]
    })
  });
  formLoading: boolean = false;

  formSubmit() {
    if (this.form.invalid) {
      return;
    }

    const purchaseProduct = { Product: {} } as PurchaseProduct;
    purchaseProduct.Product.Title = this.form.controls.Title.value;
    purchaseProduct.Product.PurchasePrice =
      this.form.controls.PurchasePrice.value;
    purchaseProduct.Count = this.form.controls.Count.value;

    if (!this.purchaseProduct) {
      purchaseProduct.Id = this.guidService.generate();
      purchaseProduct.Product.Id = this.guidService.generate();
    } else {
      purchaseProduct.Id = this.purchaseProduct.Id;
      purchaseProduct.Product.Id = this.purchaseProduct.Product.Id;
    }

    purchaseProduct.Product.PurchaseProductId = purchaseProduct.Id;
    this.matDialogRef.close(purchaseProduct);
  }

  closeDialog() {
    this.matDialogRef.close();
  }
}
