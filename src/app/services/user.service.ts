import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/user';
import { Config } from '../config/config';
import { first } from 'rxjs/operators';

//Temporal hasta tener fichero configuración
var _config:Config = { api_url: 'http://127.0.0.1:3000/api' };


@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getCurrentUserToken() : string
    {
        let currentUserInfo = JSON.parse(localStorage.getItem('currentUserAuth'));
        if(currentUserInfo && currentUserInfo.auth == true)
        {
            return currentUserInfo.token;
        }
        else
        {
            return null;
        }
    }

    getCurrentUser() : User
    {
        let user:User = new User();
        let userData:any = JSON.parse(localStorage.getItem('currentUser'));
        if(userData == null)
        {

            if(this.getCurrentUserToken())
            {
                this.http.get<User>(`${_config.api_url}/auth/me`).pipe(first()).subscribe
                (
                    userResponse =>
                        { 
                            localStorage.setItem('currentUser', JSON.stringify(userResponse));
                            return userResponse;
                        },
                    error =>
                    {
                        return null;
                    }
                );
            }
            else
            {
                return null;
            }


        }

        return userData;
    }

    getCurrentUserPromise() : Promise<User>
    {
        let userData:any = JSON.parse(localStorage.getItem('currentUser'));
        let userPromise = new Promise<User>((resolve, reject) => 
        { 
            if(userData == null)
            {
                
                if(this.getCurrentUserToken())
                {
                    this.http.get<User>(`${_config.api_url}/auth/me`).pipe(first()).subscribe
                    (
                        userResponse =>
                            { 
                                localStorage.setItem('currentUser', JSON.stringify(userResponse));
                                resolve(userResponse);
                            },
                        error =>
                        {
                            reject(error);
                        }
                    );
                }
                else
                {
                    resolve(null);
                }
            }
            else
            {
                resolve(userData);
            }

        });
        return userPromise;
    }

    getAll()
    {
        return this.http.get<User[]>(`${_config.api_url}/user`);
    }

    
}