import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { Post } from '../models/post.model';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  post_list: Post[] = [];
  filteredPosts: Post[] = [];
  uniqueTopics: string[] = [];
  selectedTopic: string = 'all';

  constructor(private postService: PostService, private router: Router) { }

  ngOnInit(): void {
    this.getCsvData();
  }

  getCsvData() {
    this.postService.getCsvData('assets/posts_data.csv').subscribe(
      data => {
        this.post_list = this.parseCsvData(data);
        this.filteredPosts = this.post_list;
        this.uniqueTopics = this.getUniqueTopics();
        console.log(this.post_list)
      },
      error => {
        console.log('Si è verificato un errore:', error);
      }
    );
  }

  parseCsvData(csvData: string): Post[] {
    // Implementa il parsing del CSV qui
    // Ad esempio, puoi dividere le righe e le colonne
    let post_string: string[][] = csvData.split('\n').map(row => row.split(';'));
    let posts: Post[] = [];
    for (const iterator of post_string) {
      let post: Post = {
        id: Number(iterator[0]),
        title: iterator[1],
        category: iterator[2],
        content: iterator[3],
        image: iterator[4],
        date: iterator[5]
      };
      posts.push(post);
    }
    return posts;
  }

  getUniqueTopics(): string[] {
    const topics = this.post_list.map(post => post.category);
    return Array.from(new Set(topics));
  }

  filterPostsByTopic(): void {
    if (this.selectedTopic === 'all') {
      this.filteredPosts = this.post_list;
    } else {
      this.filteredPosts = this.post_list.filter(post => post.category === this.selectedTopic);
    }
  }

  redirectToPostDatails(post: Post): void{
    let navigationExtras: NavigationExtras = {
      state: {
        post: post
      }
    };
    this.router.navigate(['/post'], navigationExtras);
  }

}
