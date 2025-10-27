import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const token = localStorage.getItem('token');

  let headers = new HttpHeaders({
    'ngrok-skip-browser-warning': 'true',
  });

  if (token) {
    headers = headers.set('Authorization', `Bearer ${token}`);
  }

  const clonedReq = req.clone({ headers });

  return next(clonedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 || error.status === 403) {
        console.warn('Sesión expirada o sin autorización, redirigiendo al login...');
        localStorage.clear();
        window.location.href = '/login';
      }
      return throwError(() => error);
    })
  );
};

