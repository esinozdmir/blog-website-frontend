import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BlogService } from '../../services/blogservice';
import { animate } from '@angular/animations';
import { UserLocalStorage } from '../../services/userlocalstorage';
import { User } from '../../models/usermodel';

@Component({
  selector: 'app-blog-create',
  imports: [FormsModule, NavbarComponent, HttpClientModule],
  templateUrl: './blog-create.component.html',
  styleUrl: './blog-create.component.css'
})
export class BlogCreateComponent {

  constructor(private blogService: BlogService) { }

  title: string = '';
  content: string = '';
  selectedFile: File | undefined = undefined;
  user = UserLocalStorage.getUser() || new User();

  createBlogPost() {
    
    const currentDate = new Date();
    console.log("currentdate: ",currentDate)

    const formData = new FormData();
    if (this.selectedFile)
      formData.append('file', this.selectedFile); 
    formData.append('title', this.title); 
    formData.append('content', this.content); 
    formData.append('comment', JSON.stringify([]));
    formData.append('userId', String(this.user.id));
    formData.append('blogDate',currentDate.toISOString());
    this.blogService.createBlogPost(formData);
  }

  fileUpload(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length)
      this.selectedFile = input.files[0];


    //this.blogService.fileUpload(this.selectedFile);
    console.log(this.selectedFile);
  }

}
