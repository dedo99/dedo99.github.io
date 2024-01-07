import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TitleService {

  constructor() { }

  private titleSubject = new BehaviorSubject<string>(''); // Inizializza con un valore predefinito vuoto
  title$ = this.titleSubject.asObservable();

  setTitle(title: string) {
    this.titleSubject.next(title);
  }
}
