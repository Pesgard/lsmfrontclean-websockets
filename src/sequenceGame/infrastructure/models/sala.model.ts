import { Jugador } from "./Jugador.model";


export type EstadoJuego = "ESPERANDO_JUGADOR" | "VICTORIA_P1" | "VICTORIA_P2" | "JUGAR" | "ABANDONADO" 

export interface SalaBackend{
    publica: boolean;
    players: [Jugador,Jugador];
    roomID: number;
    status: EstadoJuego;
    imageURL: string[];
    signal: string[];
}
export type statusRespuesta = 'INCORRECTA' | 'CORRECTA' | 'TIEMPO_AGOTADO' | 'ESPERANDO_RESPUESTA'