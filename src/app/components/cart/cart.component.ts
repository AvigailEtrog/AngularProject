import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductCart } from 'src/app/models/productCart.model';
import { ProductCartService } from 'src/app/services/product-cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  presentsInCart:ProductCart[]=[]
  isDialog:boolean=false
constructor(private prodCartSrv:ProductCartService,private router: Router) {}

ngOnInit(){
  this.prodCartSrv.getProductCart().subscribe(prod=>this.presentsInCart=prod); }

DeleteFromoCart(item:ProductCart){
  this.prodCartSrv.deleteProductFromCart(item).subscribe(res=>{
    if(res){
      this.prodCartSrv.getProductCart().subscribe(prod=>this.presentsInCart=prod)
    }
});}
   
back(){
  this.router.navigate(['./presentsPurchase']);
}
paying(){
  this.isDialog=true
}
deleteAll(){
  this.prodCartSrv.deleteAll().subscribe(res=>{
    if(res){
      this.prodCartSrv.getProductCart().subscribe(prod=>this.presentsInCart=prod)
    }
})
}

}
