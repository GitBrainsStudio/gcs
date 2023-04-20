import { EventEmitter, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SaleAddButtonEvents {
  clicked = new EventEmitter<boolean>();
}
