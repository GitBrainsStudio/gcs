import { Product } from "../../product/models/product.model";

export interface PurchaseProduct
{
    Id:string;
    Count:number;
    Product:Product;
}