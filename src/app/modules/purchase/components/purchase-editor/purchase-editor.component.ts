import { Component, Inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize, delay } from 'rxjs';
import { Settings } from 'src/app/core/settings/models/settings';
import { ProductEditorComponent } from 'src/app/modules/product/components/product-editor/product-editor.component';
import { Product } from 'src/app/modules/product/models/product.model';
import { EnumHelper } from 'src/app/shared/helpers/enum.helper';
import { GuidService } from 'src/app/shared/services/guid.service';
import { PurchaseStatus } from '../../enums/purchase-status.enum';
import { Purchase } from '../../models/purchase.model';
import { PurchaseService } from '../../services/purchase.service';

@Component({
  selector: 'app-purchase-editor',
  templateUrl: './purchase-editor.component.html',
  styleUrls: ['./purchase-editor.component.scss']
})
export class PurchaseEditorComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<PurchaseEditorComponent>,
    private guidService: GuidService,
    private matDialog: MatDialog,
    private purchaseService: PurchaseService,
    private matSnackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public purchase: Purchase
  ) {}

  ngOnInit(): void {
    if (this.purchase) {
      this.mainFormGroup.patchValue(this.purchase);
      this.updateProductsFormArray(this.purchase.Products);
    }
  }

  mainFormGroup = this.formBuilder.group({
    Id: [this.guidService.generate(), [Validators.required]],
    Title: ['', [Validators.required]],
    Date: ['', Validators.required],
    OrderNumber: ['', [Validators.required]],
    Status: [PurchaseStatus.InProgress, [Validators.required]]
  });

  productsFormGroup = this.formBuilder.group({
    Products: this.formBuilder.array(
      [],
      [Validators.required, Validators.minLength(1)]
    )
  });

  isLoading: boolean = false;
  statusKeys = EnumHelper.parseKeys(PurchaseStatus);

  get productsFormArray(): FormArray {
    return this.productsFormGroup.controls.Products as FormArray;
  }

  formSubmit() {
    if (this.mainFormGroup.invalid || this.productsFormGroup.invalid) {
      return;
    }

    this.isLoading = true;
    this.mainFormGroup.disable();
    this.productsFormGroup.disable();
    this.matDialogRef.disableClose = true;

    const purchase = this.mainFormGroup.getRawValue() as Purchase;
    purchase.Products = this.productsFormGroup.controls.Products.value.map(
      v => v as Product
    );

    if (this.purchase) {
      purchase.Id = this.purchase.Id;
      this.purchaseService
        .update(purchase)
        ?.pipe(
          finalize(() => {
            this.isLoading = false;
            this.mainFormGroup.enable();
            this.productsFormGroup.enable();
            this.matDialogRef.disableClose = false;
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
            this.matDialogRef.close(purchase);
          },
          error: e => {
            this.matSnackBar.open(
              e?.error?.message
                ? e.error.message
                : Settings.InternalErrorMessage,
              undefined,
              {
                verticalPosition: 'bottom',
                duration: 3000
              }
            );
          }
        });
    } else {
      this.purchaseService
        .create(purchase)
        ?.pipe(
          finalize(() => {
            this.isLoading = false;
            this.mainFormGroup.enable();
            this.productsFormGroup.enable();
            this.matDialogRef.disableClose = false;
          })
        )
        .subscribe({
          next: v => {
            this.matSnackBar.open(
              Settings.PurchaseCreateSuccessSnackbarMessage,
              undefined,
              {
                verticalPosition: 'bottom',
                duration: 3000
              }
            );
            this.matDialogRef.close(purchase);
          },
          error: e => {
            this.matSnackBar.open(Settings.InternalErrorMessage, undefined, {
              verticalPosition: 'bottom',
              duration: 3000
            });
          }
        });
    }
  }

  closeDialog() {
    this.matDialogRef.close();
  }

  openProductEditorDialog() {
    const dialogRef = this.matDialog.open(ProductEditorComponent, {
      width: '60vw',
      maxWidth: '60vw'
    });
    dialogRef.afterClosed().subscribe((purchaseProduct: Product) => {
      if (purchaseProduct) {
        this.productsFormArray.push(new FormControl(purchaseProduct));
      }
    });
  }

  updateProductsFormArray(products: Product[]) {
    this.productsFormArray.clear();
    products.map(v => this.productsFormArray.push(new FormControl(v)));
  }
}
