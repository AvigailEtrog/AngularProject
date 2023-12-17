import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Present } from 'src/app/models/present.model';
import { User } from 'src/app/models/user.model';
import { LotteryService } from 'src/app/services/lottery.service';
import { PresentService } from 'src/app/services/presents.service';

@Component({
  selector: 'app-random',
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.css']
})
export class RandomComponent {

  constructor(private PresSrv:PresentService,private LotterSrv:LotteryService,private router:Router) {}
  presentsList:Present[]=[]
  winnersList:User[]=[]
  ngOnInit(){
    this.PresSrv.getPresente().subscribe(res=>{
      if(res){
        this.presentsList=res;
      }
    })
  }
  getWinner(p:Present){
   this.LotterSrv.lotteryUser(p).subscribe(user=>{
    if(user!=null){
      alert(`The winner is:${user.userName}`)
    }
   })
  }
  getReport(){
    this.router.navigate(['./report'])
  }

}
