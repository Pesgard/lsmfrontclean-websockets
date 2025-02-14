import { inject, Injectable } from '@angular/core';
import { DictionaryApi } from './dictionary-api.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  DictionaryApiCategory,
  ApiDictionaryContent,
} from './models/dictionary-api.model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class DictionaryApiService implements DictionaryApi {
  private _httpClient = inject(HttpClient);
  private URL_DICTIONARY = environment.URL_DICTIONARY;

  getContent(
    category: DictionaryApiCategory
  ): Observable<ApiDictionaryContent[]> {
    return this._httpClient.get<ApiDictionaryContent[]>(
      `${this.URL_DICTIONARY}/${category.category}`
    );
  }
}
