import { Pipe, PipeTransform } from '@angular/core';
import { PurchaseStatus } from '../enums/purchase-status.enum';

@Pipe({
  name: 'purchaseStatus'
})
export class PurchaseStatusPipe implements PipeTransform {
  transform(status: PurchaseStatus): string {
    const unkmown = 'Статус не известен';
    switch (status) {
      case PurchaseStatus.InProgress:
        return 'Подготавливается к отгрузке';
      case PurchaseStatus.Shipped:
        return 'В пути';
      case PurchaseStatus.Arrived:
        return 'Получен';
      case PurchaseStatus.Unknown:
        return unkmown;
      default:
        return unkmown;
    }
  }
}
