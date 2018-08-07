import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentUserAuth = JSON.parse(localStorage.getItem('currentUserAuth'));

        if (currentUserAuth && currentUserAuth.token) {
            request = request.clone({
                setHeaders: { 
                    'x-access-token': `${currentUserAuth.token}`
                }
            });
        }

        return next.handle(request);
    }
}