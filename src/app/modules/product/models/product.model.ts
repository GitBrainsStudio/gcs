import { PurchaseBrief } from '../../purchase/models/purchase-brief.model';
import { ProductStatus } from '../enums/purchase-status.enum';

export interface Product {
  Id: string;
  Status: ProductStatus;
  Title: string;
  PurchasePrice: number;
  PurchaseBrief: PurchaseBrief;
  PurchaseProductId: string;
}
