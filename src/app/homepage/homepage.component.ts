import { Component, OnInit, OnDestroy } from '@angular/core';
import { TitleService } from '../title.service';
import { AnimationService } from '../animation.service';
import { ViewportScroller } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  animations: [AnimationService.fadeInOut,
               AnimationService.slideIn,
               AnimationService.fadeInOnScroll,
               AnimationService.slideInOnScroll],
})
export class HomepageComponent implements OnInit, OnDestroy{

  title ?: string;
  
  private onDestroy$ = new Subject<void>();

  isVisible = 'hidden';

  constructor(private viewportScroller: ViewportScroller, titleService: TitleService) {}

  ngOnInit() {
    this.handleScrollEvents();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
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
