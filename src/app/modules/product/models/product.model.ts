import { PurchaseBrief } from '../../purchase/models/purchase-brief.model';
import { ProductStatus } from '../enums/purchase-status.enum';

export interface Product {
  Id: string;
  Title: string;
  PurchasePrice: number;
  Status: ProductStatus;
  PurchaseBrief: PurchaseBrief;
}
