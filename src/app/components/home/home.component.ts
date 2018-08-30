import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AppComponent } from '../../app.component';
import { Title }     from '@angular/platform-browser';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../models/article';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  _currentUser:any;
  articles:Article[];
  articlesLoaded:boolean = false;

  constructor(
      private userService: UserService,
      private articleService: ArticleService
  ) {  }

  ngOnInit() 
  {
    this._currentUser = this.userService.getCurrentUser();

    this.articleService.getAll().subscribe(
      (articles) =>
      {
          this.articles = articles;
          this.articlesLoaded = true;
      }
    );
  }


}
