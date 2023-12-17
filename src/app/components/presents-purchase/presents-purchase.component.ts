import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Present } from 'src/app/models/present.model';
import { PresentService } from 'src/app/services/presents.service';
import { ProductCartService } from 'src/app/services/product-cart.service';

@Component({
  selector: 'app-presents-purchase',
  templateUrl: './presents-purchase.component.html',
  styleUrls: ['./presents-purchase.component.css']
})
export class PresentsPurchaseComponent {
presentsList:Present[]=[]
layout:string="";
constructor(private presSrv:PresentService,private prodCartSrv:ProductCartService,private router: Router,private activetedRoute: ActivatedRoute) {}
ngOnInit(){
this.presSrv.getPresente().subscribe(presents=>this.presentsList=presents);
}

AddToCart(item:Present){
  this.prodCartSrv.addToCart(item).subscribe(res=>{ })
}
MyCart(){
  this.router.navigate(['./cart']);
}


}
