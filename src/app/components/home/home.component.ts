import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  _currentUser:any;

  constructor(
      private userService: UserService
  ) { }

  ngOnInit() 
  {
    this._currentUser = this.userService.getCurrentUser();
    console.log(this._currentUser);
  }

}
