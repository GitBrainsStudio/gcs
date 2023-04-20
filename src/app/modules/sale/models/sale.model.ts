import { ProductBrief } from '../../product/models/product-brief.model';

export interface Sale {
  Id: string;
  Price: number;
  Date: string;
  ProductId: string;
  ProductBrief: ProductBrief;
}
