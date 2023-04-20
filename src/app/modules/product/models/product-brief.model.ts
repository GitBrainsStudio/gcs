import { ProductStatus } from '../enums/purchase-status.enum';

export interface ProductBrief {
  Id: string;
  Status: ProductStatus;
  Title: string;
  PurchasePrice: number;
}
