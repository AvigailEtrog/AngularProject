import { Injectable } from '@angular/core';
import { Donor } from '../models/donor.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DonorsService {
  private callToGetDonorsSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  callToGetDonors$: Observable<boolean> = this.callToGetDonorsSubject.asObservable();

  constructor(private http:HttpClient,) {}
   
   
  setGetDonors() {
    let flag = this.callToGetDonorsSubject.value;
    this.callToGetDonorsSubject.next(!flag);
  }
   getDonors() : Observable<Donor[]>{
    let url='https://localhost:7119/api/Donors'
    return this.http.get<Donor[]>(url);
   }

   getById(id: string):  Observable<Donor>{ 
    let url='https://localhost:7119/api/Donors/'+id
    return this.http.get<Donor>(url);
   }

   addDonor(d:Donor){
    let url = 'https://localhost:7119/api/Donors';
    return this.http.post(url, d)
   }

   updateDonor(d:Donor){
    let url = 'https://localhost:7119/api/Donors/' + d.id;
    return this.http.put(url, d)
   }

   deleteDonor(item:Donor){
      let url='https://localhost:7119/api/Donors/'+item.id
      return this.http.delete<boolean>(url);
   }

   deleteDonorsSelect(selectedDonors:Donor[]){
      let url = `https://localhost:7119/api/Donors?`;
    for (let i = 0; i < selectedDonors.length; i++) {
      url += `donors=${selectedDonors[i].id}`
      i != selectedDonors.length - 1 && (url += '&');
    } 
    return this.http.delete<boolean>(url);
  }
    
 
}
