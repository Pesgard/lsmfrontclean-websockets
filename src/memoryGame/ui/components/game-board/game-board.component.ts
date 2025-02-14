import { Component, inject } from '@angular/core';
import { MemoryLocalUseCaseService } from '../../../application/memory-local-use-case.service';
import { CardMemoryGameModel } from '../../../domain/memory-local.model';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.css',
})
export class GameBoardComponent {
  private _memoryLocalUseCaseService = inject(MemoryLocalUseCaseService);

  cards = this._memoryLocalUseCaseService.cards;
  isGameEnded = this._memoryLocalUseCaseService.isGameEnded;
  moves = this._memoryLocalUseCaseService.moves;
  elapsedTime = this._memoryLocalUseCaseService.elapsedTime;

  onCardClick(card: CardMemoryGameModel) {
    this._memoryLocalUseCaseService.flipCard(card);
  }

  restartGame() {
    // relaod page
    window.location.reload();
  }
}
