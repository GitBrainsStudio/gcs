import { Component, Input } from '@angular/core';
import { PurchaseStatus } from '../../enums/purchase-status.enum';

@Component({
  selector: 'app-purchase-status',
  templateUrl: './purchase-status.component.html',
  styleUrls: ['./purchase-status.component.scss']
})
export class PurchaseStatusComponent {
  @Input() value: PurchaseStatus = PurchaseStatus.InProgress;
}
