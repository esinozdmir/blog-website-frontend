import { HttpClient, HttpClientModule, HttpParams } from "@angular/common/http";
import { Router } from "@angular/router";
import { UserLocalStorage } from "./userlocalstorage";
import { User } from "../models/usermodel";
import { Injectable } from "@angular/core";
import { BlogPost } from "../models/blogpost";
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'

})

export class BlogService {

    private baseUrl: string = "http://localhost:8080/api/blog/"
    constructor(private http: HttpClient, private router: Router) { }

    user = UserLocalStorage.getUser() || new User();
    createBlogPost(formdata: FormData) {

        this.http.post(this.baseUrl + "create-blog-post", formdata).subscribe({
            next: (response) => {
                console.log('Blog post : ', response);
                this.router.navigate(['/home']);

            },
            error: (err) => {
                console.log('Error : ', err);
            },
        });

        console.log("formdata", formdata.getAll);

    }

    updateBlogPost(post: FormData) {

        console.log("update :", post);

        if (!post) {
            console.error("Hata: Kullanıcı ID bulunamadı!");
            return;
        }


        this.http.put(this.baseUrl + "update-blog-post", post).subscribe({
            next: (response) => {
                console.log("Güncelleme başarılı:", response);
                alert("Güncelleme işleminiz başarıyla gerçekleşti.");
            },
            error: (err) => {
                console.error("Güncelleme işlemi başarısız:", err);
            },
        });
    }


    deleteBlogPost(post: BlogPost) {

        if (!post || !post.blogPostId) {
            console.error("Hata: Kullanıcı ID bulunamadı!");
            return;
        }

        const confirmDelete = window.confirm("Bu blog gönderisini silmek istediğinizden emin misiniz?");
        if (!confirmDelete) {
            return;
        }

        const params = new HttpParams().set('id', post.blogPostId.toString());

        console.log("Silinecek ID:", post.blogPostId);

        this.http.delete(this.baseUrl + "delete-blog-post", { params, responseType: 'text' }).subscribe({
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

    getUserPosts(userid: number): Observable<BlogPost[]> {
        const params = new HttpParams().set('id', userid.toString() || '0');
        return this.http.get<BlogPost[]>(this.baseUrl + "get-post-by-id", { params })
            .pipe(
                catchError(err => {
                    console.log("error", err);
                    return of([]);
                })
            );
    }

    /*fileUpload(selectedFile:File){
      const params = new HttpParams().set('id', selectedFile);
    }*/

    addBlogLike(blogPostId: number, userId: number) {
        console.log("blogpostid geldi: ", blogPostId)
        const params = new HttpParams().set('id', blogPostId || 0).set('userId', userId);

        this.http.patch(this.baseUrl + "add-blog-like", params).subscribe({
            next: (response) => {
                alert("Blog like arttırma işleminiz başarıyla gerçekleşti.");
                console.log("Blog like arttırma başarılı:", response);
            },
            error: (err) => {
                console.error("Blog like arttırma işlemi başarısız:", err);
            },
        });

    }

    

}