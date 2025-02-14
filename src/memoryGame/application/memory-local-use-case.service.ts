import { CardMemoryGameModel } from './../domain/memory-local.model';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { MemoryApiService } from '../infrastructure/memory-api.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MemoryLocalUseCaseService {
  private _memoryApiService = inject(MemoryApiService);

  cards = signal<CardMemoryGameModel[]>([]);
  moves = signal<number>(0);
  elapsedTime = signal<number>(0);
  gameOver = new Subject<void>();
  isGameEnded = signal<boolean>(true);

  flippedCards = signal<CardMemoryGameModel[]>([]);
  matchedPairs = computed(
    () => this.cards().filter((card) => card.matched).length / 2
  );
  canFlipCard = computed(
    () => this.flippedCards().length < 2 && !this.isGameEnded()
  );

  totalPairs = computed(() => this.cards().length / 2);

  constructor() {
    this.initializeGame();

    // Effect to check for game over
    effect(
      () => {
        if (this.matchedPairs() === this.totalPairs() && !this.isGameEnded()) {
          this.endGame();
        }
      },
      { allowSignalWrites: true }
    );
  }

  private initializeGame() {
    this._memoryApiService.getAllContent().subscribe((data) => {
      const selectedCards = data.sort(() => 0.5 - Math.random()).slice(0, 8);
      const deck = [...selectedCards, ...selectedCards]
        .map((card, index) => ({
          id: card.id,
          index: index,
          name: card.name,
          imageURL: card.imageURL,
          description: card.description,
          class: card.class,
          flipped: false,
          matched: false,
        }))
        .sort(() => Math.random() - 0.5);

      this.cards.set(deck);
      this.moves.set(0);
      this.elapsedTime.set(0);
      this.flippedCards.set([]);
      this.isGameEnded.set(false);
      console.log('Game initialized: isGameEnded = ', this.isGameEnded()); // Agregar log para verificar
    });
  }

  flipCard(card: CardMemoryGameModel): void {
    {
      if (!this.canFlipCard()) return;

      card.flipped = true;
      this.flippedCards.set([...this.flippedCards(), card]);

      if (this.flippedCards().length === 2) {
        this.moves.set(this.moves() + 1);
        setTimeout(() => {
          this.checkForMatch();
        }, 1000);
      }
    }
  }

  private checkForMatch(): void {
    const [card1, card2] = this.flippedCards();

    if (card1.name === card2.name) {
      this.cards.update((cards) =>
        cards.map((c) =>
          c.index === card1.index || c.index === card2.index
            ? { ...c, matched: true }
            : c
        )
      );
      this.flippedCards.set([]);
    } else {
      setTimeout(() => {
        this.cards.update((cards) =>
          cards.map((c) =>
            c.index === card1.index || c.index === card2.index
              ? { ...c, flipped: false }
              : c
          )
        );
        this.flippedCards.set([]);
      }, 1000);
    }
  }

  incrementTime(): void {
    if (!this.isGameEnded()) {
      this.elapsedTime.update((time) => time + 1);
    }
  }

  private endGame(): void {
    this.isGameEnded.set(true);
    this.gameOver.next();
    console.log(
      'Game Over! Total moves:',
      this.moves(),
      'Time:',
      this.elapsedTime()
    );
  }

  restartGame(): void {
    this.initializeGame();
  }
}
