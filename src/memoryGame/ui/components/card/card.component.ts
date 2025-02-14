import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardMemoryGameModel } from '../../../domain/memory-local.model';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgClass],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input({ required: true }) card!: CardMemoryGameModel;
  @Output() cardClick = new EventEmitter<void>();

  onCardClick() {
    if (!this.card.matched && !this.card.flipped) {
      this.cardClick.emit();
    }
  }
}
