import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { Title }     from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit 
{
  _title = 'TEST API';

  constructor(
    private userService: UserService,
    private titleService: Title,
    private router: Router 
  ) {}

  public setTitle( newTitle: string)
  {
    this.titleService.setTitle( newTitle );
    this._title = this.titleService.getTitle();
  }  

  ngOnInit() 
  {
      this.router.events.subscribe(
        (event)=>
        {
          if (event instanceof NavigationEnd)
          {
              this._title = this.titleService.getTitle();
          }
        }
    );
  }

}
