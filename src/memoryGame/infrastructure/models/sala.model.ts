import { Jugador } from "./Jugador.model";


export type RoomStatus ="ESPERANDO_JUGADOR" | "VICTORIA_P1" | "VICTORIA_P2" | "JUGAR" |
"ABANDONADO" | 'EMPATE' | 'TURNO_P1' | 'TURNO_P2' | 'TIEMPO_AGOTADO_P1' |'TIEMPO_AGOTADO_P2' | 'TABLERO_COMPLETO'

//export type statusRespuesta =  'TIEMPO_AGOTADO' | 'ESPERANDO_RESPUESTA' | 'PAR' | 'IMPAR' 

export interface SalaBackend{
    publica: boolean;
    players: [Jugador,Jugador];
    roomID: number;
    status: RoomStatus;
    card1: number;
    card2: number;
    esPar: boolean;
    paresP1:number;
    paresP2: number;
    tablero:Tablero;
}

export type Tablero = [string,string,string,string,string,string,string,string,string,string,string,string,string,string,string,string,string,string,string,string,string,string,string,string];
