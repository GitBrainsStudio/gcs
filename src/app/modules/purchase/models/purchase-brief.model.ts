import { PurchaseStatus } from '../enums/purchase-status.enum';

export interface PurchaseBrief {
  Id: string;
  Status: PurchaseStatus;
  Title: string;
  Date: string;
  OrderNumber: string;
}
