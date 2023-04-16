import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GuidService } from 'src/app/shared/services/guid.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-editor',
  templateUrl: './product-editor.component.html',
  styleUrls: ['./product-editor.component.scss']
})
export class ProductEditorComponent implements OnInit {
  constructor(
    private formBuilder:FormBuilder, 
    private matDialogRef:MatDialogRef<ProductEditorComponent>,
    private guidService:GuidService,
    @Inject(MAT_DIALOG_DATA) public product: Product)
    {

    }

  ngOnInit(): void {
    if (this.product)
    {
      this.form.patchValue(this.product)
    }
  }

  form = this.formBuilder.group({
    Title: ['', [Validators.required]],
    PurchasePrice: ['', [Validators.required]]
  });
  formLoading: boolean = false;

  formSubmit()
  {    
    if (this.form.invalid)
    {
      return;
    }
    
    const product = this.form.getRawValue() as Product;

    if (!this.product)
    {
      product.Id = this.guidService.generate();
      this.matDialogRef.close(product);
    }
    else
    {
      product.Id = this.product.Id;
      this.matDialogRef.close(product);
    }
  }

  closeDialog()
  {
    this.matDialogRef.close();
  }
}
