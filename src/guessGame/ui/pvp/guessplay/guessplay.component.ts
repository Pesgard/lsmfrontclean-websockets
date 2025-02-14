import { Component } from '@angular/core';

@Component({
  selector: 'app-game',
  standalone: true,
  templateUrl: './guessplay.component.html',
})
export class GameComponent {
  currentPlayer = 0; // 0: Jugador 1, 1: Jugador 2
  player1Points = 0;
  player1CorrectGuesses = 0;
  player2Points = 0;
  player2CorrectGuesses = 0;

  // Simulación de datos
  currentSign = () => ({ name: 'Seña de ejemplo', imageURL: '/assets/sign.png' });

  switchTurn() {
    this.currentPlayer = this.currentPlayer === 0 ? 1 : 0;
  }
}
