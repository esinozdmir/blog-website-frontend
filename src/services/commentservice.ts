import { HttpClient, HttpParams } from "@angular/common/http";
import { UserLocalStorage } from "./userlocalstorage";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PostComment } from "../models/comment";
import { BlogPost } from "../models/blogpost";

@Injectable({
  providedIn: 'root'

})

export class CommentService {

  constructor(private http: HttpClient) {}
  comment: string = '';

  private baseUrl: string = "http://localhost:8080/api/comment/"

  user = UserLocalStorage.getUser();

  shareComment(payload: any) {

    if(!this.user){
      alert("Yorum yapmak için lütfen giriş yapınız.");
      return;
    }

    console.log(payload, "payload böyle geldi.")
    this.http.post(this.baseUrl + "create-comment", payload).subscribe(
      response => {
        console.log('Yorum başarıyla gönderildi', response);
        this.comment = '';
        window.location.reload();
      },
      error => {
        console.log(payload, "payload böyle geldi.")
        console.error('Yorum gönderilirken hata oluştu', error);
      }
    );
  }

  fetchComment(blogPost: any): Observable<PostComment[]> {
    return this.http.post<PostComment[]>(this.baseUrl + "list-comment", blogPost);
  }

  deleteComment(comment: PostComment) {
    if (comment && comment.commentId) {
      const params = new HttpParams().set('id', comment.commentId);
      console.log("Silinecek ID:", comment);

      this.http.delete(this.baseUrl + "delete-comment", { params, responseType: 'text' }).subscribe({
        next: (response) => {
          alert("Silme işleminiz başarıyla gerçekleşti.");
          console.log("Silme başarılı:", response);
          window.location.reload();
        },
        error: (err) => {
          console.error("Silme işlemi başarısız:", err);
        },
      });
    }
  }

  updateComment(payload: any) {

    this.http.put(this.baseUrl + "update-comment", payload).subscribe({
      next: (response) => {
        alert("Yorum güncelleme işleminiz başarıyla gerçekleşti.");
        console.log("Güncelleme başarılı:", response);
        window.location.reload();
      },
      error: (err) => {
        console.error("Güncelleme işlemi başarısız:", err);
      },
    });
  }

}