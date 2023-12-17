import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, FormGroupName, Validators } from '@angular/forms';
import { Present } from '../../models/present.model';
import { UniqValidator } from '../../infrastructure/validators/uniqNamePresValid';
import { PresentService } from '../../services/presents.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DonorsService } from 'src/app/services/donors.service';
import { Donor } from 'src/app/models/donor.model';

@Component({
  selector: 'app-edit-present',
  templateUrl: './edit-present.component.html',
  styleUrls: ['./edit-present.component.css']
})
export class EditPresentComponent {
  frmPresent: FormGroup = new FormGroup({});
  present: Present = new Present()
  isDialog: boolean = false
  donorsList:Donor[]=[]
  selectedItem:Donor=new Donor

  constructor(private donSrv:DonorsService, private presSrv: PresentService, private activetedRoute: ActivatedRoute, private router: Router) {
    this.isDialog = true;
    this.frmPresent = new FormGroup({
      name: new FormControl('', [Validators.required, UniqValidator(presSrv)]),
      donor: new FormControl('', [Validators.maxLength(40)]),
      price: new FormControl(10, [Validators.required, Validators.min(10), Validators.max(60)]),
    })
  }

  ngOnInit(): void {
    this.donSrv.getDonors().subscribe(donors=>this.donorsList=donors);
    this.activetedRoute.params.subscribe(p => {
      if(p['id']){
      this.presSrv.getById(p['id']).subscribe(pr => {
        this.present = pr;
        if (this.present.id != 0){
          this.isDialog = true
          this.frmPresent = new FormGroup({
            name: new FormControl(this.present.name, [Validators.required]),
            donor: new FormControl(this.present.donor, [Validators.maxLength(30)]),
            price: new FormControl(this.present.price, [Validators.required, Validators.min(10), Validators.max(60)]),
          })
        }
      })
    } })
  }



  send = () => {
    let p = new Present;
    p.name = this.frmPresent.controls['name'].value
    p.donor = this.frmPresent.controls['donor'].value
    p.price = this.frmPresent.controls['price'].value
    p.id = this.present.id;
    if (this.present.id==0) {
      this.presSrv.addPresrent(p).subscribe(res=>{
        if(res){
          this.presSrv.setGetPresent();
        }
      })
    }
    else {
      this.presSrv.updatePresent(p).subscribe(res=>{
        if(res){
          this.presSrv.setGetPresent();
        }
      })
    }
    this.isDialog = false;
    this.router.navigate(['presentsList']);
  }
  navigatePresents() {
    this.router.navigate(['presentsList']);
  }
}
