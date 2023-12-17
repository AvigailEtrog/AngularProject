import { Component } from '@angular/core';
import { Donor } from 'src/app/models/donor.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DonorsService } from 'src/app/services/donors.service';

@Component({
  selector: 'app-donors-list',
  templateUrl: './donors-list.component.html',
  styleUrls: ['./donors-list.component.css'],
  providers: [ConfirmationService,MessageService,DonorsService]
})
export class DonorsListComponent {
  constructor(private donorSrv:DonorsService, private router: Router,private activetedRoute: ActivatedRoute,
    private confirmationService:ConfirmationService,private messageService:MessageService) {}
 
   ngOnInit(): void {
    this.donorSrv.callToGetDonors$.subscribe(p=>
      this.donorSrv.getDonors().subscribe(d=>this.donorsList=d)
      )
   }
 
   donorsList:Donor[]=[]
   selectedDonors : Donor[]=[]
 
   addDonor=()=>{
     this.router.navigate(['./addDonor/'], {relativeTo: this.activetedRoute});
     console.log(this.donorsList);
     
   }
 
   saveDonor=(id:number)=>{
     this.router.navigate(['./editDonor/'+ id], {relativeTo: this.activetedRoute});
   }
 
   delete=(item:Donor )=>{
     this.confirmationService.confirm({
           message: 'Are you sure you want to delete ' + item.firstName +' '+item.lastName+ '?',
           header: 'Confirm',
           icon: 'pi pi-exclamation-triangle',
           accept: () => {
              this.donorSrv.deleteDonor(item).subscribe(res=>{
                if(res){
                  this.donorSrv.setGetDonors() 
                  this.messageService.add({severity:'success', summary: 'Successful', detail: 'Donor Deleted', life: 3000});
                }
              })
           }
         });    
   }
 
   deleteSelectedDonors(){
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.donorSrv.deleteDonorsSelect(this.selectedDonors).subscribe
            (res=>{
              if(res){
                this.donorSrv.getDonors().subscribe(d=>this.donorsList=d)
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
              }
          })
  }});
   }
 
}
