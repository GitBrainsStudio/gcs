import { PurchaseStatus } from '../enums/purchase-status.enum';
import { PurchaseProduct } from './purchase-product.model';

export interface Purchase {
  Id: string;
  Title: string;
  Date: string;
  OrderNumber: string;
  Status: PurchaseStatus;
  Products: PurchaseProduct[];
}
