import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Config } from '../config/config';

//Temporal hasta tener fichero configuración
var _config:Config = { api_url: 'localhost:3000' };

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    constructor(private http: HttpClient) { 
        _config = { api_url: 'http://127.0.0.1:3000/api' };
    }

    login(email: string, password: string) {
        
        return this.http.post<any>(`${_config.api_url}/auth/login`, { email, password })
            .pipe(map(user => 
                {
                // login successful if there's a jwt token in the response
                if (user && user.token) 
                {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUserAuth', JSON.stringify(user));
                }
                return user;
                })
            );
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUserAuth');
        localStorage.removeItem('currentUser');
    }
}