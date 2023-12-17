import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Lottery } from 'src/app/models/lottery.model';
import { LotteryService } from 'src/app/services/lottery.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {
  lotteries:Lottery[]=[]
  constructor(private LotterSrv:LotteryService,private router:Router) {}
  ngOnInit(){
    this.LotterSrv.getAllWinner().subscribe(res=>{
      this.lotteries=res;
    })
  }
  back(){
    this.router.navigate(['./random'])
  }

}
