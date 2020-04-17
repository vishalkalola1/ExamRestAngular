import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Question } from '../datamodel/Question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService extends GenericService<Question> {
  
  getURl(): string {
    return "Questions/"
  }
}
