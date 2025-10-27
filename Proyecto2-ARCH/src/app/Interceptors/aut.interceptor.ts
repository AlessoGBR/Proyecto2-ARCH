import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const token = localStorage.getItem('token');

  const clonedReq = req.clone({
    setHeaders: {
      'ngrok-skip-browser-warning': '69420',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    withCredentials: true,
  });

  console.log('🔍 Petición interceptada:', {
    url: clonedReq.url,
    headers: clonedReq.headers.keys().map(key => `${key}: ${clonedReq.headers.get(key)}`)
  });

  return next(clonedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('❌ Error en petición:', {
        status: error.status,
        contentType: error.headers.get('content-type'),
        body: error.error
      });
      
      if (error.status === 401 || error.status === 403) {
        console.warn('Sesión expirada o sin autorización. Redirigiendo al login...');
        localStorage.clear();
        window.location.href = '/login';
      }
      return throwError(() => error);
    })
  );
};
