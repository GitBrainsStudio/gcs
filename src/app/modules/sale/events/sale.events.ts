import { EventEmitter, Injectable } from '@angular/core';
import { Sale } from '../models/sale.model';

@Injectable({ providedIn: 'root' })
export class SaleEvents {
  created = new EventEmitter<Sale>();
  deleted = new EventEmitter<Sale>();
  updated = new EventEmitter<Sale>();
}
