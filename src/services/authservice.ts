import { HttpClient,HttpClientModule, HttpParams } from "@angular/common/http";
import { User } from "../models/usermodel";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
    
})

export class AuthService {

    constructor(private http: HttpClient, private router: Router) { }
    private baseUrl:string = "http://localhost:8080/api/users/"

    login(email: string, password: string) {

        const params = new HttpParams().set('email', email).set('password', password);

        this.http.get(this.baseUrl+"login", { params }).subscribe({
            next: (response) => {
                console.log('Giriş Yapan Kullanıcı : ', response)
                if (response !== null) {
                    const user = new User(response as Partial<User>);
                    localStorage.setItem("user", JSON.stringify(user));
                    this.router.navigate(['/home']);
                }
                else {
                    alert("Kullanıcı email ya da şifreniz hatalı.");
                }
            },
            error: (error) => console.error('Hata : ', error)
        })

    }

    register(payload:any){
        console.log("payda" , payload);
        if(payload.password===payload.confirmpassword){
           this.http.post(this.baseUrl+"register",payload).subscribe({
            next:(response)=>console.log('kayıt Yapan Kullanıcı : ',response),
            error:(error)=>console.error('Hata : ',error)
           });
           console.log(payload);
          this.router.navigate(['/login']);
        }
        else{
          alert("Şifrenizi kontrol ediniz.");
        }

    }

}