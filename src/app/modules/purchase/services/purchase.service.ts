import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GuidService } from 'src/app/shared/services/guid.service';
import { ProductService } from '../../product/services/product.service';
import { PurchaseEvents } from '../events/purchase.events';
import { PurchaseProduct } from '../models/purchase-product.model';
import { Purchase } from '../models/purchase.model';

@Injectable({ providedIn: 'root' })
export class PurchaseService {
  private _storageKey = 'purchases';
  private _purchases: Purchase[] = [];
  private _purchaseEvents: PurchaseEvents | null = null;
  private _productService: ProductService | null = null;
  private _guidService: GuidService | null = null;

  constructor(
    purchaseEvents: PurchaseEvents,
    productService: ProductService,
    guidService: GuidService
  ) {
    this._purchaseEvents = purchaseEvents;
    this._productService = productService;
    this._guidService = guidService;
  }

  add(purchase: Purchase) {
    purchase.Products.forEach((purchaseProduct: PurchaseProduct) => {
      for (let index = 0; index < purchaseProduct.Count; index++) {
        purchaseProduct.Product.Id = this._guidService?.generate() ?? '';
        this._productService?.add(purchaseProduct.Product);
      }
    });

    this._purchases.push(purchase);
    this.updatePurchasesLocalStorage();
    this._purchaseEvents?.added.next(purchase);
  }

  getAll(): Observable<Purchase[]> {
    this._purchases = this.getPurchasesFromLocalStorage();
    return of(this._purchases);
  }

  delete(purchase: Purchase) {
    purchase.Products.map(x => this._productService?.delete(x.Product));
    this._purchases = this._purchases.filter(x => x.Id != purchase.Id);
    this.updatePurchasesLocalStorage();
    this._purchaseEvents?.deleted.next(purchase);
  }

  update(purchase: Purchase) {
    console.log(purchase);

    purchase.Products.forEach((purchaseProduct: PurchaseProduct) => {
      for (let index = 0; index < purchaseProduct.Count; index++) {
        this._productService?.delete(purchaseProduct.Product);
      }
    });

    this._purchases = this._purchases.filter(x => x.Id != purchase.Id);

    /* purchase.Products.forEach((purchaseProduct:PurchaseProduct) => {
            for (let index = 0; index < purchaseProduct.Count; index++) {
                purchaseProduct.Product.Id = this._guidService?.generate() ?? '';
                this._productService?.add(purchaseProduct.Product)
            }
        }); */

    this._purchases.push(purchase);
    this.updatePurchasesLocalStorage();
    this._purchaseEvents?.updated.next(purchase);
  }

  private updatePurchasesLocalStorage() {
    localStorage.setItem(this._storageKey, JSON.stringify(this._purchases));
  }

  private getPurchasesFromLocalStorage() {
    return JSON.parse(localStorage.getItem(this._storageKey) || '[]');
  }
}
