// app-scroll-animation.directive.ts
import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appScrollAnimation]'
})
export class AppScrollAnimationDirective {
  private isVisible = 'hidden';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const rect = this.el.nativeElement.getBoundingClientRect();

    // Aggiungi qui la tua logica di gestione dell'animazione
    const newVisibility = this.isElementInView(rect) ? 'visible' : 'hidden';

    if (this.isVisible !== newVisibility) {
      this.isVisible = newVisibility;
      this.animateElement();
    }
  }

  private isElementInView(rect: DOMRect) {
    // Logica per verificare se l'elemento è nella vista
    return (
      (rect.top >= 100 && rect.top <= window.innerHeight - 150) ||
      (rect.bottom >= 100 && rect.bottom <= window.innerHeight - 150)
    );
  }

  private animateElement() {
    // Logica per animare l'elemento
    if (this.isVisible === 'visible') {
      // Applica l'animazione desiderata, ad esempio fadeIn, slideIn, ecc.
      this.renderer.addClass(this.el.nativeElement, 'fadeInClass');
    } else {
      // Applica l'animazione per nascondere l'elemento
      this.renderer.removeClass(this.el.nativeElement, 'fadeInClass');
    }
  }
}
