import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit 
{
  _title = 'TEST API';

  constructor(
    private userService: UserService
  ) {}

  ngOnInit() 
  {
    
  }

}
