import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delayWhen, interval } from 'rxjs';
import { Settings } from 'src/app/core/settings/models/settings';
import { environment } from 'src/environments/environment';
import { Profile } from '../models/profile.model';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private _baseUrl = `${environment.API_URL}profiles`;

  constructor(private httpClient: HttpClient) {}

  getCurrentProfile(): Observable<Profile> {
    return this.httpClient
      .get<Profile>(`${this._baseUrl}/current/`)
      .pipe(
        delayWhen(() =>
          Settings.HttpFakeDelayEnabled
            ? interval(Settings.HttpFakeDelayInterval)
            : interval(0)
        )
      );
  }

  update(profile: Profile): Observable<Profile> {
    return this.httpClient.put<Profile>(
      `${environment.API_URL}profiles/`,
      profile
    );
  }
}
