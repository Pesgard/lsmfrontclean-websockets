import { Component, computed, inject } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { ServerService } from '../../services/server.service';
import { SalaService } from '../../services/sala.service';

@Component({
  selector: 'app-memory-pvp',
  standalone: true,
  imports: [],
  templateUrl: './memory-pvp.component.html',
  styleUrl: './memory-pvp.component.css'
})
export class MemoryPvpComponent {
  usuarioService = inject(UsuarioService);
  serverService = inject(ServerService);
  salaService = inject(SalaService);
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  esMiTurno = computed(() => 
    (this.salaService.estado() === "TURNO_P1" && this.salaService.numeroJugador() === 1) || 
    (this.salaService.estado() === 'TURNO_P2' && this.salaService.numeroJugador() === 2));
  jugar(posicion:number){
    this.salaService.jugar(posicion);

  }

  constructor() {}

  async findRoom() {
    this.serverService.server.emitWithAck('encontrarSala').then(res =>{
      console.log("Respuesta del server: ",res);
      if(res === null) {
        this.salaService.crearSala();
      }
      else{
        this.salaService.unirseASala(res);
      }
    })
  }
}
