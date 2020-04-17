import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { Exam } from '../datamodel/Exam';

@Injectable({
  providedIn: 'root'
})
export class ExamService extends GenericService<Exam> {

  getURl(): string {
    return "exam/"
  }
  
}
