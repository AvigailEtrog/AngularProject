import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Donor } from 'src/app/models/donor.model';
import { DonorsService } from 'src/app/services/donors.service';

@Component({
  selector: 'app-edit-donor',
  templateUrl: './edit-donor.component.html',
  styleUrls: ['./edit-donor.component.css']
})
export class EditDonorComponent {
  frmDonor: FormGroup = new FormGroup({});
  donor:Donor=new Donor()
  isDialog:boolean=false
  
  
  constructor(private donSrv : DonorsService,private activetedRoute: ActivatedRoute ,private router:Router ){
    this.isDialog=true;

    this.frmDonor=new FormGroup({
      id:new FormControl('',[Validators.required,Validators.maxLength(10)]),
      firstName:new FormControl('',[Validators.required,Validators.maxLength(20)]),
      lastName:new FormControl('',[Validators.required,Validators.maxLength(20)]),
      address:new FormControl('',[Validators.required]),
      age:new FormControl(10,[Validators.required,Validators.max(120),Validators.min(10)])
    })
  }

  ngOnInit(): void {
    
    this.activetedRoute.params.subscribe(d => {
      if(d['id']){
      this.donSrv.getById(d['id']).subscribe(don=>{
        this.donor = don
        if(this.donor.id!=''){
          this.isDialog=true
          this.frmDonor=new FormGroup({
          id:new FormControl(this.donor.id,[Validators.required,Validators.maxLength(9),Validators.minLength(8)]),
          firstName:new FormControl(this.donor.firstName,[Validators.required,Validators.maxLength(20)]),
          lastName:new FormControl(this.donor.lastName,[Validators.required,Validators.maxLength(20)]),
          address:new FormControl(this.donor.address,[Validators.required]),
          age:new FormControl(this.donor.age,[Validators.required,Validators.max(120),Validators.min(10)])
          })
      }})}
  })
  }

  donorsList:Donor[]=[]

  send=()=>{
    let d=new Donor;
    d.firstName= this.frmDonor.controls['firstName'].value
    d.lastName= this.frmDonor.controls['lastName'].value
    d.age= this.frmDonor.controls['age'].value
    d.id=this.frmDonor.controls['id'].value
    d.address=this.frmDonor.controls['address'].value
    if(this.donor.id==''){
      this.donSrv.addDonor(d).subscribe(res=>{
        if(res){
          this.donSrv.setGetDonors()
        }
      })
    } 
    else{
      this.donSrv.updateDonor(d).subscribe(res=>{
        if(res){
          this.donSrv.setGetDonors()
        }
      })
    } 
    this.isDialog=false;
    this.router.navigate(['donorsList']); 
  }

  navigateDonors(){
    this.router.navigate(['donorsList']);
  }
}
