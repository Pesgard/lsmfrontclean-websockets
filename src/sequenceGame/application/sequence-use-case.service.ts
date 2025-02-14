import { inject, Injectable } from '@angular/core';
import { SequenceApiService } from '../infrastructure/sequence-api.service';
import { SequenceGame } from '../infrastructure/models/sequence-local-api.modal';

@Injectable({
  providedIn: 'root',
})
export class SequenceUseCaseService {
  _sequenceApiService = inject(SequenceApiService);

  getAllContent() {
    return this._sequenceApiService.getAllContent();
  }

  getUserPoints(id: string) {
    return this._sequenceApiService.getUserPoints(id);
  }

  saveUserPoints(data: SequenceGame) {
    return this._sequenceApiService.saveUserPoints(data);
  }
}
