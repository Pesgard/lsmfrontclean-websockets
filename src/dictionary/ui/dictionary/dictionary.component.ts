import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Home, LucideAngularModule } from 'lucide-angular';

interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
}

@Component({
  selector: 'app-dictionary',
  standalone: true,
  imports: [LucideAngularModule, RouterLink],
  templateUrl: './dictionary.component.html',
  styleUrl: './dictionary.component.css',
})
export class DictionaryComponent {
  readonly HomeIcon = Home;

  categories: Category[] = [
    {
      id: 'abecedario',
      name: 'Abecedario',
      icon: '🔤',
      description: 'Aprende a deletrear palabras con tus manos',
    },
    {
      id: 'numeros',
      name: 'Números',
      icon: '🔢',
      description: 'Domina los números del 0 al 100 y más allá',
    },
    {
      id: 'colores',
      name: 'Colores',
      icon: '🌈',
      description: 'Expresa el arcoíris con tus manos',
    },
    {
      id: 'fechas',
      name: 'Fechas',
      icon: '📅',
      description: 'Comunica días, meses y años con fluidez',
    },
    {
      id: 'frutas-verduras',
      name: 'Frutas y Verduras',
      icon: '🍎🥕',
      description: 'Señas para una alimentación saludable',
    },
  ];
}
