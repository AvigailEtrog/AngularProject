import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order.model';
import { ProductCart } from 'src/app/models/productCart.model';
import { User } from 'src/app/models/user.model';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductCartService } from 'src/app/services/product-cart.service';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {

  @Input()
  isDialog:boolean=false;
  @Output()
  isDialogChange:EventEmitter<boolean>=new EventEmitter<boolean>();
  frmPayment:FormGroup = new FormGroup({ });
  finish:boolean=false
  orderFinish:boolean=false;
  id:number=0;
  payment:number=0
  myCart:ProductCart[]=[]
  numbersReg: RegExp = new RegExp('0-9')
  phoneReg: RegExp = new RegExp('[0-9]-[0-9]')


  constructor(private router:Router,private prodCartSrv:ProductCartService,private ordSrv:OrdersService) {
    this.frmPayment=new FormGroup({
      userName:new FormControl('',[Validators.required]),
      phonNumber:new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      address:new FormControl(''),
      cardNumber:new FormControl('',[Validators.required,Validators.minLength(16),Validators.maxLength(20)]),
      cvc:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(3),Validators.pattern(this.numbersReg)]),
      validity:new FormControl('',[Validators.required]),
      identity:new FormControl('',[Validators.required,Validators.minLength(9),Validators.maxLength(9)]),
    })
  }
  
  ngOnChanges(){
    this.prodCartSrv.getProductCart().subscribe(prod=>{
      this.payment=0;
      this.myCart=prod;
      console.log(prod);
      
      prod.forEach(element => {
        this.payment+=element.present.price*element.quantity;
    });
    }); 

    this.frmPayment=new FormGroup({
      userName:new FormControl('',[Validators.required]),
      phonNumber:new FormControl('',[Validators.required,Validators.minLength(9),Validators.maxLength(10)]),
      email:new FormControl('',[Validators.required,Validators.email]),
      address:new FormControl(''),
      cardNumber:new FormControl('',[Validators.required,Validators.minLength(16),Validators.maxLength(16)]),
      cvc:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(3)]),
      validity:new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(4)]),
      identity:new FormControl('',[Validators.required,Validators.minLength(9),Validators.maxLength(9)]),
    })
     
  }


  back(){
    this.router.navigate(['./cart']);
  }
  sendOrder(){
    if(this.payment!=0){
    let user=new User()
    user.userName=this.frmPayment.controls['userName'].value
    user.phonNumber=this.frmPayment.controls['phonNumber'].value
    user.email=this.frmPayment.controls['email'].value
    user.address=this.frmPayment.controls['address'].value
    let order=new Order()
    order.user=user;
    order.myOrder=this.myCart;
    this.finish=true;
    this.ordSrv.addOrder(order).subscribe(id=>{
      if(id){
      this.isDialog=false;
      this.id=id;
      setTimeout(()=>{this.orderFinish=true; },2000) 
    }else{
      alert(`There is a problem , please try again`)
      this.finish=false;
    }
  
    })}
  }
  close(){
    this.isDialogChange.emit(false)
  }
  closeOrder(){
    this.finish=false;
    this.prodCartSrv.deleteAll().subscribe( 
    );
    this.router.navigate(['/presentsPurchase'])
  }
}

