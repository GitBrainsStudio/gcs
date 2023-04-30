import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Profile } from 'src/app/modules/profile/models/profile.model';
import { environment } from 'src/environments/environment';
import { AuthenticationInfo } from '../models/authentication-info.model';
import { AuthenticationRequest } from '../requests/authentication.request';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private _baseUrl = `${environment.API_URL}authentication`;
  private _authenticationInfoLocalStorageTitle = 'authenticated_profile';
  private _authenticationInfoSubject: BehaviorSubject<AuthenticationInfo | null> =
    new BehaviorSubject<AuthenticationInfo | null>(null);
  constructor(private httpClient: HttpClient) {
    const authenticationInfoFromLocalStorage = localStorage.getItem(
      this._authenticationInfoLocalStorageTitle
    );
    if (authenticationInfoFromLocalStorage)
      this._authenticationInfoSubject =
        new BehaviorSubject<AuthenticationInfo | null>(
          JSON.parse(authenticationInfoFromLocalStorage)
        );
  }

  public get profile(): Profile | null {
    if (
      this._authenticationInfoSubject &&
      this._authenticationInfoSubject.value
    ) {
      return this._authenticationInfoSubject.value.Profile;
    } else {
      return null;
    }
  }

  public get authenticationInfo(): AuthenticationInfo | null {
    if (
      this._authenticationInfoSubject &&
      this._authenticationInfoSubject.value
    ) {
      return this._authenticationInfoSubject.value;
    } else {
      return null;
    }
  }

  authenticate(request: AuthenticationRequest): Observable<AuthenticationInfo> {
    return this.httpClient
      .post<AuthenticationInfo>(this._baseUrl, request)
      .pipe(
        map((authentictionInfo: AuthenticationInfo) => {
          if (authentictionInfo.Token) {
            localStorage.setItem(
              this._authenticationInfoLocalStorageTitle,
              JSON.stringify(authentictionInfo)
            );
            if (this._authenticationInfoSubject)
              this._authenticationInfoSubject.next(authentictionInfo);
          }

          return authentictionInfo;
        })
      );
  }

  logout() {
    localStorage.removeItem(this._authenticationInfoLocalStorageTitle);
    if (this._authenticationInfoSubject) {
      this._authenticationInfoSubject.next(null);
    }
  }
}
