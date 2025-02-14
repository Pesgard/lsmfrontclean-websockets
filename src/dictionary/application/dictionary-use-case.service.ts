import { inject, Injectable } from '@angular/core';
import { DictionaryApiService } from '../infrastructure/dictionary-api.service';
import { DictionaryApiCategory } from '../infrastructure/models/dictionary-api.model';

@Injectable({
  providedIn: 'root',
})
export class DictionaryUseCaseService {
  private _dictionaryApiService = inject(DictionaryApiService);

  getContent(category: string) {
    const apiCategory: DictionaryApiCategory = { category };
    return this._dictionaryApiService.getContent(apiCategory);
  }
}
