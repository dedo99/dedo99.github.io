import { Component, HostListener, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('menuState', [
      state(
        'closed',
        style({
          height: '0',
          opacity: 0,
          overflow: 'hidden',
        })
      ),
      state(
        'open',
        style({
          height: '*', // Altezza automatica basata sul contenuto
          opacity: 1,
          overflow: 'hidden',
        })
      ),
      transition('closed <=> open', animate('300ms ease-in-out')), // Animazione fluida
    ]),
  ],
})
export class HeaderComponent {
  @Input() title?: string;
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  // Ascolta i clic sul documento
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    const navlink = document.querySelector('.navlink');
    const hamburger = document.querySelector('.hamburger');

    // Se il clic è fuori dal menu e dal pulsante hamburger, chiudi il menu
    if (
      this.isMenuOpen &&
      navlink &&
      !navlink.contains(target) &&
      hamburger &&
      !hamburger.contains(target)
    ) {
      this.closeMenu();
    }
  }
}
