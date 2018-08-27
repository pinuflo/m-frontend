import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { Title }     from '@angular/platform-browser';
import { filter, map, switchMap } from 'rxjs/operators';
import { TitleService } from './services/title.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit 
{
  _title = 'NO TITLE FOUND';
  
  constructor(
    private userService: UserService,
    private titleService: TitleService,
    private route: ActivatedRoute
  ){

  }

  ngOnInit() 
  {

  
      this.titleService.routerObs.subscribe(
        (data) =>
        {
          let title = data.title;
          if(title)
          {
              this._title = title;
          }
        }
      );
      


      /**
      .filter(event => event instanceof NavigationEnd)
      .distinctUntilChanged()
      .map(event =>  this.buildBreadCrumb(this.activatedRoute.root));
      **/

      /** 
        this.title$ = this.router.events.subscribe(
        (event)=>
        {
          if (event instanceof NavigationEnd)
          {
              console.log(this.route);
              this._title = this.route.routeConfig.data[ 'title' ] ;
          }
        }
    );
    **/

  }

}
