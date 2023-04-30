import { Component, Input } from '@angular/core';
import { ProductStatus } from '../../enums/purchase-status.enum';

@Component({
  selector: 'app-product-status',
  templateUrl: './product-status.component.html',
  styleUrls: ['./product-status.component.scss']
})
export class ProductStatusComponent {
  @Input() value: ProductStatus = ProductStatus.InProgress;
}
