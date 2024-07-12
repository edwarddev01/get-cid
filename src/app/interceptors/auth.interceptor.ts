import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { AuthService } from './../services/auth.service';
import { ToastrService } from 'ngx-toastr';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token')
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request)
  }
}

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  constructor(private _auth:AuthService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          const authorizationHeader = event.headers.get('Authorization');
          if (authorizationHeader) {
            const token = authorizationHeader.replace('Bearer ','');
            this._auth.setAuthToken(token);
          }
        }
      })
    );
  }
}


@Injectable()
export class AuthUnauthorizedInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private toast:ToastrService
    ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.error && error.error.message) this.toast.error(error.error.message, 'Error')
        if(error.status==404)this.toast.error("Recurso no encontrado",'Error')
        if (error.status === 401) {
          this.authService.clearAuthToken();
        }else{
          const authorizationHeader = error.headers.get('Authorization');
          if (authorizationHeader) {
            const token = authorizationHeader.replace('Bearer ','');
            this.authService.setAuthToken(token);
            return next.handle(request);
          }
        }

        return throwError(()=>new Error(error.message));
      })
    );
  }
}