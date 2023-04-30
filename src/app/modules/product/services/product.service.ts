import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delayWhen, interval } from 'rxjs';
import { Settings } from 'src/app/core/settings/models/settings';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private _baseUrl = `${environment.API_URL}products`;

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Product[]> {
    return this.httpClient
      .get<Product[]>(`${this._baseUrl}`)
      .pipe(
        delayWhen(() =>
          Settings.HttpFakeDelayEnabled
            ? interval(Settings.HttpFakeDelayInterval)
            : interval(0)
        )
      );
  }
}
