import { BlogPost } from "./blogpost";

export class PostComment {
    commentId?: number;
    comment: string;
    commentDate?: Date;
    userId?: number;
    blogPost?: BlogPost;
    
    constructor(response: Partial<PostComment> = {}) {
      this.commentId = response.commentId;
      this.comment = response.comment || '';
      this.commentDate = response.commentDate;
      this.userId = response.userId;
      this.blogPost = response.blogPost;
    }
  }