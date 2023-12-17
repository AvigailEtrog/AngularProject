import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Present } from '../models/present.model';
import { ProductCart } from '../models/productCart.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductCartService {

  constructor(private http:HttpClient) { }
  getProductCart():Observable<ProductCart[]>{
    let url='https://localhost:7119/api/Cart'
    return this.http.get<ProductCart[]>(url)
  }


  addToCart(item:Present){
    let pc=new ProductCart()
    pc.present=item;
    let url='https://localhost:7119/api/Cart'
    return this.http.post(url, pc)

  }
  deleteProductFromCart(item:ProductCart){
    let url='https://localhost:7119/api/Cart/'+item.id
    return this.http.delete(url)
  }
  deleteAll(){
    let url='https://localhost:7119/api/Cart'
    return this.http.delete(url)

  }

}
