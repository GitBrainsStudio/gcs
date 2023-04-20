import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GuidService } from 'src/app/shared/services/guid.service';
import { SaleEvents } from '../events/sale.events';
import { Sale } from '../models/sale.model';

@Injectable({ providedIn: 'root' })
export class SaleService {
  private _storageKey = 'sales';
  private _sales: Sale[] = [];
  private _saleEvents: SaleEvents | null = null;
  private _guidService: GuidService | null = null;

  constructor(saleEvents: SaleEvents, guidService: GuidService) {
    this._saleEvents = saleEvents;
    this._guidService = guidService;
  }

  add(sale: Sale) {
    sale.Id = this._guidService?.generate() ?? '';
    this._sales.push(sale);
    this.updateSalesLocalStorage();
    this._saleEvents?.added.next(sale);
  }

  getAll(): Observable<Sale[]> {
    this._sales = this.getSalesFromLocalStorage();
    return of(this._sales);
  }

  delete(sale: Sale) {
    this._sales = this._sales.filter(x => x.Id != sale.Id);
    this.updateSalesLocalStorage();
    this._saleEvents?.deleted.next(sale);
  }

  update(sale: Sale) {
    this._sales = this._sales.filter(x => x.Id != sale.Id);
    this._sales.push(sale);
    this.updateSalesLocalStorage();
    this._saleEvents?.updated.next(sale);
  }

  private updateSalesLocalStorage() {
    localStorage.setItem(this._storageKey, JSON.stringify(this._sales));
  }

  private getSalesFromLocalStorage() {
    return JSON.parse(localStorage.getItem(this._storageKey) || '[]');
  }
}
