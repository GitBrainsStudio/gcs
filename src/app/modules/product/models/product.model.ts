import { PurchaseBrief } from '../../purchase/models/purchase-brief.model';

export interface Product {
  Id: string;
  Title: string;
  PurchasePrice: string;
  PurchaseBrief: PurchaseBrief;
}
