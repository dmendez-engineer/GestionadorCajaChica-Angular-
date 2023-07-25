import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InformationService {

  public url:string='http://localhost:4000/information';
  constructor(private http:HttpClient) { }


  public getIncomes(date:string):Observable<any>{
    return this.http.post(this.url,{date:date});
  }
}
