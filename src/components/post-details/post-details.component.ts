import { Component } from '@angular/core';
import { BlogPost } from '../../models/blogpost';
import { Router } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { PostComment } from '../../models/comment';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UserLocalStorage } from '../../services/userlocalstorage';
import { CommentService } from '../../services/commentservice';
import { User } from '../../models/usermodel';
import { BlogService } from '../../services/blogservice';
import { BlogLikeService } from '../../services/bloglikeservice';

@Component({
  selector: 'app-post-details',
  imports: [NavbarComponent, CommonModule, DatePipe, HttpClientModule, FormsModule],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css'
})
export class PostDetailsComponent {
  blogPost: BlogPost | undefined;
  postComment: PostComment | undefined;
  userName: string = '';
  comment: string = '';

  comments: PostComment[] = [];

  userNames: { [key: number]: string } = {};
  user = UserLocalStorage.getUser() || new User();

  isLikeClicked:boolean = false;

  ngOnInit(): void {
    this.fetchComment();
  }



  constructor(private router: Router, private http: HttpClient, private commentService: CommentService,private blogService:BlogService,private blogLikeService:BlogLikeService) {
    const navigation = this.router.getCurrentNavigation();

    if (navigation?.extras.state) {
      this.blogPost = navigation.extras.state['blogPostResponse'] as BlogPost;
      this.userName = navigation.extras.state['userNameResponse'];
    }
    else {
      this.router.navigate(['/home']);
    }
    //console.log("fd",this.blogPost);
    //const comment1 = this.blogPost?.comments[0] as PostComment;
    //console.log("hey",comment1.commentDate);
    //const comment2 = this.blogPost.comments[1] as Comment

  }

  getUserById(id: number) {

    const url = "http://localhost:8080/api/users/get-user-by-id";

    const params = new HttpParams().set('id', id);

    this.http.get<{ firstName: string }>(url, { params }).subscribe({
      next: (response) => {
        console.log('Giriş Yapan Kullanıcı : ', response)
        this.userNames[id] = response.firstName;
        console.log("userid: ", this.userNames[id])

      },
      error: (error) => console.error('Hata : ', error)
    })

  }

  fetchComment() {
    if (this.blogPost)
      this.commentService.fetchComment(this.blogPost).subscribe((response) => {
        this.comments = response.reverse();
        //console.log("Yorumlar yüklendi:", response);

        this.comments.forEach(comment => {
          if (comment.userId) {
            this.getUserById(comment.userId);
          }
        });
      });
  }



  shareComment() {
    
    const currentDate = new Date();

    console.log(UserLocalStorage.getUser()?.id, " ", this.comment, " ", currentDate.toISOString(), " ", this.blogPost, "bunlar gidiyor")

    const payload = {
      userId: UserLocalStorage.getUser()?.id,
      comment: this.comment,
      commentDate: currentDate.toISOString(),
      blogPost: this.blogPost,
    }

    this.commentService.shareComment(payload);

  }

  deleteBlogPost(comment: PostComment) {
    this.commentService.deleteComment(comment);
  }

  deleteMyComment(comment: PostComment): Boolean {
    if (comment.userId == this.user.id) {
      return true;
    }
    else {
      return false;
    }
  }

  updateComment(comment: PostComment) {
    const currentDate = new Date();
    const payload = {
      commentId: comment.commentId,
      userId: UserLocalStorage.getUser()?.id,
      comment: comment.comment,
      commentDate: currentDate.toISOString(),
      blogPost: this.blogPost,
    }
    this.commentService.updateComment(payload);
  }

  addBlogLike(blogPostId: number, userId: number) {
    if (this.isLikeClicked) {
      this.isLikeClicked = false;
    } else {
      const payload = {
        userId: this.user.id,
        blogPost: this.blogPost,
      };
  
      this.blogLikeService.likePost(payload).subscribe((response: boolean) => {
        if (response) {
          this.blogService.addBlogLike(blogPostId, userId);
          this.isLikeClicked = true;
        } else {
          console.log("Beğenme işlemi başarısız oldu, addBlogLike çalıştırılmadı.");
        }
      });
    }
  }
  

}
