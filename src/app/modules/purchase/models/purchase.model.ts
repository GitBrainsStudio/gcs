import { Product } from '../../product/models/product.model';
import { PurchaseStatus } from '../enums/purchase-status.enum';

export interface Purchase {
  Id: string;
  Title: string;
  Date: string;
  OrderNumber: string;
  TotalAmount: number;
  ProductsCount: number;
  Status: PurchaseStatus;
  Products: Product[];
}
