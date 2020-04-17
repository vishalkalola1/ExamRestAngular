import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { User } from '../datamodel/User';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService extends GenericService<User>{

  getURl(): string {
    return "user/";
  }
  
}
