import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InformationService {

  public url:string='http://localhost:4000/';
  constructor(private http:HttpClient) { }


  public getIncomes(date:string):Observable<any>{
    return this.http.post(this.url+"information",{date:date});
  }
  public agregarRegistro(registro:any):Observable<any>{
    return this.http.post(this.url+"agregarRegistro",{information:registro});
  }
}
