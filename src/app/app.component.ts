import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PresentService } from './services/presents.service';
import { Present } from './models/present.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ConfirmationService,MessageService,PresentService]
})
export class AppComponent  {
 title='chineesOction'

}
