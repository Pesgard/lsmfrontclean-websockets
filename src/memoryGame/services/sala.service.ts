import { effect, inject, Injectable, signal } from '@angular/core';
import { ServerService } from './server.service';
import { UsuarioService } from './usuario.service';
import { Jugador } from '../infrastructure/models/Jugador.model';
import { RoomStatus, SalaBackend } from '../infrastructure/models/sala.model';
import { CrearSalaArgs } from '../infrastructure/models/crearSala.model';
import { unirseASalaArgs } from '../infrastructure/models/unirseSala.model';

@Injectable({
  providedIn: 'root'
})
export class SalaService {
  serverService = inject(ServerService);
  usuarioService = inject(UsuarioService);

  constructor() { 
    this.serverService.actualizacionDeSala$.subscribe((sala) => {
      this.desestructurarSala(sala);
    });
  
    // Efecto reactivo con Angular Signals
    effect(() => {
      const sala = this.estado(); // Reacciona a cambios en el estado de la sala
      if (sala === 'TURNO_P1' || sala === 'TURNO_P2') {
        console.log(`El estado del juego cambió a: ${sala}`);
      }
    });
  }

  jugador1 = signal<Jugador>({name:''});
  jugador2 = signal<Jugador>({name:''});
  tablero = signal<string[]>([]);
  estado = signal<RoomStatus> ("ESPERANDO_JUGADOR");
  numeroJugador = signal<1|2|undefined>(undefined);
  id = signal<number|undefined>(undefined);
  casilla1 = signal<number>(-1);
  casilla2 = signal<number>(-1);
  esPar: boolean = false;
  cartasDeshabilitadas = signal<boolean[]>([]);


  
  desestructurarSala(salaBack: SalaBackend) {
    console.log('desestructurando: ', salaBack);
    this.id.set(salaBack.roomID);
    this.jugador1.set(salaBack.players[0]);
    this.jugador2.set(salaBack.players[1]);
    this.estado.set(salaBack.status);
    this.casilla1.set(salaBack.card1);
    this.casilla2.set(salaBack.card2);
    this.tablero.set(salaBack.tablero);
  
    // Actualizar cartas deshabilitadas cuando el backend reporte pares encontrados
    if (salaBack.esPar) {
      this.cartasDeshabilitadas.update((cartas) => {
        cartas[salaBack.card1] = true;
        cartas[salaBack.card2] = true;
        return [...cartas];
      });
    }
  
    this.esPar = false;
  }
  

  crearSala(esPrivada:boolean = false){
    console.log('Creando sala para jugador',this.usuarioService.tokenUsuario());
    const args:CrearSalaArgs={
      publica: !esPrivada,
      userID: this.usuarioService.tokenUsuario(),
    }
    this.serverService.server.emitWithAck('crearSala',args).then(res => {
      this.desestructurarSala(res.sala);
      this.numeroJugador.set(1);
      console.log('Crear sala',res);
    })
  }

  unirseASala(id:number){
    const args:unirseASalaArgs = {
      roomID: id,
      userID: this.usuarioService.tokenUsuario(),
    }
    this.serverService.server.emitWithAck('unirseASala',args).then(res =>{
      console.log('Resultado de unión a sala',res);
      this.numeroJugador.set(2);
      this.desestructurarSala(res.sala);
    })
  }
  /*
    Tienes que injectar el servicio para poder llamar este método y de la caja de texto tomas la respuesta  
    del jugador y se manda al server
  */
  jugar(casilla:number){
    console.log('jugando en la casilla',casilla);
    if(this.casilla1() === -1){
      this.casilla1.set(casilla);
      this.comunicarSalas()
    }
    else{

      this.casilla2.set(casilla);
      this.compararPar();
    }
  }

  /**
   * Esta función solo se utiliza cuando al jugador se le acaba el tiempo para responder
   * Injectando el servicio lo puedes utilizar
   */
  tiempoAgotado(){
    //this.estado.set('TIEMPO_AGOTADO_P1')
    this.serverService.server.emit("jugar",{
      salaId: this.id(),
      jugador: this.numeroJugador(),
      //status: this.respuesta(),
    })
  }

  compararPar() {
    console.log('comparando pares');
    if (this.tablero()[this.casilla1()] === this.tablero()[this.casilla2()]) {
      this.esPar = true;
      this.cartasDeshabilitadas.update((cartas) => {
        cartas[this.casilla1()] = true;
        cartas[this.casilla2()] = true;
        return [...cartas];
      });
    } else {
      this.esPar = false;
    }
    this.comunicarSalas();
  }
  comunicarSalas(){
    this.serverService.server.emit("jugar",{
      salaId: this.id(),
      jugador: this.numeroJugador(),
      status: this.estado(),
      card1: this.casilla1(),
      card2: this.casilla2(),
      par: this.esPar
    })
  }
}
