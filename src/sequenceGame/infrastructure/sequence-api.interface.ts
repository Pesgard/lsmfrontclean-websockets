import { Observable } from 'rxjs';
import { ApiDictionaryContent } from '../../dictionary/infrastructure/models/dictionary-api.model';
import { SequenceGame } from './models/sequence-local-api.modal';

export interface SequenceLocalGame {
  getAllContent(): Observable<ApiDictionaryContent[]>;

  getUserPoints(id: string): Observable<SequenceGame>;

  saveUserPoints(data: SequenceGame): Observable<SequenceGame>;
}
