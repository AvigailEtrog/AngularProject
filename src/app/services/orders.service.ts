import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { ProductCart } from '../models/productCart.model';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http:HttpClient) { }

  addOrder(order:Order):Observable<number>{
    let url = 'https://localhost:7119/api/Orders';
    return this.http.post<number>(url,order)
   }
  
}
