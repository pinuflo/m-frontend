import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AppComponent } from '../../app.component';
import { Title }     from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  _currentUser:any;
  _pageTitle = "Home";

  constructor(
      private userService: UserService,
      private titleService: Title,
  ) { 
    this.titleService.setTitle( this._pageTitle );
  }

  ngOnInit() 
  {
 
    this._currentUser = this.userService.getCurrentUser();
  }


}
