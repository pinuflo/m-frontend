import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config/config';
import { Article } from '../models/article';
import { Observable } from 'rxjs';

var _config:Config = { api_url: 'http://127.0.0.1:3000/api' };

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  
  constructor(private http: HttpClient) { }

  _getArticleUserData(article:Article)  
  {

    if(!article.user)
    {
        console.error("[INTERNO]: Articulo ",  (article.id?article.id:" [ID DESCONOCIDO]"),  " no tiene definido ID de usuario." )
        return;
    }
  }

  getAll()
  {
    
    return new Observable<Article[]>((observer) => {
      let articlesResult;
      this.http.get<any[]>(`${_config.api_url}/articles`).subscribe(
          (articles) =>
          {
              
              articlesResult = articles.map(
                (article) =>
                {
                    let auxArticle = new Article(article._id ,article.user,article.title,article.description,article.price,article.region,article.comunne,article.category);
                    auxArticle.setUserDataFunction(this._getArticleUserData);
                    return auxArticle;
                }
              )              

              observer.next(articlesResult);
          }
        );   

      return () => {
        
      };

    });

  }

  getLast()
  {

      //return this.http.get<User[]>(`${_config.api_url}/user`);
  }

}
