import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  _currentUser:any;

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() 
  {
    this._currentUser = this.userService.getCurrentUser();
    console.log(this._currentUser);
  }

}
