import { Component } from '@angular/core';
import { TitleService } from './title.service';
import { RouterOutlet } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('routeAnimations', [
      transition('BlogPage => PostPage', [
        style({ opacity: 0, transform: 'translateX(70%)' }),
        animate('0.5s ease-in-out', style({ opacity: 0.9, transform: 'translateX(0%)' })),
      ]),
      transition('PostPage => BlogPage', [
        style({ opacity: 0, transform: 'translateX(-70%)' }),
        animate('0.5s ease-in-out', style({ opacity: 0.9, transform: 'translateX(0%)' })),
      ]),
    ]),
  ],
})
export class AppComponent {
  title = 'andreadedonato';

  constructor(private titleService: TitleService){
    this.titleService.setTitle(this.title);
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

}
