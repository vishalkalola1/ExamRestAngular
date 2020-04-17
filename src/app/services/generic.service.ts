import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export abstract class GenericService<T> {

  private baseUrl : String = "http://localhost:8080/QuestionAPI/rest/"

  private url : string

  constructor(private httpClient:HttpClient) { }

  abstract getURl(): string

  post(object:T, cb:(response:T) => void){
    this.httpClient.post<T>(this.baseUrl+this.getURl()+this.url,object).subscribe((data:T) =>
      cb(data)
    );
  }

  postArray(object:T[], cb:(response:T[]) => void){
    this.httpClient.post<T[]>(this.baseUrl+this.getURl()+this.url,object).subscribe((data:T[]) =>
      cb(data)
    );
  }

  delete(object:T, cb:(response:T) => void){
    this.httpClient.delete<T>(this.baseUrl+this.getURl()+this.url,object).subscribe((data:T) =>
      cb(data)
    );
  }

  put(object:T, cb:(response:T) => void){
    this.httpClient.put<T>(this.baseUrl+this.getURl()+this.url,object).subscribe((data:T) =>
      cb(data)
    );
  }

  get(cb:(response:T) => void){
    this.httpClient.get<T>(this.baseUrl+this.getURl()+this.url).subscribe((data:T)=>
      cb(data)
    );
  }

  getAll(cb:(response:T[]) => void){
    this.httpClient.get<T[]>(this.baseUrl+this.getURl()+this.url).subscribe((data:T[])=>
      cb(data)
    );
  }

  public getUrl() : string {
    return this.url;
  }

  public setUrl(url : string) {
    this.url = url;
  }
}
