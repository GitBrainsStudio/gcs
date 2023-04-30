import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, delayWhen, interval } from 'rxjs';
import { Settings } from 'src/app/core/settings/models/settings';
import { environment } from 'src/environments/environment';
import { SaleEvents } from '../events/sale.events';
import { Sale } from '../models/sale.model';

@Injectable({ providedIn: 'root' })
export class SaleService {
  private _baseUrl = `${environment.API_URL}sales`;

  constructor(private httpClient: HttpClient, private saleEvents: SaleEvents) {}

  getAll(): Observable<Sale[]> {
    return this.httpClient
      .get<Sale[]>(`${this._baseUrl}`)
      .pipe(
        delayWhen(() =>
          Settings.HttpFakeDelayEnabled
            ? interval(Settings.HttpFakeDelayInterval)
            : interval(0)
        )
      );
  }

  getById(id: string): Observable<Sale> {
    return this.httpClient
      .get<Sale>(`${this._baseUrl}/${id}/`)
      .pipe(
        delayWhen(() =>
          Settings.HttpFakeDelayEnabled
            ? interval(Settings.HttpFakeDelayInterval)
            : interval(0)
        )
      );
  }

  create(sale: Sale): Observable<Sale> {
    return this.httpClient.post<Sale>(`${this._baseUrl}`, sale).pipe(
      delayWhen(() =>
        Settings.HttpFakeDelayEnabled
          ? interval(Settings.HttpFakeDelayInterval)
          : interval(0)
      ),
      tap(() => this.saleEvents.created.next(sale))
    );
  }

  update(sale: Sale): Observable<Sale> {
    return this.httpClient.put<Sale>(`${this._baseUrl}`, sale).pipe(
      delayWhen(() =>
        Settings.HttpFakeDelayEnabled
          ? interval(Settings.HttpFakeDelayInterval)
          : interval(0)
      ),
      tap(() => this.saleEvents.updated.next(sale))
    );
  }

  delete(sale: Sale): Observable<Sale> {
    return this.httpClient.delete<Sale>(`${this._baseUrl}/${sale.Id}/`).pipe(
      delayWhen(() =>
        Settings.HttpFakeDelayEnabled
          ? interval(Settings.HttpFakeDelayInterval)
          : interval(0)
      ),
      tap(() => this.saleEvents.deleted.next(sale))
    );
  }
}
