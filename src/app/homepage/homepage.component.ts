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

  private drops: number[] = [];

  ngOnInit() {
    window.addEventListener('resize', this.debouncedAdjustCanvasSize.bind(this));
  
    if (!this.spinnerService.hasHomepageLoaded()) {
      this.isLoading = true;
      this.spinnerService.show();
  
      setTimeout(() => {
        this.spinnerService.hide();
        this.isLoading = false;
      }, 500); // Simula un caricamento di 3 secondi
    }
  }

  private debouncedAdjustCanvasSize = (() => {
    let timeout: ReturnType<typeof setTimeout>;
  
    return () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        this.adjustCanvasSize();
      }, 200); // Delay di 200ms
    };
  })();

  private adjustCanvasSize(): void {
    const canvas = document.getElementById('matrix-canvas') as HTMLCanvasElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.debouncedAdjustCanvasSize);
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  ngAfterViewInit(): void {
    setTimeout(() =>  {
      this.createMatrixEffect();
    }, 1000)
    setTimeout(() =>  {
      this.animateText();
    }, 3000)
  }


  private createMatrixEffect(): void {
    const canvas = document.getElementById('matrix-canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d')!;
    
    if (!canvas || !ctx) {
      console.error('Canvas o contesto non trovato!');
      return;
    }
  
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
    const fontSize = 16;
    const columns = canvas.width / fontSize;
  
    // Mantieni lo stato delle gocce
    this.drops = this.drops.length ? this.drops : Array(Math.floor(columns)).fill(1);
  
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
  
      ctx.fillStyle = '#0F0';
      ctx.font = `${fontSize}px monospace`;
  
      this.drops.forEach((y, index) => {
        const text = characters[Math.floor(Math.random() * characters.length)];
        const x = index * fontSize;
  
        ctx.fillText(text, x, y * fontSize);
  
        if (y * fontSize > canvas.height && Math.random() > 0.975) {
          this.drops[index] = 0;
        }
  
        this.drops[index]++;
      });
    };
  
    setInterval(draw, 50);
  }

  private animateText(): void {
    const text = document.getElementById('animated-text') as HTMLElement;

    if (!text) {
      console.error('Elemento #animated-text non trovato');
      return;
    }
  
    // Calcola la dimensione del font in base alla larghezza dello schermo
    const updateFontSize = () => {
      const screenWidth = window.innerWidth; // Larghezza dello schermo
      const fontSize = Math.max(16, Math.min(32, screenWidth / 30)); // Calcola il font tra 16px e 32px
      text.style.fontSize = `${fontSize}px`; // Applica la dimensione del font
    };
  
    // Aggiorna la dimensione del font al caricamento
    updateFontSize();
  
    // Aggiungi un listener per aggiornare il font al ridimensionamento
    window.addEventListener('resize', updateFontSize);
  
      
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
      }, 20); // Ritardo di 20 millisecondi per evitare troppi aggiornamenti
    };
  
    handleScroll(); // Controllo iniziale
  
    window.addEventListener('scroll', handleScroll);
  
    // Rimuovi l'event listener quando il componente è distrutto
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
