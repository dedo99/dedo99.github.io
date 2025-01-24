import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { TitleService } from '../title.service';
import { AnimationService } from '../animation.service';
import { ViewportScroller } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SpinnerService } from '../spinner.service';
import anime from 'animejs/lib/anime.es.js';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  animations: [AnimationService.fadeInOut,
               AnimationService.slideIn,
               AnimationService.fadeInOnScroll,
               AnimationService.slideInOnScroll],
})
export class HomepageComponent implements OnInit, OnDestroy, AfterViewInit{

  title ?: string;
  
  private onDestroy$ = new Subject<void>();

  isVisible = 'hidden';

  constructor(private viewportScroller: ViewportScroller, titleService: TitleService, private spinnerService: SpinnerService) {}

  isLoading = false;

  ngOnInit() {
    this.handleScrollEvents();

    if (!this.spinnerService.hasHomepageLoaded()) {
      this.isLoading = true;
      this.spinnerService.show();
      
      // Simula un caricamento asincrono
      setTimeout(() => {
        this.spinnerService.hide();
        this.isLoading = false;
      }, 500); // Simula un caricamento di 3 secondi
    }

  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  ngAfterViewInit(): void {
    setTimeout(() =>  {
      this.animateText();
    }, 3000)
  }

  private animateText(): void {
    const text = document.getElementById('animated-text') as HTMLElement;

    console.log(text)
      
    const textContent = 'Andrea de Donato';  // Il testo da animare
    const letters = textContent.split('');  // Spezza il testo in singole lettere
    let currentText = '';  // Stringa che conterrà il testo progressivo
    let letterIndex = 0;

    // Fai apparire il testo con l'animazione di opacità
    anime({
      targets: text,
      opacity: [0, 1],  // Inizia con opacità 0 e va fino a 1
      duration: 1000,  // Durata totale per l'opacità
      easing: 'easeOutQuad',
    });

    // Scrivere lettera per lettera
    const interval = setInterval(() => {
      currentText += letters[letterIndex];  // Aggiunge una lettera alla stringa
      text.textContent = currentText;  // Aggiorna il testo nell'elemento
      letterIndex++;

      if (letterIndex === letters.length) {
        clearInterval(interval);  // Ferma l'animazione quando tutte le lettere sono state aggiunte
      }
    }, 100);  // Ritardo di 100ms tra le lettere


    console.log('Terminato')
  }

  private handleScrollEvents() {
    const element = document.getElementById('animatedElement');
  
    if (!element) {
      return;
    }
  
    let timeout: ReturnType<typeof setTimeout>;
  
    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
  
      clearTimeout(timeout);
  
      timeout = setTimeout(() => {
        const newVisibility = this.isElementInView(rect) ? 'visible' : 'hidden';
        
        if (this.isVisible !== newVisibility) {
          this.isVisible = newVisibility;
        }
      }, 20); // Aggiungi un ritardo di 100 millisecondi
    };
  
    handleScroll(); // Controllo iniziale
  
    window.addEventListener('scroll', handleScroll);
  
    // Unsubscribe from scroll events when component is destroyed
    this.onDestroy$.pipe(takeUntil(this.onDestroy$)).subscribe(() => {
      window.removeEventListener('scroll', handleScroll);
    });
  }

  private isElementInView(rect: DOMRect) {
    return (
      (rect.top >= 100 && 
       rect.top <= (window.innerHeight || document.documentElement.clientHeight) - 150) ||
      (rect.bottom >= 100 && 
       rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) - 150)
    );
  }

}
