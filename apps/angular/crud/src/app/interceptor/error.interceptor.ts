import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        this.handleServerSideError(error);
        return throwError(() => error);
      }),
    );
  }

  handleServerSideError = (error: HttpErrorResponse) => {
    switch (error.status) {
      case 400:
        console.log('Bad Request, please try again later .');
        break;
      case 401:
        console.log('Unauthorized, please try again later.');
        break;
      case 403:
        console.log('Forbidden access is denied');
        break;
      case 404:
        console.log('Resource not found');
        break;
      case 500:
        console.log('Internal server error, please try again later.');
        break;
    }
  };
}
