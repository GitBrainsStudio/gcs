import { EventEmitter, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PurchaseAddButtonEvents {
  clicked = new EventEmitter<boolean>();
}
