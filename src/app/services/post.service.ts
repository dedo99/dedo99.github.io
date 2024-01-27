// post.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private baseUrl: string = 'assets/posts/'; // Percorso della cartella dei post nella directory assets

  constructor(private http: HttpClient) {}

  getCsvData(url: string): Observable<any> {
    return this.http.get(url, { responseType: 'text' });
  }

  getPost(id: string): Observable<any> {
    return this.http.get(this.baseUrl + id + '.html', {responseType: 'text' })
  }
}
