import { Pipe, PipeTransform } from '@angular/core';
import { ProductStatus } from '../enums/purchase-status.enum';

@Pipe({
  name: 'productStatus'
})
export class ProductStatusPipe implements PipeTransform {
  transform(status: ProductStatus): string {
    const unknown = 'Статус не известен';
    switch (status) {
      case ProductStatus.InProgress:
        return 'Подготавливается к отгрузке';
      case ProductStatus.Shipped:
        return 'В пути';
      case ProductStatus.Arrived:
        return 'В наличии';
      case ProductStatus.Solded:
        return 'Продан';
      default:
        return unknown;
    }
  }
}
