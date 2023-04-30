import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { config, EMPTY, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((response: HttpErrorResponse) => {
        const error = response?.error;
        const errorMessage = error?.message;

        switch (response.status) {
          /*   case 0: {
            this.matSnackBar.open(
              'Ответ от сервера не получен. Рекомендуем проверить Ваше соединение с интернетом',
              '',
              {
                duration: 3000,
                verticalPosition: 'top'
              }
            );
            break;
          } */

          /* case 422:
            break; */

          case 401: {
            this.router.navigate(['/authorize'], {
              queryParams: { redirect: this.router.url }
            });
            return EMPTY;
          }

          default: {
            if (errorMessage) {
            }
            break;
          }
        }

        return throwError(response);
      })
    );
  }
}
