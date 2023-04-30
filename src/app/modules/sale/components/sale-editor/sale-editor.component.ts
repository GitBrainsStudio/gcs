import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize, map, delay } from 'rxjs';
import { Settings } from 'src/app/core/settings/models/settings';
import { ProductStatus } from 'src/app/modules/product/enums/purchase-status.enum';
import { Product } from 'src/app/modules/product/models/product.model';
import { ProductService } from 'src/app/modules/product/services/product.service';
import { Sale } from 'src/app/modules/sale/models/sale.model';
import { SaleService } from '../../services/sale.service';

@Component({
  selector: 'app-sale-editor',
  templateUrl: './sale-editor.component.html',
  styleUrls: ['./sale-editor.component.scss']
})
export class SaleEditorComponent implements OnInit {
  isLoading: boolean = false;
  mainFormGroup = this.formBuilder.group({
    ProductId: ['', [Validators.required]],
    Price: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern('^[0-9]*$')]
    }),
    Date: ['', Validators.required]
  });
  products: Product[] = [];
  productStatus = ProductStatus;

  constructor(
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<SaleEditorComponent>,
    private productService: ProductService,
    private saleService: SaleService,
    private matSnackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public sale: Sale
  ) {}

  ngOnInit(): void {
    if (this.sale) {
      this.mainFormGroup.patchValue(this.sale);
      this.mainFormGroup.controls.ProductId.setValue(this.sale.ProductBrief.Id);
    }

    this.productService.getAll().subscribe({
      next: v => {
        this.products = v;
      }
    });
  }

  formSubmit() {
    if (this.mainFormGroup.invalid) {
      return;
    }
    this.isLoading = true;
    this.mainFormGroup.disable();
    this.matDialogRef.disableClose = true;

    const sale = this.mainFormGroup.getRawValue() as Sale;

    if (this.sale) {
      sale.Id = this.sale.Id;
      this.saleService
        .update(sale)
        .pipe(
          finalize(() => {
            this.isLoading = false;
            this.mainFormGroup.enable();
            this.matDialogRef.disableClose = false;
          })
        )
        .subscribe({
          next: v => {
            this.matSnackBar.open(
              Settings.SaleUpdateSuccessSnackbarMessage,
              undefined,
              {
                verticalPosition: 'bottom',
                duration: 3000
              }
            );
            this.matDialogRef.close();
          },
          error: e => {
            this.matSnackBar.open(Settings.InternalErrorMessage, undefined, {
              verticalPosition: 'bottom',
              duration: 3000
            });
          }
        });
    } else {
      this.saleService
        .create(sale)
        .pipe(
          finalize(() => {
            this.isLoading = false;
            this.mainFormGroup.enable();
            this.matDialogRef.disableClose = false;
          })
        )
        .subscribe({
          next: v => {
            this.matSnackBar.open(
              Settings.SaleCreateSuccessSnackbarMessage,
              undefined,
              {
                verticalPosition: 'bottom',
                duration: 3000
              }
            );
            this.matDialogRef.close();
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
}
