// animations.service.ts
import { Injectable } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';

@Injectable({
  providedIn: 'root',
})
export class AnimationService {
  static fadeInOut = trigger('fadeInOut', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('300ms', style({ opacity: 1 })),
    ]),
    transition(':leave', [
      animate('300ms', style({ opacity: 0 })),
    ]),
  ]);


  static slideIn = trigger('slideIn', [
    transition(':enter', [
      style({ transform: 'translateX(-100%)' }),
      animate('300ms ease-out', style({ transform: 'translateX(0)' })),
    ]),
    transition(':leave', [
      animate('300ms ease-in', style({ transform: 'translateX(100%)' })),
    ]),
  ]);

  static slideInOnScroll = trigger('slideInOnScroll', [
    state('hidden', style({
      opacity: 0,
      transform: 'translateX(-100%)',
    })),
    state('visible', style({
      opacity: 1,
      transform: 'translateX(0%)',
    })),
    transition('hidden => visible', animate('300ms ease-in')),
    transition('visible => hidden', animate('300ms ease-in')),
  ]);


  static fadeInOnScroll = trigger('fadeInOnScroll', [
    state('hidden', style({
      opacity: 0,
      transform: 'translateY(20px)',
    })),
    state('visible', style({
      opacity: 1,
      transform: 'translateY(0)',
    })),
    transition('hidden => visible', animate('300ms ease-in')),
    transition('visible => hidden', animate('300ms ease-in')),
  ]);

  // Aggiungi altre animazioni secondo necessità
}
