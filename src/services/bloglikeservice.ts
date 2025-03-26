import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { UserLocalStorage } from "./userlocalstorage";
import { catchError, Observable, of, tap } from "rxjs";

@Injectable({
    providedIn: 'root'

})
export class BlogLikeService{
    private baseUrl: string = "http://localhost:8080/api/blogLikes/"
    constructor(private http: HttpClient, private router: Router) {}

    user = UserLocalStorage.getUser();

    likePost(payload: any): Observable<boolean> {
      if (!this.user) {
        alert("Yorum yapmak için lütfen giriş yapınız.");
        return of(false); // Giriş yoksa otomatik false döner
      }
    
      console.log(payload, "blog like payload böyle geldi.");
    
      return this.http.post<boolean>(this.baseUrl + "like-post", payload).pipe(
        tap(response => {
          console.log('BlogLike başarıyla gönderildi', response);
        }),
        catchError(error => {
          console.error('BlogLike gönderilirken hata oluştu', error);
          return of(false); // Hata varsa false döndür
        })
      );
    }
    

}