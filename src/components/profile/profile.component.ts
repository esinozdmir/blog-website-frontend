import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { Component, ListenerOptions } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserLocalStorage } from '../../services/userlocalstorage';
import { User } from '../../models/usermodel';
import { NavbarComponent } from "../navbar/navbar.component";
import { BlogPost } from '../../models/blogpost';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BlogService } from '../../services/blogservice';
import { UserService } from '../../services/userservice';

@Component({
  selector: 'app-profile',
  imports: [FormsModule, HttpClientModule, NavbarComponent, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  standalone: true
})
export class ProfileComponent {



  constructor(private http: HttpClient, private router: Router, private blogService: BlogService, private userService: UserService) { }

  id?: number;
  email: string = '';
  firstName: string = '';
  lastName: string = '';
  password: string = '';
  repassword: string = '';
  oldpassword: string = '';

  selectedFile: File | undefined;

 // user!: User;

  posts: BlogPost[] = [];

  userInfo: User | null = null;

  ngOnInit() {
    this.getUserPost();

  }

  getUserInfo() {
    this.userInfo = UserLocalStorage.getUser();

    if (this.userInfo === null) {
      console.error("User bilgisi bulunamadı");
    } else {
      console.log("userınfooo", this.userInfo);
    }
  }

  getUserPost() {
    this.getUserInfo()
    if(this.userInfo?.id)
    this.blogService.getUserPosts(this.userInfo?.id).subscribe(posts => {
      this.posts = posts.reverse();
      console.log('Blog gönderileri yüklendi:', posts);
    });
  }

  deleteBlogPost(post: BlogPost) {
    this.blogService.deleteBlogPost(post);
  }

  updateBlogPost(post: BlogPost) {
    const currentDate = new Date();
    console.log("currentdate: ", currentDate)
    const formData = new FormData();
    if (this.selectedFile)
      formData.append('file', this.selectedFile);
    if (post.blogPostId)
      formData.append('id', post.blogPostId.toString())
    formData.append('title', post.title);
    formData.append('content', post.content);
    formData.append('comment', JSON.stringify(post.comments));
    if (post.authorId)
      formData.append('userId', post.authorId)
    formData.append('blogDate', currentDate.toISOString());


    this.blogService.updateBlogPost(formData);
  }

  fileUpload(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length)
      this.selectedFile = input.files[0];


    //this.blogService.fileUpload(this.selectedFile);
    console.log(this.selectedFile);
  }
  updateUser() {

    const payload = {
      id: this.userInfo?.id,
      firstName: this.firstName == "" ? this.userInfo?.firstName : this.firstName,
      lastName: this.lastName == "" ? this.userInfo?.lastName : this.lastName,
      email: this.email == "" ? this.userInfo?.email : this.email,
    }

    this.userService.updateUser(payload);
  }

  updatePassword() {
    if (this.password !== this.repassword) {
      alert("Şifreler uyuşmuyor!");
      return;
    }
    if (!this.userInfo?.id) {
      alert("Kullanıcı bilgisi bulunamadı!");
      return;
    }
    this.userService.checkPassword(this.userInfo.id, this.oldpassword).subscribe(isValid => {
      if (isValid !== "fail" && this.userInfo?.id) {
        this.userService.updatePassword(this.userInfo.id, this.password);
      } else {
        alert("Eski şifre hatalı!");
      }
    });
  }


}
