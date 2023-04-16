import { EventEmitter, Injectable } from "@angular/core";
import { Product } from "../models/product.model";

@Injectable({providedIn:'root'})
export class ProductEvents
{
    added = new EventEmitter<Product>();
    deleted = new EventEmitter<Product>();
    updated = new EventEmitter<Product>();
}