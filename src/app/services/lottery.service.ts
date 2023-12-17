import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Present } from '../models/present.model';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Lottery } from '../models/lottery.model';

@Injectable({
  providedIn: 'root'
})
export class LotteryService {

  constructor(private http:HttpClient) { }

  getAllWinner():Observable<Lottery[]>{
    let url='https://localhost:7119/api/Lottery'
    return this.http.get<Lottery[]>(url);
  }


  lotteryUser(p:Present):Observable<User>{
    let url='https://localhost:7119/api/Lottery'
    return this.http.post<User>(url,p);
  }


}
