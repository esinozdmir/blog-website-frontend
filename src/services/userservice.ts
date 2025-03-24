import { HttpClient, HttpParams } from "@angular/common/http";
import { User } from "../models/usermodel";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root'

})

export class UserService {
    constructor(private http: HttpClient) { }

    baseUrl: string = 'http://localhost:8080/api/users/';

    updateUser(payload: any) {

        this.http.patch(this.baseUrl + "update-user", payload).subscribe({
            next: (response) => {
                alert("Kullanıcı bilgileri güncelleme işleminiz başarıyla gerçekleşti.");
                console.log("Kullanıcı bilgileri güncelleme başarılı:", response);
                const user = new User(response as Partial<User>);
                localStorage.setItem("user", JSON.stringify(user));
                window.location.reload();
            },
            error: (err) => {
                console.error("Kullanıcı bilgileri güncelleme işlemi başarısız:", err);
            },
        })
    }

    updatePassword(id:number, password:string) {

        const params = new HttpParams().set('id', id).set('password', password);

        this.http.put(this.baseUrl + "update-password", null, {
            params: params,
            responseType: 'text'
          }).subscribe({
            next: (response) => {
                alert("Şifre güncelleme işleminiz başarıyla gerçekleşti.");
                console.log("Kullanıcı bilgileri güncelleme başarılı:", response);
                window.location.reload();
            },
            error: (err) => {
                console.error("Şifre güncelleme işlemi başarısız:", err);
            },
        })
    }

    checkPassword(id: number, password: string): Observable<string> {
        const params = new HttpParams().set('id', id).set('password', password);
        
        return this.http.get<string>(this.baseUrl + "check-password", {
          params: params,
          responseType: 'text' as 'json'
        })
      }
}