import { Observable } from 'rxjs';
import { ApiDictionaryContent } from '../../dictionary/infrastructure/models/dictionary-api.model';
import { GuessApiGame } from './models/guess-api.model';

export interface GuessLocalGame {
  getAllContent(): Observable<ApiDictionaryContent[]>;

  getUserPoints(id: string): Observable<GuessApiGame>;

  updateUserPoints(data: GuessApiGame): Observable<GuessApiGame>;

}
