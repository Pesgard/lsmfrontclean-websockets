import { Component, computed, effect, inject, signal } from '@angular/core';
import { SalaService } from '../../services/sala.service';
import { ServerService } from '../../services/server.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pvp',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pvp.component.html',
  styleUrl: './pvp.component.css'
})
export class PvpComponent {
  serverService = inject(ServerService);
  salaService = inject(SalaService);
  userInput = signal<string>('');
  showModal = signal<boolean>(false);
  showSequence = signal<boolean>(false);
  currentSequenceIndex = signal<number>(0);
  sequenceStarted = signal<boolean>(false);

  juegoTerminado = computed(() => {
    return this.salaService.estado() === 'VICTORIA_P1' || 
           this.salaService.estado() === 'VICTORIA_P2' || 
           this.salaService.estado() === 'ABANDONADO';
  });

  ganador = computed(() => {
    if (this.salaService.estado() === 'VICTORIA_P1') {
      return this.salaService.jugador1().name;
    } else if (this.salaService.estado() === 'VICTORIA_P2') {
      return this.salaService.jugador2().name;
    } else {
      return null;
    }
  });

  bothPlayersPresent = computed(() => {
    return this.salaService.jugador1().name && this.salaService.jugador2().name;
  });

  constructor() {
    effect(() => {
      if (this.juegoTerminado()) {
        setTimeout(() => this.showModal.set(true), 0);
      }
    });

    // Monitor for both players and start sequence
    effect(() => {
      if (this.bothPlayersPresent() && !this.sequenceStarted()) {
        this.sequenceStarted.set(true);
        setTimeout(() => {
          this.startSequenceDisplay();
        }, 2500); // Pequeño delay para asegurar sincronización
      } 
    }, { allowSignalWrites: true });

    // Reset sequence state when players change
    effect(() => {
      if (!this.bothPlayersPresent()) {
        this.sequenceStarted.set(false);
        this.showSequence.set(false);
        this.currentSequenceIndex.set(0);
      }
    });
  }

  startSequenceDisplay() {
    this.showSequence.set(true);
    this.currentSequenceIndex.set(0);
    const sequenceLength = this.salaService.imageURL().length;
    let currentIndex = 0;

    const showNextImage = () => {
      if (currentIndex < sequenceLength) {
        this.currentSequenceIndex.set(currentIndex);
        currentIndex++;
        setTimeout(showNextImage, 1000);
      } else {
        this.showSequence.set(false);
      }
    };

    showNextImage();
  }

  async findRoom() {
    // Reset sequence state before finding new room
    this.sequenceStarted.set(false);
    this.showSequence.set(false);
    this.currentSequenceIndex.set(0);

    this.serverService.server.emitWithAck('encontrarSala').then(res => {
      if (res === null) {
        this.salaService.crearSala();
      } else {
        this.salaService.unirseASala(res);
      }
    });
  }

  enviarRespuesta() {
    this.salaService.recibirRespuesta(this.userInput());
    this.userInput.set('');
  }

  cerrarModal() {
    this.showModal.set(false);
    this.findRoom();
  }
}