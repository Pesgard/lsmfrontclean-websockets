import { Observable } from 'rxjs';
import {
  ApiDictionaryContent,
  DictionaryApiCategory,
} from './models/dictionary-api.model';

export interface DictionaryApi {
  getContent(
    category: DictionaryApiCategory
  ): Observable<ApiDictionaryContent[]>;
}
