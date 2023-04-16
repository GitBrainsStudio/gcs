import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { ProductEvents } from "../events/product.events";
import { Product } from "../models/product.model";

@Injectable({providedIn:'root'})
export class ProductService
{
    private _storageKey = 'products';
    private _products: Product[] = [];
    private _productEvents:ProductEvents | null = null;

    constructor(productEvents:ProductEvents)
    {
        this._productEvents = productEvents;
    }
    
    add(product:Product)
    {
        this._products.push(product);
        this.updateProductsLocalStorage();
        this._productEvents?.added.next(product);
    }
    
    getAll() : Observable<Product[]>
    {
        this._products = this.getProductsFromLocalStorage();
        return of(this._products);
    }

    delete(product:Product) {
        this._products = this._products.filter(x => x.Id != product.Id);
        this.updateProductsLocalStorage();
        this._productEvents?.deleted.next(product);
    }

    update(product:Product) {
        this._products = this._products.filter(x => x.Id != product.Id);
        this._products.push(product);
        this.updateProductsLocalStorage();
        this._productEvents?.updated.next(product)
    }

    private updateProductsLocalStorage() {
        localStorage.setItem(this._storageKey, JSON.stringify(this._products));
    }

    private getProductsFromLocalStorage() {
        return JSON.parse(localStorage.getItem(this._storageKey) || '[]');
    }
}