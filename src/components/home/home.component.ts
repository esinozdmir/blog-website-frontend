import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { Component ,OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { User } from '../../models/usermodel';
import { UserLocalStorage } from '../../services/userlocalstorage';
import { BlogPost } from '../../models/blogpost';
import { SearchService } from '../../services/searchservice';

@Component({
  selector: 'app-home',
  imports: [FormsModule, HttpClientModule, CommonModule, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  url:string="http://localhost:8080/api/blog/list-blog-post";

  user!: User;

  constructor(private http:HttpClient,private router:Router,private searchService: SearchService){}

  blogPosts:any[]=[];

  userNames: { [key: number]: string } = {};

  filteredBlogPosts: any[] = [];

  isLikeClicked:boolean = false;

  ngOnInit():void{
    this.user = UserLocalStorage.getUser() || new User();
    this.fetchBlogPost();
    
    //console.log("emaişlll",user.email);

    this.searchService.currentSearchTerm.subscribe(term => {
      this.filteredBlogPosts = this.blogPosts.filter(post =>
        post.title.toLowerCase().includes(term.toLowerCase()) ||
        post.content.toLowerCase().includes(term.toLowerCase())
      );
    });
    
  }

  fetchBlogPost(){
    this.http.get<any[]>(this.url).subscribe({
      next:(response) => {
        console.log("Response:", response);
        this.blogPosts=response.reverse();   
        this.filteredBlogPosts = this.blogPosts; 
        console.log("aaa",this.blogPosts[0].imageUrl);  

        this.blogPosts.forEach(post => {
          this.getUserById(post.authorId);
        });

        
      },
      error:(error)=> {
        console.error("Error:", error);
      }
    });
  }  

  getUserById(id:number){

    const url = "http://localhost:8080/api/users/get-user-by-id";
    
    const params = new HttpParams().set('id',id);

    this.http.get<{firstName:string}>(url,{params}).subscribe({
      next:(response)=>{
        console.log('Giriş Yapan Kullanıcı : ',response)
        this.userNames[id] = response.firstName;

      },
      error:(error)=>console.error('Hata : ',error)
    })

    }

    goToPostDetails(blogPost:BlogPost,userName:string){
      this.router.navigate(['/post-details'],{state: {blogPostResponse:blogPost,userNameResponse:userName}});
    }

    

}
