import { Component, Inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { ProductEditorComponent } from 'src/app/modules/product/components/product-editor/product-editor.component';
import { Product } from 'src/app/modules/product/models/product.model';
import { EnumHelper } from 'src/app/shared/helpers/enum.helper';
import { GuidService } from 'src/app/shared/services/guid.service';
import { PurchaseStatus } from '../../enums/purchase-status.enum';
import { PurchaseBrief } from '../../models/purchase-brief.model';
import { PurchaseProduct } from '../../models/purchase-product.model';
import { Purchase } from '../../models/purchase.model';
import { PurchaseProductEditorComponent } from '../purchase-product-editor/purchase-product-editor.component';

@Component({
  selector: 'app-purchase-editor',
  templateUrl: './purchase-editor.component.html',
  styleUrls: ['./purchase-editor.component.scss']
})
export class PurchaseEditorComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<ProductEditorComponent>,
    private guidService: GuidService,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public purchase: Purchase
  ) {}

  ngOnInit(): void {
    if (this.purchase) {
      this.mainFormGroup.patchValue(this.purchase);
      this.updatePurchaseProductsFormArray(this.purchase.Products);
    }
  }

  mainFormGroup = this.formBuilder.group({
    Title: ['', [Validators.required]],
    Date: ['', Validators.required],
    OrderNumber: ['', [Validators.required]],
    Status: [PurchaseStatus.InProgress, [Validators.required]]
  });

  productsFormGroup = this.formBuilder.group({
    PurchaseProducts: this.formBuilder.array(
      [],
      [Validators.required, Validators.minLength(1)]
    )
  });

  formLoading: boolean = false;
  statusKeys = EnumHelper.parseKeys(PurchaseStatus);

  get productsFormArray(): FormArray {
    return this.productsFormGroup.controls.PurchaseProducts as FormArray;
  }

  formSubmit() {
    if (this.mainFormGroup.invalid || this.productsFormGroup.invalid) {
      return;
    }

    const purchase = this.mainFormGroup.getRawValue() as Purchase;
    purchase.Products = this.productsFormGroup
      .get('PurchaseProducts')
      ?.getRawValue();

    if (this.purchase) {
      purchase.Id = this.purchase.Id;
      this.updatePurchaseProductsFormArray(this.purchase.Products);
    } else {
      purchase.Id = this.guidService.generate();
    }

    this.matDialogRef.close(purchase);
  }

  closeDialog() {
    this.matDialogRef.close();
  }

  openPurchaseProductEditorDialog() {
    const dialogRef = this.matDialog.open(PurchaseProductEditorComponent);
    dialogRef.afterClosed().subscribe((purchaseProduct: PurchaseProduct) => {
      if (purchaseProduct) {
        purchaseProduct.Product.PurchaseBrief =
          this.mainFormGroup.getRawValue() as PurchaseBrief;
        this.productsFormArray.push(new FormControl(purchaseProduct));

        console.log(purchaseProduct);
      }
    });
  }

  updatePurchaseProductsFormArray(products: PurchaseProduct[]) {
    products.map(v => {
      v.Product.PurchaseBrief =
        this.mainFormGroup.getRawValue() as PurchaseBrief;
    });
    this.productsFormArray.clear();
    products.map(v => this.productsFormArray.push(new FormControl(v)));
  }
}
