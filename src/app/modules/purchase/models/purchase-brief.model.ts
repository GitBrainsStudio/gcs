import { PurchaseStatus } from '../enums/purchase-status.enum';

export interface PurchaseBrief {
  Id: string;
  Title: string;
  Date: string;
  OrderNumber: string;
  Status: PurchaseStatus;
}
