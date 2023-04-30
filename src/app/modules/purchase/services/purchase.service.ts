import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, delayWhen, interval } from 'rxjs';
import { Settings } from 'src/app/core/settings/models/settings';
import { environment } from 'src/environments/environment';
import { PurchaseEvents } from '../events/purchase.events';
import { Purchase } from '../models/purchase.model';

@Injectable({ providedIn: 'root' })
export class PurchaseService {
  private baseUrl = `${environment.API_URL}purchases`;

  constructor(
    private httpClient: HttpClient,
    private purchaseEvents: PurchaseEvents
  ) {}

  getAll(): Observable<Purchase[]> {
    return this.httpClient
      .get<Purchase[]>(`${this.baseUrl}`)
      .pipe(
        delayWhen(() =>
          Settings.HttpFakeDelayEnabled
            ? interval(Settings.HttpFakeDelayInterval)
            : interval(0)
        )
      );
  }

  getById(id: string): Observable<Purchase> {
    return this.httpClient
      .get<Purchase>(`${this.baseUrl}/${id}/`)
      .pipe(
        delayWhen(() =>
          Settings.HttpFakeDelayEnabled
            ? interval(Settings.HttpFakeDelayInterval)
            : interval(0)
        )
      );
  }

  create(purchase: Purchase) {
    return this.httpClient.post<Purchase>(`${this.baseUrl}`, purchase).pipe(
      delayWhen(() =>
        Settings.HttpFakeDelayEnabled
          ? interval(Settings.HttpFakeDelayInterval)
          : interval(0)
      ),
      tap(() => this.purchaseEvents.created.next(purchase))
    );
  }

  update(purchase: Purchase) {
    return this.httpClient.put(`${this.baseUrl}`, purchase).pipe(
      delayWhen(() =>
        Settings.HttpFakeDelayEnabled
          ? interval(Settings.HttpFakeDelayInterval)
          : interval(0)
      ),
      tap(() => this.purchaseEvents.updated.next(purchase))
    );
  }

  delete(purchase: Purchase): Observable<Purchase> {
    return this.httpClient
      .delete<Purchase>(`${this.baseUrl}/${purchase.Id}/`)
      .pipe(
        delayWhen(() =>
          Settings.HttpFakeDelayEnabled
            ? interval(Settings.HttpFakeDelayInterval)
            : interval(0)
        ),
        tap(() => this.purchaseEvents.deleted.next(purchase))
      );
  }
}
