import { Injectable } from '@angular/core';
import { first } from 'rxjs/operators';
import { Observable } from '../../../node_modules/rxjs';
import { reject, resolve } from '../../../node_modules/@types/q';
import { Router, ActivatedRoute, RoutesRecognized } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TitleService {

    _routerObs$: Observable<RoutesRecognized>;

    constructor(
        private router: Router,
        private route: ActivatedRoute,         
    ) 
    { 
        this._routerObs$ = this.router.events.pipe(
            filter(data => data instanceof RoutesRecognized)
          ) as Observable<RoutesRecognized>;
    }

    /**
     
      this._routerObs$.subscribe(
            (event) =>
            {
                    paramsObs$.
            }
          );         
     
     */



    get routerObs():Observable<any> 
    {
        
        return new Observable<any>((observer) => {

            this._routerObs$.subscribe(
                (event) =>
                {
                    var data = event.state.root.firstChild.data;
                    observer.next(data);
                }
              );   

            return () => {
              
            };

          });

    }

    
}