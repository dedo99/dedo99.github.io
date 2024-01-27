import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../models/post.model';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class PostDetailsComponent {

  post_html?: string;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService // Inietta il servizio per gestire i post
  ) { }

  ngOnInit(): void {
    this.getPostDetails();
  }

  getPostDetails(): void {
    if (this.route.snapshot.paramMap.get('id') !== null){
      const id = this.route.snapshot.paramMap.get('id') ?? '0';
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
