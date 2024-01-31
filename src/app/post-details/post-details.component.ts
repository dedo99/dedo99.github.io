import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Post } from '../models/post.model';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom,

})
export class PostDetailsComponent {

  post_html?: string;
  post?: Post;

  constructor(private route: ActivatedRoute, private postService: PostService, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.post = navigation.extras.state['post'];
    }
   }

  ngOnInit(): void {
    this.getPostDetails();
  }

  getPostDetails(): void {
    if (this.post?.id !== null){
      const id = String(this.post?.id) ?? '0';
      this.postService.getPost(id).subscribe(
        post => {
          this.post_html = post;
        },
        error => {
          console.error('Errore durante il recupero del post')
        }); // Recupera i dettagli del post dal servizio
    }
  }

}
