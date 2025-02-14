import { inject, Injectable } from '@angular/core';
import { MemoryApiGame } from './models/memory-api.model';
import { forkJoin, map, Observable } from 'rxjs';
import { MemoryLocalGame } from './memory-api.interface';
import { HttpClient } from '@angular/common/http';
import { ApiDictionaryContent } from '../../dictionary/infrastructure/models/dictionary-api.model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class MemoryApiService implements MemoryLocalGame {
  private _httpClient = inject(HttpClient);
  private URL_DICTIONARY = environment.URL_DICTIONARY;
  private URL_MEMORY_LOCAL = environment.URL_MEMORY_LOCAL;

  getAllContent(): Observable<ApiDictionaryContent[]> {
    // Devuelve todas las palabras del diccionario de todas las categorías
    const categories = [
      'Abecedario',
      'Numeros',
      'Colores',
      'Frutas-Verduras',
      'Fechas',
    ];
    const requests = categories.map((category) =>
      this._httpClient.get<ApiDictionaryContent[]>(
        `${this.URL_DICTIONARY}/${category}`
      )
    );

    return forkJoin(requests).pipe(map((responses) => responses.flat()));
  }

  getUserPoints(id: string): Observable<MemoryApiGame> {
    return this._httpClient.get<MemoryApiGame>(
      `${this.URL_MEMORY_LOCAL}/${id}`
    );
  }
  updateUserPoints(data: MemoryApiGame): Observable<MemoryApiGame> {
    return this._httpClient.patch<MemoryApiGame>(
      `${this.URL_MEMORY_LOCAL}/update`,
      data
    );
  }
  compareWords(word: string, wordToCompare: string): boolean {
    return word === wordToCompare;
  }
}
