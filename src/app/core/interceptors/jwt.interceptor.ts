import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication/services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authenticationInfo = this.authenticationService.authenticationInfo;
    if (authenticationInfo?.Token) {
      request = request.clone({
        headers: request.headers.set(
          'authorization',
          `${authenticationInfo.Token}`
        )
      });
    }

    return next.handle(request);
  }
}
