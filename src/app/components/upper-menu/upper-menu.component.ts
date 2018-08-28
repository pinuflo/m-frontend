import { Component, OnInit, isDevMode } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { AuthenticationService } from '../../services/authentication.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { environment } from '../../../environments/environment'

@Component({
  selector: 'app-upper-menu',
  templateUrl: './upper-menu.component.html',
  styleUrls: ['./upper-menu.component.css']
})
export class UpperMenuComponent implements OnInit {

  _currentUser:User = null;
  _returnUrl: string;
  _pageTitle : string;
  _devMode : Boolean;

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router         
  ) { }

  ngOnInit() 
  {
    this._pageTitle = environment.site_name;
    this._devMode = isDevMode();
    this._returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.router.events.subscribe(
        (event)=>
        {
          if (event instanceof NavigationEnd)
          {
              this.loadMenu();
          }
        }
    );
  }

  loadMenu()
  {
    this.userService.getCurrentUserPromise().then(
      (user) =>
      {
        this._currentUser = user;
      }
    );
  }

  logout()
  {
    this.authenticationService.logout();
    location.reload();
  }

}
