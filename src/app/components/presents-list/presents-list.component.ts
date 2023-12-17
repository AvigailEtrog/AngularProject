import { Component, OnInit } from '@angular/core';
import { Present } from '../../models/present.model';
import { PresentService } from '../../services/presents.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';


@Component({
  selector: 'app-presents-list',
  templateUrl: './presents-list.component.html',
  styleUrls: ['./presents-list.component.css'],
  providers: [ConfirmationService,MessageService,PresentService]
})

export class PresentsListComponent implements OnInit{
  
  constructor(private presentSrv:PresentService, private router: Router,private activetedRoute: ActivatedRoute,
   private confirmationService:ConfirmationService,private messageService:MessageService) {}

  ngOnInit(): void {
    this.presentSrv.callToGetPresent$.subscribe(p=>
      this.presentSrv.getPresente().subscribe(p=>this.presentsList=p)
      )
  }
  presentsList:Present[]=[]
  selectedPresents : Present[]=[]

  addPresent=()=>{
    this.router.navigate(['./addPresent/'], {relativeTo: this.activetedRoute});
  }

  savePresent=(id:number)=>{
    this.router.navigate(['./editPresent/'+ id], {relativeTo: this.activetedRoute});
  }

  delete=(item:Present )=>{
    this.confirmationService.confirm({
          message: 'Are you sure you want to delete ' + item.name + '?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.presentSrv.deletePresnt(item.id).subscribe(res=>{
                if(res){
                  this.presentSrv.getPresente().subscribe(p=>this.presentsList=p)
                  this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
                }
              })    
          }
        });
  }

  deleteSelectedPresents(){
    this.confirmationService.confirm({
          message: 'Are you sure you want to delete the selected products?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.presentSrv.deletePresentsSelect(this.selectedPresents).subscribe
            (res=>{
              if(res){
                this.presentSrv.getPresente().subscribe(p=>this.presentsList=p)
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
              }
          })
      }})
    }
    

}

