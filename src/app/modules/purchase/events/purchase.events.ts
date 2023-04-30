import { EventEmitter, Injectable } from '@angular/core';
import { Purchase } from '../models/purchase.model';

@Injectable({ providedIn: 'root' })
export class PurchaseEvents {
  created = new EventEmitter<Purchase>();
  deleted = new EventEmitter<Purchase>();
  updated = new EventEmitter<Purchase>();
}
