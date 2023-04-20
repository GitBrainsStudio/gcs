import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/modules/product/models/product.model';
import { ProductService } from 'src/app/modules/product/services/product.service';
import { Sale } from 'src/app/modules/sale/models/sale.model';

@Component({
  selector: 'app-sale-editor',
  templateUrl: './sale-editor.component.html',
  styleUrls: ['./sale-editor.component.scss']
})
export class SaleEditorComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<SaleEditorComponent>,
    private productService: ProductService,
    @Inject(MAT_DIALOG_DATA) public sale: Sale
  ) {}

  ngOnInit(): void {
    if (this.sale) {
      this.mainFormGroup.patchValue(this.sale);
    }

    this.productService.getAll().subscribe({
      next: v => {
        this.products = v;
      }
    });
  }

  mainFormGroup = this.formBuilder.group({
    ProductId: ['', [Validators.required]],
    Price: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern('^[0-9]*$')]
    }),
    Date: ['', Validators.required]
  });

  formLoading: boolean = false;
  products: Product[] = [];

  formSubmit() {
    console.log(this.mainFormGroup);
    if (this.mainFormGroup.invalid) {
      return;
    }

    const sale = this.mainFormGroup.getRawValue() as Sale;
    this.matDialogRef.close(sale);
  }

  closeDialog() {
    this.matDialogRef.close();
  }
}
