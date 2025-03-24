import { PostComment } from "./comment";

export class BlogPost{
    blogPostId?:number;
    authorId?:string;
    content:string;
    title:string;
    comments:PostComment[];
    imageUrl:string;
    blogDate?:Date;
    blogLike:number;

    constructor(response: Partial<BlogPost>={}){
        this.blogPostId=response.blogPostId;
        this.authorId=response.authorId;
        this.content=response.content || '';
        this.title=response.title || '';
        this.comments=response.comments || [];
        this.imageUrl=response.imageUrl || '';
        this.blogDate=response.blogDate;
        this.blogLike=response.blogLike || 0;
    }
}