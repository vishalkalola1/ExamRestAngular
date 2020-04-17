import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { MCQChoice } from '../datamodel/MCQChoice';

@Injectable({
  providedIn: 'root'
})
export class McqchoicesService extends GenericService<MCQChoice> {
  
  getURl(): string {
    return "choice/"
  }
}
