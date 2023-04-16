import { PurchaseBrief } from '../../purchase/models/purchase-brief.model';

export interface Product {
  Id: string;
  Title: string;
  PurchasePrice: number;
  PurchaseBrief: PurchaseBrief;
  PurchaseProductId: string;
}
