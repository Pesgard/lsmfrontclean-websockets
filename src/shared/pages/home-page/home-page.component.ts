import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  Award,
  BookOpen,
  Gamepad,
  LucideAngularModule,
  Twitter,
  Instagram,
  Facebook,
  Hand,
} from 'lucide-angular';

@Component({
  standalone: true,
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  template: `
    <button (click)="navigate()">Saber más</button>
  `,
  styleUrls: ['./home-page.component.css'],
  imports: [LucideAngularModule],
})
export class HomePageComponent {
  constructor(private router: Router) {}
  // iconography
  readonly twitter = Twitter;
  readonly book_open = BookOpen;
  readonly gamepad = Gamepad;
  readonly award = Award;
  readonly instagram = Instagram;
  readonly facebook = Facebook;
  readonly hand = Hand;

  login() {
    this.router.navigate(['/login']);
  }

  register() {
    this.router.navigate(['/register']);
  }

  navigate(): void {
    window.open('https://www.gob.mx/conadis/articulos/lengua-de-senas-mexicana-lsm?idiom=es', '_blank');
  }
}
