import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
      // attach auth header to all requests
      const modifiedRequest = req.clone({headers: req.headers.append('Auth', 'xyz')});
      return next.handle(modifiedRequest);
  }

  constructor() { }
}
